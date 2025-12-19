"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

const LiveRegionContext = createContext(null);

/**
 * Provider component that creates an aria-live region for screen reader announcements.
 * Wrap your app or a section with this to enable announcements via useLiveRegion hook.
 */
export function LiveRegionProvider({ children }) {
  const [message, setMessage] = useState("");
  const [politeness, setPoliteness] = useState("polite");
  const timeoutRef = useRef(null);

  const announce = useCallback((text, options = {}) => {
    const { priority = "polite", clearAfter = 5000 } = options;

    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear the message first to ensure re-announcement of same message
    setMessage("");
    setPoliteness(priority);

    // Set the new message after a brief delay to ensure screen readers pick it up
    requestAnimationFrame(() => {
      setMessage(text);
    });

    // Auto-clear the message after specified duration
    if (clearAfter > 0) {
      timeoutRef.current = setTimeout(() => {
        setMessage("");
      }, clearAfter);
    }
  }, []);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMessage("");
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <LiveRegionContext.Provider value={{ announce, clear }}>
      {children}
      {/* Polite announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeness === "polite" ? message : ""}
      </div>
      {/* Assertive announcements (interrupts current speech) */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {politeness === "assertive" ? message : ""}
      </div>
    </LiveRegionContext.Provider>
  );
}

/**
 * Hook to access the live region announcer.
 * @returns {{ announce: (text: string, options?: { priority?: "polite" | "assertive", clearAfter?: number }) => void, clear: () => void }}
 */
export function useLiveRegion() {
  const context = useContext(LiveRegionContext);
  if (!context) {
    // Return no-op functions if used outside provider
    return {
      announce: () => {},
      clear: () => {},
    };
  }
  return context;
}
