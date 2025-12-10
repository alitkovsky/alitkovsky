import { useRef, useEffect, useCallback, useState } from "react";

export default function ClickSpark ({
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
  const startTimeRef = useRef(null);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";

    let animationId;

    const draw = timestamp => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = resolvedColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [resolvedColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

  const handleClick = e => {
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
  };

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
};