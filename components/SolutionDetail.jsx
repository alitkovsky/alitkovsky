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
import { SYSTEMS_DATA, getSystemBySlug, getSystemsPageCopy } from "@/data/solutions";
import { localizePath } from "@/lib/localeRouting";

// Re-export for backwards compatibility
export { SYSTEMS_DATA, getSystemBySlug, getSystemsPageCopy };

export default function ServiceDetail({ slug }) {
  const { language } = useLanguage();
  const baseId = useId();

  const copy = getSystemsPageCopy(language);
  const backToOverviewLabel = copy.backToSystems ?? copy.backToServices;
  const solutionData = getSystemBySlug(slug, language);

  if (!solutionData) {
    return null;
  }

  // Generate Schema.org structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": solutionData.title,
    "description": solutionData.description,
    "provider": {
      "@type": "Person",
      "name": "Andrii Litkovskyi",
      "url": "https://alitkovsky.de",
    },
    "serviceType": "Workflow Automation",
    "areaServed": {
      "@type": "Place",
      "name": "Germany",
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `https://alitkovsky.de/solutions/${slug}`,
    },
    "category": solutionData.slug,
    "offers": solutionData.pricing ? Object.entries(solutionData.pricing).map(([key, tier]) => ({
      "@type": "Offer",
      "name": tier.label,
      "description": tier.description,
      "price": tier.price,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
    })) : [],
    "aggregateRating": solutionData.metrics && solutionData.metrics.length > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "reviewCount": "12",
    } : undefined,
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="section service-detail">
        <div className="content">
        <div className="service-detail__nav-top">
          <Breadcrumb pageName={solutionData.title} pageUrl={`/solutions/${slug}`} />
          {/* Back link */}
          <nav>
            <TextEffect
              as={Link}
              href="/solutions"
              variant="ellipseAuto"
              trigger="hover"
              className="service-detail__back-link"
            >
              <i aria-hidden className="cta-icon rotate-225">↗</i>
              {backToOverviewLabel}
            </TextEffect>
          </nav>
        </div>

        {/* Hero section */}
        <header className="service-detail__hero">
          <div className="service-detail__hero-content">
            <h1 className="service-detail__title">{solutionData.title}</h1>
            <p className="service-detail__subtitle">{solutionData.subtitle}</p>
            <p className="service-detail__tagline">{solutionData.heroTagline}</p>
            <p className="service-detail__description">{solutionData.description}</p>
          </div>

          <div className="service-detail__metrics">
            {solutionData.metrics.map((metric, i) => (
              <div key={i} className="service-detail__metric">
                <span className="service-detail__metric-value">
                  <CountUp
                    from={0}
                    to={metric.value}
                    separator=","
                    direction="up"
                    duration={1.5}
                    delay={i * 0.2}
                  />
                  <span className="service-detail__metric-suffix">{metric.suffix}</span>
                </span>
                <span className="service-detail__metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* NEW: Modules Section (Super-Workflows) */}
        {solutionData.modules && solutionData.modules.length > 0 && (
          <section className="service-detail__modules">
            <h2>{language === "de" ? "Super-Workflow Module" : "Super-Workflow Modules"}</h2>
            <div className="service-detail__modules-grid">
              {solutionData.modules.map((module, i) => (
                <article key={i} className="service-detail__module-card">
                  <div className="service-detail__module-header">
                    <h3>{module.name}</h3>
                    <div className="service-detail__module-badges">
                      {module.status && (
                        <span className="badge badge--status">{module.status}</span>
                      )}
                      {module.roi && (
                        <span className="badge badge--roi">{module.roi} ROI</span>
                      )}
                      {module.timeline && (
                        <span className="badge badge--timeline">{module.timeline}</span>
                      )}
                    </div>
                  </div>
                  <p className="service-detail__module-description">{module.description}</p>
                  {solutionData.relatedProjects && solutionData.relatedProjects.includes(module.slug) && (
                    <Link
                      href={localizePath(`/projects/${module.slug}`, language)}
                      className="service-detail__module-link"
                    >
                      <TextEffect variant="ellipseAuto" trigger="hover">
                        {language === "de" ? "Details ansehen" : "View details"}
                        <i aria-hidden className="cta-icon rotate-45">↗</i>
                      </TextEffect>
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* NEW: Technology Stack */}
        {solutionData.technology && (
          <section className="service-detail__technology">
            <h2>{language === "de" ? "Technologie-Stack" : "Technology Stack"}</h2>
            <div className="service-detail__tech-grid">
              {Object.entries(solutionData.technology).map(([key, tech]) => (
                <div key={key} className="service-detail__tech-item">
                  <h4>{tech.name}</h4>
                  <p className="service-detail__tech-cost">{tech.cost}</p>
                  <p className="service-detail__tech-description">{tech.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* NEW: Implementation Phases */}
        {solutionData.phases && solutionData.phases.length > 0 && (
          <section className="service-detail__phases">
            <h2>{language === "de" ? "Implementierungs-Phasen" : "Implementation Phases"}</h2>
            <div className="service-detail__phases-timeline">
              {solutionData.phases.map((phase, i) => (
                <article key={i} className="service-detail__phase">
                  <div className="service-detail__phase-number">{phase.number}</div>
                  <div className="service-detail__phase-content">
                    <h3>{phase.title}</h3>
                    <p className="service-detail__phase-timeline">{phase.duration}</p>
                    <ul className="service-detail__phase-deliverables">
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

        {/* NEW: Pricing */}
        {solutionData.pricing && (
          <section className="service-detail__pricing">
            <h2>{language === "de" ? "Preise" : "Pricing"}</h2>
            <div className="service-detail__pricing-grid">
              {Object.entries(solutionData.pricing).map(([key, tier]) => (
                <article
                  key={key}
                  className={`service-detail__pricing-card ${tier.recommended ? 'is--recommended' : ''}`}
                >
                  {tier.recommended && (
                    <span className="service-detail__pricing-badge">
                      {language === "de" ? "Empfohlen" : "Recommended"}
                    </span>
                  )}
                  <h3>{tier.label}</h3>
                  <p className="service-detail__pricing-price">{tier.price}</p>
                  <p className="service-detail__pricing-description">{tier.description}</p>
                  {tier.includes && tier.includes.length > 0 && (
                    <ul className="service-detail__pricing-includes">
                      {tier.includes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Main content grid */}
        <div className="service-detail__body">
          {/* What's included */}
          <section className="service-detail__section">
            <h2>{copy.whatIncluded}</h2>
            <ul className="service-detail__list">
              {solutionData.whatIncluded.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Who is it for */}
          <section className="service-detail__section">
            <h2>{copy.whoIsItFor}</h2>
            <ul className="service-detail__list">
              {solutionData.whoIsItFor.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Expected results */}
          <section className="service-detail__section">
            <h2>{copy.expectedResults}</h2>
            <ul className="service-detail__list service-detail__list--results">
              {solutionData.expectedResults.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* NEW: Related Projects (multiple Super-Workflows) */}
        {solutionData.relatedProjects && solutionData.relatedProjects.length > 0 && (
          <section className="service-detail__related-projects">
            <h2>{language === "de" ? "Verwandte Projekte" : "Related Projects"}</h2>
            <div className="service-detail__projects-grid">
              {solutionData.relatedProjects.map((projectSlug, i) => (
                <Link
                  key={i}
                  href={localizePath(`/projects/${projectSlug}`, language)}
                  className="service-detail__project-card"
                >
                  <TextEffect variant="ellipseAuto" trigger="hover">
                    {projectSlug.split('-').map(word =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                    <i aria-hidden className="cta-icon rotate-45">↗</i>
                  </TextEffect>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {solutionData.faq && solutionData.faq.length > 0 && (
          <section className="service-detail__faq" aria-labelledby={`${baseId}-faq-title`}>
            <h2 id={`${baseId}-faq-title`}>FAQ</h2>
            <Accordion
              items={solutionData.faq}
              ariaLabel={language === "de" ? "FAQ Akkordeon" : "FAQ Accordion"}
              name={`solution-faq-${slug}`}
            />
          </section>
        )}

        {/* CTA */}
        <div className="service-detail__cta">
          <BookCTA label={solutionData.cta.label} ctaLocation={`solution-${slug}`} />
        </div>

        <div className="service-detail__back">
          <BackToStart
            label={backToOverviewLabel}
            url="/solutions"
            ctaLocation={`solution-${slug}`}
          />
        </div>
      </div>

      <Footer />
      </section>
    </>
  );
}
