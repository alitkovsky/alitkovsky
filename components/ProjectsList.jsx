"use client";

import { useState } from "react";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import BookCTA from "@/components/BookCTA";
import BackToStart from "@/components/BackToStart";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import useLanguage from "@/hooks/useLanguage";
import { getAllProjects, getProjectsPageCopy } from "@/data/projects";
import { localizePath } from "@/lib/localeRouting";

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

// Projects data now imported from data/projects.js

function ProjectListCard({ project, labels, index, language }) {
  // Handle both old format (flat strings) and new format (objects with content arrays)
  const problemContent = project.challenge?.content || [project.problem];
  const solutionContent = project.solution?.content || [project.solution];
  const resultsContent = project.results?.content || [project.results];

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

          {/* NEW: Category and Status badges */}
          <div className="projects-list-card__badges">
            {project.category && (
              <Link
                href={localizePath(`/solutions/${project.category}`, language)}
                className="badge badge--category"
              >
                {project.category.split('-').map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Link>
            )}
            {project.status && (
              <span className="badge badge--status">{project.status}</span>
            )}
            {project.implementation && (
              <span className="badge badge--timeline">{project.implementation}</span>
            )}
          </div>

          <div className="projects-list-card__tags">
            {project.tags.slice(0, 5).map((tag) => (
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

      {/* Hero/Subtitle */}
      {project.hero && (
        <div className="projects-list-card__hero">
          <p itemProp="description">{project.hero}</p>
        </div>
      )}

      {/* Meta info */}
      <dl className="projects-list-card__meta">
        <div className="projects-list-card__meta-item">
          <dt>{labels.industryLabel}</dt>
          <dd>{project.industry}</dd>
        </div>
        <div className="projects-list-card__meta-item">
          <dt>{labels.periodLabel}</dt>
          <dd>{project.implementation || project.period}</dd>
        </div>
      </dl>

      {/* Content sections */}
      <div className="projects-list-card__content">
        <section className="projects-list-card__section">
          <h3>{project.challenge?.title || labels.problemLabel}</h3>
          {problemContent.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </section>

        <section className="projects-list-card__section">
          <h3>{project.solution?.title || labels.solutionLabel}</h3>
          {solutionContent.slice(0, 3).map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </section>

        <section className="projects-list-card__section">
          <h3>{project.results?.title || labels.resultsLabel}</h3>
          {resultsContent.slice(0, 4).map((item, i) => (
            <p key={i}>{item}</p>
          ))}
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

  // Get projects data from projects.js
  const projects = getAllProjects(language);
  const copy = getProjectsPageCopy(language);

  const pageTitle = copy.backToProjects?.replace('alle ', '') || (language === "de" ? "projekte" : "projects");
  const pageSubtitle = language === "de"
    ? "production-ready super-workflows fuer sales, retention, content und intelligence"
    : "production-ready super-workflows for sales, retention, content and intelligence";
  const breadcrumb = language === "de" ? "projekte" : "projects";
  const ctaLabel = language === "de" ? "projekt besprechen" : "discuss project";
  const backLabel = language === "de" ? "zurück zur startseite" : "back to homepage";

  const labels = {
    industryLabel: copy.industryLabel,
    clientLabel: copy.clientLabel,
    periodLabel: copy.periodLabel,
    problemLabel: copy.problemLabel,
    solutionLabel: copy.solutionLabel,
    resultsLabel: copy.resultsLabel,
    servicesLabel: copy.servicesLabel,
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
                      language={language}
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
