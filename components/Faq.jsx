"use client";

import { useId } from "react";
import useLanguage from "@/hooks/useLanguage";
import Script from "next/script";
import Accordion from "@/components/Accordion";

const COPY = {
  de: {
    intro: "bevor wir loslegen — hier die antworten auf die wichtigsten fragen zum thema system-architektur.",
    items: [
      {
        question: "agentur vs. architekt — was ist der unterschied?",
        answer: "agenturen vermieten dir ihre kapazität (stunden). ich baue dir vermögenswerte (systeme), die dir gehören. eine agentur will, dass du abhängig bleibst. ich will, dass dein system so stabil läuft, dass du mich für das tagesgeschäft nicht mehr brauchst.",
      },
      {
        question: "wem gehört das system?",
        answer: "zu 100% dir. alle accounts, alle automations-skripte, alle daten. kein 'vendor lock-in'. ich baue auf deinem eigenen tech-stack (oder richte ihn für dich ein). wenn wir uns trennen, behältst du den schlüssel zur maschine.",
      },
      {
        question: "wie setzen sich die kosten zusammen?",
        answer: "wir trennen 'bau' von 'betrieb'. der aufbau deines systems (audit, blueprint, implementierung) ist ein festpreis-projekt. danach gibt es optional einen monatlichen retainer für wartung & optimierung. so zahlst du nicht monatelang für 'setup', das eigentlich fertig sein sollte.",
      },
      {
        question: "warum n8n und make.com?",
        answer: "weil sie flexibel und skalierbar sind. im gegensatz zu teuren alles-in-einem lösungen (die oft nichts richtig können), verbinden wir 'best-in-class' tools. n8n ermöglicht uns zudem datenschutz-konformes hosting auf deutschen servern — ein muss für viele kmu.",
      },
      {
        question: "wie schnell ist das system einsatzbereit?",
        answer: "das hängt vom umfang ab. ein 'control center' (crm) steht oft in 1-2 wochen. ein komplettes 'intelligence hub' tracking-setup braucht ca. 1 woche. größere wachstums-systeme ('growth engine') werden modular aufgebaut, damit du schon während der bauphase erste ergebnisse siehst.",
      },
      {
        question: "machst du auch schulungen?",
        answer: "absolut. teil der 'übergabe' ist das training deines teams. ich will keine 'black box' hinterlassen. dein team lernt, wie man das crm bedient, dashboards liest und einfache änderungen selbst vornimmt.",
      },
    ],
  },
  en: {
    intro: "before we start — here are answers to the key questions about system architecture.",
    items: [
      {
        question: "agency vs. architect — what's the difference?",
        answer: "agencies rent you their capacity (hours). i build you assets (systems) that you own. an agency wants you to stay dependent. i want your system to run so smoothly that you don't need me for daily operations anymore.",
      },
      {
        question: "who owns the system?",
        answer: "you do, 100%. all accounts, all automation scripts, all data. no 'vendor lock-in'. i build on your own tech stack (or set it up for you). if we part ways, you keep the keys to the machine.",
      },
      {
        question: "how is pricing structured?",
        answer: "we separate 'build' from 'run'. building your system (audit, blueprint, implementation) is a fixed-price project. afterwards, there is an optional monthly retainer for maintenance & optimization. this way, you don't pay months for 'setup' that should be finished.",
      },
      {
        question: "why n8n and make.com?",
        answer: "because they are flexible and scalable. unlike expensive all-in-one solutions (that often do nothing perfectly), we connect 'best-in-class' tools. n8n also allows gdpr-compliant self-hosting — a must for many european businesses.",
      },
      {
        question: "how fast is the system ready?",
        answer: "depends on the scope. a 'control center' (crm) is often ready in 1-2 weeks. a full 'intelligence hub' tracking setup takes about 1 week. larger 'growth engines' are built modularly, so you see results even during the construction phase.",
      },
      {
        question: "do you offer training?",
        answer: "absolutely. part of the 'handover' is training your team. i don't want to leave a 'black box'. your team learns how to operate the crm, read dashboards, and make simple changes themselves.",
      },
    ],
  },
};

/**
 * FAQ Section - uses universal Accordion component
 * Includes FAQPage schema for SEO rich snippets
 */
export default function Faq() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.de;
  const baseId = useId();

  // Generate FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="section faq" id="faq" aria-labelledby={`${baseId}-title`}>
      {/* FAQPage Schema for rich snippets */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="content">
        <div className="title">
          <h2 id={`${baseId}-title`} className="sr-only">
            {language === "de" ? "Häufig gestellte Fragen" : "Frequently Asked Questions"}
          </h2>
          <p>{copy.intro}</p>
        </div>
        <Accordion
          items={copy.items}
          ariaLabel={language === "de" ? "FAQ Akkordeon" : "FAQ Accordion"}
          name="faq-accordion"
        />
      </div>
    </section>
  );
}