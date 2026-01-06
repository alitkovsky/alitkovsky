"use client";

import { forwardRef, useRef, useState, useEffect, useCallback } from "react";
import CountUp from "@/components/CountUp";
import BookCTA from "@/components/BookCTA";
import BackToStart from "@/components/BackToStart";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import useLanguage from "@/hooks/useLanguage";

const PROJECTS_LIST_COPY = {
  de: {
    pageTitle: "projekte",
    pageSubtitle: "ausgewählte arbeiten mit messbaren ergebnissen",
    breadcrumb: "projekte",
    industryLabel: "branche",
    clientLabel: "kunde",
    periodLabel: "zeitraum",
    problemLabel: "herausforderung",
    solutionLabel: "lösung",
    resultsLabel: "ergebnisse",
    servicesLabel: "leistungen",
    viewDetails: "details ansehen",
    projects: [
      {
        slug: "stimul-sport-resort",
        title: "von bauchgefühl zu buchungsmaschine",
        tags: ["paid social", "crm", "analytics", "team leadership"],
        client: "stimul sport resort",
        industry: "tourismus & hospitality",
        period: "2015–2022",
        metrics: [
          { value: 70, suffix: "%", label: "mehr buchungen yoy" },
          { value: 3, suffix: "", label: "team-mitglieder geführt" },
          { value: 100, suffix: "%", label: "attribution erreicht" },
        ],
        problem: "ein sport-resort mit 150 zimmern kämpfte mit stagnierendem wachstum. werbebudgets wurden ohne klares tracking eingesetzt — niemand wusste, welche kampagnen tatsächlich buchungen brachten. marketing-entscheidungen basierten auf bauchgefühl statt auf daten.",
        solution: "komplette neuausrichtung der paid-social-strategie mit erstmaligem end-to-end-tracking. implementierung von hubspot als crm für lead-management und kundenbindung. aufbau eines marketing-teams von 3 personen mit klaren verantwortlichkeiten. event-marketing-strategie für saisonale auslastung.",
        results: "durch die datengetriebene optimierung stiegen die buchungen um 70% im jahresvergleich. erstmals konnte nachgewiesen werden, welche kampagnen roi liefern. das team arbeitet heute eigenständig nach etablierten prozessen.",
        quote: "+70% buchungen in einem jahr sprechen für sich. aber was ihn wirklich auszeichnet: er denkt unternehmerisch, nicht nur in kampagnen. er hat ein team aufgebaut, prozesse etabliert und immer das große ganze im blick behalten.",
        quoteAuthor: "uriyi litkovskyi",
        quoteRole: "geschäftsführer, stimul sport resort",
      },
      {
        slug: "sunny-bay-hotel",
        title: "von null zur nummer 1",
        tags: ["seo", "social media", "tracking", "infrastruktur"],
        client: "sunny bay hotel",
        industry: "tourismus & hospitality",
        period: "2009–2015",
        metrics: [
          { value: 35, suffix: "%", label: "mehr website-traffic" },
          { value: 20, suffix: "%", label: "umsatzsteigerung" },
          { value: 1, suffix: ".", label: "digitale infrastruktur" },
        ],
        problem: "ein traditionsreiches hotel war online praktisch unsichtbar. keine website-optimierung, kein social media, kein tracking. potenzielle gäste fanden den wettbewerb statt uns. die digitale transformation stand noch ganz am anfang.",
        solution: "aufbau der ersten digitalen marketing-infrastruktur von grund auf: technische seo-optimierung der website, einrichtung und pflege der social-media-kanäle, implementierung des ersten conversion-trackings. schulung des teams in grundlagen des online-marketings.",
        results: "innerhalb von zwei jahren stieg der website-traffic um 35%. datenbasierte social-media-kampagnen führten zu 20% umsatzwachstum. das hotel wurde online sichtbar und generierte erstmals messbare anfragen über digitale kanäle.",
        quote: "andrii kam zu uns, als wir online praktisch unsichtbar waren. er hat von null angefangen — seo, social media, das erste richtige tracking. nach zwei jahren hatten wir 35% mehr website-traffic und einen messbaren umsatzanstieg.",
        quoteAuthor: "helena warlamova",
        quoteRole: "geschäftsführerin, sunny bay hotel",
      },
      {
        slug: "lokale-kmu",
        title: "lokale sichtbarkeit für kmu",
        tags: ["google ads", "local seo", "landing pages", "web analytics"],
        client: "praxen & handwerker",
        industry: "lokale dienstleister",
        period: "2022–heute",
        metrics: [
          { value: 90, suffix: "%", label: "der kunden suchen online" },
          { value: 30, suffix: "%", label: "finden ärzte über google" },
          { value: 100, suffix: "%", label: "transparenz im reporting" },
        ],
        problem: "lokale unternehmen — von der zahnarztpraxis bis zum handwerksbetrieb — verlieren täglich potenzielle kunden an besser aufgestellte konkurrenten. 90% der kunden recherchieren online, bevor sie einen dienstleister kontaktieren. wer hier nicht sichtbar ist, existiert nicht.",
        solution: "maßgeschneiderte strategien für lokale unternehmen: google ads mit präzisem geo-targeting für sofortige sichtbarkeit, local seo für nachhaltige organische präsenz, landing pages die besucher in anfragen verwandeln. monatliches reporting mit klaren kpis — keine blackbox.",
        results: "lokale unternehmen erreichen ihre zielgruppe dort, wo sie suchen. durch die kombination aus bezahlter werbung und organischer optimierung entstehen nachhaltige lead-quellen. jeder marketing-euro ist nachvollziehbar und messbar.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
    ],
    cta: {
      label: "projekt besprechen",
    },
    backLabel: "zurück zur startseite",
  },
  en: {
    pageTitle: "projects",
    pageSubtitle: "selected projects with measurable results",
    breadcrumb: "projects",
    industryLabel: "industry",
    clientLabel: "client",
    periodLabel: "period",
    problemLabel: "challenge",
    solutionLabel: "solution",
    resultsLabel: "results",
    servicesLabel: "services",
    viewDetails: "view details",
    projects: [
      {
        slug: "stimul-sport-resort",
        title: "from gut feeling to booking machine",
        tags: ["paid social", "crm", "analytics", "team leadership"],
        client: "stimul sport resort",
        industry: "tourism & hospitality",
        period: "2015–2022",
        metrics: [
          { value: 70, suffix: "%", label: "more bookings yoy" },
          { value: 3, suffix: "", label: "team members led" },
          { value: 100, suffix: "%", label: "attribution achieved" },
        ],
        problem: "a 150-room sport resort was struggling with stagnant growth. ad budgets were spent without clear tracking — no one knew which campaigns actually drove bookings. marketing decisions were based on gut feeling instead of data.",
        solution: "complete realignment of paid social strategy with first-ever end-to-end tracking. hubspot crm implementation for lead management and customer retention. built a marketing team of 3 with clear responsibilities. event marketing strategy for seasonal occupancy.",
        results: "data-driven optimization increased bookings by 70% year-over-year. for the first time, we could prove which campaigns delivered roi. the team now works independently following established processes.",
        quote: "+70% bookings in one year speaks for itself. but what really sets him apart: he thinks like an entrepreneur, not just in campaigns. he built a team, established processes, and always kept the big picture in mind.",
        quoteAuthor: "uriyi litkovskyi",
        quoteRole: "ceo, stimul sport resort",
      },
      {
        slug: "sunny-bay-hotel",
        title: "from zero to number one",
        tags: ["seo", "social media", "tracking", "infrastructure"],
        client: "sunny bay hotel",
        industry: "tourism & hospitality",
        period: "2009–2015",
        metrics: [
          { value: 35, suffix: "%", label: "more website traffic" },
          { value: 20, suffix: "%", label: "revenue growth" },
          { value: 1, suffix: "st", label: "digital infrastructure" },
        ],
        problem: "a traditional hotel was practically invisible online. no website optimization, no social media, no tracking. potential guests found competitors instead. the digital transformation was just beginning.",
        solution: "built the first digital marketing infrastructure from scratch: technical seo optimization of the website, setup and management of social media channels, implementation of first conversion tracking. trained the team in online marketing fundamentals.",
        results: "within two years, website traffic increased by 35%. data-driven social media campaigns led to 20% revenue growth. the hotel became visible online and generated measurable inquiries through digital channels for the first time.",
        quote: "andrii joined us when we were practically invisible online. he started from scratch — seo, social media, the first real tracking setup. two years later, we had 35% more website traffic and measurable revenue growth.",
        quoteAuthor: "helena warlamova",
        quoteRole: "ceo, sunny bay hotel",
      },
      {
        slug: "lokale-kmu",
        title: "local visibility for smes",
        tags: ["google ads", "local seo", "landing pages", "web analytics"],
        client: "practices & tradespeople",
        industry: "local service providers",
        period: "2022–today",
        metrics: [
          { value: 90, suffix: "%", label: "of customers search online" },
          { value: 30, suffix: "%", label: "find doctors via google" },
          { value: 100, suffix: "%", label: "transparency in reporting" },
        ],
        problem: "local businesses — from dental practices to trade businesses — lose potential customers daily to better-positioned competitors. 90% of customers research online before contacting a service provider. if you're not visible here, you don't exist.",
        solution: "tailored strategies for local businesses: google ads with precise geo-targeting for immediate visibility, local seo for sustainable organic presence, landing pages that convert visitors into inquiries. monthly reporting with clear kpis — no black box.",
        results: "local businesses reach their target audience where they search. the combination of paid advertising and organic optimization creates sustainable lead sources. every marketing euro is traceable and measurable.",
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
    ],
    cta: {
      label: "discuss your project",
    },
    backLabel: "back to homepage",
  },
};

const ProjectListCard = forwardRef(function ProjectListCard({ project, labels, index }, ref) {
  return (
    <article
      className="projects-list-card"
      id={project.slug}
      ref={ref}
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
          <div className="projects-list-card__tags">
            {project.tags.map((tag) => (
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

      {/* Meta info */}
      <dl className="projects-list-card__meta">
        <div className="projects-list-card__meta-item">
          <dt>{labels.clientLabel}</dt>
          <dd>{project.client}</dd>
        </div>
        <div className="projects-list-card__meta-item">
          <dt>{labels.industryLabel}</dt>
          <dd>{project.industry}</dd>
        </div>
        <div className="projects-list-card__meta-item">
          <dt>{labels.periodLabel}</dt>
          <dd>{project.period}</dd>
        </div>
      </dl>

      {/* Content sections */}
      <div className="projects-list-card__content">
        <section className="projects-list-card__section">
          <h3>{labels.problemLabel}</h3>
          <p itemProp="description">{project.problem}</p>
        </section>

        <section className="projects-list-card__section">
          <h3>{labels.solutionLabel}</h3>
          <p>{project.solution}</p>
        </section>

        <section className="projects-list-card__section">
          <h3>{labels.resultsLabel}</h3>
          <p>{project.results}</p>
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
});

export default function ProjectsList() {
  const { language } = useLanguage();

  const copy = PROJECTS_LIST_COPY[language] ?? PROJECTS_LIST_COPY.en;
  const fallbackCopy = PROJECTS_LIST_COPY.en;

  const pageTitle = copy.pageTitle ?? fallbackCopy.pageTitle;
  const pageSubtitle = copy.pageSubtitle ?? fallbackCopy.pageSubtitle;
  const breadcrumb = copy.breadcrumb ?? fallbackCopy.breadcrumb;
  const projects = copy.projects ?? fallbackCopy.projects;
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label;
  const backLabel = copy.backLabel ?? fallbackCopy.backLabel;

  const labels = {
    industryLabel: copy.industryLabel ?? fallbackCopy.industryLabel,
    clientLabel: copy.clientLabel ?? fallbackCopy.clientLabel,
    periodLabel: copy.periodLabel ?? fallbackCopy.periodLabel,
    problemLabel: copy.problemLabel ?? fallbackCopy.problemLabel,
    solutionLabel: copy.solutionLabel ?? fallbackCopy.solutionLabel,
    resultsLabel: copy.resultsLabel ?? fallbackCopy.resultsLabel,
    servicesLabel: copy.servicesLabel ?? fallbackCopy.servicesLabel,
  };

  // Folder scroll refs and state
  const folderRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const projectRefs = useRef([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isScrolledEnd, setIsScrolledEnd] = useState(false);

  // Check if folder is in "sticky" position (at top of viewport)
  const isFolderActive = useCallback(() => {
    const folder = folderRef.current;
    if (!folder) return false;
    const rect = folder.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom > window.innerHeight;
  }, []);

  // Check if scroll container has reached the end
  const isAtScrollEnd = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return false;
    return container.scrollTop + container.clientHeight >= container.scrollHeight - 5;
  }, []);

  // Wheel event handler - hijack scroll when folder is active
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isFolderActive()) return;

      const container = scrollContainerRef.current;
      if (!container) return;

      const atEnd = isAtScrollEnd();
      const atStart = container.scrollTop <= 0;

      // Scrolling down but not at end - capture scroll
      if (e.deltaY > 0 && !atEnd) {
        e.preventDefault();
        container.scrollTop += e.deltaY;
      }
      // Scrolling up but not at start - capture scroll
      else if (e.deltaY < 0 && !atStart) {
        e.preventDefault();
        container.scrollTop += e.deltaY;
      }
      // Otherwise, let page scroll normally
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isFolderActive, isAtScrollEnd]);

  // Touch scroll handling for mobile
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isFolderActive()) return;

      const container = scrollContainerRef.current;
      if (!container) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;

      const atEnd = isAtScrollEnd();
      const atStart = container.scrollTop <= 0;

      if ((deltaY > 0 && !atEnd) || (deltaY < 0 && !atStart)) {
        e.preventDefault();
        container.scrollTop += deltaY;
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isFolderActive, isAtScrollEnd]);

  // Update active project based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Update scroll end state
      setIsScrolledEnd(isAtScrollEnd());

      // Find active project (first one still visible)
      for (let i = 0; i < projectRefs.current.length; i++) {
        const projectEl = projectRefs.current[i];
        if (!projectEl) continue;

        const rect = projectEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // If project's bottom is below container top + tab height
        if (rect.bottom > containerRect.top + 60) {
          setActiveProjectIndex(i);
          break;
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isAtScrollEnd]);

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

        <div
          className={`projects-list__folder ${isScrolledEnd ? 'is--scrolled-end' : ''}`}
          ref={folderRef}
        >
          <div className="projects-list__folder-tab">
            <span className="projects-list__folder-tab-index">
              {String(activeProjectIndex + 1).padStart(2, '0')}
            </span>
            <span className="projects-list__folder-tab-name">
              {projects[activeProjectIndex]?.title}
            </span>
            <svg
              className="projects-list__folder-tab-edge"
              viewBox="0 0 40 40"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0,40h40L6.5,2.7C5.1,1.1,3.1,0,0,0v40Z" />
            </svg>
          </div>
          <div className="projects-list__folder-content">
            <div className="projects-list__folder-scroll" ref={scrollContainerRef}>
              <div className="projects-list__list">
                {projects.map((project, index) => (
                  <ProjectListCard
                    key={project.slug}
                    project={project}
                    labels={labels}
                    index={index}
                    ref={(el) => { projectRefs.current[index] = el; }}
                  />
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
