import "./styles/globals.css";
import "./styles/media-queries.css";
import "./styles/color.css";
import "./styles/font.css";
import "./styles/variables.css";
import "./styles/grid.css";

import Head from "next/head";
import ThemeBootScript from "@/components/ThemeBootScript";
import { GoogleTagManager } from "@next/third-parties/google";
import Clarity from "@/components/Clarity";

import AppWrapper from "@/components/AppWrapper";

export const metadata = {
  title: "Hi! I'm Andrii Litkovskyi",
  description: "My personal website",
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" type="image/png" href="favicon-32x32.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" content="Your site description for SEO and sharing." />

        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta property="og:title" content="Your Site Title" />
        <meta property="og:description" content="Your site description" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alitkovsky.vercel.app/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Site Title" />
        <meta name="twitter:description" content="Your site description" />
        <meta name="twitter:image" content="/og-image.jpg" />

        <ThemeBootScript />

      </Head>
      <GoogleTagManager gtmId="GTM-N4GKN2G2" />
      <Clarity />
      <body className="cover--is--visible is--loading theme--16">
          <AppWrapper>{children}</AppWrapper>
          {/* <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N4GKN2G2" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
          </noscript> */}
      </body>
    </html>
  );
};