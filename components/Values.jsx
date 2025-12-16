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
  { node: <SiAdobecreativecloud />, title: "Adobe Creative Cloude", href: "/" },
  { node: <SiCanva />, title: "Canva", href: "/" },
  { node: <SiGoogleanalytics />, title: "Google Analytics", href: "/" },
  { node: <SiGoogleadsense />, title: "Google Adsense", href: "/" },
  { node: <SiGoogletagmanager />, title: "Google Tagmanager", href: "/" },
  { node: <SiLooker />, title: "Google Looker Studio", href: "/" },
  { node: <SiHubspot />, title: "Hubspot", href: "/" },
  { node: <SiLinkedin />, title: "Linkedin Campaign Manager", href: "/" },
  { node: <SiMeta />, title: "Meta Ads Manager", href: "/" },
  { node: <SiMailchimp />, title: "Mailchimp", href: "/" },
  { node: <SiSemrush />, title: "Semrush", href: "/" }
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
    results: {
      label: "was ich bisher für kunden erreicht habe:",
      metrics: "+48% sichtbarkeit · +35% conversions · +25% qualifizierte leads · —22% werbekosten",
    },
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
    results: {
      label: "results i've delivered for clients:",
      metrics: "+48% visibility · +35% conversions · +25% qualified leads · —22% ad costs",
    },
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
  const resultsLabel = copy.results?.label ?? fallbackCopy.results?.label ?? "";
  const resultsMetrics = copy.results?.metrics ?? fallbackCopy.results?.metrics ?? "";
  const toolsTitle = copy.toolsTitle ?? fallbackCopy.toolsTitle ?? "core tools";
  const logosLabel = copy.logosLabel ?? fallbackCopy.logosLabel ?? "Marketing tools";
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label ?? "book a free call to find out more";

  return (
    <section className="section values" id="values">
      <div className="content">
        <div className="title">
          <h1>{titleCopy.transparent}</h1>
          <h1>{titleCopy.handsOn}</h1>
          <TextEffect
            as="h1"
            variant="ellipseBold"
            trigger="visible"
            visibilityRootMargin="0px 0px -33%"
            className="inline-block"
          >
            {titleCopy.eyeLevel}
          </TextEffect>
          <h1>{titleCopy.local}</h1>
        </div>
        <div className="main">
          <p className="description">
            {description}
          </p>
          <p className="description results">
            <strong>{resultsLabel}</strong><br />
            {resultsMetrics}
          </p>
        </div>
        <div className="tools">
          <h3 className="title">
            {toolsTitle}
          </h3>
          <ToolList />
        </div>
        {/* <h3 className="subtitle">
          working with
        </h3> */}
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
                      rootMargin="0px 0px -33% 0px"
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
