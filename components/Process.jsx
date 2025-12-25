"use client";

import { useState } from "react";
import useLanguage from "@/hooks/useLanguage";
import ProcessDialog from "@/components/ProcessDialog";

const COPY = {
  de: {
    intro: "kein geheimnis, kein hexenwerk — so läuft's ab, wenn wir zusammenarbeiten. schritt für schritt, transparent und ohne überraschungen.",
    steps: [
      {
        title: "kontakt",
        description: {
          summary: "du meldest dich — per telefon, whatsapp, kontaktformular oder mail. keine förmliche anfrage nötig, schreib einfach was du brauchst oder dass du quatschen willst. ich melde mich innerhalb von 24 stunden zurück. wir klären kurz, ob und wie ich dir helfen kann, und finden einen termin. von dir brauche ich nur eine grobe idee, was du suchst — und idealerweise einen link zu deiner aktuellen website, damit ich mich vorbereiten kann.",
          metrics: "< 24h",
          result: "termin für ein kostenloses erstgespräch — ohne verpflichtungen, ohne haken",
        },
      },
      {
        title: "erstgespräch",
        description: {
          summary: "20 minuten, kostenlos, unverbindlich — kein verkaufsgespräch, versprochen. videocall oder telefon, deine wahl. du erzählst von deinem business, deinen zielen und was dich gerade beschäftigt. ich höre zu, stelle fragen zu zielgruppe, wettbewerb und budget. wir checken, ob die chemie stimmt, und tauschen erste ideen aus. von dir brauche ich offenheit, infos zu bisherigen marketing-versuchen und eine grobe vorstellung vom budget. am ende weißt du, ob es passt — und ich hab genug info für die analyse.",
          metrics: "20 min",
          result: "klarheit, ob wir zusammenpassen — plus erste strategische impulse gratis obendrauf",
        },
      },
      {
        title: "analyse & angebot",
        description: {
          summary: "jetzt wird's ernst: ich tauche ab in deine branche, deinen wettbewerb und deine online-präsenz. website-check (technisch + inhaltlich), keyword-recherche, wettbewerbsanalyse — ich finde die quick wins und die langfristigen potenziale. das dauert 2-3 tage, also etwas geduld. falls vorhanden, brauche ich zugang zu google analytics und search console. danach bekommst du ein dokumentiertes analyse-ergebnis und ein angebot mit festpreis, timeline und meilensteinen. kein stundenzählen, keine bösen überraschungen.",
          metrics: "2-3 tage",
          result: "transparentes festpreis-angebot + analyse-dokument mit allen erkenntnissen und potenzialen",
        },
      },
      {
        title: "strategie & umsetzung",
        description: {
          summary: "hier passiert die magie. ich entwickle die strategie und setze sie um — von tracking-setup über landingpages bis zu google- und meta-kampagnen. seo-optimierung technisch und inhaltlich inklusive. du bekommst wöchentliche updates und kannst dich zurücklehnen. von dir brauche ich feedback zu entwürfen, zeitnahe freigaben, zugänge zu relevanten accounts und ggf. inhalte wie texte oder bilder. je nach projektumfang rechne mit 4-8 wochen bis zum launch.",
          metrics: "4-8 wochen",
          result: "fertige marketing-infrastruktur, die funktioniert — erste kampagnen laufen, tracking steht",
        },
      },
      {
        title: "optimierung & reporting",
        description: {
          summary: "launch ist erst der anfang. ich behalte die zahlen im blick, teste varianten, optimiere kontinuierlich und halte dich mit monatlichen reports auf dem laufenden — verständlich erklärt, nicht nur zahlenkolonnen. du bekommst proaktive vorschläge zur verbesserung und schnelle reaktion bei problemen. von dir brauche ich feedback zur performance und info über geschäftliche veränderungen. dieser schritt ist optional, aber empfohlen — denn hier entsteht der echte roi.",
          metrics: "Ø +35%",
          result: "stetig bessere ergebnisse monat für monat — volle transparenz über dein marketing-investment",
        },
      },
    ],
  },
  en: {
    intro: "no secrets, no magic tricks — here's how it works when we team up. step by step, transparent, no surprises.",
    steps: [
      {
        title: "contact",
        description: {
          summary: "you reach out — via phone, whatsapp, contact form, or email. no formal request needed, just tell me what you're looking for or that you'd like to chat. i'll get back to you within 24 hours. we'll quickly figure out if and how i can help, and find a time to talk. all i need from you is a rough idea of what you're after — and ideally a link to your current website so i can prepare.",
          metrics: "< 24h",
          result: "free intro call scheduled — no obligations, no strings attached",
        },
      },
      {
        title: "intro call",
        description: {
          summary: "20 minutes, free, no strings — no sales pitch, promise. video call or phone, your choice. you tell me about your business, your goals, and what's on your mind. i listen, ask questions about target audience, competition, and budget. we check if there's chemistry and exchange first ideas. from you, i need openness, info on past marketing attempts, and a rough budget range. by the end, you'll know if it's a fit — and i'll have enough info for the analysis.",
          metrics: "20 min",
          result: "clarity on whether we're a match — plus first strategic impulses free on top",
        },
      },
      {
        title: "analysis & proposal",
        description: {
          summary: "now it gets real: i dive deep into your industry, competition, and online presence. website check (technical + content), keyword research, competitor analysis — i find the quick wins and long-term potential. this takes 2-3 days, so a bit of patience. if available, i'll need access to google analytics and search console. then you get a documented analysis and a fixed-price proposal with timeline and milestones. no hourly tracking, no nasty surprises.",
          metrics: "2-3 days",
          result: "transparent fixed-price proposal + analysis document with all findings and opportunities",
        },
      },
      {
        title: "strategy & execution",
        description: {
          summary: "this is where the magic happens. i develop the strategy and execute it — from tracking setup to landing pages to google and meta campaigns. seo optimization (technical and content) included. you get weekly updates and can sit back. from you, i need feedback on drafts, timely approvals, access to relevant accounts, and possibly content like copy or images. depending on scope, expect 4-8 weeks until launch.",
          metrics: "4-8 weeks",
          result: "finished marketing infrastructure that works — first campaigns running, tracking in place",
        },
      },
      {
        title: "optimization & reporting",
        description: {
          summary: "launch is just the beginning. i keep an eye on the numbers, test variants, optimize continuously, and keep you in the loop with monthly reports — explained clearly, not just spreadsheets. you get proactive suggestions for improvement and quick response to issues. from you, i need feedback on performance and info on business changes. this step is optional but recommended — because this is where the real roi happens.",
          metrics: "Ø +35%",
          result: "continuously improving results month over month — full transparency on your marketing investment",
        },
      },
    ],
  },
};

