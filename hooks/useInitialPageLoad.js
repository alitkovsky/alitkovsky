import { useEffect } from "react";

export default function useInitialPageLoad() {
  // Prevent browser from auto-scrolling after reload.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Ensure any stale loading-cover classes are removed immediately.
  // This avoids delaying above-the-fold rendering on initial load.
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    document.body.classList.remove("cover--is--visible", "is--loading");
    return undefined;
  }, []);
}
