"use client";

import { useEffect, useRef, useState, memo } from "react";
import { useReducedMotion } from "framer-motion";
import ToolIconScene from "@/lib/three/ToolIconScene";
import Image from "next/image";

/**
 * Three.js-powered Tool icon renderer using direct SVG loading.
 * Falls back to flat SVG if WebGL fails or when reduced motion is preferred.
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
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hasAnimatedRef = useRef(false); // Track if draw animation has played

  // Detect mobile/tablet viewport
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${disableBelow}px)`);
    const handle = () => setIsMobile(mq.matches);
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, [disableBelow]);

  // Initialize Three.js scene with SVG loading
  useEffect(() => {
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
        // Immediately animate in to make the icon visible
        scene.animateIn();
        hasAnimatedRef.current = true;
        setReady(true);
        onReady?.();
      })
      .catch((err) => {
        console.error('SVG load error:', err);
        setFailed(true);
        scene.dispose();
        onError?.();
      });

    return () => {
      scene.dispose();
      sceneRef.current = null;
      hasAnimatedRef.current = false;
    };
  }, [svgSrc, color, thickness, mode, prefersReducedMotion, isMobile, pullApart, trigger, onReady, onError]);

  // Visibility observer for animate in/out (only when trigger is "visible")
  useEffect(() => {
    if (trigger !== "visible" || !ready) return undefined;
    const el = containerRef.current;
    if (!el) return undefined;

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.target !== el) return;

        // Only animate in once when it first becomes visible
        if (entry.isIntersecting && entry.intersectionRatio > visibilityThreshold) {
          if (!hasAnimatedRef.current) {
            sceneRef.current?.animateIn();
            hasAnimatedRef.current = true;
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
    if (trigger !== "visible" || !ready) return;

    if (isActive) {
      sceneRef.current?.startRotate();
    } else {
      sceneRef.current?.stopRotate();
    }
  }, [isActive, trigger, ready]);

  // Mouse interaction handlers (only for trigger="hover")
  const handleEnter = () => {
    if (trigger === "hover") {
      sceneRef.current?.startRotate();
    }
  };
  const handleLeave = () => {
    if (trigger === "hover") {
      sceneRef.current?.stopRotate();
    }
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
