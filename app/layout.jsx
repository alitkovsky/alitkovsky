import "./styles/globals.css";
import "./styles/color.css";
import "./styles/font.css";
import "./styles/variables.css";
import "./styles/grid.css";

import Clarity from "@/components/Clarity";
import Gtm from "@/components/Gtm";
import AppWrapper from "@/components/AppWrapper";
import StructuredData from "@/components/StructuredData";
import { FALLBACK_LANGUAGE } from "@/lib/language";

export const metadata = {
  metadataBase: new URL('https://litkovskyi.de'),
  title: "Andrii Litkovskyi | Digital Operations & System Integration | Hille & OWL",
  description: "CRM-Integration, Datenanalyse und Prozessoptimierung fuer Unternehmen in OWL. Ich baue digitale Strukturen, die Verwaltung und Vertrieb entlasten.",
  alternates: {
    canonical: '/',
    languages: {
      'de': '/',
      'en': '/en',
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
    title: "Andrii Litkovskyi | Digital Operations & Prozesse",
    description: "Effiziente digitale Ablaeufe: CRM, Datenmanagement, Prozessautomatisierung und messbare Umsetzung.",
    type: "website",
    url: "https://litkovskyi.de/",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrii Litkovskyi | Digital Operations & Prozesse",
    description: "Digitale Strukturen fuer klare Prozesse, saubere Daten und bessere Entscheidungen.",
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

// Static export: pages render the German default here. scripts/finalize-export.js sets
// lang="en" on /en pages, and this script applies the saved theme before first paint.
const THEME_INIT_SCRIPT = `
  (function () {
    var theme = null;
    try { theme = window.localStorage.getItem("nav-theme"); } catch (error) {}
    if (theme !== "light" && theme !== "dark") {
      var match = document.cookie.match(/(?:^|; )nav-theme=([^;]*)/);
      theme = match ? match[1] : null;
    }
    if (theme !== "light") return;
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang={FALLBACK_LANGUAGE}
      suppressHydrationWarning
      data-theme="dark"
      style={{ colorScheme: "dark" }}
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
              let storedConsent = null;
              try {
                const match = document.cookie.match(/(?:^|; )cookie_consent_v1=([^;]*)/);
                if (match) storedConsent = JSON.parse(decodeURIComponent(match[1]));
              } catch (error) {}
              const consentDefaults = storedConsent ? {
                'analytics_storage': storedConsent.analytics ? 'granted' : 'denied',
                'ad_storage': storedConsent.marketing ? 'granted' : 'denied',
                'ad_user_data': storedConsent.marketing ? 'granted' : 'denied',
                'ad_personalization': storedConsent.marketing ? 'granted' : 'denied',
                'functionality_storage': storedConsent.functional ? 'granted' : 'denied',
                'personalization_storage': storedConsent.functional ? 'granted' : 'denied',
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
      <body className="theme-dark" suppressHydrationWarning>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <AppWrapper>{children}</AppWrapper>

        {/* Privacy Trigger (cookie settings shortcut) */}
        {/* <PrivacyTrigger /> */}
      </body>
    </html>
  );
};
