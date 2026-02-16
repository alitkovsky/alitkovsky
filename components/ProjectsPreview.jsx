"use client";

import { useState } from "react";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import BookCTA from "@/components/BookCTA";
import TextEffect from "@/components/TextEffect";
import useLanguage from "@/hooks/useLanguage";

const PROJECTS_PREVIEW_COPY = {
  de: {
    sectionTitle: "ausgewählte projekte",
    viewAll: "alle projekte",
    viewProject: "projekt ansehen",
    industryLabel: "branche",
    clientLabel: "kunde",
    periodLabel: "zeitraum",
    projects: [
      {
        slug: "tracking-audit",
        title: "tracking-transparenz wiederhergestellt",
        tags: ["ga4", "gtm", "consent mode v2"],
        client: "e-commerce marke (dach)",
        industry: "fashion & lifestyle",
        period: "14 tage",
        metric: {
          value: 35,
          suffix: "%",
          label: "daten-recovery",
        },
      },
      {
        slug: "local-seo-dental",
        title: "lokale sichtbarkeit strukturiert verbessert",
        tags: ["local seo", "gbp", "schema.org"],
        client: "private zahnarztpraxis",
        industry: "healthcare / dental",
        period: "6 monate",
        metric: {
          value: 48,
          suffix: "%",
          label: "mehr anrufe",
        },
      },
      {
        slug: "google-ads-dach",
        title: "dach-ads auf qualifizierte leads ausgerichtet",
        tags: ["google ads", "dach", "b2b"],
        client: "b2b saas company",
        industry: "software / logistics",
        period: "3 monate",
        metric: {
          value: 52,
          suffix: "%",
          label: "cpl-reduktion",
        },
      },
    ],
    cta: {
      label: "neugierig? lass uns reden",
      // label: "neugierig?\nlass uns reden",
    },
  },
  en: {
    sectionTitle: "selected projects",
    viewAll: "all projects",
    viewProject: "view project",
    industryLabel: "industry",
    clientLabel: "client",
    periodLabel: "period",
    projects: [
      {
        slug: "tracking-audit",
        title: "tracking transparency restored",
        tags: ["ga4", "gtm", "consent mode v2"],
        client: "e-commerce brand (dach)",
        industry: "fashion & lifestyle",
        period: "14 days",
        metric: {
          value: 35,
          suffix: "%",
          label: "data recovery",
        },
      },
      {
        slug: "local-seo-dental",
        title: "structured local visibility improvement",
        tags: ["local seo", "gbp", "schema.org"],
        client: "private dental practice",
        industry: "healthcare / dental",
        period: "6 months",
        metric: {
          value: 48,
          suffix: "%",
          label: "more calls",
        },
      },
      {
        slug: "google-ads-dach",
        title: "dach ads aligned for qualified leads",
        tags: ["google ads", "dach", "b2b"],
        client: "b2b saas company",
        industry: "software / logistics",
        period: "3 months",
        metric: {
          value: 52,
          suffix: "%",
          label: "cpl reduction",
        },
      },
    ],
    cta: {
      label: "curious? let's talk",
    },
  },
};

const PROJECTS_PREVIEW_EFFECT_STYLE_PRESETS = Object.freeze({
  viewAllArrow: Object.freeze({
    top: "0.45em",
    left: "-11.25ch",
  }),
});

const PROJECTS_PREVIEW_ACCENTS = Object.freeze({
  "tracking-audit": "#2b67f3",
  "local-seo-dental": "#0f9a7a",
  "google-ads-dach": "#a857f2",
});

