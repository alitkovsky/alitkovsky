"use client";

import { useId } from "react";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import BookCTA from "@/components/BookCTA";
import BackToStart from "@/components/BackToStart";
import Breadcrumb from "@/components/Breadcrumb";
import TextEffect from "@/components/TextEffect";
import Footer from "@/components/Footer";
import Accordion from "@/components/Accordion";
import useLanguage from "@/hooks/useLanguage";
import { PROJECTS_DATA, getAllProjectSlugs, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { localizePath } from "@/lib/localeRouting";

// Re-export for backwards compatibility
export { PROJECTS_DATA, getAllProjectSlugs, getProjectBySlug, getAdjacentProjects };

export default function ProjectDetail({ slug }) {
  const { language } = useLanguage();
  const baseId = useId();

  const data = PROJECTS_DATA[language] ?? PROJECTS_DATA.en;
  const projectData = data.projects[slug];
  const adjacent = getAdjacentProjects(slug);

  if (!projectData) {
    return null;
  }

  // Generate Schema.org structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": projectData.title,
    "description": projectData.hero || projectData.subtitle,
    "image": `https://alitkovsky.de/og-images/projects/${slug}.png`,
    "author": {
      "@type": "Person",
      "name": "Andrii Litkovskyi",
      "url": "https://alitkovsky.de",
    },
    "publisher": {
      "@type": "Person",
      "name": "Andrii Litkovskyi",
    },
    "datePublished": "2025-03-11",
    "dateModified": "2025-03-11",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://alitkovsky.de/projects/${slug}`,
    },
    "keywords": projectData.tags?.join(", "),
    "articleSection": projectData.category,
    "inLanguage": language === "de" ? "de-DE" : "en-US",
    "about": {
      "@type": "Thing",
      "name": "Workflow Automation",
      "description": projectData.subtitle,
    },
  };

  // Add HowTo schema if phases exist
  const howToData = projectData.phases ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to implement ${projectData.title}`,
    "description": projectData.hero || projectData.subtitle,
    "step": projectData.phases.map((phase, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": phase.title,
      "text": phase.deliverables?.join(", "),
      "timeRequired": phase.timeline,
    })),
    "totalTime": projectData.implementation,
  } : null;

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {howToData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToData) }}
        />
      )}

      <section className="section project-detail">
        <div className="content">
        <div className="project-detail__nav">
          <Breadcrumb
            pageName={projectData.title}
            pageUrl={`/projects/${slug}`}
            parent={projectData.category ? {
              name: projectData.category.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' '),
              url: `/solutions/${projectData.category}`
            } : null}
          />
          {/* Back link */}
          <nav>
            <TextEffect
              as={Link}
              href="/projects"
              variant="ellipseAuto"
              trigger="hover"
              className="project-detail__back-link"
            >
              <i aria-hidden className="cta-icon rotate-225">↗</i>
              {data.backToProjects}
            </TextEffect>
          </nav>
        </div>

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

        {/* NEW: Technology Stack */}
        {projectData.technology && (
          <section className="project-detail__technology">
            <h2>{language === "de" ? "Technologie-Stack" : "Technology Stack"}</h2>
            <div className="project-detail__tech-grid">
              {Object.entries(projectData.technology).map(([key, tech]) => (
                <div key={key} className="project-detail__tech-item">
                  <h4>{tech.name}</h4>
                  <p className="project-detail__tech-cost">{tech.cost}</p>
                  <p className="project-detail__tech-description">{tech.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

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

        {/* NEW: Implementation Phases */}
        {projectData.phases && projectData.phases.length > 0 && (
          <section className="project-detail__phases">
            <h2>{language === "de" ? "Implementierungs-Phasen" : "Implementation Phases"}</h2>
            <div className="project-detail__phases-timeline">
              {projectData.phases.map((phase, i) => (
                <article key={i} className="project-detail__phase">
                  <div className="project-detail__phase-number">{phase.phase}</div>
                  <div className="project-detail__phase-content">
                    <h3>{phase.title}</h3>
                    <p className="project-detail__phase-timeline">{phase.timeline}</p>
                    <ul className="project-detail__phase-deliverables">
                      {phase.deliverables.map((deliverable, j) => (
                        <li key={j}>{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Services */}
        <aside className="project-detail__services">
          <h3>{data.servicesLabel}</h3>
          <ul>
            {projectData.services.map((service, i) => (
              <li key={i}>{service}</li>
            ))}
          </ul>
        </aside>

        {/* NEW: Related Solution */}
        {projectData.category && (
          <section className="project-detail__related-solution">
            <h3>{language === "de" ? "Teil der Solution" : "Part of Solution"}</h3>
            <Link
              href={localizePath(`/solutions/${projectData.category}`, language)}
              className="project-detail__solution-link"
            >
              <TextEffect variant="ellipseAuto" trigger="hover">
                {projectData.category.split('-').map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
                <i aria-hidden className="cta-icon rotate-45">↗</i>
              </TextEffect>
            </Link>
          </section>
        )}

        {/* NEW: Pricing */}
        {projectData.pricing && (
          <section className="project-detail__pricing">
            <h2>{language === "de" ? "Preise" : "Pricing"}</h2>
            <div className="project-detail__pricing-breakdown">
              {/* Setup Pricing */}
              {projectData.pricing.setup && (
                <div className="project-detail__pricing-group">
                  <h3>{language === "de" ? "Einmalige Einrichtung" : "One-time Setup"}</h3>
                  <div className="project-detail__pricing-tiers">
                    {projectData.pricing.setup.starter && (
                      <div className="project-detail__pricing-tier">
                        <h4>{language === "de" ? "Starter" : "Starter"}</h4>
                        <p className="project-detail__pricing-price">{projectData.pricing.setup.starter}</p>
                      </div>
                    )}
                    {projectData.pricing.setup.professional && (
                      <div className="project-detail__pricing-tier project-detail__pricing-tier--recommended">
                        <span className="project-detail__pricing-badge">
                          {language === "de" ? "Empfohlen" : "Recommended"}
                        </span>
                        <h4>{language === "de" ? "Professional" : "Professional"}</h4>
                        <p className="project-detail__pricing-price">{projectData.pricing.setup.professional}</p>
                      </div>
                    )}
                    {projectData.pricing.setup.enterprise && (
                      <div className="project-detail__pricing-tier">
                        <h4>{language === "de" ? "Enterprise" : "Enterprise"}</h4>
                        <p className="project-detail__pricing-price">{projectData.pricing.setup.enterprise}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* Monthly Costs */}
              {projectData.pricing.monthly && (
                <div className="project-detail__pricing-group">
                  <h3>{language === "de" ? "Monatliche Kosten" : "Monthly Costs"}</h3>
                  <p className="project-detail__pricing-monthly">{projectData.pricing.monthly.tools}</p>
                  {projectData.pricing.monthly.breakdown && (
                    <p className="project-detail__pricing-breakdown-text">{projectData.pricing.monthly.breakdown}</p>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

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

        {/* NEW: FAQ Section */}
        {projectData.faq && projectData.faq.length > 0 && (
          <section className="project-detail__faq" aria-labelledby={`${baseId}-faq-title`}>
            <h2 id={`${baseId}-faq-title`}>FAQ</h2>
            <Accordion
              items={projectData.faq}
              ariaLabel={language === "de" ? "FAQ Akkordeon" : "FAQ Accordion"}
              name={`project-faq-${slug}`}
            />
          </section>
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
                className="cta-link inline-flex"
              >
                <i aria-hidden className="cta-icon rotate-225">↗</i>
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
                className="cta-link inline-flex"
              >
                {data.nextProject}
                <i aria-hidden className="cta-icon rotate-45">↗</i>
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
    </>
  );
}
