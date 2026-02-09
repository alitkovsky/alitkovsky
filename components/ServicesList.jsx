"use client";

import Link from "next/link";
import CountUp from "@/components/CountUp";
import BookCTA from "@/components/BookCTA";
import TextEffect from "@/components/TextEffect";
import Footer from "@/components/Footer";
import useLanguage from "@/hooks/useLanguage";
import { getAllSystems, getSystemsPageCopy } from "@/data/systems";

function ServiceCard({ service, index }) {
  return (
    <article className="services-list__card">
      <Link href={`/solutions/${service.slug}`} className="services-list__card-link">
        <header className="services-list__card-header">
          <h2 className="services-list__card-title">{service.title}</h2>
          <p className="services-list__card-subtitle">{service.subtitle}</p>
        </header>

        <div className="services-list__card-metrics">
          {service.metrics.slice(0, 2).map((metric, i) => (
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

        <p className="services-list__card-description">{service.description}</p>

        <span className="services-list__card-cta">
          <TextEffect
            as="span"
            variant="ellipseAuto"
            trigger="hover"
            className="services-list__link-cta"
          >
            {service.cta.label}
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
  const systems = getAllSystems(language);

  return (
    <section className="section services-list">
      <div className="content">
        {/* Header */}
        <header className="services-list__header">
          <h1 className="services-list__title">{copy.pageTitle}</h1>
          <p className="services-list__subtitle">{copy.pageSubtitle}</p>
        </header>

        {/* Services grid */}
        <div className="services-list__grid">
          {systems.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
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
