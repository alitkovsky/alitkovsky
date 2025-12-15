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

    // Hide cover after 1750ms
    const coverTimeout = setTimeout(() => {
      document.body.classList.remove("cover--is--visible");
    }, 1750);

    // Remove loading class after cover transition completes (3250ms total)
    const loadingTimeout = setTimeout(() => {
      document.body.classList.remove("is--loading");
    }, 3250);

    return () => {
      clearTimeout(coverTimeout);
      clearTimeout(loadingTimeout);
    };
  }, []);
}
