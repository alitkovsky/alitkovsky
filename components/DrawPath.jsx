'use client';

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * DrawPath - Recreates scroll-based SVG stroke animation
 * Uses IntersectionObserver + CSS transitions (matches source implementation)
 * No GSAP required - uses native browser APIs for performance
 */
export default function DrawPath({
  className,
  style,
  pathData,
  viewBox = "0 0 1440 362",
  strokeWidth = 40,
  stroke = "currentColor",
  animationDuration = 700, // ms
  trigger = "visible",
  rootMargin = "0px 0px -33% 0px",
  threshold = 0,
  width = "100%",
  height = "auto",
}) {
  const wrapperRef = useRef(null);
  const pathRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const lengthRef = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const path = pathRef.current;

    if (!path || !wrapper) return;

    // Calculate path length with responsive scaling (matches source implementation)
    const updatePathLength = () => {
      const rect = path.getBoundingClientRect();
      const box = path.getBBox();

      const hasDimensions = box.width !== 0 && box.height !== 0;
      const widthScale = hasDimensions ? rect.width / box.width : 1;
      const heightScale = hasDimensions ? rect.height / box.height : 1;
      const scale = (widthScale + heightScale) / 2;

      // Add 20% buffer to ensure full visibility (source implementation detail)
      const length = path.getTotalLength() * scale * 1.2;
      lengthRef.current = length;

      // Calculate steps for smooth animation (source uses ~14 steps for 700ms)
      const steps = Math.max(1, Math.round((20 * animationDuration) / 1000));

      // Set CSS transition with steps function
      path.style.transition = `stroke-dashoffset ${animationDuration}ms steps(${steps}), stroke-dasharray ${animationDuration}ms steps(${steps})`;

      // Initialize stroke properties
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = isAnimating ? "0" : `${length}`;

      return length;
    };

    // Initial calculation after a brief delay to ensure SVG is rendered
    const timeoutId = setTimeout(() => {
      updatePathLength();
    }, 50);

    // Set up ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(() => {
      updatePathLength();
    });
    resizeObserver.observe(wrapper);

    // Set up IntersectionObserver for scroll-based animation
    let observer;
    if (trigger === "visible") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
              // Animate in: reveal the path
              setIsAnimating(true);
              path.style.opacity = "1";
              path.style.strokeDashoffset = "0";
            } else if (!entry.isIntersecting) {
              // Animate out: hide the path
              setIsAnimating(false);
              path.style.opacity = "0";
              path.style.strokeDashoffset = `${lengthRef.current}`;
            }
          });
        },
        {
          root: null,
          rootMargin,
          threshold,
        }
      );
      observer.observe(wrapper);
    } else if (trigger === "always") {
      // Always show the path
      setIsAnimating(true);
      path.style.opacity = "1";
      path.style.strokeDashoffset = "0";
    }

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      if (observer) observer.disconnect();
    };
  }, [animationDuration, trigger, rootMargin, threshold, isAnimating]);

  // Default path if none provided (your existing bridge path)
  const defaultPath = "M-18.71 5c-13.946 63.747 87.162 120.514 206.635 115.163 94.068-4.213 234.063-38.055 299.378-54.44C939.856-47.813 622.333 217.95 673.484 297.908c37.655 58.861 225.928-110.975 381.896-110.975 56.25 0 206.21 27.386 293.1 98.412 72.29 59.093 134.66 63.049 158.52 51.416";

  return (
    <div
      ref={wrapperRef}
      className={cn("draw-path", className)}
      style={{
        position: "relative",
        width: "100%",
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{
          width,
          height,
          display: "block",
        }}
        fill="none"
      >
        <path
          ref={pathRef}
          d={pathData || defaultPath}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeMiterlimit="10"
          style={{
            opacity: 0,
            fill: "none",
          }}
        />
      </svg>
    </div>
  );
}
