"use client";

import { useEffect } from "react";

const DEFERRED_STYLES_ID = "deferred-styles";

export default function DeferredStyles() {
  useEffect(() => {
    const loadStyles = () => {
      if (document.getElementById(DEFERRED_STYLES_ID)) return;
      const link = document.createElement("link");
      link.id = DEFERRED_STYLES_ID;
      link.rel = "stylesheet";
      link.href = "/styles/deferred.css";
      link.media = "all";
      document.head.appendChild(link);
    };

    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadStyles, { timeout: 2000 });
      return () => window.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(loadStyles, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
