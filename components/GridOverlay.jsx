"use client";

import { useEffect, useRef } from "react";

const GridOverlay = () => {
  const overlayRef = useRef(null);
  const hasActivatedRef = useRef(false);
  const hasScheduledRevealRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    if (!overlayRef.current) {
      return undefined;
    }

    let fallbackTimeoutId;
    let transitionTimeoutId;
    let visibilityTimeoutId;
    let cleanupTransitionListener = () => {};

    const revealOverlay = () => {
      if (hasActivatedRef.current || !overlayRef.current) {
        return;
      }

      hasActivatedRef.current = true;
      overlayRef.current.classList.add("is--visible");
    };

    // Wait for the main content transition to finish, then delay the overlay reveal.
    const scheduleRevealAfterMainAnimation = () => {
      if (hasScheduledRevealRef.current) {
        return;
      }

      hasScheduledRevealRef.current = true;

      if (fallbackTimeoutId) {
        window.clearTimeout(fallbackTimeoutId);
        fallbackTimeoutId = undefined;
      }

      const appMain = document.querySelector(".app-main");

      const startVisibilityDelay = () => {
        if (visibilityTimeoutId) {
          return;
        }

        visibilityTimeoutId = window.setTimeout(revealOverlay, 300);
      };

      if (!appMain) {
        startVisibilityDelay();
        return;
      }

      const handleTransitionEnd = (event) => {
        if (event.target !== appMain || event.propertyName !== "transform") {
          return;
        }

        cleanupTransitionListener();
        startVisibilityDelay();
      };

      cleanupTransitionListener = () => {
        appMain.removeEventListener("transitionend", handleTransitionEnd);
        if (transitionTimeoutId) {
          window.clearTimeout(transitionTimeoutId);
          transitionTimeoutId = undefined;
        }
      };

      appMain.addEventListener("transitionend", handleTransitionEnd);

      const computedStyle = window.getComputedStyle(appMain);
      const properties = computedStyle.transitionProperty.split(",").map((value) => value.trim());
      const delays = computedStyle.transitionDelay.split(",").map((value) => parseFloat(value) * 1000);
      const durations = computedStyle.transitionDuration.split(",").map((value) => parseFloat(value) * 1000);

      const index = properties.findIndex((property) => property === "transform" || property === "all");
      const fallbackDuration = index !== -1 ? (delays[index] || 0) + (durations[index] || 0) : 1500;

      transitionTimeoutId = window.setTimeout(() => {
        cleanupTransitionListener();
        startVisibilityDelay();
      }, Math.max(fallbackDuration + 200, 1600));
    };

    const handleCoverComplete = () => {
      scheduleRevealAfterMainAnimation();
    };

    if (!document.body.classList.contains("cover--is--visible")) {
      scheduleRevealAfterMainAnimation();
    } else {
      window.addEventListener("cover:complete", handleCoverComplete);
      fallbackTimeoutId = window.setTimeout(scheduleRevealAfterMainAnimation, 6000);
    }

    return () => {
      window.removeEventListener("cover:complete", handleCoverComplete);
      cleanupTransitionListener();
      if (visibilityTimeoutId) {
        window.clearTimeout(visibilityTimeoutId);
      }
      if (fallbackTimeoutId) {
        window.clearTimeout(fallbackTimeoutId);
      }
    };
  }, []);

  return (
    <div ref={overlayRef} className="app-grid-overlay">
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="column">
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default GridOverlay;