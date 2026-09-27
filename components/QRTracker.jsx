'use client';

import { useEffect } from 'react';
import { trackBusinessCardScan } from '@/lib/analytics';
import { hasConsent } from '@/lib/consent';

/**
 * QR Code Tracking Component
 * Detects business card QR scans via UTM parameters
 * Fires tracking event once per session
 */
export default function QRTracker() {
  useEffect(() => {
    // Only run client-side
    if (typeof window === 'undefined') return;

    // Check if already tracked in this session
    const hasTracked = sessionStorage.getItem('bc_scan_tracked');
    if (hasTracked) return;

    // Static export: read the UTM parameters from the URL instead of page props.
    const params = new URLSearchParams(window.location.search);
    const searchParams = {
      utm_source: params.get('utm_source') ?? undefined,
      utm_medium: params.get('utm_medium') ?? undefined,
      utm_campaign: params.get('utm_campaign') ?? undefined,
      utm_content: params.get('utm_content') ?? undefined,
    };

    // Check for business card UTM parameters
    const utmSource = searchParams?.utm_source;

    if (utmSource === 'visitenkarte') {
      // Wait a bit for consent to be loaded
      const checkConsentAndTrack = () => {
        if (hasConsent('analytics')) {
          trackBusinessCardScan({
            source: searchParams.utm_source,
            medium: searchParams.utm_medium,
            campaign: searchParams.utm_campaign,
            content: searchParams.utm_content,
          });

          // Mark as tracked for this session
          sessionStorage.setItem('bc_scan_tracked', 'true');

          if (process.env.NODE_ENV === 'development') {
            console.log('Business card scan tracked:', searchParams);
          }
        } else {
          // Retry after a short delay if consent not yet available
          setTimeout(checkConsentAndTrack, 500);
        }
      };

      // Small delay to ensure GTM is loaded
      setTimeout(checkConsentAndTrack, 300);
    }
  }, []);

  // This component doesn't render anything
  return null;
}
