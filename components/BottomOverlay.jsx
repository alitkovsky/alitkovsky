"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import BottomOverlayLayers from "@/components/BottomOverlayLayers";

const HOME_SCROLL_REVEAL_PX = 100;

export default function BottomOverlay() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isVisible, setIsVisible] = useState(!isHomepage);

  useEffect(() => {
    if (!isHomepage) {
      setIsVisible(true);
      return undefined;
    }

    const updateVisibility = () => {
      const hasPassedScrollThreshold = window.scrollY >= HOME_SCROLL_REVEAL_PX;
      setIsVisible(hasPassedScrollThreshold);
    };

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [isHomepage]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bottom-overlay" aria-hidden="true">
      <BottomOverlayLayers />
    </div>
  );
}
