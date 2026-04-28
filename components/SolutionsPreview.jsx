"use client";

import { useState } from "react";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import BookCTA from "@/components/BookCTA";
import TextEffect from "@/components/TextEffect";
import useLanguage from "@/hooks/useLanguage";
import { getAllSystems } from "@/data/solutions";
import { localizePath } from "@/lib/localeRouting";

const SOLUTIONS_PREVIEW_COPY = {
  de: {
    sectionTitle: "super-workflow solutions",
    sectionSubtitle: "production-ready automation systems für sales, retention, content und intelligence",
    viewAll: "alle solutions",
    viewSolution: "solution ansehen",
    modulesLabel: "module",
  },
  en: {
    sectionTitle: "super-workflow solutions",
    sectionSubtitle: "production-ready automation systems for sales, retention, content and intelligence",
    viewAll: "all solutions",
    viewSolution: "view solution",
    modulesLabel: "modules",
  },
};

const SOLUTIONS_PREVIEW_EFFECT_STYLE_PRESETS = Object.freeze({
  viewAllArrow: Object.freeze({
    top: "0.7ch",
    left: "-8.25ch",
  }),
});

const SOLUTIONS_PREVIEW_ACCENTS = Object.freeze({
  "control-center": "var(--color--foreground--20)",
  "intelligence-hub": "var(--color--foreground--20)",
  "growth-engine": "var(--color--foreground--20)",
});

