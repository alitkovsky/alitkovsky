"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getConsent } from "@/lib/consent";
import useLanguage from "@/hooks/useLanguage";

import TextEffect from "@/components/TextEffect";

const COPY = {
  de: {
    title: "cookie-einstellungen",
    lede: "die nutzung dieser seite erfordert das speichern und abrufen von informationen auf deinem gerät. du kannst deine einwilligung jederzeit ändern.",
    learnMore: "mehr erfahren",
    necessary: {
      title: "notwendige cookies",
      alwaysActive: "immer aktiv",
      description: "essentiell für die grundfunktionen der website. können nicht deaktiviert werden.",
      includes: "umfasst",
    },
    functional: {
      title: "funktionale cookies",
      description: "ermöglichen erweiterte funktionen wie terminbuchung und personalisierte inhalte.",
      includes: "umfasst calendly-cookies für die buchungsfunktion.",
    },
    analytics: {
      title: "analytische cookies",
      description: "helfen mir zu verstehen, wie besucher mit meiner website interagieren, um die nutzererfahrung zu verbessern.",
      includes: "umfasst",
    },
    marketing: {
      title: "marketing cookies",
      description: "werden verwendet, um dir relevante werbung zu zeigen und die wirksamkeit von kampagnen zu messen.",
      includes: "umfasst",
    },
    reject: "nicht notwendige ablehnen",
    save: "einstellungen speichern",
    accept: "alle akzeptieren",
  },
  en: {
    title: "cookie preferences center",
    lede: "using this site involves storing and retrieving information from your device for various activities. you can change your consent at any time.",
    learnMore: "learn more",
    necessary: {
      title: "necessary cookies",
      alwaysActive: "always active",
      description: "essential for the website to function properly. cannot be disabled.",
      includes: "includes",
    },
    functional: {
      title: "functional cookies",
      description: "enable enhanced features like appointment booking and personalized content.",
      includes: "includes calendly cookies for booking functionality.",
    },
    analytics: {
      title: "analytics cookies",
      description: "help me understand how visitors interact with my website to improve user experience.",
      includes: "includes",
    },
    marketing: {
      title: "marketing cookies",
      description: "used to show you relevant advertising and measure campaign effectiveness.",
      includes: "includes",
    },
    reject: "reject non-essential",
    save: "save preferences",
    accept: "accept all",
  },
};

