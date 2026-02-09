"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import useCalendly from "@/hooks/useCalendly";

export default function CalendlyInline({
  className,
  height = 680,
  prefill,
  utm,
}) {
  const { ensureReady, eventUrl } = useCalendly();
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const container = containerRef.current;

    ensureReady()
      .then((CalendlyApi) => {
        if (!CalendlyApi || !isMounted || !container) {
          return;
        }

        container.innerHTML = "";
        CalendlyApi.initInlineWidget({
          url: eventUrl,
          parentElement: container,
          prefill,
          utm,
        });
        setIsLoading(false);
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [ensureReady, eventUrl, prefill, utm]);

  return (
    <div
      className={cn("calendly-inline-shell", { "is-loading": isLoading }, className)}
      style={{ minHeight: height }}
    >
      <div ref={containerRef} className="calendly-inline-widget-container" />
    </div>
  );
}
