import "./styles/globals.css";
import "./styles/media-queries.css";
import "./styles/color.css";
import "./styles/font.css";
import "./styles/variables.css";
import "./styles/grid.css";

import { cookies } from "next/headers";

import ThemeBootScript from "@/components/ThemeBootScript";
import { GoogleTagManager } from "@next/third-parties/google";
import Clarity from "@/components/Clarity";

import AppWrapper from "@/components/AppWrapper";

export const metadata = {
  metadataBase: new URL('https://alitkovsky.vercel.app'),
  title: "Hi! I'm Andrii Litkovskyi",
  description: "My personal website",
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
    title: "Hi! I'm Andrii Litkovskyi",
    description: "My personal website",
    type: "website",
    url: "https://alitkovsky.vercel.app/",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hi! I'm Andrii Litkovskyi",
    description: "My personal website",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const DEFAULT_THEME_INDEX = 4;

function sanitizeTheme(value) {
  if (typeof value !== "string" || !/^(\d{1,2})$/.test(value)) {
    return DEFAULT_THEME_INDEX;
  }

  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0 || numeric > 16) {
    return DEFAULT_THEME_INDEX;
  }

  return numeric;
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const rawTheme = cookieStore.get("preferred-theme")?.value ?? String(DEFAULT_THEME_INDEX).padStart(2, "0");
  const numericTheme = sanitizeTheme(rawTheme);
  const themeClass = `theme--${String(numericTheme).padStart(2, "0")}`;

  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-N4GKN2G2" />
        <Clarity />
        <ThemeBootScript />
      </head>
      <body className={`cover--is--visible is--loading ${themeClass}`}>
          <AppWrapper>
            {children}
          </AppWrapper>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-N4GKN2G2"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
      </body>
    </html>
  );
};
