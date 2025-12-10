"use client";

import { useEffect } from "react";
import { getConsent } from "@/lib/consent";
import { loadClarity } from "@/lib/scriptLoaders";

export default function Clarity() {
  useEffect(() => {
    // Check if consent already exists and load Clarity if needed
    const consent = getConsent();

    if (consent && consent.analytics && process.env.NODE_ENV === "production") {
      loadClarity();
    }

    // Listen for consent updates
    const handleConsentUpdate = (event) => {
      const { consent: newConsent } = event.detail;

      if (newConsent.analytics && process.env.NODE_ENV === "production") {
        loadClarity();
      }
    };

    window.addEventListener("consentUpdated", handleConsentUpdate);

    return () => {
      window.removeEventListener("consentUpdated", handleConsentUpdate);
    };
  }, []);

  // This component no longer renders anything - it's just for side effects
  // Scripts are loaded dynamically via scriptLoaders.js
  return null;
}
