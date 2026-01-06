"use client";

import Link from "next/link";
import CountUp from "@/components/CountUp";
import BookCTA from "@/components/BookCTA";
import BackToStart from "@/components/BackToStart";
import Breadcrumb from "@/components/Breadcrumb";
import TextEffect from "@/components/TextEffect";
import Footer from "@/components/Footer";
import useLanguage from "@/hooks/useLanguage";
import { PROJECTS_DATA, getAllProjectSlugs, getProjectBySlug, getAdjacentProjects } from "@/data/projects";

// Re-export for backwards compatibility
export { PROJECTS_DATA, getAllProjectSlugs, getProjectBySlug, getAdjacentProjects };

export default function ProjectDetail({ slug }) {
  const { language } = useLanguage();

  const data = PROJECTS_DATA[language] ?? PROJECTS_DATA.en;
  const projectData = data.projects[slug];
  const adjacent = getAdjacentProjects(slug);

  if (!projectData) {
    return null;
  }

  return (
    <section className="section project-detail">
      <div className="content">
        <Breadcrumb pageName={projectData.title} pageUrl={`/projects/${slug}`} />

        {/* Back link */}
        <nav className="project-detail__nav-top">
          <TextEffect
            as={Link}
            href="/projects"
            variant="ellipseAuto"
            trigger="hover"
            className="project-detail__back-link"
          >
            <span aria-hidden="true">← </span>
            {data.backToProjects}
          </TextEffect>
        </nav>

        {/* Hero section */}
        <header className="project-detail__hero">
          <div className="project-detail__hero-content">
            <h1 className="project-detail__title">{projectData.title}</h1>
            <p className="project-detail__subtitle">{projectData.subtitle}</p>
            <p className="project-detail__hero-text">{projectData.hero}</p>
          </div>

          <div className="project-detail__metrics">
            {projectData.metrics.map((metric, i) => (
              <div key={i} className="project-detail__metric">
                <span className="project-detail__metric-value">
                  <CountUp
                    from={0}
                    to={metric.value}
                    separator=","
                    direction="up"
                    duration={1.5}
                    delay={i * 0.2}
                  />
                  <span className="project-detail__metric-suffix">{metric.suffix}</span>
                </span>
                <span className="project-detail__metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Meta info */}
        <dl className="project-detail__meta">
          <div className="project-detail__meta-item">
            <dt>{data.clientLabel}</dt>
            <dd>{projectData.client}</dd>
          </div>
          <div className="project-detail__meta-item">
            <dt>{data.industryLabel}</dt>
            <dd>{projectData.industry}</dd>
          </div>
          <div className="project-detail__meta-item">
            <dt>{data.periodLabel}</dt>
            <dd>{projectData.period}</dd>
          </div>
        </dl>

        {/* Tags */}
        <div className="project-detail__tags">
          {projectData.tags.map((tag) => (
            <span key={tag} className="project-detail__tag">{tag}</span>
          ))}
        </div>

        {/* Main content sections */}
        <div className="project-detail__body">
          {/* Problem */}
          <section className="project-detail__section">
            <h2>{projectData.problem.title}</h2>
            {projectData.problem.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          {/* Solution */}
          <section className="project-detail__section">
            <h2>{projectData.solution.title}</h2>
            {projectData.solution.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          {/* Results */}
          <section className="project-detail__section">
            <h2>{projectData.results.title}</h2>
            {projectData.results.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        </div>

        {/* Services */}
        <aside className="project-detail__services">
          <h3>{data.servicesLabel}</h3>
          <ul>
            {projectData.services.map((service, i) => (
              <li key={i}>{service}</li>
            ))}
          </ul>
        </aside>

        {/* Quote */}
        {projectData.quote && (
          <blockquote className="project-detail__quote">
            <p>"{projectData.quote}"</p>
            <footer>
              <cite>
                {projectData.quoteAuthor}
                <span className="project-detail__quote-role"> — {projectData.quoteRole}</span>
              </cite>
            </footer>
          </blockquote>
        )}

        {/* Navigation between projects */}
        <nav className="project-detail__nav-bottom" aria-label="Project navigation">
          <div className="project-detail__nav-prev">
            {adjacent.prev && (
              <TextEffect
                as={Link}
                href={`/projects/${adjacent.prev}`}
                variant="ellipseAuto"
                trigger="hover"
              >
                <span aria-hidden="true">← </span>
                {data.prevProject}
              </TextEffect>
            )}
          </div>
          <div className="project-detail__nav-next">
            {adjacent.next && (
              <TextEffect
                as={Link}
                href={`/projects/${adjacent.next}`}
                variant="ellipseAuto"
                trigger="hover"
              >
                {data.nextProject}
                <span aria-hidden="true"> →</span>
              </TextEffect>
            )}
          </div>
        </nav>

        {/* CTA */}
        <div className="project-detail__cta">
          <BookCTA label={data.cta.label} ctaLocation="project-detail" />
        </div>

        <div className="project-detail__back">
          <BackToStart label={data.backLabel} url="/projects" ctaLocation="project-detail" />
        </div>
      </div>

      <Footer />
    </section>
  );
}
