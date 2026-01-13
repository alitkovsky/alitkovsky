"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useLanguage from "@/hooks/useLanguage";
import { useLiveRegion } from "@/components/LiveRegion";

import TextEffect from "@/components/TextEffect";
import HandwritingEffect from "@/components/HandwritingEffect";
import BookCTA from "@/components/BookCTA";

const INTRO_COPY = {
  de: {
    sectionTitle: "vorstellung & zielgruppen",
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
        "tach! ich bin andrii — online-marketing-berater aus minden-lübbecke. ich helfe lokalen unternehmen in owl, online gefunden zu werden und planbar neue kunden zu gewinnen. als ergebnis: +35% mehr anfragen.",
      ],
      praxen: [
        "du willst mehr privatpatienten oder neupatienten gewinnen? ich sorge dafür, dass deine praxis bei google ganz oben steht — mit local seo, google ads und einer website, die vertrauen schafft. als ergebnis: +40% mehr terminanfragen.",
      ],
      handwerker: [
        "keine zeit für marketing? ich übernehm das. von google-anzeigen bis zur webseite — du wirst von neuen kunden gefunden, statt selbst zu suchen. als ergebnis: +30% mehr qualifizierte anfragen pro monat.",
      ],
      dienstleister: [
        "ob steuerberater, makler oder fitnessstudio — ich entwickle marketing-strategien, die zu deinem budget passen. seo, google ads, social media — alles aus einer hand. als ergebnis: +25% mehr leads bei weniger werbekosten.",
      ],
      agenturen: [
        "kapazitätsengpass? ich spring ein als externer spezialist für paid social, analytics und cro. zuverlässig, erfahren, hands-on — ohne lange einarbeitung.",
      ],
    },
  },
  en: {
    sectionTitle: "introduction & target groups",
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
        "hey! i'm andrii — online marketing consultant from minden-lübbecke. i help local businesses in owl get found online and win new customers predictably. as a result: +35% more inquiries.",
      ],
      praxen: [
        "want more private or new patients? i'll make sure your practice ranks at the top of google — with local seo, google ads, and a website that builds trust. as a result: +40% more appointment requests.",
      ],
      handwerker: [
        "no time for marketing? i've got you. from google ads to your website — you get found by new customers instead of chasing them. as a result: +30% more qualified inquiries per month.",
      ],
      dienstleister: [
        "whether you're a tax advisor, agent, or gym owner — i develop marketing strategies that fit your budget. seo, google ads, social media — all from one source. as a result: +25% more leads at lower ad costs.",
      ],
      agenturen: [
        "capacity crunch? i step in as an external specialist for paid social, analytics, and cro. reliable, experienced, hands-on — no long onboarding needed.",
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
  const { announce } = useLiveRegion();

  const copy = INTRO_COPY[language] ?? INTRO_COPY.en;
  const fallbackCopy = INTRO_COPY.en;
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label ?? "book a free call";
  const sectionTitle = copy.sectionTitle ?? fallbackCopy.sectionTitle ?? "introduction";
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
  const optionRefs = useRef({});
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
    setActiveKey((prev) => {
      if (prev === key) return prev;
      // Announce the content change to screen readers
      const lines = copy.texts[key] ?? fallbackCopy.texts[key];
      if (lines?.length) {
        announce(lines.join(" "), { priority: "polite" });
      }
      return key;
    });
  }, [availableKeys, copy.texts, fallbackCopy.texts, announce]);

  // Arrow key navigation for radiogroup
  const handleOptionKeyDown = useCallback((event, key, index) => {
    const keys = availableKeys;
    let newIndex = index;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        newIndex = (index + 1) % keys.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        newIndex = (index - 1 + keys.length) % keys.length;
        break;
      case "Home":
        event.preventDefault();
        newIndex = 0;
        break;
      case "End":
        event.preventDefault();
        newIndex = keys.length - 1;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        handleOptionSelect(key);
        return;
      default:
        return;
    }

    const newKey = keys[newIndex];
    handleOptionSelect(newKey);
    // Focus the new option
    optionRefs.current[newKey]?.focus();
  }, [availableKeys, handleOptionSelect]);

  return (
    <section className="section intro" id="intro">
      <h2 className="sr-only">{sectionTitle}</h2>
      <div className="content">
        <div className={`gradient-mask left ${maskVisibility.left ? "is--visible" : ""}`}></div>
        <div className={`gradient-mask right ${maskVisibility.right ? "is--visible" : ""}`}></div>

        <div
          className="options"
          ref={optionsRef}
          onScroll={handleOptionsScroll}
          role="radiogroup"
          aria-label={language === "de" ? "Zielgruppe auswählen" : "Select audience"}
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
                ref={(el) => { optionRefs.current[key] = el; }}
                className={`option ${key} ${isActive ? "is--active" : ""}`}
                data-key={key}
                role="radio"
                aria-checked={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleOptionSelect(key)}
                onKeyDown={(event) => handleOptionKeyDown(event, key, index)}
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
