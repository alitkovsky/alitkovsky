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

    ensureReady()
      .then((CalendlyApi) => {
        if (!CalendlyApi || !isMounted || !containerRef.current) {
          return;
        }

        containerRef.current.innerHTML = "";
        CalendlyApi.initInlineWidget({
          url: eventUrl,
          parentElement: containerRef.current,
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
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
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
