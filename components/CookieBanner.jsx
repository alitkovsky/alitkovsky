"use client";

import { useState, useEffect, useRef } from "react";
import { setConsent, getConsent } from "@/lib/consent";
import CookieSettings from "@/components/CookieSettings";
import TextEffect from "@/components/TextEffect";
import useLanguage from "@/hooks/useLanguage";

const COPY = {
  de: {
    title: "cookie-einstellungen",
    description: "ich nutze notwendige cookies, damit diese seite technisch funktioniert. optionale cookies fuer statistik und marketing setze ich nur mit deiner einwilligung.",
    question: "was moechtest du waehlen?",
    moreInfo: "anpassen oder mehr lesen:",
    manageCookies: "einstellungen",
    cookiePolicy: "datenschutz",
    connector: " oder ",
    necessaryOnly: "nur notwendige",
    accept: "alle akzeptieren",
  },
  en: {
    title: "cookie settings",
    description: "i use necessary cookies to keep this site running. i only use optional cookies for analytics and marketing with your consent.",
    question: "what would you like to choose?",
    moreInfo: "adjust or read more:",
    manageCookies: "settings",
    cookiePolicy: "privacy policy",
    connector: " or ",
    necessaryOnly: "necessary only",
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
    setConsent(consent, { source: "banner_accept" }); // Dynamic loading - no reload needed!
    setIsOpen(false);
  };

  const handleNecessaryOnly = () => {
    const consent = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setConsent(consent, { source: "banner_decline" });
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

  const handleSaveSettings = (preferences, options) => {
    setConsent(preferences, options); // Dynamic loading - no reload needed!
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
              {copy.description}
              {copy.question}
            </p>
          </div>

          <div className="cookie-banner__actions my-6">
            <TextEffect
              as="button"
              type="button"
              onClick={handleAccept}
              variant="ellipseAuto"
              trigger="always"
              className="cookie-banner__btn"
            >
              {copy.accept}
            </TextEffect>
            <TextEffect
              as="button"
              type="button"
              onClick={handleNecessaryOnly}
              variant="underlineThin"
              trigger="always"
              className="cookie-banner__btn"
            >
              {copy.necessaryOnly}
            </TextEffect>
          </div>

          <p className="cookie-banner__description">
              {/* {copy.moreInfo}<br/> */}
              <TextEffect
                as="button"
                type="button"
                variant="ellipseAuto"
                trigger="hover"
                className="cookie-banner__link inline-block"
                onClick={handleOpenSettings}
              >
                {copy.manageCookies}
              </TextEffect>
              {" / "}
              <TextEffect
                as="a"
                variant="ellipseAuto"
                href="/datenschutz"
                trigger="hover"
                className="cookie-banner__link inline-block"
              >
                {copy.cookiePolicy}
              </TextEffect>
            </p>
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
