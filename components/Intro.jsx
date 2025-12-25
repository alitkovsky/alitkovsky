"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useLanguage from "@/hooks/useLanguage";

import TextEffect from "@/components/TextEffect";
import HandwritingEffect from "@/components/HandwritingEffect";
import BookCTA from "@/components/BookCTA";

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
      label: "lass uns quatschen",
    },
    scroll: ["muss ich dich wirklich", "ans scrollen erinnern?"],
    texts: {
      anyone: [
        "tach! ich bin andrii — dein marketing-berater aus owl. ich helfe dir, online sichtbar zu werden und planbar neue kunden zu gewinnen.",
      ],
      praxen: [
        "du willst mehr privatpatienten oder neupatienten gewinnen? ich sorge dafür, dass deine praxis bei google gefunden wird — mit seo, lokalen anzeigen und einer website, die vertrauen schafft.",
      ],
      handwerker: [
        "keine zeit für marketing? ich übernehm das. von google-anzeigen bis zur webseite — du bekommst qualifizierte anfragen, ich kümmere mich um den rest.",
      ],
      dienstleister: [
        "ob steuerberater, immobilienmakler oder fitnessstudio — ich entwickle marketing-strategien, die zu deinem budget passen und messbare ergebnisse liefern.",
      ],
      agenturen: [
        "kapazitätsengpass? ich spring ein als externer spezialist für paid social, analytics und cro — zuverlässig, erfahren, hands-on.",
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
      label: "let's chat",
    },
    scroll: ["do i really need to", "remind you to scroll?"],
    texts: {
      anyone: [
        "hey! i'm andrii — your marketing consultant from owl, germany. i help you get visible online and win new customers predictably.",
      ],
      praxen: [
        "want more private or new patients? i'll make sure your practice gets found on google — with seo, local ads, and a website that builds trust.",
      ],
      handwerker: [
        "no time for marketing? i've got you. from google ads to your website — you get qualified leads, i handle the rest.",
      ],
      dienstleister: [
        "whether you're a tax advisor, real estate agent, or gym owner — i develop marketing strategies that fit your budget and deliver real results.",
      ],
      agenturen: [
        "capacity crunch? i step in as an external specialist for paid social, analytics, and cro — reliable, experienced, hands-on.",
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
