import Head from "next/head";
import { Fira_Code } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

const fira = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fira-code",
});

export const metadata = {
  title: "Hi! I'm Andrii Litkovskyi",
  description: "My personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" type="image/png" href="favicon-32x32.png" />
      </head>
      <body>
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
};