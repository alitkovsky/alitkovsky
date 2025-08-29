import "./styles/globals.css";
import "./styles/media-queries.css";
import "./styles/color.css";
import "./styles/font.css";
import "./styles/variables.css";
import "./styles/grid.css";

import ThemeBootScript from "@/components/ThemeBootScript";
import { GoogleTagManager } from "@next/third-parties/google";
import Clarity from "@/components/Clarity";

import AppWrapper from "@/components/AppWrapper";

export const metadata = {
  metadataBase: new URL('https://alitkovsky.vercel.app'),
  title: "Hi! I'm Andrii Litkovskyi",
  description: "My personal website",
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-N4GKN2G2" />
        <Clarity />
        <ThemeBootScript />
      </head>
      <body className="cover--is--visible is--loading theme--16">
          <AppWrapper>{children}</AppWrapper>
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
