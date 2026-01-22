"use client";

import { useState } from "react";
import useLanguage from "@/hooks/useLanguage";
import ProcessDialog from "@/components/ProcessDialog";

const COPY = {
  de: {
    intro: "vom chaos zum system — der prozess. wir bauen keine luftschlösser, sondern solide infrastruktur. schritt für schritt.",
    steps: [
      {
        title: "diagnose (audit)",
        description: {
          summary: "wir starten mit einem tiefenblick auf den status quo. ich prüfe deine aktuelle tracking-infrastruktur, deine kampagnen-historie und deine crm-prozesse. wo verlierst du daten? wo verbrennst du budget? wir identifizieren die engpässe, die dein wachstum bremsen.",
          metrics: "2-3 tage",
          result: "dokumentierter audit-report + liste aller wachstumsbremsen",
        },
      },
      {
        title: "blaupause (strategie)",
        description: {
          summary: "basierend auf dem audit entwerfe ich die architektur für dein neues system. welche tools brauchen wir? wie fließen die daten? wie sehen die kampagnen-strukturen aus? du bekommst einen klaren bauplan, bevor wir den ersten stein setzen. keine überraschungen.",
          metrics: "1 woche",
          result: "fertiger system-bauplan und technisches konzept",
        },
      },
      {
        title: "konstruktion (bau)",
        description: {
          summary: "jetzt wird gebaut. ich richte das tracking ein (server-side), verknüpfe die apis (n8n/make) und baue die kampagnen-struktur. wir testen die datenflüsse und stellen sicher, dass jeder lead korrekt im crm ankommt. das ist die phase der 'digitalen baustelle'.",
          metrics: "3-6 wochen",
          result: "schlüsselfertiges marketing-system & validiertes tracking",
        },
      },
      {
        title: "zündung (launch)",
        description: {
          summary: "das system geht live. wir schalten den traffic ein. da das tracking sauber ist, sehen wir sofort, was passiert. wir überwachen die ersten 7 tage extrem engmaschig, um kinderkrankheiten sofort zu beheben. der erste traffic fließt durch die neuen rohre.",
          metrics: "live-gang",
          result: "go-live und erster verifizierter dateneingang",
        },
      },
      {
        title: "kalibrierung (skalierung)",
        description: {
          summary: "ein system ist nie 'fertig', es wird nur besser. basierend auf echten daten optimieren wir die creatives, das targeting und die crm-automatisierungen. wir drehen an den stellschrauben, um den roi zu maximieren. monatliches reporting zeigt dir schwarz auf weiß, was das system leistet.",
          metrics: "laufend",
          result: "kontinuierliche roi-steigerung und system-verfeinerung",
        },
      },
      // {
      //   title: "übergabe (enablement)",
      //   description: {
      //     summary: "mein ziel ist nicht abhängigkeit, sondern dein wachstum. wenn das system stabil läuft, schule ich dein team darin, es zu bedienen. du bekommst dokumentationen und playbooks. du besitzt das system, nicht ich.",
      //     metrics: "optional",
      //     result: "inhouse-kompetenz und unabhängigkeit",
      //   },
      // }
    ],
  },
  en: {
    intro: "from chaos to system — the process. we don't build castles in the sky, we build solid infrastructure. step by step.",
    steps: [
      {
        title: "diagnosis (audit)",
        description: {
          summary: "we start with a deep dive into the status quo. i inspect your current tracking infrastructure, campaign history, and crm processes. where are you losing data? where are you burning budget? we identify the bottlenecks slowing down your growth.",
          metrics: "2-3 days",
          result: "documented audit report + list of growth blockers",
        },
      },
      {
        title: "blueprint (strategy)",
        description: {
          summary: "based on the audit, i design the architecture for your new system. which tools do we need? how does data flow? what do the campaign structures look like? you get a clear blueprint before we lay the first brick. no surprises.",
          metrics: "1 week",
          result: "finished system blueprint and technical concept",
        },
      },
      {
        title: "construction (build)",
        description: {
          summary: "now we build. i set up the tracking (server-side), connect the apis (n8n/make), and build the campaign structure. we test data flows and ensure every lead lands correctly in the crm. this is the 'digital construction site' phase.",
          metrics: "3-6 weeks",
          result: "turnkey marketing system & validated tracking",
        },
      },
      {
        title: "ignition (launch)",
        description: {
          summary: "the system goes live. we switch on the traffic. because tracking is clean, we see exactly what happens immediately. we monitor the first 7 days extremely closely to fix teething issues instantly. initial traffic flows through the new pipes.",
          metrics: "go-live",
          result: "go-live and first verified data ingress",
        },
      },
      {
        title: "calibration (scale)",
        description: {
          summary: "a system is never 'done', it only gets better. based on real data, we optimize creatives, targeting, and crm automations. we tweak the levers to maximize roi. monthly reporting shows you black on white what the system delivers.",
          metrics: "ongoing",
          result: "continuous roi increase and system refinement",
        },
      },
      // {
      //   title: "handover (enablement)",
      //   description: {
      //     summary: "my goal isn't dependency, it's your growth. once the system runs stably, i train your team to operate it. you get documentation and playbooks. you own the system, not me.",
      //     metrics: "optional",
      //     result: "in-house competence and independence",
      //   },
      // }
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
