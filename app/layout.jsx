import "./globals.css";
import "./media-queries.css";

import Head from "next/head";

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
      <body>
          <Header />
          {children}
      </body>
    </html>
  );
};