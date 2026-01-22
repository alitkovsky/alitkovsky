"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useLanguage from "@/hooks/useLanguage";
import { useLiveRegion } from "@/components/LiveRegion";

import TextEffect from "@/components/TextEffect";

const INTRO_COPY = {
  de: {
    sectionTitle: "diagnose & lösungen",
    options: {
      general: "start hier",
      "control-center": "leads gehen verloren?",
      "intelligence-hub": "daten-blindflug?",
      "growth-engine": "marketing-hamsterrad?",
    },
    cta: {
      label: "lass uns quatschen",
    },
    scroll: ["muss ich dich wirklich", "ans scrollen erinnern?"],
    texts: {
      general: [
        "tach! ich bin andrii. ich baue nicht nur kampagnen, ich installiere systeme. marketing-systeme, die dir den rücken freihalten und messbar mehr gewinn bringen. kein 'hoffen und bangen', sondern infrastruktur.",
      ],
      "control-center": [
        "anfragen kommen rein, aber keiner fasst nach? oder erst nach stunden? im 'control center' automatisiere ich deinen vertrieb. jede anfrage wird in sekunden qualifiziert und an dein team gemeldet. ergebnis: du schließt mehr kunden ab, ohne mehr budget.",
      ],
      "intelligence-hub": [
        "du gibst geld für werbung aus, weißt aber nicht, was wirklich umsatz bringt? der 'intelligence hub' verbindet deine werbekonten mit deinem bankkonto. ich tracke echten gewinn, nicht nur bunte klicks. datenschutzkonform und präzise.",
      ],
      "growth-engine": [
        "du postest manuell, kopierst daten in excel und verschickst newsletter per hand? die 'growth engine' automatisiert diese routine. bewertungen sammeln, kunden binden, inhalte verteilen — das system macht die arbeit, du machst die strategie.",
      ],
    },
  },
  en: {
    sectionTitle: "diagnosis & solutions",
    options: {
      general: "start here",
      "control-center": "losing leads?",
      "intelligence-hub": "flying blind?",
      "growth-engine": "manual grunt work?",
    },
    cta: {
      label: "let's chat",
    },
    scroll: ["do i really need to", "remind you to scroll?"],
    texts: {
      general: [
        "hey! i'm andrii. i don't just run ads; i build automated growth infrastructures. systems that operate 24/7 without you. stop relying on luck—start building assets.",
      ],
      "control-center": [
        "leads are coming in, but nobody follows up fast enough? in the 'control center', i automate your entire sales loop. speed-to-lead under 2 minutes. result: higher close rates without hiring more sales reps.",
      ],
      "intelligence-hub": [
        "spending on ads but unknown roi? the 'intelligence hub' connects your ad spend to actual revenue (offline conversions). i track profit, not just vanity metrics. server-side accuracy that keeps algorithms fed with high-quality data.",
      ],
      "growth-engine": [
        "drowning in manual tasks? copy-pasting data, chasing reviews, sending emails manually? the 'growth engine' puts your operations on autopilot. inventory syncs, review management, retention flows—the system does the work, you focus on growth.",
      ],
    },
  },
};

const OPTION_KEYS = [
  "general",
  "control-center",
  "intelligence-hub",
  "growth-engine",
];

export default function Intro() {
  const { language } = useLanguage();
  const { announce } = useLiveRegion();

  const copy = INTRO_COPY[language] ?? INTRO_COPY.en;
  const fallbackCopy = INTRO_COPY.en;
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
          aria-label={language === "de" ? "Problem auswählen" : "Select problem"}
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
