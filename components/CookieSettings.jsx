"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getConsent } from "@/lib/consent";

import TextEffect from "@/components/TextEffect";

export default function CookieSettings({ onClose, onSave }) {
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
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
    onSave(preferences);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    onSave(allAccepted);
  };

  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    onSave(onlyNecessary);
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
              <h2 id={headingId} className="cookie-settings__title">
                Cookie Preferences Center
              </h2>
              <p
                id={descriptionId}
                className="cookie-settings__lede"
              >
                Using this site involves storing and retrieving information from your device for various activities. You can change your consent at any time.{" "}
                <TextEffect
                  as="a"
                  variant="ellipseAuto"
                  href="/datenschutz"
                  trigger="hover"
                  className="cookie-banner__link inline-block"
                  autoActive
                >
                  Learn more
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
                    <h3 className="cookie-settings__card-title">Necessary Cookies</h3>
                    <span className="cookie-settings__pill">
                      Always Active
                    </span>
                  </div>
                  <p className="cookie-settings__text">
                    Essential for the website to function properly. Cannot be disabled.
                  </p>
                  <p className="cookie-settings__subtext">
                    Includes <strong>cookie_consent_v1</strong>, <strong>cookie_consent_timestamp</strong>, and <strong>nav-theme</strong>.
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
                  <h3 className="cookie-settings__card-title">Functional Cookies</h3>
                  <p className="cookie-settings__text">
                    Enable enhanced features like appointment booking and personalized content.
                  </p>
                  <p className="cookie-settings__subtext">
                    Includes Calendly cookies for booking functionality.
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
                  <h3 className="cookie-settings__card-title">Analytics Cookies</h3>
                  <p className="cookie-settings__text">
                    Help us understand how visitors interact with our website to improve user experience.
                  </p>
                  <p className="cookie-settings__subtext">
                    Includes <strong>_ga</strong>, <strong>_gid</strong>, <strong>_clck</strong>, <strong>_clsk</strong>.
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
                  <h3 className="cookie-settings__card-title">Marketing Cookies</h3>
                  <p className="cookie-settings__text">
                    Used to show you relevant advertising and measure campaign effectiveness.
                  </p>
                  <p className="cookie-settings__subtext">
                    Includes <strong>_gcl_*</strong>, <strong>IDE</strong>, <strong>test_cookie</strong>.
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
                Reject non-essential
              </button>
              <button
                onClick={handleSave}
                className="cookie-settings__btn cookie-settings__btn--primary"
              >
                Save preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="cookie-settings__btn cookie-settings__btn--ghost"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
