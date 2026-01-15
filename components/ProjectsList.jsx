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
    pageSubtitle: "ausgewählte arbeiten mit messbaren ergebnissen",
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
        problem: "der kunde kam mit einem panik-problem: \"unser google ads dashboard zeigt 0 conversions, aber das shop-system zeigt verkäufe.\" nach verschärfung der eu-datenschutzregeln (dma) war das bisherige tracking-setup zusammengebrochen. €5.000/monat wurden für ads ausgegeben — aber effektiv blind.",
        solution: "statt eines \"schnellen patches\" setzte ich eine \"clean slate\" architektur um. google consent mode v2 wurde implementiert, um \"verlorene\" modelling-daten zurückzugewinnen — dsgvo-konform. der gtm-container wurde komplett bereinigt: 50+ ungenutzte trigger entfernt, standardisierte namenskonventionen eingeführt.",
        results: "innerhalb von 48 stunden nach deployment: google ads zeigte wieder conversions an. smart bidding wurde wieder aktiviert, der cpa stabilisierte sich. der kunde bestand seine interne dsgvo-compliance-prüfung mit 100% score.",
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
        problem: "der kunde war ein erfahrener zahnarzt mit moderner klinik, aber sein terminkalender hatte lücken. wenn patienten nach \"zahnarzt minden\" oder \"zahnimplantate\" suchten, war die praxis im local map pack nicht zu finden. aggressive dental-ketten dominierten die top-3 plätze.",
        solution: "hyper-local offensive: fokus auf high-intent, standortbezogene suchanfragen. nap-chaos über 15 verzeichnisse bereinigt, json-ld schema markup implementiert, dedizierte landing pages für hochpreisige behandlungen erstellt. review-ökosystem mit qr-code und follow-up-sms eingeführt.",
        results: "die praxis rankt jetzt konsistent in den top 3 für \"zahnarzt [stadt]\". anruf-volumen stieg um +48% innerhalb von 4 monaten. die neuen landing pages bringen patienten für hochpreisige behandlungen, nicht nur check-ups.",
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
        problem: "ein internationales software-unternehmen hatte seine us-kampagnen einfach automatisch ins deutsche übersetzt. das problem: hohe klicks, null demos. die bounce rate lag bei 90%. der cost per lead war 4x höher als in uk.",
        solution: "komplettes \"cultural audit\" des accounts. wechsel von generischen broad match keywords zu hochspezifischer deutscher b2b-copy. 400+ negative keywords hinzugefügt. alle anzeigen auf formelles \"sie\" umgeschrieben. trust-signale wie \"dsgvo-konform\" und \"made in germany\" integriert.",
        results: "die kampagne wurde vom geld-grab zum effizientesten kanal in europa. cost per lead halbiert bei gleichbleibendem volumen. €4k monatlich gespart allein durch die negative keyword liste. leads waren endlich \"qualifiziert\" — echte entscheider.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
    ],
    cta: {
      label: "projekt besprechen",
    },
    backLabel: "zurück zur startseite",
  },
  en: {
    pageTitle: "projects",
    pageSubtitle: "selected projects with measurable results",
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
        problem: "the client came with a panic-inducing problem: \"our google ads dashboard says 0 conversions, but the shop system shows sales.\" after eu privacy regulations tightened (dma), their tracking setup collapsed. €5,000/month spent on ads — effectively flying blind.",
        solution: "instead of a \"quick patch,\" i implemented a \"clean slate\" architecture. google consent mode v2 was deployed to recover \"lost\" modeling data — gdpr compliant. the gtm container was completely cleaned up: 50+ unused triggers removed, standardized naming conventions introduced.",
        results: "within 48 hours of deployment: google ads started reporting conversions again. smart bidding was reactivated, cpa stabilized. the client passed their internal gdpr compliance check with 100% score.",
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
        problem: "the client was an experienced dentist with a modern clinic, but appointment slots remained empty. when patients searched for \"zahnarzt minden\" or \"dental implants,\" the practice wasn't in the local map pack. aggressive dental chains dominated the top 3 spots.",
        solution: "hyper-local offensive: focus on high-intent, location-based queries. cleaned up nap chaos across 15 directories, implemented json-ld schema markup, created dedicated landing pages for high-value treatments. introduced review ecosystem with qr code and follow-up sms.",
        results: "the practice now consistently ranks in top 3 for \"dentist [city].\" call volume increased +48% within 4 months. the new landing pages bring patients seeking expensive treatments, not just check-ups.",
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
        problem: "an international software company had simply auto-translated their us campaigns into german. the problem: high clicks, zero demos. bounce rate was 90%. cost per lead was 4x higher than in the uk.",
        solution: "complete \"cultural audit\" of the account. switched from generic broad match keywords to highly specific german b2b copy. added 400+ negative keywords. rewrote all ads using formal \"sie.\" integrated trust signals like \"dsgvo-konform\" and \"made in germany.\"",
        results: "the campaign went from money pit to most efficient channel in europe. cost per lead halved while maintaining volume. €4k saved monthly from the negative keyword list alone. leads were finally \"qualified\" — actual decision-makers.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
    ],
    cta: {
      label: "discuss your project",
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
