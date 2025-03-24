import "./globals.css";
import "./media-queries.css";

import Head from "next/head";
import { GoogleTagManager } from "@next/third-parties/google";

import Header from "@/components/Header";

export const metadata = {
  title: "Hi! I'm Andrii Litkovskyi",
  description: "My personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" type="image/png" href="favicon-32x32.png" />
      </Head>
      <GoogleTagManager gtmId="GTM-N4GKN2G2" />
      <body>
          <div className="isolate">
            <Header />
            {children}
          </div>
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N4GKN2G2" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
      </body>
    </html>
  );
};