"use client";

import { useMemo } from "react";
import Link from "next/link";
import TextEffect from "@/components/TextEffect";
import Magnet from "@/components/Magnet";
import useLanguage from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { trackCTAClick } from "@/lib/analytics";

const COPY = {
  en: {
    defaultLabel: "back to homepage",
  },
  de: {
    defaultLabel: "zurück zur startseite",
  },
};

export default function BackToStart({
  label,
  url = "/",
  className,
  ctaLocation,
  autoActive = true,
}) {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.en;

  const handleClick = () => {
    trackCTAClick("navigate_home", ctaLocation || "unspecified");
  };

  const resolvedLabel = useMemo(() => {
    if (typeof label === "string" && label.trim()) {
      return label;
    }

    if (label && typeof label === "object") {
      const candidate = label[language] ?? label.en ?? label.de;
      if (typeof candidate === "string" && candidate.trim()) {
        return candidate;
      }
    }

    return copy.defaultLabel;
  }, [copy.defaultLabel, label, language]);

  return (
    <div className={cn("book-cta", className)}>
      <Magnet
        wrapperClassName="book-cta__magnet"
        innerClassName="book-cta__magnet-inner"
        magnetStrength={3}
        padding={72}
      >
        <TextEffect
          as={Link}
          href={url}
          variant="ellipseAuto"
          trigger="hover"
          className="cta-link inline-flex"
          autoActive={autoActive}
          onClick={handleClick}
        >
          <i aria-hidden className="cta-icon rotate-225">↗</i>
          <span>{resolvedLabel}</span>
        </TextEffect>
      </Magnet>
    </div>
  );
}
