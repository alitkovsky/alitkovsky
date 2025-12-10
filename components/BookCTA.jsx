"use client";

import { useEffect, useId, useMemo, useState } from "react";
import TextEffect from "@/components/TextEffect";
import Magnet from "@/components/Magnet";
import useCalendly from "@/hooks/useCalendly";
import { cn } from "@/lib/utils";
import { trackCTAClick } from "@/lib/analytics";
import { canLoadTool } from "@/lib/consent";

const normalizeUrl = (value, fallback) => {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : fallback;
};

export default function BookCTA({
  label = "book a free call to find out more",
  url,
  prefill,
  className,
  ctaLocation,
  autoActive = true,
}) {
  const { openCalendly, isLoading, eventUrl, lastError } = useCalendly();
  const noteId = useId();
  const targetUrl = useMemo(
    () => normalizeUrl(url, eventUrl),
    [url, eventUrl],
  );
  const [hasConsent, setHasConsent] = useState(() => canLoadTool("calendly"));

  useEffect(() => {
    const syncConsent = () => setHasConsent(canLoadTool("calendly"));
    syncConsent();
    window.addEventListener("storage", syncConsent);
    return () => window.removeEventListener("storage", syncConsent);
  }, []);

  const consentBlocked = !hasConsent || Boolean(lastError && /consent/i.test(lastError.message));

  const handleClick = (event) => {
    // Let users open Calendly in a new tab with modifier keys
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button === 1) {
      return;
    }

    if (consentBlocked) {
      trackCTAClick("book_call", ctaLocation || "unspecified");
      return;
    }

    event.preventDefault();
    if (isLoading) {
      return;
    }

    trackCTAClick("book_call", ctaLocation || "unspecified");
    openCalendly({ url: targetUrl, prefill });
  };

  const displayLabel = isLoading ? "opening…" : label;

  return (
    <div
      className={cn("book-cta", className)}
      data-consent-blocked={consentBlocked ? "true" : undefined}
    >
      <Magnet
        wrapperClassName="book-cta__magnet"
        innerClassName="book-cta__magnet-inner"
        disabled={isLoading}
        magnetStrength={3}
        padding={72}
      >
        <TextEffect
          as="a"
          href={targetUrl}
          variant="ellipseAuto"
          trigger="hover"
          className="cta-link inline-flex"
          autoActive={autoActive}
          onClick={handleClick}
          aria-busy={isLoading}
          aria-disabled={isLoading}
          data-loading={isLoading ? "true" : undefined}
          aria-describedby={consentBlocked ? noteId : undefined}
        >
          <span>{displayLabel}</span>
          <i aria-hidden className="cta-icon" data-loading={isLoading ? "true" : undefined}>↗</i>
          <span className="sr-only" aria-live="polite">
            {isLoading ? "Opening Calendly booking widget" : ""}
          </span>
        </TextEffect>
      </Magnet>
      {consentBlocked ? (
        <p className="book-cta__note" role="tooltip" id={noteId}>
          Enable functional cookies to book inline, or{" "}
          <a href={targetUrl} target="_blank" rel="noopener noreferrer">
            open Calendly in a new tab
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
