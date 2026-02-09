import "./styles/globals.css";
import "./styles/color.css";
import "./styles/font.css";
import "./styles/variables.css";
import "./styles/grid.css";

import { Comfortaa, Gloria_Hallelujah, Shadows_Into_Light, Reenie_Beanie } from "next/font/google";
import Script from "next/script";
import { cookies, headers } from "next/headers";

import Clarity from "@/components/Clarity";
import AppWrapper from "@/components/AppWrapper";
import CookieBanner from "@/components/CookieBanner";
import PrivacyTrigger from "@/components/PrivacyTrigger";
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

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-family-primary",
});

const shadowsIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-shadows-into-light",
});

const gloriaHallelujah = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-gloria-hallelujah",
});

const reenieBeanie = Reenie_Beanie({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-reenie-beanie",
});

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
      className={`${comfortaa.variable} ${shadowsIntoLight.variable} ${gloriaHallelujah.variable} ${reenieBeanie.variable}`}
      data-theme={initialTheme}
      style={{ colorScheme: initialTheme }}
    >
      <head>
        {/*
          CRITICAL: Google Consent Mode v2 MUST be loaded BEFORE GTM
          This sets default consent state to "denied" and waits for user consent
        */}
        <Script
          id="google-consent-mode"
          strategy="beforeInteractive"
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

        {GTM_ID ? (
          <Script
            id="gtm-base"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        ) : null}

        {/* Microsoft Clarity - Consent-aware loading */}
        <Clarity />

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

          {/* Cookie Consent Banner */}
          <CookieBanner />

          {/* Privacy Trigger (cookie settings shortcut) */}
          {/* <PrivacyTrigger /> */}

      </body>
    </html>
  );
};
