import "./styles/globals.css";
import "./styles/media-queries.css";
import "./styles/color.css";
import "./styles/font.css";
import "./styles/variables.css";
import "./styles/grid.css";

import { Comfortaa } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { cookies } from "next/headers";

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
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hi! I'm Andrii Litkovskyi",
    description: "My personal website",
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

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-family-primary",
});

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("nav-theme")?.value;
  const initialTheme = themeCookie === "light" ? "light" : "dark";

  return (
    <html lang="en" className={comfortaa.variable} data-theme={initialTheme} style={{ colorScheme: initialTheme }}>
      <head>
        <GoogleTagManager gtmId="GTM-N4GKN2G2" />
        {/* <Clarity /> */}
      </head>
      <body className={`cover--is--visible is--loading theme-${initialTheme}`}>
          <AppWrapper initialTheme={initialTheme}>
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
