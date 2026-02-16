"use client";

import { useState } from "react";
import useLanguage from "@/hooks/useLanguage";
import ProcessDialog from "@/components/ProcessDialog";

const COPY = {
  de: {
    intro: "vom status quo zu stabilen ablaeufen - der prozess. klar priorisiert, sauber dokumentiert, schritt fuer schritt umgesetzt.",
    steps: [
      {
        title: "diagnose (audit)",
        description: {
          summary: "wir starten mit einem systemaudit: ich pruefe crm-uebergaben, tracking-qualitaet, consent-setup und die schnittstellen zwischen marketing, vertrieb und backoffice. ziel ist eine klare fehler- und engpassanalyse.",
          metrics: "2-3 tage",
          result: "auditreport mit priorisierter fehler- und potenzialliste",
        },
      },
      {
        title: "blaupause (strategie)",
        description: {
          summary: "auf basis des audits definiere ich die zielarchitektur: datenfelder, rollen, automationslogik, reporting-struktur und governance-regeln. damit ist vor der umsetzung klar, was gebaut wird und warum.",
          metrics: "1 woche",
          result: "umsetzungsfahrplan mit prioritaeten, aufwand und verantwortlichkeiten",
        },
      },
      {
        title: "implementierung (bau)",
        description: {
          summary: "jetzt erfolgt die technische umsetzung: crm-strukturen, tracking, automationsworkflows und tool-integrationen. alle kritischen datenfluesse werden getestet, inklusive fehlerfaelle und vertretungsszenarien.",
          metrics: "3-6 wochen",
          result: "funktionsfaehiger prozess-kern mit validierten datenfluessen",
        },
      },
      {
        title: "stabilisierung (go-live)",
        description: {
          summary: "der rollout erfolgt kontrolliert: checklisten, monitoring und klare reaktionsregeln fuer die ersten tage. dadurch werden anlaufprobleme frueh erkannt und ohne chaos behoben.",
          metrics: "live-gang",
          result: "kontrollierter go-live mit verifizierten produktivsignalen",
        },
      },
      {
        title: "optimierung (betrieb)",
        description: {
          summary: "im laufenden betrieb optimiere ich gemeinsam mit dem team durchlaufzeiten, datenqualitaet und aufgabenlast. entscheidungen basieren auf dokumentierten kpis statt auf gefuehl.",
          metrics: "laufend",
          result: "kontinuierliche prozessverbesserung bei geringerer manueller routine",
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
    intro: "from status quo to stable operations - the process. clearly prioritized, documented, and executed step by step.",
    steps: [
      {
        title: "diagnosis (audit)",
        description: {
          summary: "we begin with a system audit: CRM handoffs, tracking quality, consent setup, and the interfaces between marketing, sales, and backoffice. the goal is a clear bottleneck and risk map.",
          metrics: "2-3 days",
          result: "audit report with prioritized issues and leverage points",
        },
      },
      {
        title: "blueprint (strategy)",
        description: {
          summary: "based on the audit, i define the target architecture: data fields, ownership, automation logic, reporting structure, and governance rules. this creates implementation clarity before any build starts.",
          metrics: "1 week",
          result: "implementation roadmap with priorities, effort, and ownership",
        },
      },
      {
        title: "implementation (build)",
        description: {
          summary: "this is the technical build phase: CRM structures, tracking, automation workflows, and tool integrations. critical data flows are tested, including failure scenarios and team handoff cases.",
          metrics: "3-6 weeks",
          result: "working process core with validated data flows",
        },
      },
      {
        title: "stabilization (go-live)",
        description: {
          summary: "rollout happens in a controlled way: checklists, monitoring, and clear response rules for the first days. this catches startup issues early and resolves them without disruption.",
          metrics: "go-live",
          result: "controlled go-live with verified production signals",
        },
      },
      {
        title: "optimization (operations)",
        description: {
          summary: "during ongoing operations, we continuously improve cycle times, data quality, and workload distribution. decisions are based on documented KPIs, not assumptions.",
          metrics: "ongoing",
          result: "continuous process improvement with lower manual routine",
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
