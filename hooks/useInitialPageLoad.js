import { useEffect } from "react";

export default function useInitialPageLoad() {

  // Prevent browser from auto-scrolling after reload.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    let loadingTimeout;
    let fallbackTimeout;
    let hasCompleted = false;

    const finishCover = () => {
      if (hasCompleted) return;
      hasCompleted = true;

      document.body.classList.remove("cover--is--visible");

      loadingTimeout = setTimeout(() => {
        document.body.classList.remove("is--loading");
      }, 1500);
    };

    window.addEventListener("cover:complete", finishCover);
    fallbackTimeout = setTimeout(finishCover, 6000);

    return () => {
      window.removeEventListener("cover:complete", finishCover);
      clearTimeout(loadingTimeout);
      clearTimeout(fallbackTimeout);
    };
  }, []);
};