export default function Process() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.de;
  const [selectedStep, setSelectedStep] = useState(null);

  const handleCardClick = (step) => {
    setSelectedStep(step);
  };

  const handleDialogClose = () => {
    setSelectedStep(null);
  };

  return (
    <section
      className="section process"
      id="process"
      aria-label={language === "de" ? "Arbeitsprozess" : "Work Process"}
    >
      <div className="content">
        <div className="title">
          <p>{copy.intro}</p>
        </div>

        <div className="cards" role="list">
          {copy.steps.map((step, index) => (
            <div key={step.title} className="card" role="listitem">
              <button
                type="button"
                className="card__trigger"
                data-cursor="link"
                onClick={() => handleCardClick(step)}
                aria-haspopup="dialog"
                aria-label={
                  language === "de"
                    ? `Schritt ${index + 1}: ${step.title} – Details anzeigen`
                    : `Step ${index + 1}: ${step.title} – View details`
                }
              >
                <div className="index">
                  <p className="title">{String(index + 1).padStart(2, "0")}</p>
                  <i aria-hidden="true" className="plus-icon">+</i>
                </div>
                <p className="stage">{step.title}</p>
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedStep && (
        <ProcessDialog
          step={selectedStep}
          onClose={handleDialogClose}
        />
      )}
    </section>
  );
}
