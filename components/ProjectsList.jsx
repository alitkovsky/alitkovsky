"use client";

import { useState } from "react";
import CountUp from "@/components/CountUp";
import BookCTA from "@/components/BookCTA";
import BackToStart from "@/components/BackToStart";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import useLanguage from "@/hooks/useLanguage";

// Inline SVG component for folder tab right edge
const FolderTabEdge = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 40 40"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path d="M0,40h40L6.5,2.7C5.1,1.1,3.1,0,0,0v40Z" />
  </svg>
);

const PROJECTS_LIST_COPY = {
  de: {
    pageTitle: "projekte",
    pageSubtitle: "ausgewaehlte umsetzungen mit messbaren prozess- und daten-effekten",
    breadcrumb: "projekte",
    industryLabel: "branche",
    clientLabel: "kunde",
    periodLabel: "zeitraum",
    problemLabel: "herausforderung",
    solutionLabel: "lösung",
    resultsLabel: "ergebnisse",
    servicesLabel: "leistungen",
    viewDetails: "details ansehen",
    projects: [
      {
        slug: "tracking-audit",
        title: "die \"black box\" rettung",
        tags: ["ga4", "gtm", "consent mode v2", "cookiebot"],
        client: "e-commerce marke (dach)",
        industry: "fashion & lifestyle",
        period: "14 tage",
        metrics: [
          { value: 35, suffix: "%", label: "daten-recovery" },
          { value: 100, suffix: "%", label: "dsgvo-konform" },
          { value: 18, suffix: "%", label: "cpa-reduktion" },
        ],
        problem: "nach aenderungen bei consent und tracking brachen conversion-daten weg. marketing, vertrieb und reporting arbeiteten mit widerspruechlichen zahlen - budgetentscheidungen wurden unsicher.",
        solution: "ich habe das setup neu strukturiert: consent mode v2 sauber implementiert, den gtm-container bereinigt, events standardisiert und klare naming-regeln dokumentiert.",
        results: "innerhalb von 48 stunden lagen wieder belastbare conversion-signale vor. das reporting wurde vergleichbar, bidding stabilisierte sich und die interne dsgvo-pruefung wurde ohne beanstandung bestanden.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      {
        slug: "local-seo-dental",
        title: "der \"unsichtbare\" zahnarzt",
        tags: ["local seo", "google business profile", "schema.org", "ahrefs"],
        client: "private zahnarztpraxis",
        industry: "healthcare / dental",
        period: "6 monate (laufend)",
        metrics: [
          { value: 1, suffix: ".", label: "local map pack ranking" },
          { value: 48, suffix: "%", label: "mehr anrufe" },
          { value: 12, suffix: "x", label: "organische keywords" },
        ],
        problem: "die praxis hatte starke medizinische leistung, aber schwache digitale auffindbarkeit. anfragen waren ungleichmaessig und lokale datenquellen inkonsistent.",
        solution: "ich habe lokale datenquellen harmonisiert (nap), landingpages fuer relevante behandlungen strukturiert und ein klares review-follow-up etabliert.",
        results: "top-3 sichtbarkeit fuer zentrale lokale suchbegriffe, +48% mehr anrufe und planbarere auslastung durch einen konsistenten anfragefluss.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      {
        slug: "google-ads-dach",
        title: "der \"lost in translation\" fix",
        tags: ["google ads", "gtm", "dach", "b2b", "german copywriting"],
        client: "b2b saas company",
        industry: "software / logistics",
        period: "3 monate",
        metrics: [
          { value: 52, suffix: "%", label: "cpl-reduktion" },
          { value: 30, suffix: "%", label: "höhere conversion rate" },
          { value: 4, suffix: "k€", label: "ersparnis/monat" },
        ],
        problem: "ein internationales team hatte hohe klickzahlen, aber wenige qualifizierte demos. kampagnenlogik und crm-signale passten nicht zur realen vertriebssituation.",
        solution: "ich habe keyword-logik, anzeigensprache und tracking-signale auf den deutschen b2b-kontext ausgerichtet und negative-keyword-strukturen sowie reportings standardisiert.",
        results: "deutlich stabilerer lead-flow, -52% cost per lead und bessere uebergabequalitaet zwischen marketing und vertrieb.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
    ],
    cta: {
      label: "prozess besprechen",
    },
    backLabel: "zurück zur startseite",
  },
  en: {
    pageTitle: "projects",
    pageSubtitle: "selected implementations with measurable process and data impact",
    breadcrumb: "projects",
    industryLabel: "industry",
    clientLabel: "client",
    periodLabel: "period",
    problemLabel: "challenge",
    solutionLabel: "solution",
    resultsLabel: "results",
    servicesLabel: "services",
    viewDetails: "view details",
    projects: [
      {
        slug: "tracking-audit",
        title: "the \"black box\" rescue",
        tags: ["ga4", "gtm", "consent mode v2", "cookiebot"],
        client: "e-commerce brand (dach)",
        industry: "fashion & lifestyle",
        period: "14 days",
        metrics: [
          { value: 35, suffix: "%", label: "data recovery" },
          { value: 100, suffix: "%", label: "gdpr compliant" },
          { value: 18, suffix: "%", label: "cpa reduction" },
        ],
        problem: "after consent and tracking changes, conversion visibility broke down. marketing, sales, and reporting teams worked with conflicting numbers, so budget decisions became unreliable.",
        solution: "i rebuilt the setup foundation: clean consent mode v2 implementation, GTM container cleanup, standardized event logic, and documented naming conventions.",
        results: "within 48 hours, conversion signals were reliable again. reporting became comparable, bidding stabilized, and the internal gdpr compliance check passed without findings.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      {
        slug: "local-seo-dental",
        title: "the \"invisible\" dentist",
        tags: ["local seo", "google business profile", "schema.org", "ahrefs"],
        client: "private dental practice",
        industry: "healthcare / dental",
        period: "6 months (ongoing)",
        metrics: [
          { value: 1, suffix: "st", label: "local map pack ranking" },
          { value: 48, suffix: "%", label: "more phone calls" },
          { value: 12, suffix: "x", label: "organic keywords" },
        ],
        problem: "the clinic delivered strong medical quality but had weak local digital visibility. inquiry volume was inconsistent and location data was fragmented across directories.",
        solution: "i harmonized local data sources (NAP), structured landing pages for priority treatments, and implemented a clear review follow-up process.",
        results: "top-3 visibility for core local searches, +48% more calls, and more predictable utilization through a consistent inquiry flow.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      {
        slug: "google-ads-dach",
        title: "the \"lost in translation\" fix",
        tags: ["google ads", "gtm", "dach", "b2b", "german copywriting"],
        client: "b2b saas company",
        industry: "software / logistics",
        period: "3 months",
        metrics: [
          { value: 52, suffix: "%", label: "cpl reduction" },
          { value: 30, suffix: "%", label: "higher conversion rate" },
          { value: 4, suffix: "k€", label: "saved/month" },
        ],
        problem: "an international team had high click volume but low qualified demo volume. campaign signals and CRM outcomes did not match operational sales reality.",
        solution: "i realigned keyword logic, ad language, and tracking signals to the german b2b context, then standardized negative keyword structures and reporting workflows.",
        results: "a more stable qualified lead flow, -52% cost per lead, and cleaner handoff quality between marketing and sales.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
    ],
    cta: {
      label: "discuss your process",
    },
    backLabel: "back to homepage",
  },
};

function ProjectListCard({ project, labels, index }) {
  return (
    <article
      className="projects-list-card"
      id={project.slug}
      itemScope
      itemType="https://schema.org/Article"
    >
      <meta itemProp="author" content="Andrii Litkovskyi" />

      {/* Header with title and tags */}
      <header className="projects-list-card__header">
        <div className="projects-list-card__title-group">
          <h2 className="projects-list-card__title" itemProp="headline">
            {project.title}
          </h2>
          <div className="projects-list-card__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="projects-list-card__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="projects-list-card__metrics">
          {project.metrics.map((metric, i) => (
            <div key={i} className="projects-list-card__metric">
              <span className="projects-list-card__metric-value">
                <CountUp
                  from={0}
                  to={metric.value}
                  separator=","
                  direction="up"
                  duration={1.5}
                  delay={index * 0.15 + i * 0.1}
                />
                <span className="projects-list-card__metric-suffix">{metric.suffix}</span>
              </span>
              <span className="projects-list-card__metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Meta info */}
      <dl className="projects-list-card__meta">
        <div className="projects-list-card__meta-item">
          <dt>{labels.clientLabel}</dt>
          <dd>{project.client}</dd>
        </div>
        <div className="projects-list-card__meta-item">
          <dt>{labels.industryLabel}</dt>
          <dd>{project.industry}</dd>
        </div>
        <div className="projects-list-card__meta-item">
          <dt>{labels.periodLabel}</dt>
          <dd>{project.period}</dd>
        </div>
      </dl>

      {/* Content sections */}
      <div className="projects-list-card__content">
        <section className="projects-list-card__section">
          <h3>{labels.problemLabel}</h3>
          <p itemProp="description">{project.problem}</p>
        </section>

        <section className="projects-list-card__section">
          <h3>{labels.solutionLabel}</h3>
          <p>{project.solution}</p>
        </section>

        <section className="projects-list-card__section">
          <h3>{labels.resultsLabel}</h3>
          <p>{project.results}</p>
        </section>
      </div>

      {/* Quote */}
      {project.quote && (
        <blockquote className="projects-list-card__quote">
          <p>"{project.quote}"</p>
          <footer>
            <cite>
              {project.quoteAuthor}
              <span className="projects-list-card__quote-role"> — {project.quoteRole}</span>
            </cite>
          </footer>
        </blockquote>
      )}
    </article>
  );
}

export default function ProjectsList() {
  const { language } = useLanguage();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const copy = PROJECTS_LIST_COPY[language] ?? PROJECTS_LIST_COPY.en;
  const fallbackCopy = PROJECTS_LIST_COPY.en;

  const pageTitle = copy.pageTitle ?? fallbackCopy.pageTitle;
  const pageSubtitle = copy.pageSubtitle ?? fallbackCopy.pageSubtitle;
  const breadcrumb = copy.breadcrumb ?? fallbackCopy.breadcrumb;
  const projects = (copy.projects ?? fallbackCopy.projects).slice().reverse();
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label;
  const backLabel = copy.backLabel ?? fallbackCopy.backLabel;

  const labels = {
    industryLabel: copy.industryLabel ?? fallbackCopy.industryLabel,
    clientLabel: copy.clientLabel ?? fallbackCopy.clientLabel,
    periodLabel: copy.periodLabel ?? fallbackCopy.periodLabel,
    problemLabel: copy.problemLabel ?? fallbackCopy.problemLabel,
    solutionLabel: copy.solutionLabel ?? fallbackCopy.solutionLabel,
    resultsLabel: copy.resultsLabel ?? fallbackCopy.resultsLabel,
    servicesLabel: copy.servicesLabel ?? fallbackCopy.servicesLabel,
  };

  // Handle tab click
  const handleTabClick = (index) => {
    setActiveProjectIndex(index);
  };

  // Get z-index for tab based on active state
  // Active tab gets highest, tabs before it stack behind
  const getTabZIndex = (index) => {
    if (index === activeProjectIndex) return projects.length + 1;
    // Inactive tabs: lower z-index, with tabs further from active getting lower values
    return projects.length - Math.abs(index - activeProjectIndex);
  };

  return (
    <section
      className="section projects-list"
      aria-label={language === "de" ? "Projekte" : "Projects"}
    >
      <div className="content">
        <Breadcrumb pageName={breadcrumb} pageUrl="/projects" />

        <header className="projects-list__header">
          <h1 className="projects-list__title">{pageTitle}</h1>
          <p className="projects-list__subtitle">{pageSubtitle}</p>
        </header>

        <div className="projects-list__folder">
          {/* Folder tabs row */}
          <div className="projects-list__folder-tabs">
            {projects.map((project, index) => {
              const isActive = index === activeProjectIndex;

              return (
                <button
                  key={project.slug}
                  type="button"
                  className={`projects-list__folder-tab ${isActive ? 'is--active' : ''}`}
                  style={{ zIndex: getTabZIndex(index) }}
                  onClick={() => handleTabClick(index)}
                  aria-pressed={isActive}
                  aria-label={`${language === "de" ? "Projekt" : "Project"} ${index + 1}: ${project.title}`}
                >
                  <span className="projects-list__folder-tab-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="projects-list__folder-tab-name">
                    {project.title}
                  </span>
                  <FolderTabEdge className="projects-list__folder-tab-edge" />
                </button>
              );
            })}
          </div>

          {/* Folder content - shows active project */}
          <div className="projects-list__folder-content">
            <div className="projects-list__folder-scroll">
              <div className="projects-list__list">
                {projects.map((project, index) => (
                  <div
                    key={project.slug}
                    className={`projects-list__card-wrapper ${index === activeProjectIndex ? 'is--active' : ''}`}
                  >
                    <ProjectListCard
                      project={project}
                      labels={labels}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="projects-list__cta">
          <BookCTA label={ctaLabel} ctaLocation="projects-list" />
        </div>

        <div className="projects-list__back">
          <BackToStart label={backLabel} ctaLocation="projects-list" />
        </div>
      </div>

      <Footer />
    </section>
  );
}
