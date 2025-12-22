"use client";

import { useRef, useEffect, useCallback, useState } from "react";

/**
 * ClickSpark - Creates spark effects on click.
 *
 * PERFORMANCE OPTIMIZED v2:
 * - Uses small movable canvas (~100x100px) instead of full-page canvas
 * - Canvas moves to click position, dramatically reducing clearRect cost
 * - RAF loop only runs when sparks exist (0 CPU when idle)
 */

// Small canvas size - just enough for the spark effect
const CANVAS_SIZE = 120;
const HALF_SIZE = CANVAS_SIZE / 2;

export default function ClickSpark({
  sparkColor = "var(--color--foreground--100)",
  sparkSize = 15,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.5,
  children
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const sparksRef = useRef([]);
  const animationIdRef = useRef(null);
  const isRunningRef = useRef(false);
  const [resolvedColor, setResolvedColor] = useState(sparkColor);
  const [canvasPos, setCanvasPos] = useState({ x: -CANVAS_SIZE, y: -CANVAS_SIZE, visible: false });

  const resolveColor = useCallback(() => {
    if (typeof sparkColor !== "string") {
      setResolvedColor(sparkColor);
      return;
    }

    const varMatch = sparkColor.match(/var\((--[\w-]+)\)/);
    if (!varMatch) {
      setResolvedColor(sparkColor);
      return;
    }

    const cssVarName = varMatch[1];
    const source = document.body || document.documentElement;
    const computed = getComputedStyle(source).getPropertyValue(cssVarName).trim();
    setResolvedColor(computed || sparkColor);
  }, [sparkColor]);

  useEffect(() => {
    resolveColor();

    if (typeof sparkColor !== "string" || !sparkColor.includes("var(")) {
      return;
    }

    const target = document.body;
    if (!target) return;

    const observer = new MutationObserver((mutations) => {
      const classChanged = mutations.some((mutation) => mutation.attributeName === "class");
      if (classChanged) {
        resolveColor();
      }
    });

    observer.observe(target, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, [resolveColor, sparkColor]);

  // Initialize small canvas once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
    }
  }, []);

  const easeFunc = useCallback(t => {
    switch (easing) {
      case "linear":
        return t;
      case "ease-in":
        return t * t;
      case "ease-in-out":
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default:
        return t * (2 - t);
    }
  }, [easing]);

  // Memoize draw configuration
  const drawConfigRef = useRef({
    resolvedColor,
    sparkSize,
    sparkRadius,
    extraScale,
    duration,
    easeFunc
  });

  useEffect(() => {
    drawConfigRef.current = {
      resolvedColor,
      sparkSize,
      sparkRadius,
      extraScale,
      duration,
      easeFunc
    };
  }, [resolvedColor, sparkSize, sparkRadius, extraScale, duration, easeFunc]);

  // Animation loop - runs on small canvas only
  const startAnimationLoop = useCallback(() => {
    if (isRunningRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isRunningRef.current = true;

    const dpr = window.devicePixelRatio || 1;

    const draw = (timestamp) => {
      const config = drawConfigRef.current;

      // Clear small canvas only (~100x100px vs full page)
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.strokeStyle = config.resolvedColor;
      ctx.lineWidth = 2;

      // Filter and draw remaining sparks
      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= config.duration) {
          return false;
        }

        const progress = elapsed / config.duration;
        const eased = config.easeFunc(progress);

        const distance = eased * config.sparkRadius * config.extraScale;
        const lineLength = config.sparkSize * (1 - eased);

        // Draw relative to canvas center (HALF_SIZE)
        const x1 = HALF_SIZE + distance * Math.cos(spark.angle);
        const y1 = HALF_SIZE + distance * Math.sin(spark.angle);
        const x2 = HALF_SIZE + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = HALF_SIZE + (distance + lineLength) * Math.sin(spark.angle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      // Stop loop when no sparks remain
      if (sparksRef.current.length === 0) {
        isRunningRef.current = false;
        animationIdRef.current = null;
        // Hide canvas when done
        setCanvasPos(prev => ({ ...prev, visible: false }));
        return;
      }

      animationIdRef.current = requestAnimationFrame(draw);
    };

    animationIdRef.current = requestAnimationFrame(draw);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
        isRunningRef.current = false;
      }
    };
  }, []);

  const handleClick = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Position small canvas centered on click
    setCanvasPos({
      x: clickX - HALF_SIZE,
      y: clickY - HALF_SIZE,
      visible: true
    });

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now
    }));

    sparksRef.current = newSparks;
    startAnimationLoop();
  }, [sparkCount, startAnimationLoop]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          position: "absolute",
          top: 0,
          left: 0,
          transform: `translate(${canvasPos.x}px, ${canvasPos.y}px)`,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: canvasPos.visible ? 1 : 0,
          willChange: "transform"
        }}
      />
      {children}
    </div>
  );
}
