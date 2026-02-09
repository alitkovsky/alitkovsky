"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["intro", "values", "process", "background", "projects", "references", "faq", "expertise", "contact"];
const DEFAULT_SECTION_ID = SECTION_IDS[0];
const VIEWPORT_ANCHOR_RATIO = 0.35;

function resolveActiveSectionId() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return DEFAULT_SECTION_ID;
  }

  const anchorY = window.innerHeight * VIEWPORT_ANCHOR_RATIO;
  let fallback = null;

  for (const id of SECTION_IDS) {
    const element = document.getElementById(id);
    if (!element) continue;

    const rect = element.getBoundingClientRect();
    if (rect.top <= anchorY) {
      fallback = id;
    }

    if (rect.top <= anchorY && rect.bottom >= anchorY) {
      return id;
    }
  }

  return fallback ?? DEFAULT_SECTION_ID;
}

export default function useActiveSection({ enabled = true } = {}) {
  const [activeId, setActiveId] = useState(() => (enabled ? DEFAULT_SECTION_ID : null));

  useEffect(() => {
    if (!enabled) {
      setActiveId(null);
      return undefined;
    }

    if (typeof window === "undefined") {
      return undefined;
    }

    let rafId = null;

    const update = () => {
      rafId = null;
      const nextId = resolveActiveSectionId();
      setActiveId((current) => (current === nextId ? current : nextId));
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    };

    // Initial sync
    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    // Observe lazy-mounted sections so the active resolver can recalculate immediately.
    const mutationObserver = new MutationObserver(scheduleUpdate);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      mutationObserver.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [enabled]);

  return activeId;
};
