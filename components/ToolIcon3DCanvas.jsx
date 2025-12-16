"use client";

import { useEffect, useRef, useState, memo } from "react";
import { useReducedMotion } from "framer-motion";
import ToolIconScene from "@/lib/three/ToolIconScene";
import Image from "next/image";

/**
 * Three.js-powered Tool icon renderer using direct SVG loading.
 * Falls back to flat SVG if WebGL fails or when reduced motion is preferred.
 *
 * PERFORMANCE OPTIMIZED:
 * - Pauses Three.js rendering when off-screen (0 GPU when not visible)
 * - Resumes rendering when scrolled back into view
 */
function ToolIcon3DCanvas({
  svgSrc, // SVG file path (e.g., "/assets/svg/icon.svg")
  color = "#131313",
  thickness = 1.5,
  mode = "contain",
  className = "",
  lookAtMouse = false,
  disableBelow = 768,
  inlineFallback = true,
  pullApart = 0.4,
  onReady,
  onError,
  trigger = "hover",
  visibilityRootMargin = "0px 0px -33%",
  visibilityThreshold = 0,
  isActive = false,
  onStateChange,
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/tablet viewport
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${disableBelow}px)`);
    const handle = () => setIsMobile(mq.matches);
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, [disableBelow]);

  // Sync status upstream
  useEffect(() => {
    onStateChange?.({
      ready,
      failed,
      isMobile,
      prefersReducedMotion,
    });
  }, [ready, failed, isMobile, prefersReducedMotion, onStateChange]);

  // Initialize Three.js scene with SVG loading
  useEffect(() => {
    let cancelled = false;

    if (prefersReducedMotion || !svgSrc || isMobile) {
      setFailed(true);
      onError?.();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const scene = new ToolIconScene(container, {
      svgPath: svgSrc,  // Pass SVG path directly
      color,
      thickness,
      mode,
      pullApart
    });
    sceneRef.current = scene;

    scene
      .loadFromSVG()  // Load SVG directly
      .then(() => {
        if (cancelled) return;
        setReady(true);
        onReady?.();
        if (trigger !== "visible") {
          scene.animateIn();
        }
      })
      .catch((err) => {
        console.error('SVG load error:', err);
        if (cancelled) return;
        setFailed(true);
        scene.dispose();
        onError?.();
      });

    return () => {
      cancelled = true;
      scene.dispose();
      sceneRef.current = null;
    };
  }, [svgSrc, color, thickness, mode, prefersReducedMotion, isMobile, pullApart, trigger, onReady, onError]);

  // OPTIMIZATION: Visibility observer for pause/resume rendering
  // This significantly reduces GPU usage when icons are off-screen
  useEffect(() => {
    if (!ready) return undefined;
    const el = containerRef.current;
    if (!el) return undefined;

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.target !== el) return;

        if (entry.isIntersecting) {
          // Resume rendering when visible
          sceneRef.current?.resumeRendering();

          // Handle trigger="visible" animation
          if (trigger === "visible" && entry.intersectionRatio > visibilityThreshold) {
            sceneRef.current?.animateIn();
          }
        } else {
          // Pause rendering when off-screen (OPTIMIZATION)
          sceneRef.current?.pauseRendering();

          if (trigger === "visible") {
            sceneRef.current?.stopRotate();
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: visibilityRootMargin,
      threshold: visibilityThreshold,
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [trigger, ready, visibilityRootMargin, visibilityThreshold]);

  // Handle rotation based on isActive prop (when trigger is "visible")
  useEffect(() => {
    if (!ready) return;

    if (isActive) {
      sceneRef.current?.startRotate();
    } else {
      sceneRef.current?.stopRotate();
    }
  }, [isActive, ready]);

  // Mouse interaction handlers (only for trigger="hover")
  const handleEnter = () => {
    sceneRef.current?.startRotate();
  };
  const handleLeave = () => {
    sceneRef.current?.stopRotate();
  };
  const handleMove = (e) => {
    if (!lookAtMouse) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    sceneRef.current?.lookAtMouse(nx, ny);
  };

  const showFallback = inlineFallback && (failed || !ready);

  return (
    <div
      className={`tool-icon-3d-canvas ${className}`}
      ref={containerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      role="presentation"
      aria-hidden="true"
    >
      {showFallback && svgSrc ? (
        <Image
          src={svgSrc}
          alt="Tool icon"
          width={150}
          height={60}
          className="tool-icon-3d-canvas__fallback"
          draggable={false}
        />
      ) : null}
    </div>
  );
}

export default memo(ToolIcon3DCanvas);
