"use client";

import { useEffect, useRef, useState } from "react";

export default function LazySection({
  children,
  rootMargin = "200px 0px",
  threshold = 0,
  minHeight = "1px",
  fallback = null,
  className = "",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isVisible) return;
    if (typeof window === "undefined") return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setIsVisible(true);
          observer.disconnect();
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, rootMargin, threshold]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minHeight }}
      data-lazy-section={!isVisible}
    >
      {isVisible ? children : fallback}
    </div>
  );
}