function SolutionDisclosure({
  solution,
  index,
  isActive,
  onActivate,
  labels,
  language,
  viewSolution,
  activeSolutionIndex,
}) {
  const solutionHref = localizePath(`/solutions/${solution.slug}`, language);
  const tabNumber = String(index + 1).padStart(2, "0");
  const tabId = `solutions-preview-tab-${solution.slug}`;
  const panelId = `solutions-preview-panel-${solution.slug}`;
  const accent = SOLUTIONS_PREVIEW_ACCENTS[solution.slug] ?? "#2b67f3";

  return (
    <li
      className={`solutions-preview__disclosure ${isActive ? "is--active" : ""}`}
      data-active={isActive ? "true" : "false"}
      style={{
        "--solutions-preview-size": isActive ? "12" : "1",
        "--solutions-preview-accent": accent,
      }}
      onPointerMove={() => onActivate(index)}
    >
      <article
        className="solutions-preview__disclosure-shell"
        id={solution.slug}
        itemScope
        itemType="https://schema.org/Service"
      >
        <meta itemProp="provider" content="Andrii Litkovskyi" />

        <button
          type="button"
          id={tabId}
          className="solutions-preview__tab-trigger"
          onClick={() => onActivate(index)}
          onFocus={() => onActivate(index)}
          aria-pressed={isActive}
          aria-controls={panelId}
          aria-label={`${language === "de" ? "Solution" : "Solution"} ${index + 1}: ${solution.title}`}
        >
          <span className="solutions-preview__tab-index">{tabNumber}</span>
          <span className="solutions-preview__tab-name">{solution.title}</span>
        </button>

        <div
          id={panelId}
          className="solutions-preview__panel"
          role="region"
          aria-labelledby={tabId}
          aria-hidden={!isActive}
        >
          <h3 className="solutions-preview__panel-title" itemProp="name">
            {solution.title}
          </h3>

          <p className="solutions-preview__panel-subtitle" itemProp="description">
            {solution.subtitle}
          </p>

          <p className="solutions-preview__panel-tagline">
            {solution.heroTagline}
          </p>

          {/* Modules count badge */}
          {solution.modules && solution.modules.length > 0 && (
            <div className="solutions-preview__panel-badges">
              <span className="badge badge--modules">
                {solution.modules.length} {labels.modulesLabel}
              </span>
            </div>
          )}

          <dl className="solutions-preview__panel-meta">
            <div className="solutions-preview__panel-meta-item">
              <dt>{language === "de" ? "Super-Workflows" : "Super-Workflows"}</dt>
              <dd>
                {solution.modules && solution.modules.length > 0
                  ? solution.modules.slice(0, 2).map(m => m.name).join(", ") +
                    (solution.modules.length > 2 ? `, +${solution.modules.length - 2}` : "")
                  : "-"}
              </dd>
            </div>
          </dl>

          <div className="solutions-preview__panel-footer">
            <div className="solutions-preview__panel-metrics">
              {solution.metrics.slice(0, 2).map((metric, i) => (
                <div key={i} className="solutions-preview__panel-metric">
                  <span className="solutions-preview__panel-metric-value">
                    {isActive ? (
                      <CountUp
                        key={`${solution.slug}-${activeSolutionIndex}-${i}`}
                        from={0}
                        to={metric.value}
                        separator=","
                        direction="up"
                        duration={1.2}
                        delay={index * 0.1 + i * 0.15}
                      />
                    ) : (
                      metric.value
                    )}
                    <span className="solutions-preview__panel-metric-suffix">{metric.suffix}</span>
                  </span>
                  <span className="solutions-preview__panel-metric-label">{metric.label}</span>
                </div>
              ))}
            </div>

            <TextEffect
              as={Link}
              href={solutionHref}
              variant="ellipseAuto"
              trigger="hover"
              className="solutions-preview__view-all cookie-banner__link"
            >
              {viewSolution}
              <span
                  aria-hidden
                  className="link-icon link-icon--material"
                >
                  arrow_outward
                </span>
              <span aria-hidden="true"></span>
            </TextEffect>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function SolutionsPreview() {
  const { language } = useLanguage();
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);

  const copy = SOLUTIONS_PREVIEW_COPY[language] ?? SOLUTIONS_PREVIEW_COPY.en;
  const fallbackCopy = SOLUTIONS_PREVIEW_COPY.en;

  const sectionTitle = copy.sectionTitle ?? fallbackCopy.sectionTitle;
  const sectionSubtitle = copy.sectionSubtitle ?? fallbackCopy.sectionSubtitle;
  const viewAll = copy.viewAll ?? fallbackCopy.viewAll;
  const viewSolution = copy.viewSolution ?? fallbackCopy.viewSolution;

  // Get all solutions from data/solutions.js
  const solutions = getAllSystems(language);

  const labels = {
    modulesLabel: copy.modulesLabel ?? fallbackCopy.modulesLabel,
  };

  const handleSolutionActivate = (index) => {
    setActiveSolutionIndex((current) => (current === index ? current : index));
  };

  return (
    <section
      className="section solutions-preview"
      id="solutions"
      aria-label={language === "de" ? "Super-Workflow Solutions" : "Super-Workflow Solutions"}
    >
      <div className="content">
        <header className="solutions-preview__header">
          <h2 className="solutions-preview__title">{sectionTitle}</h2>
          <p className="solutions-preview__subtitle">{sectionSubtitle}</p>
          <TextEffect
            variant="arrowRight"
            trigger="always"
            className="inline-block"
            effectOverrides={{
              style: {
                ...SOLUTIONS_PREVIEW_EFFECT_STYLE_PRESETS.viewAllArrow,
            }}}
          >
            <TextEffect
              as={Link}
              href="/solutions"
              variant="ellipseAuto"
              trigger="hover"
              className="solutions-preview__view-all"
            >
              {viewAll}
              <span aria-hidden="true"></span>
            </TextEffect>
          </TextEffect>
        </header>

        <ul className="solutions-preview__disclosures">
          {solutions.map((solution, index) => (
            <SolutionDisclosure
              key={solution.slug}
              solution={solution}
              index={index}
              isActive={index === activeSolutionIndex}
              onActivate={handleSolutionActivate}
              labels={labels}
              language={language}
              viewSolution={viewSolution}
              activeSolutionIndex={activeSolutionIndex}
            />
          ))}
        </ul>

        <div className="solutions-preview__cta">
          <BookCTA
            label={language === "de" ? "solution besprechen" : "discuss solution"}
            ctaLocation="solutions-preview"
          />
        </div>
      </div>
    </section>
  );
}
