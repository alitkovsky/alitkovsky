"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["intro", "values", "process", "background", "projects", "references", "faq", "expertise", "contact"];
const DEFAULT_SECTION_ID = SECTION_IDS[0];

export default function useActiveSection({ enabled = true } = {}) {
  const [activeId, setActiveId] = useState(() => (enabled ? DEFAULT_SECTION_ID : null));

  useEffect(() => {
    if (!enabled) {
      setActiveId(null);
      return undefined;
    }

    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      setActiveId(DEFAULT_SECTION_ID);
      return undefined;
    }

    const stateById = new Map();
    const observerById = new Map();
    let rafId = null;

    const resolveFromStates = () => {
      const anchorY = window.innerHeight * 0.35;
      let bestAnchorMatch = null;
      let bestIntersecting = null;
      let fallback = null;

      SECTION_IDS.forEach((id) => {
        const state = stateById.get(id);
        if (!state) return;

        if (state.top <= anchorY) {
          fallback = id;
        }

        if (state.isIntersecting) {
          if (state.top <= anchorY) {
            if (bestAnchorMatch == null || state.top > bestAnchorMatch.top) {
              bestAnchorMatch = { id, top: state.top };
            }
          } else if (bestIntersecting == null || state.top < bestIntersecting.top) {
            bestIntersecting = { id, top: state.top };
          }
        }
      });

      return bestAnchorMatch?.id ?? bestIntersecting?.id ?? fallback ?? DEFAULT_SECTION_ID;
    };

    const flush = () => {
      rafId = null;
      const nextId = resolveFromStates();
      setActiveId((current) => (current === nextId ? current : nextId));
    };

    const scheduleFlush = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(flush);
    };

    const observeSection = (id) => {
      if (observerById.has(id)) return;
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target !== element) return;
            stateById.set(id, {
              top: entry.boundingClientRect.top,
              isIntersecting: entry.isIntersecting,
            });
          });
          scheduleFlush();
        },
        {
          root: null,
          // Keep updates focused around the anchor area used by navigation highlighting.
          rootMargin: "-35% 0px -55% 0px",
          threshold: [0, 0.01, 0.25, 0.5, 0.75, 1],
        },
      );

      observer.observe(element);
      observerById.set(id, observer);
    };

    const observeKnownSections = () => {
      SECTION_IDS.forEach(observeSection);
    };

    observeKnownSections();
    scheduleFlush();

    window.addEventListener("hashchange", scheduleFlush);

    // Observe lazy-mounted sections so active-state tracking attaches without full-page observers.
    const mutationObserver = new MutationObserver(observeKnownSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("hashchange", scheduleFlush);
      mutationObserver.disconnect();
      observerById.forEach((observer) => observer.disconnect());
      observerById.clear();
      stateById.clear();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [enabled]);

  return activeId;
};
