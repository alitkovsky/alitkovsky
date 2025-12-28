"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TextEffect from "@/components/TextEffect";
import LogoLoop from "@/components/LogoLoop";
import BookCTA from "@/components/BookCTA";
import ToolList from "@/components/ToolList";
import WiggleSvg from "@/components/WiggleSvg";
import CertificateDialog from "@/components/CertificateDialog";

import useLanguage from "@/hooks/useLanguage";

import { SiAdobe, SiGoogleanalytics, SiHubspot, SiLinkedin } from "react-icons/si";

// Custom inline SVG components for certificate providers not in react-icons
// Using inline SVGs to inherit currentColor from CSS
const CmiLogo = () => (
  <svg viewBox="0 0 248.8 245" fill="currentColor" className="custom-cert-logo custom-cert-logo--square" aria-hidden="true">
    <path d="M217,141l-11.6-48.5c-2.8-11.6-12.1-16-21.7-13.7-8.6,2.1-14.6,8.9-13.8,18.7.3,1.1.7,2.2.9,3.4l11.6,48.5c1.7,7-1.5,11.5-7.1,12.9,0,0-.1,0-.2,0h-.2c-5.6,1.4-10.5-1.2-12.2-8.1l-11.6-48.5c-.3-1.2-.5-2.3-.7-3.4-3.7-9.1-12-12.4-20.6-10.3-9.5,2.3-16,10.5-13.2,22.1l11.6,48.5c1.7,7-1.5,11.5-7.1,12.9s-10.5-1.2-12.2-8.2l-11.6-48.5c-5.5-23,6.5-40.7,27.9-45.9,11-2.7,21.2-1.3,29.4,3.8,4.9-8.3,13.5-14.2,24.5-16.9,12.4-3,24.4-1.4,33.4,5.1-19.7-29.3-52.7-46.8-88-46.7-58.4,0-105.7,46.8-105.7,104.6s0,3.7.1,5.5c3.7-17.5,17.1-31.3,34.5-35.7,8.5-2.1,17.4-1.7,25.7,1.2l3.9,1.5c5.2,2.2,7.7,8.2,5.7,13.5-1.9,5.1-7.6,7.8-12.8,5.8-.1,0-.2,0-.3-.1l-2.4-.8c-4.8-1.8-10-2-15-.8-14.1,3.4-22.8,17.9-19.5,32.4,3.7,14.4,17.9,23.3,32.1,19.9,5-1.2,9.5-3.9,13-7.6l1.7-1.8c3.5-4.2,9.8-4.7,13.9-1.2,0,0,.2.2.3.3,4.2,3.8,4.7,10.2,1,14.6l-2.8,3.1c-6.1,6.3-13.8,10.8-22.3,12.9-16,3.8-32.8-1.1-44.2-13,18.6,34,54.3,55.2,93.1,55.1,49,0,90.2-33,102.2-77.8-4.5.2-8.3-2.6-9.7-8.5h0Z"/>
    <path d="M123.8,245c-55.7,0-106.5-37.6-120.2-93.6-7.8-31.4-2.7-64.6,14.3-92.2C34.9,31.1,62.5,11,94.5,3.5c66.3-15.9,133.3,24.5,149.4,90.1,7.8,31.4,2.7,64.6-14.3,92.2-17.1,28.1-44.7,48.2-76.7,55.8-9.6,2.3-19.4,3.5-29.2,3.5h0ZM123.7,9.6c-9.1,0-18.1,1.1-27,3.2-29.5,7-55,25.5-70.8,51.4-15.6,25.4-20.3,56-13.1,84.9,14.9,60.5,76.7,97.8,137.8,83.1,29.5-7,55-25.5,70.8-51.4,15.6-25.4,20.3-56,13.1-84.9-12.7-51.6-59.5-86.3-110.9-86.3h0Z"/>
  </svg>
);

