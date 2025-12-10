"use client";

import useInitialPageLoad from "@/hooks/useInitialPageLoad";
import useTouchDetection from "@/hooks/useTouchDetection";

import ClickSpark from "@/components/ClickSpark";
import LanguageProvider from "@/components/LanguageProvider";
import PwaRegister from "@/components/PwaRegister";
import CustomCursor from "@/components/CustomCursor";
import PageTransitionOverlay from "@/components/PageTransitionOverlay";
import { CalendlyProvider } from "@/components/CalendlyProvider";

import GridOverlay from "@/components/GridOverlay";

import Header from "@/components/Header";
import Nav from "@/components/Nav";

export default function AppWrapper({ children, initialTheme = "dark" }) {
  useInitialPageLoad();
  useTouchDetection();

  return (
    <LanguageProvider>
      <CalendlyProvider>
        <PageTransitionOverlay />
        <PwaRegister />
        <CustomCursor />
        <ClickSpark
          sparkColor="var(--color--foreground--100)"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Header />
          <Nav initialTheme={initialTheme} />
          {children}
          {/* <GridOverlay /> */}
        </ClickSpark>
      </CalendlyProvider>
    </LanguageProvider>
  );
};
