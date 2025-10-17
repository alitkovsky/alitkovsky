"use client";

import useIntroSwitcher from "@/hooks/useIntroSwitcher";
import useLanguage from "@/hooks/useLanguage";

import ShinyText from "@/components/ShinyText";
import TextEffect from "@/components/TextEffect";

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
  useIntroSwitcher();
  const { language } = useLanguage();

  const copy = INTRO_COPY[language] ?? INTRO_COPY.en;
  const fallbackCopy = INTRO_COPY.en;

  return (
    <section className="section intro" id="intro">
      <div className="content">
        <div className="gradient-mask left"></div>
        <div className="gradient-mask right is--visible"></div>

        <div className="options">
          {OPTION_KEYS.map((key, index) => {
            const label = copy.options[key] ?? fallbackCopy.options[key];
            return (
              <TextEffect
                as="div"
                variant="underlineAuto"
                trigger="hover"
                key={key}
                className={`option ${key} ${index === 0 ? "is--active" : ""}`}
              >
                {label}
              </TextEffect>
            );
          })}
        </div>

        <div className="texts">
          {OPTION_KEYS.map((key, index) => {
            const lines = copy.texts[key] ?? fallbackCopy.texts[key];
            return (
              <h1
                key={key}
                className={`text ${key} ${index === 0 ? "is--visible" : ""}`}
              >
                {lines.map((line, lineIndex) => (
                  <span key={`${key}-${lineIndex}`}>
                    {line}
                    {lineIndex < lines.length - 1 && <br />}
                  </span>
                ))}
              </h1>
            );
          })}
        </div>

        <div className="scroll">
          <TextEffect
            as="div"
            variant="question"
            trigger="visible"
            visibilityRootMargin="0px 0px -3%"
            className="inline-block"
          ></TextEffect>
          <p>do i really need to <br />remind you to scroll</p>
        </div>
      </div>
    </section>
  );
}
