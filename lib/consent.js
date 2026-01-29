/**
 * Cookie Consent Management
 * Handles all consent logic and third-party tool integration
 * GDPR/DSGVO compliant with Google Consent Mode v2
 * Now with dynamic script loading (no page reload needed)
 */

import { applyConsentDynamically } from "./scriptLoaders";

const CONSENT_KEY = 'cookie_consent_v1';
const CONSENT_TIMESTAMP_KEY = 'cookie_consent_timestamp';
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months
const CONSENT_VERSION = "2026-01-27";
const CONSENT_ID_FIELD = "consent_id";
const CONSENT_LOG_ENDPOINT = "/api/consent-log";

const readCookie = (name) => {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
};

const persistConsentCookies = (consent, timestamp) => {
  if (typeof document === 'undefined') return;

  const serialized = encodeURIComponent(JSON.stringify(consent));
  document.cookie = `${CONSENT_KEY}=${serialized};path=/;max-age=${CONSENT_MAX_AGE_SECONDS};SameSite=Lax`;
  document.cookie = `${CONSENT_TIMESTAMP_KEY}=${timestamp};path=/;max-age=${CONSENT_MAX_AGE_SECONDS};SameSite=Lax`;
};

const removeConsentCookies = () => {
  if (typeof document === 'undefined') return;

  document.cookie = `${CONSENT_KEY}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax`;
  document.cookie = `${CONSENT_TIMESTAMP_KEY}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax`;
};

const logConsent = (payload) => {
  if (typeof window === "undefined") return;

  try {
    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(CONSENT_LOG_ENDPOINT, blob);
      return;
    }

    fetch(CONSENT_LOG_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch (error) {
    console.error("Error logging consent:", error);
  }
};

/**
 * Get stored consent preferences
 * @returns {Object|null} Consent categories or null if not set
 */
export const getConsent = () => {
  if (typeof window === 'undefined') return null;

  try {
    let consent = null;
    const stored = localStorage.getItem(CONSENT_KEY);
    const storedTimestamp = localStorage.getItem(CONSENT_TIMESTAMP_KEY);

    if (stored) {
      consent = JSON.parse(stored);
    } else {
      const cookieValue = readCookie(CONSENT_KEY);
      if (cookieValue) {
        consent = JSON.parse(cookieValue);
        // Re-hydrate localStorage to keep UX consistent
        localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
      }
    }

    if (!consent) return null;

    // Check if consent is older than 12 months (GDPR requirement)
    let timestamp = storedTimestamp || readCookie(CONSENT_TIMESTAMP_KEY);
    if (!storedTimestamp && timestamp) {
      localStorage.setItem(CONSENT_TIMESTAMP_KEY, timestamp);
    }
    if (timestamp) {
      const consentDate = new Date(parseInt(timestamp));
      const monthsOld = (Date.now() - consentDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (monthsOld > 12) {
        // Consent expired, clear it
        clearConsent();
        return null;
      }
    }

    return consent;
  } catch (error) {
    console.error('Error reading consent:', error);
    return null;
  }
};

const generateConsentId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

/**
 * Save consent preferences
 * @param {Object} consent - Consent categories object
 * @param {Object|boolean} options - Options or legacy applyImmediately flag
 */
export const setConsent = (consent, options = {}) => {
  try {
    const applyImmediately = typeof options === "boolean"
      ? options
      : options?.applyImmediately ?? true;
    const source = typeof options === "object" ? options?.source : null;

    // Get previous consent for comparison
    const previousConsent = getConsent();

    const consentId = typeof previousConsent?.[CONSENT_ID_FIELD] === "string"
      ? previousConsent[CONSENT_ID_FIELD]
      : generateConsentId();
    const consentPayload = {
      ...consent,
      [CONSENT_ID_FIELD]: consentId,
    };

    // Save to localStorage
    const timestamp = Date.now().toString();
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentPayload));
    localStorage.setItem(CONSENT_TIMESTAMP_KEY, timestamp);
    persistConsentCookies(consentPayload, timestamp);

    const consentChanged = !previousConsent || ["necessary", "functional", "analytics", "marketing"].some(
      (key) => consent[key] !== previousConsent?.[key]
    );

    if (consentChanged && typeof window !== "undefined") {
      logConsent({
        consent,
        previousConsent,
        timestamp,
        version: CONSENT_VERSION,
        pageUrl: window.location.href,
        language: document.documentElement?.lang || null,
        action: previousConsent ? "update" : "initial",
        source,
        consentId,
      });
    }

    // Apply consent changes dynamically (no reload needed)
    if (applyImmediately && typeof window !== 'undefined') {
      applyConsentDynamically(consent, previousConsent);
    }
  } catch (error) {
    console.error('Error saving consent:', error);
  }
};

/**
 * Clear consent (for re-showing banner or reset)
 */
export const clearConsent = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(CONSENT_KEY);
  localStorage.removeItem(CONSENT_TIMESTAMP_KEY);
  removeConsentCookies();
};

/**
 * Update Google Consent Mode v2
 * Required for GA4, GTM, and Google Ads
 * @param {Object} consent - Consent categories object
 */
export const updateGoogleConsent = (consent) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
    functionality_storage: consent.functional ? 'granted' : 'denied',
    personalization_storage: consent.functional ? 'granted' : 'denied',
  });
};

/**
 * Update Microsoft Clarity consent
 * @param {Object} consent - Consent categories object
 */
export const updateClarityConsent = (consent) => {
  if (typeof window === 'undefined') return;

  try {
    if (window.clarity) {
      if (!consent.analytics) {
        // Disable Clarity if analytics not consented
        window.clarity('consent', false);
      } else {
        window.clarity('consent', true);
      }
    }
  } catch (error) {
    console.error('Error updating Clarity consent:', error);
  }
};

/**
 * Calendly consent handling
 * Calendly is loaded on-demand, so we just track the preference
 * @param {Object} consent - Consent categories object
 */
export const updateCalendlyConsent = (consent) => {
  // Calendly doesn't require explicit consent handling as it's functional
  // and loaded only when user explicitly clicks the booking button
  // We keep this function for consistency
};

/**
 * Check if specific category is consented
 * @param {string} category - Category name (necessary, functional, analytics, marketing)
 * @returns {boolean}
 */
export const hasConsent = (category) => {
  const consent = getConsent();
  return consent ? consent[category] : false;
};

/**
 * Get all necessary consents for a tool
 * @param {string} tool - Tool name (analytics, marketing, calendly)
 * @returns {boolean}
 */
export const canLoadTool = (tool) => {
  const consent = getConsent();
  if (!consent) return false;

  switch (tool) {
    case 'analytics':
      return consent.analytics;
    case 'marketing':
      return consent.marketing;
    case 'calendly':
      return consent.functional || consent.necessary; // Functional tool
    default:
      return false;
  }
};