function ProjectDisclosure({
  project,
  index,
  isActive,
  onActivate,
  labels,
  language,
  viewProject,
  activeProjectIndex,
}) {
  const tabNumber = String(index + 1).padStart(2, "0");
  const tabId = `projects-preview-tab-${project.slug}`;
  const panelId = `projects-preview-panel-${project.slug}`;
  const accent = PROJECTS_PREVIEW_ACCENTS[project.slug] ?? "#2b67f3";

  return (
    <li
      className={`projects-preview__disclosure ${isActive ? "is--active" : ""}`}
      data-active={isActive ? "true" : "false"}
      style={{
        "--projects-preview-size": isActive ? "10" : "1",
        "--projects-preview-accent": accent,
      }}
      onPointerMove={() => onActivate(index)}
    >
      <article
        className="projects-preview__disclosure-shell"
        id={project.slug}
        itemScope
        itemType="https://schema.org/Article"
      >
        <meta itemProp="author" content="Andrii Litkovskyi" />

        <button
          type="button"
          id={tabId}
          className="projects-preview__tab-trigger"
          onClick={() => onActivate(index)}
          onFocus={() => onActivate(index)}
          aria-pressed={isActive}
          aria-controls={panelId}
          aria-label={`${language === "de" ? "Projekt" : "Project"} ${index + 1}: ${project.title}`}
        >
          <span className="projects-preview__tab-index">{tabNumber}</span>
          <span className="projects-preview__tab-name">{project.title}</span>
        </button>

        <div
          id={panelId}
          className="projects-preview__panel"
          role="region"
          aria-labelledby={tabId}
          aria-hidden={!isActive}
        >
          <h3 className="projects-preview__panel-title" itemProp="headline">
            {project.title}
          </h3>

          <p className="projects-preview__panel-copy" itemProp="description">
            {labels.clientLabel}: {project.client} · {labels.industryLabel}: {project.industry}
          </p>

          <div className="projects-preview__panel-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="projects-preview__panel-tag">
                {tag}
              </span>
            ))}
          </div>

          <dl className="projects-preview__panel-meta">
            <div className="projects-preview__panel-meta-item">
              <dt>{labels.clientLabel}</dt>
              <dd>{project.client}</dd>
            </div>
            <div className="projects-preview__panel-meta-item">
              <dt>{labels.industryLabel}</dt>
              <dd>{project.industry}</dd>
            </div>
            <div className="projects-preview__panel-meta-item">
              <dt>{labels.periodLabel}</dt>
              <dd>{project.period}</dd>
            </div>
          </dl>

          <div className="projects-preview__panel-footer">
            <div className="projects-preview__panel-metric">
              <span className="projects-preview__panel-metric-value">
                {isActive ? (
                  <CountUp
                    key={`${project.slug}-${activeProjectIndex}`}
                    from={0}
                    to={project.metric.value}
                    separator=","
                    direction="up"
                    duration={1.2}
                    delay={index * 0.1}
                  />
                ) : (
                  project.metric.value
                )}
                <span className="projects-preview__panel-metric-suffix">{project.metric.suffix}</span>
              </span>
              <span className="projects-preview__panel-metric-label">{project.metric.label}</span>
            </div>

            <Link href={`/projects/${project.slug}`} className="projects-preview__panel-link">
              {viewProject}
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function ProjectsPreview() {
  const { language } = useLanguage();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const copy = PROJECTS_PREVIEW_COPY[language] ?? PROJECTS_PREVIEW_COPY.en;
  const fallbackCopy = PROJECTS_PREVIEW_COPY.en;

  const sectionTitle = copy.sectionTitle ?? fallbackCopy.sectionTitle;
  const viewAll = copy.viewAll ?? fallbackCopy.viewAll;
  const viewProject = copy.viewProject ?? fallbackCopy.viewProject;
  const projects = (copy.projects ?? fallbackCopy.projects).slice().reverse();
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label;

  const labels = {
    industryLabel: copy.industryLabel ?? fallbackCopy.industryLabel,
    clientLabel: copy.clientLabel ?? fallbackCopy.clientLabel,
    periodLabel: copy.periodLabel ?? fallbackCopy.periodLabel,
  };

  const handleProjectActivate = (index) => {
    setActiveProjectIndex((current) => (current === index ? current : index));
  };

  return (
    <section
      className="section projects-preview"
      id="projects"
      aria-label={language === "de" ? "Ausgewählte Projekte" : "Selected Projects"}
    >
      <div className="content">
        <header className="projects-preview__header">
          <h2 className="projects-preview__title">{sectionTitle}</h2>
          <TextEffect
            variant="arrowRight"
            trigger="always"
            className="inline-block"
            effectOverrides={{
              style: {
                ...PROJECTS_PREVIEW_EFFECT_STYLE_PRESETS.viewAllArrow,
            }}}
          >
            <TextEffect
              as={Link}
              href="/projects"
              variant="ellipseAuto"
              trigger="hover"
              className="projects-preview__view-all"
            >
              {viewAll}
              <span aria-hidden="true"></span>
            </TextEffect>
          </TextEffect>
        </header>

        <ul className="projects-preview__disclosures">
          {projects.map((project, index) => (
            <ProjectDisclosure
              key={project.slug}
              project={project}
              index={index}
              isActive={index === activeProjectIndex}
              onActivate={handleProjectActivate}
              labels={labels}
              language={language}
              viewProject={viewProject}
              activeProjectIndex={activeProjectIndex}
            />
          ))}
        </ul>

        <div className="projects-preview__cta">
          <BookCTA label={ctaLabel} ctaLocation="projects-preview" />
        </div>
      </div>
    </section>
  );
}