const EfsetLogo = () => (
  <svg viewBox="0 0 103 24" fill="currentColor" className="custom-cert-logo custom-cert-logo--wide" aria-hidden="true">
    <path fillRule="evenodd" d="M4.7.3l-.8,4c.9-1.4,2-2.8,3.2-4h-2.4ZM17.7,9.9c-.9.9-1.3,1.9-1.3,2.9s.2,1.1.5,1.6h.8l1-5.3c-.4.2-.7.5-1,.8ZM4.4,15.2c0-2.2.5-4.3,1.4-6.5,1-2.2,2.5-4.4,4.3-6.3.8-.8,1.6-1.5,2.5-2.2h3.8c-.1,0-.2.1-.4.2-1.7.8-3.2,1.9-4.5,3.3-1.4,1.4-2.6,3-3.4,4.7-.8,1.6-1.3,3.3-1.4,4.9-.3,3.4.8,6.5,3,8.8.5.5,1,.9,1.5,1.3h-4c-.9-1-1.6-2.2-2.1-3.5-.6-1.5-.9-3-.9-4.7h0ZM10.9,5.6h1.9c.1-.1.2-.2.3-.3,2.1-2.1,4.6-3.4,7.2-3.8l.2-1.2h-2.1c-2.3.7-4.5,2.1-6.4,4-.4.4-.8.9-1.2,1.3ZM25.1,10.8c0,1.5-.7,3.1-2.1,4.4-.8.8-1.6,1.3-2.5,1.7l.2-1.2c.6-.3,1.2-.7,1.8-1.2.8-.9,1.3-1.9,1.4-3,0-1.1-.3-2.1-1-2.8-.2-.2-.4-.4-.7-.5l.3-1.3c.5.2,1,.5,1.4.9.8.8,1.2,1.9,1.2,3h0ZM25.8,10.8c0,1.7-.8,3.5-2.3,5-.9,1-2,1.6-3.2,2l-.3,1.4c1.5-.4,3-1.3,4.3-2.6,3.3-3.3,3.8-7.9,1.1-10.5-.7-.7-1.5-1.2-2.5-1.4l-.3,1.5c.7.2,1.2.6,1.7,1.1,1,1,1.5,2.2,1.5,3.6h0ZM22.4,9.3c.5.6.8,1.3.8,2.2,0,.9-.5,1.8-1.2,2.5-.3.3-.7.6-1,.8l1.2-5.8c.1,0,.2.2.3.3ZM1.3,21.7c-.2-.6-.4-1.2-.6-1.9L0,23.4h2.1c-.3-.5-.6-1.1-.8-1.7h0ZM5.1,8.4c-1,2.3-1.5,4.6-1.5,6.8s.3,3.4.9,5c.4,1.1,1,2.2,1.8,3.2h-3.4c-.4-.6-.7-1.3-1-2-.4-1.1-.7-2.3-.9-3.5L3.4,6.6c1.1-2.1,2.6-4.1,4.4-5.9.1-.1.3-.3.4-.4h3.2c-.6.5-1.2,1-1.8,1.6-1.9,2-3.4,4.2-4.5,6.5h0ZM10,14.1v.3h1.7c0-.3,0-.5,0-.8,0-1.6.5-3.2,1.3-4.6h-1.6c-.9,1.6-1.4,3.4-1.4,5.1h0ZM16.2,8.9h1.4c-.2.1-.3.3-.5.4-1,1-1.6,2.2-1.6,3.5s.1,1.1.4,1.6h-1.3c-.1-.4-.2-.8-.2-1.2,0-1.4.6-3,1.8-4.2h0ZM12.4,13.6c0,.3,0,.5,0,.8h1.4c0-.4-.1-.8-.1-1.2,0-.9.2-1.7.6-2.6.2-.6.6-1.1,1-1.6h-1.4c-.9,1.4-1.5,3.1-1.5,4.7ZM19.9,20c1.8-.4,3.5-1.4,5-2.9,3.6-3.6,4.1-8.6,1.1-11.6-.8-.8-1.8-1.3-2.9-1.6l.3-1.7c1.5.3,2.8.9,3.9,2,1.4,1.4,2.2,3.2,2.3,5.2v.3c0,.4,0,.9,0,1.3-.4,2.5-1.6,4.9-3.7,7-1.8,1.8-4,3-6.3,3.5l.3-1.5h0ZM27.9,3.7c1,1,1.7,2.2,2.1,3.5,0,0,0,0,0,.1l.4-1.8h1c-.5-1.2-1.2-2.3-2.1-3.3-.9-.9-2-1.6-3.2-2.1h-2.2l-.2,1.2c.4,0,.7.1,1,.3,1.2.4,2.3,1,3.2,2h0ZM34.8,5.6h-2.6c-.5-1.4-1.3-2.7-2.4-3.8-.6-.6-1.2-1.1-2-1.5h4.1c1.4,1.5,2.4,3.4,2.8,5.4h0ZM19.9,3.9l.3-1.6c-2.2.4-4.4,1.5-6.3,3.3h2.1c1.2-.9,2.6-1.5,4-1.8ZM17.4,5.6c.8-.4,1.6-.8,2.4-.9l-.2.9s-2.2,0-2.2,0ZM7.5,13.4c-.3,3.1.7,6,2.8,8.1.7.8,1.6,1.4,2.6,1.8h3.1l.2-1c-1.8-.3-3.3-1.1-4.6-2.3-.6-.6-1.1-1.4-1.5-2.2h-1.8l.7-3.5h.3v-.3c0-1.7.4-3.5,1.3-5.1h-.4l.6-3c-1.8,2.3-2.9,4.9-3.1,7.5h0ZM17.1,17.9h0l-.3,1.4c-1-.2-1.9-.7-2.6-1.4h2.9ZM16.6,20.1c-1.2-.3-2.3-.9-3.2-1.8-.1-.1-.2-.2-.3-.4h-2.2c.3.6.7,1.2,1.2,1.7,1.1,1.1,2.6,1.9,4.2,2.1l.3-1.6h0ZM27.3,20.8l-.5,2.5h-3.2c1.3-.7,2.6-1.5,3.7-2.5ZM32,9.8h-1.7c0,.5,0,.9-.1,1.4-.2,1.4-.7,2.7-1.4,4h1.7c.7-1.5,1.2-3,1.4-4.5,0-.3,0-.6,0-.9h0ZM32.9.3h3.5c.3.6.7,1.3.9,1.9.4,1.1.7,2.2.9,3.4h-2.8c-.5-2-1.3-3.8-2.6-5.4h0ZM37.3.3c.3.5.5,1.1.8,1.6.3.7.5,1.4.7,2.1l.8-3.8s-2.2,0-2.2,0ZM32.8,9.8h2.3c0,.2,0,.4,0,.5-.2,1.7-.6,3.3-1.3,4.9h-2.3c.7-1.4,1.1-2.9,1.3-4.4,0-.3,0-.7,0-1ZM35.8,10.4c-.2,1.6-.6,3.3-1.2,4.9h1.7l1.1-5.4h-1.5c0,.2,0,.4,0,.6h0ZM19.2,23.4l.2-1c2.5-.4,5-1.8,7-3.8.7-.7,1.3-1.5,1.8-2.2l-.6,3.1h0c0,.1-.1.2-.2.2-1.6,1.6-3.6,2.9-5.6,3.6h-2.5Z"/>
    <path d="M61.5,5.7l-1.8.7c-.5-2.4-2.2-4.5-5.6-4.5s-5.2,1.9-5.2,4.6,1.3,3.5,3.6,4.1l3.5.8c3.6.9,5.8,2.9,5.8,6.2s-3,6.5-7.6,6.5-7.8-3.4-8.2-6.9l1.9-.6c.3,3,2.5,5.6,6.3,5.6s5.6-2,5.6-4.5-1.5-3.7-4.1-4.3l-3.5-.8c-3.1-.7-5.3-2.7-5.3-6,0-3.6,3.4-6.5,7.2-6.5s6.8,2.7,7.5,5.7h0ZM81.2,23.6h-13.5V.4h13.5v1.9h-11.5v8.7h10.5v1.9h-10.5v8.8h11.5v1.9h0ZM103,2.3h-8.1v21.2h-2.1V2.3h-8.1V.4h18.3v1.9Z"/>
  </svg>
);

