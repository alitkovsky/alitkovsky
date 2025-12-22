"use client";

import { useCallback } from "react";
import useLanguage from "@/hooks/useLanguage";

const COPY = {
  de: {
    intro: "bevor wir quatschen — hier die antworten auf die häufigsten fragen. falls deine nicht dabei ist: schreib mir einfach.",
    items: [
      {
        question: "was kostet das ganze?",
        answer: "kurz: es kommt drauf an. nach unserem erstgespräch bekommst du ein transparentes angebot mit festpreis — keine versteckten kosten, keine bösen überraschungen. ich arbeite nicht auf stundenbasis, weil ich finde, dass du vorher wissen solltest, was auf dich zukommt. anzahlung 50%, rest nach abschluss. so einfach.",
      },
      {
        question: "wie läuft die zusammenarbeit ab?",
        answer: "ganz entspannt: wir telefonieren oder treffen uns, ich höre zu, stelle fragen und analysiere deine aktuelle situation. dann bekommst du ein angebot. wenn's passt, legen wir los — strategie, umsetzung, reporting. alles aus einer hand, ohne dass du zehn verschiedenen leuten erklären musst, was du willst.",
      },
      {
        question: "muss ich mich langfristig binden?",
        answer: "nope. keine 12-monats-verträge, keine knebelverträge, kein kleingedrucktes. wir arbeiten zusammen, solange es für beide seiten sinn macht. wenn du unzufrieden bist, kannst du jederzeit gehen. mein ziel ist es, dass du bleiben willst — nicht musst.",
      },
      {
        question: "wie schnell sehe ich ergebnisse?",
        answer: "bei bezahlter werbung (google ads, meta): oft schon in den ersten wochen. bei seo: rechne mit 3-6 monaten, bis es richtig anzieht — das ist kein sprint, sondern ein marathon. deshalb kombiniere ich beides: sofortige sichtbarkeit durch ads, während die organische reichweite aufgebaut wird.",
      },
      {
        question: "was macht dich anders als agenturen?",
        answer: "alles aus einer hand, ein ansprechpartner, keine abstimmungsschleifen. bei mir sitzt kein junior am account, während der senior golfen geht. ich kenne dein projekt, deine ziele, deine macken. und: meine preise sind fair, weil ich keinen fancy glaspalast in der city finanzieren muss.",
      },
      {
        question: "kann ich auch nur eine einzelne leistung buchen?",
        answer: "klar. du brauchst nur eine landingpage? nur google ads? nur ein analytics-setup? kein problem. ich empfehle zwar gerne den ganzheitlichen ansatz, weil sich alles gegenseitig verstärkt — aber ich zwinge dir kein paket auf, das du nicht brauchst.",
      },
      {
        question: "was passiert nach dem projekt?",
        answer: "wartung und support sind optional, aber empfohlen. websites brauchen updates, kampagnen brauchen optimierung. ich biete flexible support-pakete an. und wenn du lieber selbst ran willst: ich zeig dir, wie's geht.",
      },
    ],
  },
  en: {
    intro: "before we chat — here are answers to the most common questions. if yours isn't here, just drop me a message.",
    items: [
      {
        question: "what does it cost?",
        answer: "short answer: it depends. after our first call, you'll get a transparent quote with a fixed price — no hidden fees, no nasty surprises. i don't do hourly billing because i think you should know what you're getting into upfront. 50% deposit, rest upon completion. simple.",
      },
      {
        question: "how does working together look like?",
        answer: "pretty chill: we hop on a call or meet up, i listen, ask questions, and analyze your current situation. then you get a proposal. if it clicks, we get started — strategy, execution, reporting. all from one source, without you having to explain what you want to ten different people.",
      },
      {
        question: "do i have to commit long-term?",
        answer: "nope. no 12-month contracts, no lock-ins, no fine print. we work together as long as it makes sense for both sides. if you're unhappy, you can leave anytime. my goal is for you to want to stay — not have to.",
      },
      {
        question: "how fast will i see results?",
        answer: "with paid ads (google ads, meta): often within the first few weeks. with seo: expect 3-6 months before it really picks up — it's not a sprint, it's a marathon. that's why i combine both: immediate visibility through ads while organic reach builds up.",
      },
      {
        question: "what makes you different from agencies?",
        answer: "everything from one source, one point of contact, no endless feedback loops. with me, there's no junior running your account while the senior's out golfing. i know your project, your goals, your quirks. and: my prices are fair because i don't need to finance some fancy glass tower in the city.",
      },
      {
        question: "can i book just a single service?",
        answer: "sure. you only need a landing page? just google ads? just an analytics setup? no problem. i do recommend the holistic approach since everything reinforces each other — but i won't push a package you don't need.",
      },
      {
        question: "what happens after the project?",
        answer: "maintenance and support are optional but recommended. websites need updates, campaigns need optimization. i offer flexible support packages. and if you'd rather do it yourself: i'll show you how.",
      },
    ],
  },
};

/**
 * FAQ Accordion - CSS-only animation with minimal JS for toggle-close
 * Radio inputs ensure only one item open at a time
 * Small JS handler allows clicking active item to close it
 * GPU-accelerated with CSS Grid height animation
 */
export default function Faq() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.de;

  // Allow clicking active radio to deselect it (radios don't support this natively)
  const handleLabelClick = useCallback((e) => {
    const label = e.currentTarget;
    const radioId = label.getAttribute("for");
    const radio = document.getElementById(radioId);
    if (radio?.checked) {
      e.preventDefault();
      radio.checked = false;
    }
  }, []);

  return (
    <section className="section faq" id="faq">
      <div className="content">
        <div className="title">
          <p>{copy.intro}</p>
        </div>
        <div className="accordion">
          {copy.items.map((item, index) => (
            <div className="item" key={index}>
              <input
                type="radio"
                name="faq-accordion"
                id={`faq-toggle-${index}`}
                className="item__toggle"
              />
              <label
                htmlFor={`faq-toggle-${index}`}
                className="btn"
                data-cursor="link"
                onClick={handleLabelClick}
              >
                <span className="caption">{item.question}</span>
                <span className="icon" aria-hidden="true">+</span>
              </label>
              <div className="item-content">
                <div className="item-content__inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
