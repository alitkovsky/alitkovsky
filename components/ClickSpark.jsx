"use client";

import { useRef, useEffect, useCallback, useState } from "react";

/**
 * ClickSpark - Creates spark effects on click.
 *
 * PERFORMANCE OPTIMIZED:
 * - RAF loop only runs when sparks exist (0 CPU when idle)
 * - Automatically starts/stops animation based on spark count
 */
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
  const sparksRef = useRef([]);
  const animationIdRef = useRef(null);
  const isRunningRef = useRef(false);
  const [resolvedColor, setResolvedColor] = useState(sparkColor);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeTimeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const adjustedWidth = Math.round(width * dpr);
      const adjustedHeight = Math.round(height * dpr);

      if (canvas.width !== adjustedWidth || canvas.height !== adjustedHeight) {
        canvas.width = adjustedWidth;
        canvas.height = adjustedHeight;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(handleResize);
      ro.observe(parent);
    } else {
      window.addEventListener("resize", handleResize);
    }

    resizeCanvas();

    return () => {
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
      clearTimeout(resizeTimeout);
    };
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

  // Memoize draw configuration to avoid recreating in RAF
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

  // Animation loop - only runs when sparks exist
  const startAnimationLoop = useCallback(() => {
    if (isRunningRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isRunningRef.current = true;

    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";

    const draw = (timestamp) => {
      const config = drawConfigRef.current;

      // Clear canvas
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

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

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = config.resolvedColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      // OPTIMIZATION: Stop loop when no sparks remain
      if (sparksRef.current.length === 0) {
        isRunningRef.current = false;
        animationIdRef.current = null;
        return;
      }

      // Continue animation
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now
    }));

    sparksRef.current.push(...newSparks);

    // OPTIMIZATION: Start animation loop only when sparks are added
    startAnimationLoop();
  }, [sparkCount, startAnimationLoop]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
      onClick={handleClick}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 10
        }} />
      {children}
    </div>
  );
}