const TelcLogo = () => (
  <svg viewBox="0 0 86 35.2" fill="currentColor" className="custom-cert-logo custom-cert-logo--wide" aria-hidden="true">
    <path fillRule="evenodd" d="M8.7,26.4c0,5.3,3,8.7,8.5,8.7,1.7,0,3.5-.2,5.2-.6l-.2-5.5c-1,.5-2.1.8-3.2.7-2.7,0-3.3-2.1-3.3-4.4V0l-7,2.2v24.2ZM32.1,18.4c.3-3.6,2.3-6.3,6.2-6.3s5.5,2.9,5.7,6.3h-11.9ZM48.7,27.3c-2.7,1.7-5.8,2.6-8.9,2.7-4.3,0-7.4-2.5-7.7-6.8h18.6c0-9.4-2.8-16.2-12.8-16.2s-12.5,6.4-12.5,14.2,5.2,13.9,14,13.9c3.2.1,6.4-.6,9.2-2.2v-5.7h0ZM54.5,2.2h7v32.3h-7V2.2ZM85.5,7.9c-2.2-.6-4.5-.9-6.8-.9-8.4,0-13,6.2-13,13.9s4.4,14.2,13.3,14.2c2.4,0,4.7-.2,7-.9l-.3-5.8c-1.7.7-3.5,1.2-5.4,1.2-4.9,0-7.2-3.8-7.2-8.8s2.8-8.5,7.1-8.5c1.6,0,3.3.3,4.8,1l.6-5.5h0ZM17.1,12.5h7.5v-4.6h-7.5v4.6Z"/>
    <circle cx="3.7" cy="10.1" r="3.7"/>
  </svg>
);

