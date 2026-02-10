/**
 * Dynamic Script Loaders for GTM/GA4
 * Loads tracking scripts only after user consent
 * No page reload required
 * Works with Google Tag Manager
 */

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Check if script is already loaded
 */
const isScriptLoaded = (scriptId) => {
  if (typeof document === "undefined") return false;
  return !!document.getElementById(scriptId);
};

/**
 * Dynamically load Microsoft Clarity
 * Only loads if analytics consent is given
 */
export const loadClarity = () => {
  if (typeof window === "undefined") return;

  if (!CLARITY_ID) {
    console.warn("Clarity ID not configured");
    return;
  }

  // Check if already loaded
  if (window.clarity || isScriptLoaded("ms-clarity-script")) {
    console.log("Clarity already loaded");
    return;
  }

  // Only load in production
  if (process.env.NODE_ENV !== "production") {
    console.log("Clarity not loaded (development mode)");
    return;
  }

  try {
    const script = document.createElement("script");
    script.id = "ms-clarity-script";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");
    `;
    document.head.appendChild(script);
    console.log("Clarity loaded dynamically");
  } catch (error) {
    console.error("Error loading Clarity:", error);
  }
};

/**
 * Dynamically load Google Tag Manager
 * Loads when analytics or marketing consent is granted
 */
export const loadGtm = () => {
  if (typeof window === "undefined") return;

  if (!GTM_ID) {
    console.warn("GTM ID not configured");
    return;
  }

  if (isScriptLoaded("gtm-script")) {
    console.log("GTM already loaded");
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("GTM not loaded (development mode)");
    return;
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.id = "gtm-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
    console.log("GTM loaded dynamically");
  } catch (error) {
    console.error("Error loading GTM:", error);
  }
};

/**
 * Unload Google Tag Manager
 * Removes script tag
 */
export const unloadGtm = () => {
  if (typeof window === "undefined") return;

  try {
    const script = document.getElementById("gtm-script");
    if (script) {
      script.remove();
    }
    console.log("GTM unloaded");
  } catch (error) {
    console.error("Error unloading GTM:", error);
  }
};

/**
 * Unload Microsoft Clarity
 * Removes script and clears data
 */
export const unloadClarity = () => {
  if (typeof window === "undefined") return;

  try {
    // Disable Clarity if it's running
    if (window.clarity) {
      window.clarity("consent", false);
    }

    // Remove script tag
    const script = document.getElementById("ms-clarity-script");
    if (script) {
      script.remove();
    }

    // Clear Clarity cookies
    const cookiesToClear = ["_clck", "_clsk"];
    cookiesToClear.forEach((name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    console.log("Clarity unloaded");
  } catch (error) {
    console.error("Error unloading Clarity:", error);
  }
};

/**
 * Initialize or update GTM/GA4 consent
 * Consent updates are pushed immediately; GTM may load later.
 */
export const updateAnalyticsConsent = (consent) => {
  if (typeof window === "undefined") {
    console.warn("Window not available (server-side)");
    return;
  }

  try {
    // Update consent via dataLayer (GTM method)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'consent_update',
      consent: {
        analytics_storage: consent.analytics ? "granted" : "denied",
        ad_storage: consent.marketing ? "granted" : "denied",
        ad_user_data: consent.marketing ? "granted" : "denied",
        ad_personalization: consent.marketing ? "granted" : "denied",
        functionality_storage: consent.functional ? "granted" : "denied",
        personalization_storage: consent.functional ? "granted" : "denied",
      }
    });

    // Also update via gtag if available (for compatibility)
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: consent.analytics ? "granted" : "denied",
        ad_storage: consent.marketing ? "granted" : "denied",
        ad_user_data: consent.marketing ? "granted" : "denied",
        ad_personalization: consent.marketing ? "granted" : "denied",
        functionality_storage: consent.functional ? "granted" : "denied",
        personalization_storage: consent.functional ? "granted" : "denied",
      });
    }

    console.log("GTM/GA4 consent updated:", consent);

    // Track the consent event
    if (consent.analytics) {
      window.dataLayer.push({
        event: "cookie_consent_updated",
        analytics: consent.analytics,
        marketing: consent.marketing,
        functional: consent.functional,
      });
    }
  } catch (error) {
    console.error("Error updating GTM consent:", error);
  }
};

/**
 * Clear Google Analytics cookies
 */
export const clearGoogleCookies = () => {
  if (typeof document === "undefined") return;

  const cookiesToClear = [
    "_ga",
    "_gid",
    "_gat",
    "_gac",
    "_gcl_au",
  ];

  cookiesToClear.forEach((name) => {
    // Clear for current domain
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // Clear for root domain
    const domain = window.location.hostname;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
  });

  console.log("Google cookies cleared");
};

/**
 * Clear marketing cookies
 */
export const clearMarketingCookies = () => {
  if (typeof document === "undefined") return;

  const cookiesToClear = ["_gcl_au", "IDE", "test_cookie"];

  cookiesToClear.forEach((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    const domain = window.location.hostname;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
  });

  console.log("Marketing cookies cleared");
};

/**
 * Apply all consent changes dynamically
 * No page reload needed
 */
export const applyConsentDynamically = (consent, previousConsent = null) => {
  if (typeof window === "undefined") return;

  console.log("Applying consent dynamically:", consent);

  // Update analytics consent mode
  updateAnalyticsConsent(consent);

  const shouldLoadGtm = Boolean(consent.analytics || consent.marketing);
  const hadGtmConsent = Boolean(previousConsent?.analytics || previousConsent?.marketing);

  if (shouldLoadGtm && process.env.NODE_ENV === "production") {
    loadGtm();
  } else if (hadGtmConsent && !shouldLoadGtm) {
    unloadGtm();
  }

  // Handle Analytics (Clarity)
  if (consent.analytics && process.env.NODE_ENV === "production") {
    loadClarity();
  } else if (previousConsent?.analytics && !consent.analytics) {
    // User revoked analytics consent
    unloadClarity();
    clearGoogleCookies();
  }

  // Handle Marketing
  if (previousConsent?.marketing && !consent.marketing) {
    // User revoked marketing consent
    clearMarketingCookies();
  }

  // Dispatch custom event for other parts of the app
  window.dispatchEvent(
    new CustomEvent("consentUpdated", {
      detail: { consent, previousConsent },
    })
  );

  console.log("Consent applied successfully (no reload needed)");
};
