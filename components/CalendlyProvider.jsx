"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { canLoadTool } from "@/lib/consent";
import { trackEvent } from "@/lib/analytics";

const CalendlyContext = createContext(null);
const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_STYLE_HREF = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_SCRIPT_ID = "calendly-widget-js";
const CALENDLY_STYLE_ID = "calendly-widget-css";
const CALENDLY_ORIGIN = "https://calendly.com";

const normalizeUrl = (value, fallback) => {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed.length ? trimmed : fallback;
};

export function CalendlyProvider({
  children,
  eventUrl = process.env.NEXT_PUBLIC_CALENDLY_URL,
  successUrl = process.env.NEXT_PUBLIC_CALENDLY_SUCCESS_URL || "/thanx",
}) {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastError, setLastError] = useState(null);
  const loaderRef = useRef(null);
  const router = useRouter();

  const resolvedEventUrl = normalizeUrl(
    eventUrl,
    "https://calendly.com/andrii-litkovskyi/30min?hide_gdpr_banner=1",
  );
  const resolvedSuccessUrl = normalizeUrl(successUrl, "/thanx");

  const ensureStylesheet = useCallback(() => {
    if (typeof document === "undefined") {
      return;
    }
    if (document.getElementById(CALENDLY_STYLE_ID)) {
      return;
    }

    const link = document.createElement("link");
    link.id = CALENDLY_STYLE_ID;
    link.rel = "stylesheet";
    link.href = CALENDLY_STYLE_HREF;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }, []);

  const ensureScript = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return Promise.resolve(null);
    }

    // Check if user has given consent for functional cookies
    if (!canLoadTool("calendly")) {
      const error = new Error("Calendly requires functional cookie consent");
      setLastError(error);
      return Promise.reject(error);
    }

    ensureStylesheet();

    if (window.Calendly) {
      setIsReady(true);
      return Promise.resolve(window.Calendly);
    }

    if (loaderRef.current) {
      return loaderRef.current;
    }

    loaderRef.current = new Promise((resolve, reject) => {
      const existing = document.getElementById(CALENDLY_SCRIPT_ID);
      if (existing) {
        existing.addEventListener("load", () => {
          setIsReady(true);
          resolve(window.Calendly);
        }, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.id = CALENDLY_SCRIPT_ID;
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      script.onload = () => {
        setIsReady(true);
        resolve(window.Calendly);
      };
      script.onerror = (error) => {
        setLastError(error);
        reject(error);
      };
      document.head.appendChild(script);
    }).finally(() => {
      loaderRef.current = null;
    });

    return loaderRef.current;
  }, [ensureStylesheet]);

  const closeCalendly = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.Calendly?.closePopupWidget?.();
    setIsOpen(false);
  }, []);

  const redirectAfterBooking = useCallback(() => {
    if (typeof window === "undefined" || !resolvedSuccessUrl) {
      return;
    }

    if (resolvedSuccessUrl.startsWith("http")) {
      window.location.href = resolvedSuccessUrl;
      return;
    }

    router.push(resolvedSuccessUrl);
  }, [resolvedSuccessUrl, router]);

  const openCalendly = useCallback(
    async ({ url, prefill } = {}) => {
      if (typeof window === "undefined") {
        return;
      }

      setLastError(null);
      setIsLoading(true);

      try {
        const CalendlyApi = await ensureScript();
        if (!CalendlyApi) {
          throw new Error("Calendly API unavailable");
        }

        const popupUrl = normalizeUrl(url, resolvedEventUrl);

        CalendlyApi.initPopupWidget({
          url: popupUrl,
          prefill,
        });
        setIsOpen(true);
      } catch (error) {
        setLastError(error instanceof Error ? error : new Error("Unable to open Calendly"));
        // eslint-disable-next-line no-console
        console.error("[Calendly] Failed to open widget", error);
      } finally {
        setIsLoading(false);
      }
    },
    [ensureScript, resolvedEventUrl],
  );

  const ensureReady = useCallback(() => ensureScript(), [ensureScript]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleMessage = (event) => {
      if (event.origin !== CALENDLY_ORIGIN || !event.data?.event) {
        return;
      }

      if (event.data.event === "calendly.event_scheduled") {
        const payload = event.data.payload ?? {};
        trackEvent("calendly_event_scheduled", {
          event_uri: payload.event?.uri,
          invitee_uri: payload.invitee?.uri,
        });
        setIsOpen(false);
        redirectAfterBooking();
      }

      if (event.data.event === "calendly.profile_page_viewed") {
        setIsOpen(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [redirectAfterBooking]);

  const value = useMemo(
    () => ({
      eventUrl: resolvedEventUrl,
      successUrl: resolvedSuccessUrl,
      isReady,
      isOpen,
      isLoading,
      lastError,
      openCalendly,
      closeCalendly,
      ensureReady,
    }),
    [
      resolvedEventUrl,
      resolvedSuccessUrl,
      isReady,
      isOpen,
      isLoading,
      lastError,
      openCalendly,
      closeCalendly,
      ensureReady,
    ],
  );

  return (
    <CalendlyContext.Provider value={value}>
      {children}
    </CalendlyContext.Provider>
  );
}

export const useCalendlyContext = () => {
  const context = useContext(CalendlyContext);
  if (!context) {
    throw new Error("useCalendlyContext must be used within a CalendlyProvider");
  }

  return context;
};
