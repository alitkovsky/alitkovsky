"use client";

import { useState, useEffect, useMemo } from "react";

/**
 * Centralized device capabilities detection hook.
 * Detects pointer type, hover capability, reduced motion preference,
 * and whether cursor effects should be shown.
 *
 * Key feature: Detects trackpad/mouse on tablets (e.g., iPad + Magic Keyboard)
 * using `(any-pointer: fine)` media query.
 */
export default function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState(() => {
    // SSR-safe defaults (assume desktop with mouse)
    if (typeof window === "undefined") {
      return {
        hasCoarsePointer: false,
        hasFinePointer: true,
        hasHover: true,
        hasAnyFinePointer: true,
        prefersReducedMotion: false,
      };
    }
    // Initial client-side detection
    return detectCapabilities();
  });

  useEffect(() => {
    // Re-detect on mount (in case SSR defaults differ)
    setCapabilities(detectCapabilities());

    // Media queries to watch
    const queries = {
      coarse: window.matchMedia("(pointer: coarse)"),
      fine: window.matchMedia("(pointer: fine)"),
      hover: window.matchMedia("(hover: hover)"),
      anyFine: window.matchMedia("(any-pointer: fine)"),
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)"),
    };

    // Handler for any media query change
    const handleChange = () => {
      setCapabilities(detectCapabilities());
    };

    // Add listeners to all media queries
    Object.values(queries).forEach((mq) => {
      mq.addEventListener("change", handleChange);
    });

    return () => {
      Object.values(queries).forEach((mq) => {
        mq.removeEventListener("change", handleChange);
      });
    };
  }, []);

  // Derived states
  const derived = useMemo(() => {
    const { hasCoarsePointer, hasFinePointer, hasHover, hasAnyFinePointer, prefersReducedMotion } = capabilities;

    // Touch-only: has coarse pointer, no fine pointer, no hover
    const isTouchOnly = hasCoarsePointer && !hasFinePointer && !hasHover;

    // Has trackpad/mouse: either primary pointer is fine, or any pointer is fine
    // This catches iPad + Magic Keyboard where primary might be coarse (touch)
    // but any-pointer: fine is true (trackpad)
    const hasTrackpad = hasAnyFinePointer || hasFinePointer;

    // Show cursor effects when:
    // - Device has a trackpad/mouse AND
    // - Device supports hover (not touch-only)
    const showCursorEffects = hasTrackpad && hasHover && !prefersReducedMotion;

    // Is mobile: coarse pointer only, no fine pointer capability
    const isMobile = hasCoarsePointer && !hasAnyFinePointer;

    return {
      isTouchOnly,
      hasTrackpad,
      showCursorEffects,
      isMobile,
      prefersReducedMotion,
    };
  }, [capabilities]);

  return {
    ...capabilities,
    ...derived,
  };
}

/**
 * Detect current device capabilities from media queries
 */
function detectCapabilities() {
  if (typeof window === "undefined") {
    return {
      hasCoarsePointer: false,
      hasFinePointer: true,
      hasHover: true,
      hasAnyFinePointer: true,
      prefersReducedMotion: false,
    };
  }

  return {
    hasCoarsePointer: window.matchMedia("(pointer: coarse)").matches,
    hasFinePointer: window.matchMedia("(pointer: fine)").matches,
    hasHover: window.matchMedia("(hover: hover)").matches,
    hasAnyFinePointer: window.matchMedia("(any-pointer: fine)").matches,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}