const certificationLogos = [
  {
    node: <SiAdobe />,
    title: "Adobe Certified Marketing Specialist",
    imageSrc: "/assets/certificates/adobe_marketing_specialist.webp",
    aspectRatio: "4 / 3",
  },
  {
    node: <SiGoogleanalytics />,
    title: "Google Analytics Certified",
    imageSrc: "/assets/certificates/google_analitycs.webp",
    aspectRatio: "4 / 3",
  },
  {
    node: <SiHubspot />,
    title: "HubSpot Marketing Hub Software Certified",
    imageSrc: "/assets/certificates/hubspot_marketing_hub_software.webp",
    aspectRatio: "4 / 3",
  },
  {
    node: <SiLinkedin />,
    title: "LinkedIn Marketing Insider",
    imageSrc: "/assets/certificates/linkedin_marketing_insider.webp",
    aspectRatio: "4 / 3",
  },
  {
    node: <CmiLogo />,
    title: "CMI Digital Marketing Professional",
    imageSrc: "/assets/certificates/cm_digital_marketin_professional.webp",
    aspectRatio: "4 / 3",
  },
  {
    node: <EfsetLogo />,
    title: "EF SET English Certificate (C2 Proficient)",
    imageSrc: "/assets/certificates/efset_english.webp",
    aspectRatio: "3 / 4",
  },
  {
    node: <TelcLogo />,
    title: "telc Deutsch Zertifikat (B2)",
    imageSrc: "/assets/certificates/telc_german.webp",
    aspectRatio: "3 / 4",
  },
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
    expertiseTitle: "meine zertifizierungen",
    toolsTitle: "meine werkzeuge",
    logosLabel: "zertifizierungen",
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
        title: "visibility",
      },
      {
        counter: "+35%",
        title: "conversions",
      },
      {
        counter: "+25%",
        title: "qualified leads",
      },
      {
        counter: "—22%",
        title: "ad costs",
      },
    ],
    expertiseTitle: "my certifications",
    toolsTitle: "my toolkit",
    logosLabel: "certifications",
    cta: {
      label: "want to know more? let's talk",
    },
  },
};

export default function Values() {
  const { language } = useLanguage();
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Preload certificate images in background after page load
  useEffect(() => {
    const preloadImages = () => {
      certificationLogos.forEach((cert) => {
        const img = new window.Image();
        img.src = cert.imageSrc;
      });
    };

    // Wait for browser idle time to preload, avoiding impact on initial page load
    if ("requestIdleCallback" in window) {
      const idleId = requestIdleCallback(preloadImages, { timeout: 3000 });
      return () => cancelIdleCallback(idleId);
    }
    // Fallback for browsers without requestIdleCallback
    const timeoutId = setTimeout(preloadImages, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  const copy = VALUES_COPY[language] ?? VALUES_COPY.en;
  const fallbackCopy = VALUES_COPY.en;

  const titleCopy = copy.title ?? fallbackCopy.title;
  const description = copy.description ?? fallbackCopy.description ?? "";
  const resultsLabel = copy.label ?? fallbackCopy.label ?? "";
  const results = copy.results ?? fallbackCopy.results ?? [];
  const expertiseTitle = copy.expertiseTitle ?? fallbackCopy.expertiseTitle ?? "my certifications";
  const toolsTitle = copy.toolsTitle ?? fallbackCopy.toolsTitle ?? "core tools";
  const logosLabel = copy.logosLabel ?? fallbackCopy.logosLabel ?? "Certifications";
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label ?? "book a free call to find out more";

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseDialog = () => {
    setSelectedCertificate(null);
  };

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
            logos={certificationLogos}
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
                <button
                  type="button"
                  className={`client-card ${rotationClass}`}
                  key={itemIndex}
                  aria-label={`View ${item.title} certificate`}
                  onClick={() => handleCertificateClick(item)}
                  data-cursor="link"
                >
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
                </button>
              );
            }}
          />
        </div>

        <div className="cta">
          <BookCTA label={ctaLabel} ctaLocation="values" />
        </div>
      </div>

      {selectedCertificate && (
        <CertificateDialog
          certificate={selectedCertificate}
          onClose={handleCloseDialog}
        />
      )}
    </section>
  );
}
