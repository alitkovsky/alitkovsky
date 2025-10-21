"use client";

import useInitialPageLoad from "@/hooks/useInitialPageLoad";
import useTouchDetection from "@/hooks/useTouchDetection";

import ClickSpark from "@/components/ClickSpark";
import LanguageProvider from "@/components/LanguageProvider";

import Header from "@/components/Header";
import Nav from "@/components/Nav";
import GridOverlay from "@/components/GridOverlay";

export default function AppWrapper({ children, initialTheme = "dark" }) {
  useInitialPageLoad();
  useTouchDetection();

  return (
    <LanguageProvider>
      <ClickSpark
        sparkColor="var(--color--foreground--100)"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Header />
        {/* <Nav initialTheme={initialTheme} /> */}
        {children}
        <GridOverlay />
      </ClickSpark>
    </LanguageProvider>
  );
};
