/**
 * Analytics helper functions for GTM/GA4
 * Only tracks events if user has given consent
 * Works with Google Tag Manager's dataLayer
 */

import { hasConsent } from "./consent";

/**
 * Push data to GTM dataLayer
 * @param {Object} data - Data to push to dataLayer
 */
const pushToDataLayer = (data) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};

/**
 * Track a custom event in GA4 via GTM
 * @param {string} eventName - Name of the event
 * @param {Object} parameters - Event parameters
 */
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window === "undefined" || !hasConsent("analytics")) {
    return;
  }

  // Push to dataLayer (GTM method - preferred)
  pushToDataLayer({
    event: eventName,
    ...parameters,
  });

  // Fallback to gtag if available (for direct GA4 compatibility)
  if (window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

/**
 * Track page view
 * @param {string} url - Page URL
 */
export const trackPageView = (url) => {
  if (
    typeof window === "undefined" ||
    !window.gtag ||
    !hasConsent("analytics")
  ) {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: url,
  });
};

/**
 * Track conversion (for Google Ads)
 * @param {string} conversionLabel - Conversion label from Google Ads
 * @param {number} value - Conversion value
 * @param {string} currency - Currency code (default: EUR)
 */
export const trackConversion = (
  conversionLabel,
  value = undefined,
  currency = "EUR"
) => {
  if (
    typeof window === "undefined" ||
    !window.gtag ||
    !hasConsent("marketing")
  ) {
    return;
  }

  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!conversionId) {
    console.warn("Google Ads ID not configured");
    return;
  }

  window.gtag("event", "conversion", {
    send_to: `${conversionId}/${conversionLabel}`,
    value: value,
    currency: currency,
  });
};

/**
 * Track outbound link click
 * @param {string} url - Destination URL
 * @param {string} label - Optional label for the link
 */
export const trackOutboundLink = (url, label = "") => {
  trackEvent("outbound_link_click", {
    link_url: url,
    link_label: label,
  });
};

/**
 * Track form submission
 * @param {string} formName - Name of the form
 * @param {string} formDestination - Where the form data goes (email, api, etc)
 */
export const trackFormSubmit = (formName, formDestination = "") => {
  trackEvent("form_submit", {
    form_name: formName,
    form_destination: formDestination,
  });
};

/**
 * Track file download
 * @param {string} fileName - Name of the downloaded file
 * @param {string} fileType - File extension/type
 */
export const trackDownload = (fileName, fileType = "") => {
  trackEvent("file_download", {
    file_name: fileName,
    file_type: fileType,
  });
};

/**
 * Track video interaction
 * @param {string} action - play, pause, complete, etc.
 * @param {string} videoTitle - Title of the video
 */
export const trackVideo = (action, videoTitle = "") => {
  trackEvent("video_interaction", {
    video_action: action,
    video_title: videoTitle,
  });
};

/**
 * Track scroll depth
 * @param {number} percentage - Scroll depth percentage (25, 50, 75, 100)
 */
export const trackScrollDepth = (percentage) => {
  trackEvent("scroll_depth", {
    scroll_percentage: percentage,
  });
};

/**
 * Track CTA click
 * @param {string} ctaName - Name/identifier of the CTA
 * @param {string} ctaLocation - Where the CTA is located (hero, sidebar, footer, etc)
 */
export const trackCTAClick = (ctaName, ctaLocation = "") => {
  trackEvent("cta_click", {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
};

/**
 * Track business card QR code scan
 * @param {Object} utmParams - UTM parameters from the QR code
 */
export const trackBusinessCardScan = (utmParams = {}) => {
  if (typeof window === "undefined" || !hasConsent("analytics")) {
    return;
  }

  trackEvent("business_card_scan", {
    utm_source: utmParams.source || "visitenkarte",
    utm_medium: utmParams.medium || "qr",
    utm_campaign: utmParams.campaign || "andrii_brand",
    utm_content: utmParams.content || undefined,
    scan_timestamp: new Date().toISOString(),
    page_location: window.location.href,
  });
};

/**
 * Example usage in your components:
 *
 * import { trackEvent, trackFormSubmit, trackCTAClick } from '@/lib/analytics';
 *
 * // Track custom event
 * trackEvent('contact_form_submit', {
 *   form_name: 'contact',
 *   form_destination: 'email'
 * });
 *
 * // Track form submission
 * trackFormSubmit('newsletter_signup', 'api');
 *
 * // Track CTA click
 * trackCTAClick('book_consultation', 'hero_section');
 *
 * // Track conversion
 * trackConversion('CONVERSION_LABEL', 100, 'EUR');
 */
