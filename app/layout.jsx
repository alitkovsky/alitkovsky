import "./styles/globals.css";
import "./styles/color.css";
import "./styles/font.css";
import "./styles/variables.css";
import "./styles/grid.css";

import { cookies, headers } from "next/headers";

import Clarity from "@/components/Clarity";
import Gtm from "@/components/Gtm";
import AppWrapper from "@/components/AppWrapper";
import StructuredData from "@/components/StructuredData";
import {
  FALLBACK_LANGUAGE,
  LANGUAGE_COOKIE_KEY,
  LANGUAGE_SOURCE_COOKIE_KEY,
  LANGUAGE_SOURCE_AUTO,
  LANGUAGE_SOURCE_MANUAL,
  getCountryFromHeaders,
  resolveLanguageFromCountry,
  sanitizeLanguage,
} from "@/lib/language";

export const metadata = {
  metadataBase: new URL('https://litkovskyi.de'),
  title: "Andrii Litkovskyi | Marketing Berater Hille | SEO & Ads",
  description: "Online-Marketing-Beratung in Minden-Lübbecke. SEO, Google Ads & Meta Ads für Praxen, Handwerker und lokale Unternehmen in OWL. 15+ Jahre Erfahrung.",
  alternates: {
    canonical: '/',
    languages: {
      'de': '/',
      'en': '/',
      'x-default': '/',
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
    other: [
      { rel: "mask-icon", url: "/icon-mask.png", color: "#0e3f3e" },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Andrii Litkovskyi | Marketing Berater Hille",
    description: "Online-Marketing-Beratung in Minden-Lübbecke. SEO, Google Ads & Meta Ads für Praxen, Handwerker und lokale Unternehmen in OWL.",
    type: "website",
    url: "https://litkovskyi.de/",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrii Litkovskyi | Marketing Berater Hille",
    description: "Online-Marketing-Beratung in Minden-Lübbecke. SEO, Google Ads & Meta Ads für Praxen, Handwerker und lokale Unternehmen in OWL.",
    images: ["/og-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2fbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#12191a" },
    { color: "#12191a" },
  ],
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("nav-theme")?.value;
  const initialTheme = themeCookie === "light" ? "light" : "dark";
  const consentCookie = cookieStore.get("cookie_consent_v1")?.value;
  const languageCookie = cookieStore.get(LANGUAGE_COOKIE_KEY)?.value;
  const languageSourceCookie = cookieStore.get(LANGUAGE_SOURCE_COOKIE_KEY)?.value;
  const headerStore = await headers();
  const detectedCountry = getCountryFromHeaders(headerStore);

  let initialLanguage = FALLBACK_LANGUAGE;
  let initialLanguageSource = LANGUAGE_SOURCE_AUTO;

  if (languageCookie) {
    if (!languageSourceCookie || languageSourceCookie === LANGUAGE_SOURCE_MANUAL) {
      initialLanguage = sanitizeLanguage(languageCookie);
      initialLanguageSource = LANGUAGE_SOURCE_MANUAL;
    } else {
      initialLanguage = sanitizeLanguage(languageCookie);
      initialLanguageSource = LANGUAGE_SOURCE_AUTO;
    }
  }

  if (initialLanguageSource !== LANGUAGE_SOURCE_MANUAL) {
    if (detectedCountry) {
      initialLanguage = resolveLanguageFromCountry(detectedCountry);
    } else if (!languageCookie) {
      initialLanguage = FALLBACK_LANGUAGE;
    }
  }

  let serverConsent = null;
  if (consentCookie) {
    try {
      serverConsent = JSON.parse(decodeURIComponent(consentCookie));
    } catch (error) {}
  }

  return (
    <html
      lang={initialLanguage}
      suppressHydrationWarning
      data-theme={initialTheme}
      style={{ colorScheme: initialTheme }}
    >
      <head>
        {/*
          CRITICAL: Google Consent Mode v2 MUST be loaded BEFORE GTM
          This sets default consent state to "denied" and waits for user consent
        */}
        <script
          id="google-consent-mode"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              const serverConsent = ${JSON.stringify(serverConsent)};
              const consentDefaults = serverConsent ? {
                'analytics_storage': serverConsent.analytics ? 'granted' : 'denied',
                'ad_storage': serverConsent.marketing ? 'granted' : 'denied',
                'ad_user_data': serverConsent.marketing ? 'granted' : 'denied',
                'ad_personalization': serverConsent.marketing ? 'granted' : 'denied',
                'functionality_storage': serverConsent.functional ? 'granted' : 'denied',
                'personalization_storage': serverConsent.functional ? 'granted' : 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
              } : {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
              };

              // Set default consent to denied
              gtag('consent', 'default', consentDefaults);

              // Additional privacy settings
              gtag('set', 'ads_data_redaction', true);
              gtag('set', 'url_passthrough', true);
            `,
          }}
        />

        {/* Microsoft Clarity - Consent-aware loading */}
        <Clarity />
        {/* Google Tag Manager - Consent-aware loading */}
        <Gtm />

        {/* Structured Data (JSON-LD) for SEO and GEO */}
        <StructuredData />
      </head>
      <body className={`theme-${initialTheme}`}>
        <AppWrapper
          initialTheme={initialTheme}
          initialLanguage={initialLanguage}
          initialLanguageSource={initialLanguageSource}
        >
          {children}
        </AppWrapper>

        {/* Privacy Trigger (cookie settings shortcut) */}
        {/* <PrivacyTrigger /> */}
      </body>
    </html>
  );
};
