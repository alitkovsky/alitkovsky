import "./globals.css";
import "./media-queries.css";

import Head from "next/head";
import { ThemeProvider } from "next-themes";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Hi! I'm Andrii Litkovskyi",
  description: "My personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="shortcut icon" type="image/png" href="favicon-32x32.png" />
      </Head>
      <body>
            <ThemeProvider>
              <Header />
              {children}
            </ThemeProvider>
      </body>
    </html>
  );
};