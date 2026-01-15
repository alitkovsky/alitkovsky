"use client";

import { useState } from "react";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import BookCTA from "@/components/BookCTA";
import TextEffect from "@/components/TextEffect";
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

const PROJECTS_PREVIEW_COPY = {
  de: {
    sectionTitle: "ausgewählte projekte",
    viewAll: "alle projekte ansehen",
    industryLabel: "branche",
    clientLabel: "kunde",
    periodLabel: "zeitraum",
    projects: [
      {
        slug: "tracking-audit",
        title: "die \"black box\" rettung",
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
        title: "der \"unsichtbare\" zahnarzt",
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
        title: "der \"lost in translation\" fix",
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
    },
  },
  en: {
    sectionTitle: "selected projects",
    viewAll: "view all projects",
    industryLabel: "industry",
    clientLabel: "client",
    periodLabel: "period",
    projects: [
      {
        slug: "tracking-audit",
        title: "the \"black box\" rescue",
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
        title: "the \"invisible\" dentist",
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
        title: "the \"lost in translation\" fix",
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

function ProjectPreviewCard({ project, labels, index }) {
  return (
    <article
      className="projects-preview-card"
      id={project.slug}
      itemScope
      itemType="https://schema.org/Article"
    >
      <meta itemProp="author" content="Andrii Litkovskyi" />

      {/* Header with title and tags */}
      <header className="projects-preview-card__header">
        <div className="projects-preview-card__title-group">
          <h3 className="projects-preview-card__title" itemProp="headline">
            {project.title}
          </h3>
          <div className="projects-preview-card__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="projects-preview-card__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Metric */}
        <div className="projects-preview-card__metric">
          <span className="projects-preview-card__metric-value">
            <CountUp
              from={0}
              to={project.metric.value}
              separator=","
              direction="up"
              duration={1.5}
              delay={index * 0.15}
            />
            <span className="projects-preview-card__metric-suffix">{project.metric.suffix}</span>
          </span>
          <span className="projects-preview-card__metric-label">{project.metric.label}</span>
        </div>
      </header>

      {/* Meta info */}
      <dl className="projects-preview-card__meta">
        <div className="projects-preview-card__meta-item">
          <dt>{labels.clientLabel}</dt>
          <dd>{project.client}</dd>
        </div>
        <div className="projects-preview-card__meta-item">
          <dt>{labels.industryLabel}</dt>
          <dd>{project.industry}</dd>
        </div>
        <div className="projects-preview-card__meta-item">
          <dt>{labels.periodLabel}</dt>
          <dd>{project.period}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function ProjectsPreview() {
  const { language } = useLanguage();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const copy = PROJECTS_PREVIEW_COPY[language] ?? PROJECTS_PREVIEW_COPY.en;
  const fallbackCopy = PROJECTS_PREVIEW_COPY.en;

  const sectionTitle = copy.sectionTitle ?? fallbackCopy.sectionTitle;
  const viewAll = copy.viewAll ?? fallbackCopy.viewAll;
  const projects = (copy.projects ?? fallbackCopy.projects).slice().reverse();
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label;

  const labels = {
    industryLabel: copy.industryLabel ?? fallbackCopy.industryLabel,
    clientLabel: copy.clientLabel ?? fallbackCopy.clientLabel,
    periodLabel: copy.periodLabel ?? fallbackCopy.periodLabel,
  };

  // Handle tab click
  const handleTabClick = (index) => {
    setActiveProjectIndex(index);
  };

  // Get z-index for tab based on active state
  const getTabZIndex = (index) => {
    if (index === activeProjectIndex) return projects.length + 1;
    return projects.length - Math.abs(index - activeProjectIndex);
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
            as={Link}
            href="/projects"
            variant="ellipseAuto"
            trigger="hover"
            className="projects-preview__view-all"
          >
            {viewAll}
            <span aria-hidden="true"></span>
          </TextEffect>
        </header>

        <div className="projects-preview__folder">
          {/* Folder tabs row */}
          <div className="projects-preview__folder-tabs">
            {projects.map((project, index) => {
              const isActive = index === activeProjectIndex;

              return (
                <button
                  key={project.slug}
                  type="button"
                  className={`projects-preview__folder-tab ${isActive ? 'is--active' : ''}`}
                  style={{ zIndex: getTabZIndex(index) }}
                  onClick={() => handleTabClick(index)}
                  aria-pressed={isActive}
                  aria-label={`${language === "de" ? "Projekt" : "Project"} ${index + 1}: ${project.title}`}
                >
                  <span className="projects-preview__folder-tab-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="projects-preview__folder-tab-name">
                    {project.title}
                  </span>
                  <FolderTabEdge className="projects-preview__folder-tab-edge" />
                </button>
              );
            })}
          </div>

          {/* Folder content - shows active project */}
          <div className="projects-preview__folder-content">
            <div className="projects-preview__folder-scroll">
              <div className="projects-preview__list">
                {projects.map((project, index) => (
                  <div
                    key={project.slug}
                    className={`projects-preview__card-wrapper ${index === activeProjectIndex ? 'is--active' : ''}`}
                  >
                    <ProjectPreviewCard
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

        <div className="projects-preview__cta">
          <BookCTA label={ctaLabel} ctaLocation="projects-preview" />
        </div>
      </div>
    </section>
  );
}
