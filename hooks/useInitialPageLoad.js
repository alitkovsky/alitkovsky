import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useInitialPageLoad() {
  const pathname = usePathname();

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

    // window.addEventListener("cover:complete", finishCover);
    // fallbackTimeout = setTimeout(finishCover, 6000);

    const handleTransitionEnd = (event) => {
      if (event?.detail?.mode === "initial") {
        finishCover();
      }
    };
    if (pathname === "/" || pathname === "") {
      window.addEventListener("cover:complete", finishCover);
      fallbackTimeout = setTimeout(finishCover, 6000);
      window.addEventListener("page-transition:end", handleTransitionEnd);
    } else {
      finishCover();
    }

    return () => {
      window.removeEventListener("cover:complete", finishCover);
      window.removeEventListener("page-transition:end", handleTransitionEnd);
      clearTimeout(loadingTimeout);
      clearTimeout(fallbackTimeout);
    };
  }, [pathname]);
};
