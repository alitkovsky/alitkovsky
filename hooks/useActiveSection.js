"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["intro", "values", "background", "about", "contact"];

export default function useActiveSection() {
  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
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
  }, []);

  return activeId;
};