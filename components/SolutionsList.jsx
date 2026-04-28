"use client";

import Link from "next/link";
import CountUp from "@/components/CountUp";
import BookCTA from "@/components/BookCTA";
import TextEffect from "@/components/TextEffect";
import Footer from "@/components/Footer";
import useLanguage from "@/hooks/useLanguage";
import { getAllSystems, getSystemsPageCopy } from "@/data/solutions";
import { localizePath } from "@/lib/localeRouting";

function SolutionCard({ solution, index, language }) {
  const solutionHref = localizePath(`/solutions/${solution.slug}`, language);

  return (
    <article className="services-list__card">
      <Link href={solutionHref} className="services-list__card-link">
        <header className="services-list__card-header">
          <h2 className="services-list__card-title">{solution.title}</h2>
          <p className="services-list__card-subtitle">{solution.subtitle}</p>

          {/* NEW: Badges for modules count and timeline */}
          {solution.modules && solution.modules.length > 0 && (
            <div className="services-list__card-badges">
              <span className="badge badge--modules">
                {solution.modules.length} {language === "de" ? "Module" : "Modules"}
              </span>
              {solution.modules[0]?.timeline && (
                <span className="badge badge--timeline">{solution.modules[0].timeline}</span>
              )}
            </div>
          )}
        </header>

        <div className="services-list__card-metrics">
          {solution.metrics.slice(0, 2).map((metric, i) => (
            <div key={i} className="services-list__card-metric">
              <span className="services-list__card-metric-value">
                <CountUp
                  from={0}
                  to={metric.value}
                  separator=","
                  direction="up"
                  duration={1.5}
                  delay={index * 0.1 + i * 0.15}
                />
                <span className="services-list__card-metric-suffix">{metric.suffix}</span>
              </span>
              <span className="services-list__card-metric-label">{metric.label}</span>
            </div>
          ))}
        </div>

        <p className="services-list__card-description">{solution.description}</p>

        {/* NEW: Display modules (Super-Workflows) */}
        {solution.modules && solution.modules.length > 0 && (
          <div className="services-list__card-modules">
            {solution.modules.slice(0, 2).map((module, i) => (
              <div key={i} className="services-list__module">
                <h4 className="services-list__module-name">{module.name}</h4>
                <p className="services-list__module-description">{module.descriptionShort}</p>
                {module.roi && (
                  <span className="badge badge--roi">{module.roi} ROI</span>
                )}
              </div>
            ))}
            {solution.modules.length > 2 && (
              <p className="services-list__modules-more">
                +{solution.modules.length - 2} {language === "de" ? "weitere" : "more"}
              </p>
            )}
          </div>
        )}

        <span className="services-list__card-cta">
          <TextEffect
            as="span"
            variant="ellipseAuto"
            trigger="hover"
            className="services-list__link-cta"
          >
            {solution.cta.label}
            <i aria-hidden className="services-list__cta rotate-45">↗</i>
          </TextEffect>
        </span>
      </Link>
    </article>
  );
}

export default function ServicesList() {
  const { language } = useLanguage();
  const copy = getSystemsPageCopy(language);
  const solutions = getAllSystems(language);

  return (
    <section className="section services-list">
      <div className="content">
        {/* Header */}
        <header className="services-list__header">
          <h1 className="services-list__title">{copy.pageTitle}</h1>
          <p className="services-list__subtitle">{copy.pageSubtitle}</p>
        </header>

        {/* Solutions grid */}
        <div className="services-list__grid">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.slug} solution={solution} index={index} language={language} />
          ))}
        </div>

        {/* CTA */}
        <div className="services-list__cta-bottom">
          <BookCTA label={copy.cta.label} ctaLocation="services-list" />
        </div>
      </div>

      <Footer />
    </section>
  );
}