export default function CookieSettings({ onClose, onSave }) {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.de;

  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });
  const modalRef = useRef(null);
  const headingId = "cookie-settings-title";
  const descriptionId = "cookie-settings-description";

  useEffect(() => {
    // Load existing preferences if available
    const consent = getConsent();
    if (consent) {
      setPreferences(consent);
    }
  }, []);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return undefined;

    const focusableSelectors = [
      'a[href]',
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    const focusFirst = () => {
      const first = dialog.querySelector(focusableSelectors);
      if (first) first.focus();
    };

    focusFirst();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = Array.from(dialog.querySelectorAll(focusableSelectors)).filter(
        (el) => !el.hasAttribute("disabled")
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !dialog.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
      } else if (activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const togglePreference = (key) => {
    // Necessary cannot be disabled
    if (key === "necessary") return;

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    onSave(preferences, { source: "settings_save" });
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    onSave(allAccepted, { source: "settings_save" });
  };

  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    onSave(onlyNecessary, { source: "settings_save" });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="cookie-settings__backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="cookie-settings__wrapper"
        onClick={onClose}
      >
        <div
          className="cookie-settings"
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="cookie-settings__header">
            <div>
              <div className="flex justify-between">
                <h2 id={headingId} className="cookie-settings__title">
                  {copy.title}
                </h2>
                <button
                  className="cookie-settings__close"
                  onClick={onClose}
                  aria-label="Close settings"
                >
                  <i aria-hidden className="plus-icon">+</i>
                </button>
              </div>
              <p
                id={descriptionId}
                className="cookie-settings__lede"
              >
                {copy.lede}{" "}
                <TextEffect
                  as="a"
                  variant="ellipseAuto"
                  href="/datenschutz"
                  trigger="hover"
                  className="cookie-banner__link inline-block"
                  autoActive
                >
                  {copy.learnMore}
                </TextEffect>
                .
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="cookie-settings__body">
            {/* Necessary Cookies */}
            <div className="cookie-settings__card">
              <div className="cookie-settings__card-row">
                <div className="space-y-1">
                  <div className="cookie-settings__card-head">
                    <h3 className="cookie-settings__card-title">{copy.necessary.title}</h3>
                    <span className="cookie-settings__pill">
                      {copy.necessary.alwaysActive}
                    </span>
                  </div>
                  <p className="cookie-settings__text">
                    {copy.necessary.description}
                  </p>
                  <p className="cookie-settings__subtext">
                    {copy.necessary.includes} <strong>cookie_consent_v1</strong>, <strong>cookie_consent_timestamp</strong>, <strong>nav-theme</strong>.
                  </p>
                </div>
                <div className="cookie-settings__toggle cookie-settings__toggle--disabled">
                  <div className="cookie-settings__toggle-handle cookie-settings__toggle-handle--on" />
                </div>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="cookie-settings__card">
              <div className="cookie-settings__card-row">
                <div className="space-y-1">
                  <h3 className="cookie-settings__card-title">{copy.functional.title}</h3>
                  <p className="cookie-settings__text">
                    {copy.functional.description}
                  </p>
                  <p className="cookie-settings__subtext">
                    {copy.functional.includes}
                  </p>
                </div>
                <div className="cookie-settings__toggle">
                  <label className="cookie-settings__switch">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => togglePreference("functional")}
                      className="cookie-settings__switch-input"
                    />
                    <span className={`cookie-settings__switch-track ${preferences.functional ? "is-on" : ""}`}>
                      <span className={`cookie-settings__switch-thumb ${preferences.functional ? "is-on" : ""}`} />
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="cookie-settings__card">
              <div className="cookie-settings__card-row">
                <div className="space-y-1">
                  <h3 className="cookie-settings__card-title">{copy.analytics.title}</h3>
                  <p className="cookie-settings__text">
                    {copy.analytics.description}
                  </p>
                  <p className="cookie-settings__subtext">
                    {copy.analytics.includes} <strong>_ga</strong>, <strong>_gid</strong>, <strong>_clck</strong>, <strong>_clsk</strong>.
                  </p>
                </div>
                <div className="cookie-settings__toggle">
                  <label className="cookie-settings__switch">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference("analytics")}
                      className="cookie-settings__switch-input"
                    />
                    <span className={`cookie-settings__switch-track ${preferences.analytics ? "is-on" : ""}`}>
                      <span className={`cookie-settings__switch-thumb ${preferences.analytics ? "is-on" : ""}`} />
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="cookie-settings__card">
              <div className="cookie-settings__card-row">
                <div className="space-y-1">
                  <h3 className="cookie-settings__card-title">{copy.marketing.title}</h3>
                  <p className="cookie-settings__text">
                    {copy.marketing.description}
                  </p>
                  <p className="cookie-settings__subtext">
                    {copy.marketing.includes} <strong>_gcl_*</strong>, <strong>IDE</strong>, <strong>test_cookie</strong>.
                  </p>
                </div>
                <div className="cookie-settings__toggle">
                  <label className="cookie-settings__switch">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => togglePreference("marketing")}
                      className="cookie-settings__switch-input"
                    />
                    <span className={`cookie-settings__switch-track ${preferences.marketing ? "is-on" : ""}`}>
                      <span className={`cookie-settings__switch-thumb ${preferences.marketing ? "is-on" : ""}`} />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="cookie-settings__footer">
            <div className="cookie-settings__footer-actions">
              <button
                onClick={handleDeclineAll}
                className="cookie-settings__btn cookie-settings__btn--ghost"
              >
                {copy.reject}
              </button>
              <button
                onClick={handleSave}
                className="cookie-settings__btn cookie-settings__btn--primary"
              >
                {copy.save}
              </button>
              <button
                onClick={handleAcceptAll}
                className="cookie-settings__btn cookie-settings__btn--ghost"
              >
                {copy.accept}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
