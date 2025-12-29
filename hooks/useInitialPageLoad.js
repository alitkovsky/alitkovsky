import { useEffect } from "react";

export default function useInitialPageLoad() {
  // Prevent browser from auto-scrolling after reload.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Simple timeout-based cover hide (like billy-project)
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    // Hide cover after h1 animation completes (1.5s) + small buffer
    const coverTimeout = setTimeout(() => {
      document.body.classList.remove("cover--is--visible");
    }, 1750);

    // Remove loading class after cover slide-up transition completes (1750ms + 1500ms transition)
    const loadingTimeout = setTimeout(() => {
      document.body.classList.remove("is--loading");
    }, 3500);

    return () => {
      clearTimeout(coverTimeout);
      clearTimeout(loadingTimeout);
    };
  }, []);
}
