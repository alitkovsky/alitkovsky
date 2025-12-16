"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useLanguage from "@/hooks/useLanguage";

import TextEffect from "@/components/TextEffect";
import HandwritingEffect from "@/components/HandwritingEffect";
import BookCTA from "@/components/BookCTA";

// Add new copy for each language here; keep keys in sync across locales.
const INTRO_COPY = {
  de: {
    options: {
      anyone: "für alle",
      praxen: "arztpraxen",
      handwerker: "handwerker",
      dienstleister: "dienstleister",
      agenturen: "agenturen",
    },
    cta: {
      label: "kostenloses erstgespräch buchen",
    },
    scroll: ["muss ich dich wirklich daran", "erinnern weiter zu scrollen"],
    texts: {
      anyone: [
        "Hi! Ich bin Andrii — Online-Marketing-Berater aus OWL. Ich helfe lokalen Unternehmen, online sichtbar zu werden und planbar neue Kunden zu gewinnen.",
      ],
      praxen: [
        "Sie wollen mehr Privatpatienten oder Neupatienten gewinnen? Ich sorge dafür, dass Ihre Praxis bei Google gefunden wird — mit SEO, lokalen Anzeigen und einer Website, die Vertrauen schafft.",
      ],
      handwerker: [
        "Keine Zeit für Marketing? Ich übernehme das. Von Google-Anzeigen bis zur Webseite — Sie bekommen qualifizierte Anfragen, ich kümmere mich um den Rest.",
      ],
      dienstleister: [
        "Ob Steuerberater, Immobilienmakler oder Fitnessstudio — ich entwickle Marketing-Strategien, die zu Ihrem Budget passen und messbare Ergebnisse liefern.",
      ],
      agenturen: [
        "Kapazitätsengpass? Ich unterstütze als externer Spezialist bei Paid Social, Analytics und CRO — zuverlässig, erfahren, hands-on.",
      ],
    },
  },
  en: {
    options: {
      anyone: "for everyone",
      praxen: "medical practices",
      handwerker: "tradespeople",
      dienstleister: "service providers",
      agenturen: "agencies",
    },
    cta: {
      label: "book a free call",
    },
    scroll: ["do i really need to", "remind you to scroll"],
    texts: {
      anyone: [
        "Hi! I'm Andrii — an online marketing consultant based in OWL, Germany. I help local businesses become visible online and win new customers predictably.",
      ],
      praxen: [
        "Want to attract more private or new patients? I make sure your practice gets found on Google — with SEO, local ads, and a website that builds trust.",
      ],
      handwerker: [
        "No time for marketing? I've got you covered. From Google Ads to your website — you get qualified leads, I handle the rest.",
      ],
      dienstleister: [
        "Whether you're a tax advisor, real estate agent, or gym owner — I develop marketing strategies that fit your budget and deliver measurable results.",
      ],
      agenturen: [
        "Capacity bottleneck? I support as an external specialist for Paid Social, Analytics, and CRO — reliable, experienced, hands-on.",
      ],
    },
  },
};

const OPTION_KEYS = [
  "anyone",
  "praxen",
  "handwerker",
  "dienstleister",
  "agenturen",
];

export default function Intro() {
  const { language } = useLanguage();

  const copy = INTRO_COPY[language] ?? INTRO_COPY.en;
  const fallbackCopy = INTRO_COPY.en;
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label ?? "book a free call";
  const scrollLines = copy.scroll ?? fallbackCopy.scroll ?? [];

  const availableKeys = useMemo(() => (
    OPTION_KEYS.filter((key) => {
      const lines = copy.texts[key] ?? fallbackCopy.texts[key];
      return Array.isArray(lines) && lines.length > 0;
    })
  ), [copy, fallbackCopy]);

  const [activeKey, setActiveKey] = useState(() => availableKeys[0] ?? OPTION_KEYS[0]);

  // If the active key is not available in the current language, fall back to the first available
  useEffect(() => {
    if (!availableKeys.length) return;
    setActiveKey((prev) => (availableKeys.includes(prev) ? prev : availableKeys[0]));
  }, [availableKeys]);

  const optionsRef = useRef(null);
  const [maskVisibility, setMaskVisibility] = useState({ left: false, right: false });

  const updateMaskVisibility = useCallback((node) => {
    const element = node ?? optionsRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;
    const isAtStart = scrollLeft <= 1;
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;

    setMaskVisibility((prev) => {
      const next = { left: !isAtStart, right: !isAtEnd };
      if (prev.left === next.left && prev.right === next.right) return prev;
      return next;
    });
  }, []);

  const handleOptionsScroll = useCallback((event) => {
    updateMaskVisibility(event.currentTarget);
  }, [updateMaskVisibility]);

  useEffect(() => {
    const element = optionsRef.current;
    if (!element) return undefined;

    updateMaskVisibility(element);

    const handleResize = () => updateMaskVisibility(element);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateMaskVisibility]);

  // Re-evaluate mask visibility when language (and option widths) change
  useEffect(() => {
    updateMaskVisibility(optionsRef.current);
  }, [language, updateMaskVisibility]);

  const handleOptionSelect = useCallback((key) => {
    if (!availableKeys.includes(key)) return;
    setActiveKey((prev) => (prev === key ? prev : key));
  }, [availableKeys]);

  const handleOptionKeyDown = useCallback((event, key) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOptionSelect(key);
    }
  }, [handleOptionSelect]);

  return (
    <section className="section intro" id="intro">
      <div className="content">
        <div className={`gradient-mask left ${maskVisibility.left ? "is--visible" : ""}`}></div>
        <div className={`gradient-mask right ${maskVisibility.right ? "is--visible" : ""}`}></div>

        <div
          className="options"
          ref={optionsRef}
          onScroll={handleOptionsScroll}
        >
          {OPTION_KEYS.map((key, index) => {
            const label = copy.options[key] ?? fallbackCopy.options[key];
            const isActive = activeKey === key || (!activeKey && index === 0);

            return (
              <TextEffect
                as="div"
                variant="underlineAuto"
                trigger="hover"
                key={key}
                className={`option ${key} ${isActive ? "is--active" : ""}`}
                data-key={key}
                role="button"
                tabIndex={0}
                onClick={() => handleOptionSelect(key)}
                onKeyDown={(event) => handleOptionKeyDown(event, key)}
              >
                {label}
              </TextEffect>
            );
          })}
        </div>

        <div className="texts">
          {OPTION_KEYS.map((key, index) => {
            const lines = copy.texts[key] ?? fallbackCopy.texts[key];
            const isVisible = activeKey === key || (!activeKey && index === 0);

            return (
              <p
                key={key}
                className={`text ${key} ${isVisible ? "is--visible" : ""}`}
                data-key={key}
                aria-hidden={!isVisible}
              >
                {lines.map((line, lineIndex) => (
                  <span key={`${key}-${lineIndex}`}>
                    {line}
                    {lineIndex < lines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            );
          })}

          <div className="cta">
            <BookCTA label={ctaLabel} ctaLocation="intro" />
          </div>
        </div>



        <div className="scroll">
          <p>
            {scrollLines.map((line, index) => (
              <span key={`scroll-${index}`}>
                {line}
                {index < scrollLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
