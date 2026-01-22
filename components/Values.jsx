"use client";

import TextEffect from "@/components/TextEffect";
import LogoLoop from "@/components/LogoLoop";
import BookCTA from "@/components/BookCTA";
import ToolList from "@/components/ToolList";

import useLanguage from "@/hooks/useLanguage";

import {
  SiGoogleanalytics,
  SiHubspot,
  SiLinkedin,
  SiN8N,
  SiMake,
  SiShopify,
  SiAirtable,
  SiBrevo,
  SiGoogleads,
  SiGoogletagmanager,
  SiMeta,
  SiWordpress,
  SiWoo
} from "react-icons/si";

// Custom inline SVG components if needed, or just use react-icons
// We can remove the custom CmiLogo/EfsetLogo/TelcLogo if we are fully replacing with Tech Stack.

const systemToolLogos = [
  // Control Center
  { node: <SiHubspot />, title: "HubSpot", aspectRatio: "1 / 1" },
  { node: <SiBrevo />, title: "Brevo", aspectRatio: "1 / 1" },
  { node: <SiN8N />, title: "n8n", aspectRatio: "1 / 1" },
  { node: <SiMake />, title: "Make.com", aspectRatio: "1 / 1" },
  { node: <SiAirtable />, title: "Airtable", aspectRatio: "1 / 1" },

  // Growth Engine
  { node: <SiShopify />, title: "Shopify", aspectRatio: "1 / 1" },
  { node: <SiWoo />, title: "WooCommerce", aspectRatio: "1 / 1" },
  { node: <SiWordpress />, title: "WordPress", aspectRatio: "1 / 1" },
  { node: <SiMeta />, title: "Meta Ads", aspectRatio: "1 / 1" },
  { node: <SiLinkedin />, title: "LinkedIn Ads", aspectRatio: "1 / 1" },

  // Intelligence Hub
  { node: <SiGoogleanalytics />, title: "Google Analytics 4", aspectRatio: "1 / 1" },
  { node: <SiGoogletagmanager />, title: "Google Tag Manager", aspectRatio: "1 / 1" },
  { node: <SiGoogleads />, title: "Google Ads", aspectRatio: "1 / 1" },
];

const VALUES_COPY = {
  de: {
    title: {
      transparent: "transparent",
      handsOn: "systematisch",
      eyeLevel: "skalierbar",
      local: "zukunftssicher",
    },
    description: "keine bauchgefühle, sondern infrastruktur. ich baue marketing-systeme, die funktionieren — egal ob du urlaub machst oder schläfst. von der daten-erfassung über crm-automatisierung bis hin zu profitablen kampagnen. mein 'tech stack' ist dein wettbewerbsvorteil.",
    label: "was meine systeme für kunden leisten:",
    results: [
      {
        counter: "+48%",
        title: "sichtbarkeit",
      },
      {
        counter: "+35%",
        title: "conversions",
      },
      {
        counter: "100%",
        title: "daten-kontrolle",
      },
      {
        counter: "-22%",
        title: "manuelle arbeit",
      },
    ],
    expertiseTitle: "mein system stack", // Changed from "meine zertifizierungen"
    toolsTitle: "meine werkzeuge", // This might be redundant if we merge everything. Let's keep one section for the Stack maruqee.
    logosLabel: "technologien",
    cta: {
      label: "ist dein stack bereit? lass uns reden",
    },
  },
  en: {
    title: {
      transparent: "transparent",
      handsOn: "systematic",
      eyeLevel: "scalable",
      local: "future-proof",
    },
    description: "no gut feelings, just infrastructure. i build marketing systems that work — whether you're on vacation or sleeping. from data capture to crm automation to profitable campaigns. my 'tech stack' is your competitive advantage.",
    label: "what my systems deliver for clients:",
    results: [
      {
        counter: "+48%",
        title: "visibility",
      },
      {
        counter: "+35%",
        title: "conversions",
      },
      {
        counter: "100%",
        title: "data control",
      },
      {
        counter: "—22%",
        title: "manual work",
      },
    ],
    expertiseTitle: "my system stack",
    toolsTitle: "my toolkit",
    logosLabel: "technologies",
    cta: {
      label: "is your stack ready? let's talk",
    },
  },
};

export default function Values() {
  const { language } = useLanguage();

  const copy = VALUES_COPY[language] ?? VALUES_COPY.en;
  const fallbackCopy = VALUES_COPY.en;

  const titleCopy = copy.title ?? fallbackCopy.title;
  const description = copy.description ?? fallbackCopy.description ?? "";
  const resultsLabel = copy.label ?? fallbackCopy.label ?? "";
  const results = copy.results ?? fallbackCopy.results ?? [];
  const expertiseTitle = copy.expertiseTitle ?? fallbackCopy.expertiseTitle ?? "my system stack";
  const logosLabel = copy.logosLabel ?? fallbackCopy.logosLabel ?? "Technologies";
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label ?? "book a free call";

  return (
    <section className="section values" id="values">
      <div className="content">
        <div className="title">
          <h2>{titleCopy.transparent}</h2>
          <h2>{titleCopy.handsOn}</h2>
          <TextEffect
            as="h2"
            variant="ellipseBold"
            trigger="visible"
            visibilityRootMargin="0px 0px -25%"
            className="inline-block"
          >
            {titleCopy.eyeLevel}
          </TextEffect>
          <h2>{titleCopy.local}</h2>
        </div>
        <div className="main">
          <p className="description">
            {description}
          </p>
          <p className="description">
            <strong>{resultsLabel}</strong>
          </p>
          <div className="results">
            {results.map((result, index) => (
              <TextEffect
                key={index}
                as="div"
                variant="sidelineBold"
                trigger="visible"
                visibilityRootMargin="0px 0px -25%"
                className="inline-block result-effect result"
              >
                <p className="counter">
                  {result.counter}
                </p>
                <p className="title">{result.title}</p>
              </TextEffect>
            ))}
          </div>
        </div>

        {/* We can remove the separate "Tools" section as it was duplicative, or perhaps keep ToolList for specific detail? 
            The brief said "Replace valid certificates with the Tech Stack".
            Let's keep ToolList (which has the 3D icons) as "The Pillars" and this new Marquee as "The Stack".
        */}
        <div className="tools">
          {/* ToolList remains as it was generally useful for high level services, but maybe we rename it? 
               Wait, ToolList was showing: Paid Social, SEO, Analytics, CRM. 
               The new marquee shows specific TOOLS (HubSpot, etc). 
               This works well together.
           */}
          <ToolList />
        </div>

        <h3 className="subtitle">
          {expertiseTitle}
        </h3>
        <div className="logos clients-cards-groups">
          <div className="gradient-mask left is--visible"></div>
          <div className="gradient-mask right is--visible"></div>
          <LogoLoop
            logos={systemToolLogos}
            speed={30}
            direction="left"
            logoHeight={40}
            gap={60} // Increased gap for clarity
            hoverSpeed={0}
            className="clients-cards-group"
            scaleOnHover
            fadeOut
            fadeOutColor="var(--color--background--100)"
            ariaLabel={logosLabel}
            renderItem={(item, itemIndex) => {
              // Simply render the icon, no button needed as we aren't opening a dialog anymore
              return (
                <div
                  className="client-card"
                  key={itemIndex}
                  title={item.title}
                  aria-label={item.title}
                >
                  <span className="client-logo" style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.node}
                  </span>
                </div>
              );
            }}
          />
        </div>

        <div className="cta">
          <BookCTA label={ctaLabel} ctaLocation="values" />
        </div>
      </div>
    </section>
  );
}
