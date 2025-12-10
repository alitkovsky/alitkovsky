"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["intro", "values", "background", "about", "contact"];

export default function useActiveSection({ enabled = true } = {}) {
  const [activeId, setActiveId] = useState(() => (enabled ? SECTION_IDS[0] : null));

  useEffect(() => {
    if (!enabled) {
      setActiveId(null);
      return undefined;
    }

    if (typeof window === "undefined") {
      return undefined;
    }

    setActiveId((current) => current ?? SECTION_IDS[0]);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { threshold: 0.2 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [enabled]);

  return activeId;
};
