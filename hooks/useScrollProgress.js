"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Track scroll progress with RAF throttling.
 *
 * PERFORMANCE OPTIMIZED:
 * - Uses requestAnimationFrame to batch scroll updates
 * - Uses passive scroll listener for better scroll performance
 * - Only updates state when values actually change
 */
export default function useScrollProgress(threshold = 400) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Refs to avoid unnecessary re-renders
  const rafIdRef = useRef(null);
  const lastScrollPercentRef = useRef(0);
  const lastVisibleRef = useRef(false);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      const visible = scrollTop > threshold;

      // Only update state if values changed (avoid unnecessary re-renders)
      if (Math.abs(scrolled - lastScrollPercentRef.current) > 0.1) {
        lastScrollPercentRef.current = scrolled;
        setScrollPercent(scrolled);
      }

      if (visible !== lastVisibleRef.current) {
        lastVisibleRef.current = visible;
        setIsVisible(visible);
      }

      rafIdRef.current = null;
    };

    const handleScroll = () => {
      // Skip if RAF already pending (throttle to animation frame)
      if (rafIdRef.current) return;

      rafIdRef.current = requestAnimationFrame(updateScrollState);
    };

    // Initial calculation
    updateScrollState();

    // Passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [threshold]);

  return { scrollPercent, isVisible };
}
