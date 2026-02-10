"use client";

import { useEffect } from "react";
import { getConsent } from "@/lib/consent";
import { loadGtm } from "@/lib/scriptLoaders";

export default function Gtm() {
  useEffect(() => {
    if (typeof window === "undefined" || process.env.NODE_ENV !== "production") return;

    const scheduleLoad = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => loadGtm(), { timeout: 2000 });
      } else {
        window.setTimeout(loadGtm, 0);
      }
    };

    const consent = getConsent();
    if (consent?.analytics || consent?.marketing) {
      scheduleLoad();
    }

    const handleConsentUpdate = (event) => {
      const nextConsent = event?.detail?.consent;
      if (nextConsent?.analytics || nextConsent?.marketing) {
        scheduleLoad();
      }
    };

    window.addEventListener("consentUpdated", handleConsentUpdate);
    return () => {
      window.removeEventListener("consentUpdated", handleConsentUpdate);
    };
  }, []);

  return null;
}
