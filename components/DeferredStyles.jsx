"use client";

import { useEffect } from "react";

const DEFERRED_STYLES_ID = "deferred-styles";

export default function DeferredStyles() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let didLoad = false;

    const loadStyles = () => {
      if (didLoad) return;
      didLoad = true;
      if (document.getElementById(DEFERRED_STYLES_ID)) return;
      const link = document.createElement("link");
      link.id = DEFERRED_STYLES_ID;
      link.rel = "stylesheet";
      link.href = "/styles/deferred.css";
      link.media = "all";
      document.head.appendChild(link);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        loadStyles();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", loadStyles, { once: true });

    let observer;
    let idleId;
    const timeoutId = window.setTimeout(loadStyles, 4000);

    if ("PerformanceObserver" in window) {
      try {
        observer = new PerformanceObserver((list) => {
          if (list.getEntries().length > 0) {
            loadStyles();
          }
        });
        observer.observe({ type: "largest-contentful-paint", buffered: true });
      } catch (error) {
        observer = null;
      }
    }

    if (!observer) {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadStyles, { timeout: 2000 });
      } else {
        window.setTimeout(loadStyles, 0);
      }
    }

    return () => {
      observer?.disconnect();
      if (idleId) {
        window.cancelIdleCallback?.(idleId);
      }
      window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
