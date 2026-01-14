"use client";

import useInitialPageLoad from "@/hooks/useInitialPageLoad";
import useTouchDetection from "@/hooks/useTouchDetection";
import useDeviceCapabilities from "@/hooks/useDeviceCapabilities";

import ClickSpark from "@/components/ClickSpark";
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
          {/* OPTIMIZATION: Only render cursor on devices with trackpad/mouse */}
          {showCursorEffects && <LazyCustomCursor />}
          {/* OPTIMIZATION: ClickSpark wraps children but handles its own device detection
              We still render it because it provides the container, but it's internally optimized
              to not run RAF loops when not needed */}
          {showCursorEffects ? (
            <ClickSpark
              sparkColor="var(--color--foreground--100)"
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
              {appContent}
            </ClickSpark>
          ) : (
            appContent
          )}
        </CalendlyProvider>
      </LiveRegionProvider>
    </LanguageProvider>
  );
}
