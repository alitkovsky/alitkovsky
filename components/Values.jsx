"use client";

import TextEffect from "@/components/TextEffect";
import LogoLoop from "@/components/LogoLoop";
import BookCTA from "@/components/BookCTA";
import ToolList from "@/components/ToolList";
import WiggleSvg from "@/components/WiggleSvg";

import useLanguage from "@/hooks/useLanguage";

import { SiCanva, SiAdobe, SiAdobecreativecloud, SiGoogleadsense, SiGoogleanalytics, SiGoogletagmanager, SiLooker, SiHubspot, SiLinkedin, SiMeta, SiMailchimp, SiSemrush } from "react-icons/si";

const techLogos = [
  { node: <SiAdobe />, title: "Adobe", href: "/" },
  { node: <SiGoogleanalytics />, title: "Google Analytics", href: "/" },
  { node: <SiHubspot />, title: "Hubspot", href: "/" },
  { node: <SiLinkedin />, title: "Linkedin Campaign Manager", href: "/" },
];

const VALUES_COPY = {
  de: {
    title: {
      transparent: "transparent",
      handsOn: "hands-on",
      eyeLevel: "auf augenhöhe",
      local: "lokal verankert",
    },
    description: "marketing ohne buzzwords und leere versprechen. ich mach das seit über 15 jahren — von paid social über seo bis crm-automatisierung. was mich antreibt: echte ergebnisse für echte unternehmen. keine langzeitverträge, keine versteckten kosten. nur klare strategien, die funktionieren.",
    label: "was ich bisher für kunden erreicht habe:",
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
        counter: "+25%",
        title: "qualifizierte leads",
      },
      {
        counter: "-22%",
        title: "werbekosten",
      },
    ],
    // results: "+48% sichtbarkeit · +35% conversions · +25% qualifizierte leads · —22% werbekosten",
    expertiseTitle: "meine expertise",
    toolsTitle: "meine werkzeuge",
    logosLabel: "marketing tools",
    cta: {
      label: "mehr erfahren? lass uns reden",
    },
  },
  en: {
    title: {
      transparent: "transparent",
      handsOn: "hands-on",
      eyeLevel: "down-to-earth",
      local: "locally rooted",
    },
    description: "marketing without buzzwords or empty promises. i've been doing this for 15+ years — from paid social and seo to crm automation. what drives me: real results for real businesses. no long-term contracts, no hidden costs. just clear strategies that work.",
    label: "results i've delivered for clients:",
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
        counter: "+25%",
        title: "qualifizierte leads",
      },
      {
        counter: "—22%",
        title: "werbekosten",
      },
    ],
    // results: "+48% visibility · +35% conversions · +25% qualified leads · —22% ad costs",
    expertiseTitle: "my expertise",
    toolsTitle: "my toolkit",
    logosLabel: "marketing tools",
    cta: {
      label: "want to know more? let's talk",
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
  const expertiseTitle = copy.expertiseTitle ?? fallbackCopy.expertiseTitle ?? "my expertise";
  const toolsTitle = copy.toolsTitle ?? fallbackCopy.toolsTitle ?? "core tools";
  const logosLabel = copy.logosLabel ?? fallbackCopy.logosLabel ?? "Marketing tools";
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label ?? "book a free call to find out more";

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
        <div className="tools">
          <h3 className="title">
            {toolsTitle}
          </h3>
          <ToolList />
        </div>
        <h3 className="subtitle">
          {expertiseTitle}
        </h3>
        <div className="logos clients-cards-groups">
          <div className="gradient-mask left is--visible"></div>
          <div className="gradient-mask right is--visible"></div>
          <LogoLoop
            logos={techLogos}
            speed={30}
            direction="left"
            logoHeight={40}
            gap={0}
            hoverSpeed={0}
            className="clients-cards-group"
            scaleOnHover
            fadeOut
            fadeOutColor="var(--color--background--100)"
            ariaLabel={logosLabel}
            renderItem={(item, itemIndex) => {
              const rotationClass = itemIndex % 2 === 0 ? "r1" : "r2";
              return (
                <div
                  className={`client-card ${rotationClass}`}
                  key={itemIndex}
                  aria-label={item.title}
                  data-cursor="link">
                    <WiggleSvg
                      as="div"
                      trigger="visible"
                      rootMargin="0px 0px 0% 0px"
                      selector="self"
                      distance={0.75}
                      duration={0.9}
                    >
                      <span className="client-logo" title={item.title}>
                        {item.node}
                      </span>
                    </WiggleSvg>
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
};
