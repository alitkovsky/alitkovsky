"use client";

import { useEffect } from "react";
import { getConsent } from "@/lib/consent";
import { loadGtm } from "@/lib/scriptLoaders";

export default function Gtm() {
  useEffect(() => {
    const scheduleLoad = () => {
      if (typeof window === "undefined") return;

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => loadGtm(), { timeout: 2000 });
      } else {
        window.setTimeout(loadGtm, 0);
      }
    };

    const consent = getConsent();
    if (consent?.analytics && process.env.NODE_ENV === "production") {
      scheduleLoad();
    }

    const handleConsentUpdate = (event) => {
      const { consent: newConsent } = event.detail;
      if (newConsent.analytics && process.env.NODE_ENV === "production") {
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
