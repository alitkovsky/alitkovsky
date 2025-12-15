"use client";

import { useEffect, useRef } from "react";

const GridOverlay = () => {
  const overlayRef = useRef(null);
  const hasActivatedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    if (!overlayRef.current) {
      return undefined;
    }

    let timeoutId;

    const revealOverlay = () => {
      if (hasActivatedRef.current || !overlayRef.current) {
        return;
      }

      hasActivatedRef.current = true;
      overlayRef.current.classList.add("is--visible");
    };

    // If cover is not visible, reveal immediately with small delay
    if (!document.body.classList.contains("cover--is--visible")) {
      timeoutId = window.setTimeout(revealOverlay, 300);
    } else {
      // Wait for cover transition to complete (1750ms cover hide + 1500ms transition + buffer)
      timeoutId = window.setTimeout(revealOverlay, 3550);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
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
