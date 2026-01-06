"use client";

import Link from "next/link";
import CountUp from "@/components/CountUp";
import BookCTA from "@/components/BookCTA";
import TextEffect from "@/components/TextEffect";
import useLanguage from "@/hooks/useLanguage";

const PROJECTS_PREVIEW_COPY = {
  de: {
    sectionTitle: "ausgewählte projekte",
    viewAll: "alle projekte ansehen",
    industryLabel: "branche",
    clientLabel: "kunde",
    periodLabel: "zeitraum",
    projects: [
      {
        slug: "stimul-sport-resort",
        title: "von bauchgefühl zu buchungsmaschine",
        tags: ["paid social", "crm", "analytics"],
        client: "stimul sport resort",
        industry: "tourismus & hospitality",
        period: "2015–2022",
        metric: {
          value: 70,
          suffix: "%",
          label: "mehr buchungen",
        },
        teaser: "komplette neuausrichtung der paid-social-strategie mit erstmaligem end-to-end-tracking. hubspot-crm-implementierung und aufbau eines 3-köpfigen marketing-teams.",
        quote: "+70% buchungen in einem jahr sprechen für sich. aber was ihn wirklich auszeichnet: er denkt unternehmerisch, nicht nur in kampagnen.",
        quoteAuthor: "uriyi litkovskyi",
        quoteRole: "geschäftsführer",
      },
      {
        slug: "sunny-bay-hotel",
        title: "von null zur nummer 1",
        tags: ["seo", "social media", "tracking"],
        client: "sunny bay hotel",
        industry: "tourismus & hospitality",
        period: "2009–2015",
        metric: {
          value: 35,
          suffix: "%",
          label: "mehr traffic",
        },
        teaser: "aufbau der ersten digitalen marketing-infrastruktur von grund auf: seo-optimierung, social-media-kanäle, erstes conversion-tracking.",
        quote: "andrii kam zu uns, als wir online praktisch unsichtbar waren. er hat von null angefangen — seo, social media, das erste richtige tracking.",
        quoteAuthor: "helena warlamova",
        quoteRole: "geschäftsführerin",
      },
      {
        slug: "lokale-kmu",
        title: "lokale sichtbarkeit für kmu",
        tags: ["google ads", "local seo", "landing pages"],
        client: "praxen & handwerker",
        industry: "lokale dienstleister",
        period: "2022–heute",
        metric: {
          value: 90,
          suffix: "%",
          label: "suchen online",
        },
        teaser: "maßgeschneiderte strategien für lokale unternehmen: google ads mit präzisem geo-targeting, local seo und landing pages die konvertieren.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
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
        slug: "stimul-sport-resort",
        title: "from gut feeling to booking machine",
        tags: ["paid social", "crm", "analytics"],
        client: "stimul sport resort",
        industry: "tourism & hospitality",
        period: "2015–2022",
        metric: {
          value: 70,
          suffix: "%",
          label: "more bookings",
        },
        teaser: "complete realignment of paid social strategy with first-ever end-to-end tracking. hubspot crm implementation and built a 3-person marketing team.",
        quote: "+70% bookings in one year speaks for itself. but what really sets him apart: he thinks like an entrepreneur, not just in campaigns.",
        quoteAuthor: "uriyi litkovskyi",
        quoteRole: "ceo",
      },
      {
        slug: "sunny-bay-hotel",
        title: "from zero to number one",
        tags: ["seo", "social media", "tracking"],
        client: "sunny bay hotel",
        industry: "tourism & hospitality",
        period: "2009–2015",
        metric: {
          value: 35,
          suffix: "%",
          label: "more traffic",
        },
        teaser: "built the first digital marketing infrastructure from scratch: seo optimization, social media channels, first conversion tracking.",
        quote: "andrii joined us when we were practically invisible online. he started from scratch — seo, social media, the first real tracking setup.",
        quoteAuthor: "helena warlamova",
        quoteRole: "ceo",
      },
      {
        slug: "lokale-kmu",
        title: "local visibility for smes",
        tags: ["google ads", "local seo", "landing pages"],
        client: "practices & tradespeople",
        industry: "local service providers",
        period: "2022–today",
        metric: {
          value: 90,
          suffix: "%",
          label: "search online",
        },
        teaser: "tailored strategies for local businesses: google ads with precise geo-targeting, local seo, and landing pages that convert.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
    ],
    cta: {
      label: "curious? let's talk",
    },
  },
};

function ProjectCard({ projectData, labels, index }) {
  return (
    <article
      className="project-card"
      itemScope
      itemType="https://schema.org/Article"
    >
      <meta itemProp="author" content="Andrii Litkovskyi" />

      <div className="project-card__header">
        <div className="project-card__metric">
          <span className="project-card__metric-value">
            <CountUp
              from={0}
              to={projectData.metric.value}
              separator=","
              direction="up"
              duration={1.5}
              delay={index * 0.2}
            />
            <span className="project-card__metric-suffix">{projectData.metric.suffix}</span>
          </span>
          <span className="project-card__metric-label">{projectData.metric.label}</span>
        </div>
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title" itemProp="headline">
          {projectData.title}
        </h3>

        <p className="project-card__teaser" itemProp="description">
          {projectData.teaser}
        </p>

        <div className="project-card__tags" aria-label="Technologies used">
          {projectData.tags.map((tag) => (
            <span key={tag} className="project-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <footer className="project-card__footer">
        <dl className="project-card__meta">
          <div className="project-card__meta-item">
            <dt>{labels.clientLabel}</dt>
            <dd>{projectData.client}</dd>
          </div>
          <div className="project-card__meta-item">
            <dt>{labels.industryLabel}</dt>
            <dd>{projectData.industry}</dd>
          </div>
          <div className="project-card__meta-item">
            <dt>{labels.periodLabel}</dt>
            <dd>{projectData.period}</dd>
          </div>
        </dl>

        {projectData.quote && (
          <blockquote className="project-card__quote">
            <p>"{projectData.quote}"</p>
            <footer>
              <cite>
                {projectData.quoteAuthor}
                {projectData.quoteRole && (
                  <span className="project-card__quote-role">, {projectData.quoteRole}</span>
                )}
              </cite>
            </footer>
          </blockquote>
        )}
      </footer>
    </article>
  );
}

export default function ProjectsPreview() {
  const { language } = useLanguage();

  const copy = PROJECTS_PREVIEW_COPY[language] ?? PROJECTS_PREVIEW_COPY.en;
  const fallbackCopy = PROJECTS_PREVIEW_COPY.en;

  const sectionTitle = copy.sectionTitle ?? fallbackCopy.sectionTitle;
  const viewAll = copy.viewAll ?? fallbackCopy.viewAll;
  const projects = copy.projects ?? fallbackCopy.projects;
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label;

  const labels = {
    industryLabel: copy.industryLabel ?? fallbackCopy.industryLabel,
    clientLabel: copy.clientLabel ?? fallbackCopy.clientLabel,
    periodLabel: copy.periodLabel ?? fallbackCopy.periodLabel,
  };

  return (
    <section
      className="section projects"
      id="projects"
      aria-label={language === "de" ? "Ausgewählte Projekte" : "Selected Projects"}
    >
      <div className="content">
        <header className="projects__header">
          <h2 className="projects__title">{sectionTitle}</h2>
          <TextEffect
            as={Link}
            href="/projects"
            variant="ellipseAuto"
            trigger="hover"
            className="projects__view-all"
          >
            {viewAll}
            <span aria-hidden="true"> →</span>
          </TextEffect>
        </header>

        <div className="projects__grid">
          {projects.map((projectItem, index) => (
            <ProjectCard
              key={projectItem.slug}
              projectData={projectItem}
              labels={labels}
              index={index}
            />
          ))}
        </div>

        <div className="projects__cta">
          <BookCTA label={ctaLabel} ctaLocation="projects" />
        </div>
      </div>
    </section>
  );
}
