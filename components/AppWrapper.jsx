"use client";

import { useEffect, useState } from "react";
import useInitialPageLoad from "@/hooks/useInitialPageLoad";
import useTouchDetection from "@/hooks/useTouchDetection";
import useDeviceCapabilities from "@/hooks/useDeviceCapabilities";

import LanguageProvider from "@/components/LanguageProvider";
import PwaRegister from "@/components/PwaRegister";
import { CalendlyProvider } from "@/components/CalendlyProvider";
import { LiveRegionProvider } from "@/components/LiveRegion";

import GridOverlay from "@/components/GridOverlay";

import Header from "@/components/Header";
import Nav from "@/components/Nav";

import dynamic from "next/dynamic";

const LazyCustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

/**
 * AppWrapper - Main application wrapper with performance optimizations.
 *
 * PERFORMANCE OPTIMIZATION:
 * - Uses useDeviceCapabilities to conditionally render cursor effects
 * - showCursorEffects = true for: desktop with mouse, iPad/tablet with trackpad
 * - showCursorEffects = false for: iPhone/phone (touch only), iPad without trackpad
 * - Cursor effects are fully enabled when a trackpad is connected/disconnected (reactive)
 */
export default function AppWrapper({
  children,
  initialTheme = "dark",
  initialLanguage,
  initialLanguageSource,
}) {
  useInitialPageLoad();
  useTouchDetection();

  // OPTIMIZATION: Centralized device detection for cursor effects
  const { showCursorEffects } = useDeviceCapabilities();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Shared content that always renders
  const appContent = (
    <>
      <Header />
      <Nav initialTheme={initialTheme} />
      {children}
      {/* <GridOverlay /> */}
    </>
  );

  return (
    <LanguageProvider
      initialLanguage={initialLanguage}
      initialLanguageSource={initialLanguageSource}
    >
      <LiveRegionProvider>
        <CalendlyProvider>
          <PwaRegister />
          {/* Render after hydration to keep SSR/CSR tree consistent */}
          {isHydrated && showCursorEffects && <LazyCustomCursor />}
          {appContent}
        </CalendlyProvider>
      </LiveRegionProvider>
    </LanguageProvider>
  );
}
