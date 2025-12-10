"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useLanguage from "@/hooks/useLanguage";

import TextEffect from "@/components/TextEffect";
import HandwritingEffect from "@/components/HandwritingEffect";
import BookCTA from "@/components/BookCTA";

// Add new copy for each language here; keep keys in sync across locales.
const INTRO_COPY = {
  en: {
    options: {
      anyone: "for anyone",
      recruiters: "recruiters",
      "marketing-leads": "marketing leads",
      founders: "founders",
      "product-managers": "product managers",
      developers: "developers",
    },
    texts: {
      anyone: [
        "Hi! I’m a marketing strategist who crafts full-funnel campaigns that not only look good — but drive real growth.",
      ],
      recruiters: [
        "I bring 15+ years of experience across paid media, SEO, CRO, and analytics. Proven track record in both B2B and B2C, with 70%+ YoY booking growth in my latest role.",
      ],
      "marketing-leads": [
        "From zero to revenue - I'm your go-to for structuring strategy, scaling performance, and aligning campaigns with business goals. Expect numbers.",
      ],
      founders: [
        "Need traction? I help early-stage teams find clarity, build marketing engines, and scale sustainably - no fluff, just frameworks that work.",
      ],
      "product-managers": [
        "I bring cross-functional energy to any product table. Clear on GTM, strong on insights, fluent in the metrics that matter.",
      ],
      developers: [
        "I don’t touch code (anymore), but I’ll happily debug a GTM container, optimize site speed, or coordinate a clean SEO rollout with you.",
      ],
    },
  },
  de: {
    options: {
      anyone: "für alle",
      recruiters: "recruiter:innen",
      "marketing-leads": "marketing-leads",
      founders: "founder",
      "product-managers": "product manager",
      developers: "developers",
    },
    texts: {
      anyone: [
        "Hi! Ich bin ein Marketingstratege, der ganzheitliche Kampagnen entwickelt, die nicht nur gut aussehen, sondern echtes Wachstum liefern.",
      ],
      recruiters: [
        "Ich bringe über 15 Jahre Erfahrung in Paid Media, SEO, CRO und Analytics mit. Erfolgsbilanz in B2B und B2C, zuletzt über 70 % Buchungswachstum im Jahresvergleich.",
      ],
      "marketing-leads": [
        "Von null auf Umsatz - ich strukturiere Strategie, skaliere Performance und richte Kampagnen auf Geschäftsziele aus. Zahlen geliefert.",
      ],
      founders: [
        "Braucht ihr Traction? Ich helfe Early-Stage-Teams, Klarheit zu gewinnen, Marketing-Maschinen aufzubauen und nachhaltig zu skalieren - kein Blabla, nur funktionierende Frameworks.",
      ],
      "product-managers": [
        "Ich bringe cross-funktionale Energie in jedes Produktteam. Klar in GTM, stark in Insights, sicher in den relevanten Kennzahlen.",
      ],
      developers: [
        "Ich fasse keinen Code mehr an, aber ich debugge gern einen GTM-Container, optimiere die Site-Speed oder koordiniere mit euch einen sauberen SEO-Rollout.",
      ],
    },
  },
};

const OPTION_KEYS = [
  "anyone",
  "recruiters",
  "marketing-leads",
  "founders",
  "product-managers",
  "developers",
];

export default function Intro() {
  const { language } = useLanguage();

  const copy = INTRO_COPY[language] ?? INTRO_COPY.en;
  const fallbackCopy = INTRO_COPY.en;

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

        {/* <div className="intro-cta">
          <BookCTA
            size="lg"
            label="Kostenloses 20-minütiges Erstgespräch buchen"
            subline="Ich antworte innerhalb von 24h – Slots montags bis freitags"
            fullWidth
          />
        </div> */}

        <div className="scroll">
          {/* <TextEffect
            as="div"
            variant="question"
            trigger="visible"
            visibilityRootMargin="0px 0px -3%"
            className="inline-block"
          ></TextEffect> */}
          {/* <HandwritingEffect
            as="span"
            trigger="visible"
            visibilityRootMargin="0px 0px 0%"
            duration={2000}
            className="inline-block"
            letterSpacing={0}
            fontSize={22}
          >
            do i really need to remind you to scroll
          </HandwritingEffect> */}
          <p>do i really need to <br />remind you to scroll</p>
        </div>
      </div>
    </section>
  );
}
