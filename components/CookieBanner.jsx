"use client";

import { useState, useEffect, useRef } from "react";
import { setConsent, getConsent } from "@/lib/consent";
import CookieSettings from "@/components/CookieSettings";
import TextEffect from "@/components/TextEffect";
import useLanguage from "@/hooks/useLanguage";

import Link from "next/link";

const COPY = {
  de: {
    title: "Cookie-Einstellungen",
    description: "ich verwende cookies, um diese seite funktionsfähig zu halten und marketingmaßnahmen zu unterstützen. unter",
    manageCookies: "cookies verwalten",
    descriptionMiddle: "kannst du deine einstellungen jederzeit ändern. mehr infos in meiner",
    cookiePolicy: "cookie-richtlinie",
    descriptionEnd: ".",
    manage: "cookies verwalten",
    reject: "nicht notwendige ablehnen",
    accept: "alle akzeptieren",
  },
  en: {
    title: "Cookie Settings",
    description: "i use cookies to help this site function and support marketing efforts. visit",
    manageCookies: "manage cookies",
    descriptionMiddle: "to change preferences anytime. view my",
    cookiePolicy: "cookie policy",
    descriptionEnd: " for more info.",
    manage: "manage cookies",
    reject: "reject non-essential",
    accept: "accept all",
  },
};

export default function CookieBanner() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.de;

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const bannerRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    // Check if consent already given
    const consent = getConsent();
    let timer;
    if (!consent) {
      // Delay appearance until after cover animation completes (3250ms + buffer)
      timer = setTimeout(() => setIsOpen(true), 3250);
    }

    const handleOpenSettingsEvent = () => {
      setIsOpen(true);
      setShowSettings(true);
    };

    window.addEventListener("openCookieSettings", handleOpenSettingsEvent);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("openCookieSettings", handleOpenSettingsEvent);
    };
  }, []);

  // Handle visibility transition after mount
  useEffect(() => {
    if (isOpen) {
      // Trigger transition after element is rendered
      const frame = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(frame);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Focus management - move focus to banner when it appears
  useEffect(() => {
    if (isOpen && isVisible && bannerRef.current) {
      // Store current focus to restore later
      previousFocusRef.current = document.activeElement;
      // Focus the banner after transition
      const timer = setTimeout(() => {
        bannerRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  // Restore focus when banner closes
  useEffect(() => {
    if (!isOpen && previousFocusRef.current) {
      previousFocusRef.current.focus?.();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  const handleAccept = () => {
    const consent = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setConsent(consent); // Dynamic loading - no reload needed!
    setIsOpen(false);
  };

  const handleDecline = () => {
    const consent = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setConsent(consent);
    setIsOpen(false);
  };

  const handleOpenSettings = () => {
    setIsOpen(true);
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
    if (getConsent()) {
      setIsOpen(false);
    }
  };

  const handleSaveSettings = (preferences) => {
    setConsent(preferences); // Dynamic loading - no reload needed!
    setIsOpen(false);
    setShowSettings(false);
  };

  if (!isOpen && !showSettings) return null;

  return (
    <>
      {isOpen && (
        <div
          ref={bannerRef}
          role="dialog"
          aria-labelledby="cookieConsentTitle"
          aria-describedby="cookieConsentDesc"
          aria-modal="false"
          tabIndex={-1}
          className={`cookie-banner ${isVisible ? "cookie-banner--visible" : "cookie-banner--hidden"}`}
        >
          <h2 id="cookieConsentTitle" className="sr-only">
            {copy.title}
          </h2>
          <div className="cookie-banner__content">
            <p
              id="cookieConsentDesc"
              className="cookie-banner__description"
            >
              {copy.description}{" "}
              <TextEffect
                as="button"
                type="button"
                variant="ellipseAuto"
                trigger="hover"
                className="cookie-banner__link inline-block"
                onClick={handleOpenSettings}
                autoActive
              >
                {copy.manageCookies}
              </TextEffect>{" "}
              {copy.descriptionMiddle}{" "}
              <TextEffect
                as="a"
                variant="ellipseAuto"
                href="/datenschutz"
                trigger="hover"
                className="cookie-banner__link inline-block"
                autoActive
              >
                {copy.cookiePolicy}
              </TextEffect>
              {copy.descriptionEnd}
            </p>
          </div>

          <div className="cookie-banner__actions">
            <button
              type="button"
              onClick={handleOpenSettings}
              className="cookie-banner__btn cookie-banner__btn--ghost"
              aria-haspopup="dialog"
              aria-expanded={showSettings}
            >
              {copy.manage}
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="cookie-banner__btn cookie-banner__btn--ghost"
            >
              {copy.reject}
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="cookie-banner__btn cookie-banner__btn--ghost"
            >
              {copy.accept}
            </button>
          </div>
        </div>
      )}

      {/* Cookie Settings Dialog */}
      {showSettings && (
        <CookieSettings
          onClose={handleCloseSettings}
          onSave={handleSaveSettings}
        />
      )}
    </>
  );
}
