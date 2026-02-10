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
import BottomOverlay from "@/components/BottomOverlay";

import Header from "@/components/Header";
import Nav from "@/components/Nav";

import dynamic from "next/dynamic";

const LazyCustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const LazyCookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });

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
  const [loadCookieBanner, setLoadCookieBanner] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let timeoutId = null;
    let idleId = null;

    const loadBanner = () => setLoadCookieBanner(true);
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadBanner, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(loadBanner, 0);
    }

    return () => {
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const shouldRenderCursor = isHydrated && showCursorEffects;

  // Shared content that always renders
  const appContent = (
    <>
      <Header />
      <Nav initialTheme={initialTheme} />
      {children}
      <BottomOverlay />
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
          {/* OPTIMIZATION: Only render cursor on devices with trackpad/mouse */}
          {shouldRenderCursor && <LazyCustomCursor />}
          {appContent}
          {loadCookieBanner && <LazyCookieBanner />}
        </CalendlyProvider>
      </LiveRegionProvider>
    </LanguageProvider>
  );
}
