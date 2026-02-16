"use client";

import SvgStrokeEffect from "@/components/SvgStrokeEffect";
import WiggleSvg from "@/components/WiggleSvg";
import BookCTA from "@/components/BookCTA";

import useLanguage from "@/hooks/useLanguage";

const BACKGROUND_COPY = {
  de: {
    brief: "15+ jahre erfahrung an der schnittstelle von marketing, daten und operativen ablaeufen. heute liegt mein fokus auf systemintegration, prozessklarheit und administrativer entlastung fuer kmu in owl und darueber hinaus.",
    items: [
      {
        company: "selbstständig, hille (owl)",
        role: "systemintegrator & prozessoptimierer",
        description: "ich implementiere crm-workflows, tracking-standards und automationen fuer lokale kmu. fokus: klare uebergaben, nachvollziehbare daten und weniger manuelle routine in marketing und backoffice.",
        period: "2022 — heute",
        path: "path-down-first.svg",
        pathHeight: "100%",
      },
      {
        company: "stimul sport resort, feodosiya",
        role: "digital operations & performance manager",
        description: "aufbau und steuerung von crm-, tracking- und reporting-prozessen fuer ein wachsendes team. neben kanalverantwortung wurden standards fuer datenqualitaet, teamkoordination und kampagnen-uebergaben etabliert.",
        period: "2015 — 2022",
        path: "path-down-second.svg",
        pathHeight: "100%",
      },
      {
        company: "sunny bay hotel, feodosiya",
        role: "digital marketing & analytics manager",
        description: "aufbau der ersten digitalen grundinfrastruktur mit website-analytics, seo-basis und wiederholbaren kampagnenablaeufen. daraus entstanden belastbare daten als basis fuer spaetere operations-verbesserungen.",
        period: "2009 — 2015",
        path: "path-down-third.svg",
        pathHeight: "80%",
      },
    ],
    cta: {
      label: "neugierig? meld dich einfach",
    },
  },
  en: {
    brief: "15+ years of experience at the intersection of marketing, data, and operations. today i focus on system integration, process clarity, and administrative relief for smb teams in owl and beyond.",
    items: [
      {
        company: "self-employed, hille (owl)",
        role: "system integrator & process optimizer",
        description: "i implement CRM workflows, tracking standards, and automations for local SMEs. core focus: clear handoffs, traceable data, and less manual routine across marketing and backoffice.",
        period: "2022 — today",
        path: "path-down-first.svg",
        pathHeight: "100%",
      },
      {
        company: "stimul sport resort, feodosiya",
        role: "digital operations & performance manager",
        description: "built and managed CRM, tracking, and reporting processes for a growing team. alongside channel ownership, i introduced standards for data quality, team coordination, and campaign-to-sales handoffs.",
        period: "2015 — 2022",
        path: "path-down-second.svg",
        pathHeight: "100%",
      },
      {
        company: "sunny bay hotel, feodosiya",
        role: "digital marketing & analytics manager",
        description: "built the first digital foundation: website analytics, SEO baseline, and repeatable campaign workflows. this created the reliable data layer later used for broader operational improvements.",
        period: "2009 — 2015",
        path: "path-down-third.svg",
        pathHeight: "80%",
      },
    ],
    cta: {
      label: "curious? just reach out",
    },
  },
};

export default function Background() {
  const { language } = useLanguage();

  const copy = BACKGROUND_COPY[language] ?? BACKGROUND_COPY.en;
  const fallbackCopy = BACKGROUND_COPY.en;

  const brief = copy.brief ?? fallbackCopy.brief ?? "";
  const items = copy.items ?? fallbackCopy.items ?? [];
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label ?? "give me a sign if you want to find out more";

  return (
    <section className="section background" id="background">
      <div className="content">
        <div className="brief">
          <p>
            {brief}
          </p>
        </div>

        <div className="items">
          {items.map((item) => (
            <div className="item" key={`${item.company}-${item.period}`}>
              <div className="left">
                <p className="company">{item.company}</p>
                <h3 className="role">{item.role}</h3>
                <p className="description">
                  {item.description}
                </p>
              </div>
              <div className="right">
                <p>{item.period}</p>
                <WiggleSvg
                  selector="path"
                  distance={1.2}
                  steps={7}
                  duration={0.8}
                >
                  <SvgStrokeEffect
                    file={item.path}
                    width={80}
                    height={item.pathHeight}
                    className="background-arrow"
                    visibilityRootMargin="0px 0px -25% 0px"
                  />
                </WiggleSvg>
              </div>
            </div>
          ))}
        </div>

        <div className="cta">
          <BookCTA label={ctaLabel} ctaLocation="background" />
        </div>
      </div>
    </section>
  );
};
