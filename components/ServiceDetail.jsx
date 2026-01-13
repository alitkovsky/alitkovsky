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
import { SERVICES_DATA, getServiceBySlug, getServicesPageCopy } from "@/data/services";

// Re-export for backwards compatibility
export { SERVICES_DATA, getServiceBySlug, getServicesPageCopy };

export default function ServiceDetail({ slug }) {
  const { language } = useLanguage();
  const baseId = useId();

  const copy = getServicesPageCopy(language);
  const serviceData = getServiceBySlug(slug, language);

  if (!serviceData) {
    return null;
  }

  return (
    <section className="section service-detail">
      <div className="content">
        <div className="service-detail__nav-top">
          <Breadcrumb pageName={serviceData.title} pageUrl={`/leistungen/${slug}`} />
          {/* Back link */}
          <nav>
            <TextEffect
              as={Link}
              href="/leistungen"
              variant="ellipseAuto"
              trigger="hover"
              className="service-detail__back-link"
            >
              <i aria-hidden className="cta-icon rotate-225">↗</i>
              {copy.backToServices}
            </TextEffect>
          </nav>
        </div>

        {/* Hero section */}
        <header className="service-detail__hero">
          <div className="service-detail__hero-content">
            <h1 className="service-detail__title">{serviceData.title}</h1>
            <p className="service-detail__subtitle">{serviceData.subtitle}</p>
            <p className="service-detail__tagline">{serviceData.heroTagline}</p>
            <p className="service-detail__description">{serviceData.description}</p>
          </div>

          <div className="service-detail__metrics">
            {serviceData.metrics.map((metric, i) => (
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

        {/* Main content grid */}
        <div className="service-detail__body">
          {/* What's included */}
          <section className="service-detail__section">
            <h2>{copy.whatIncluded}</h2>
            <ul className="service-detail__list">
              {serviceData.whatIncluded.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Who is it for */}
          <section className="service-detail__section">
            <h2>{copy.whoIsItFor}</h2>
            <ul className="service-detail__list">
              {serviceData.whoIsItFor.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Expected results */}
          <section className="service-detail__section">
            <h2>{copy.expectedResults}</h2>
            <ul className="service-detail__list service-detail__list--results">
              {serviceData.expectedResults.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Related project */}
        {serviceData.relatedProject && (
          <aside className="service-detail__related-project">
            <h3>{copy.relatedProject}</h3>
            <Link href={`/projects/${serviceData.relatedProject.slug}`} className="service-detail__project-card">
              <span className="service-detail__project-title">{serviceData.relatedProject.title}</span>
              <span className="service-detail__project-metric">{serviceData.relatedProject.metric}</span>
            </Link>
          </aside>
        )}

        {/* FAQ Section */}
        {serviceData.faq && serviceData.faq.length > 0 && (
          <section className="service-detail__faq" aria-labelledby={`${baseId}-faq-title`}>
            <h2 id={`${baseId}-faq-title`}>faq</h2>
            <Accordion
              items={serviceData.faq}
              ariaLabel={language === "de" ? "FAQ Akkordeon" : "FAQ Accordion"}
              name={`service-faq-${slug}`}
            />
          </section>
        )}

        {/* CTA */}
        <div className="service-detail__cta">
          <BookCTA label={serviceData.cta.label} ctaLocation={`service-${slug}`} />
        </div>

        <div className="service-detail__back">
          <BackToStart
            label={copy.backToServices}
            url="/leistungen"
            ctaLocation={`service-${slug}`}
          />
        </div>
      </div>

      <Footer />
    </section>
  );
}
