"use client";

import SvgStrokeEffect from "@/components/SvgStrokeEffect";
import WiggleSvg from "@/components/WiggleSvg";
import BookCTA from "@/components/BookCTA";

import useLanguage from "@/hooks/useLanguage";

const BACKGROUND_COPY = {
  de: {
    brief: "über 15 jahre erfahrung in paid media, seo, cro und web analytics. mein fokus: messbare ergebnisse für lokale unternehmen in owl und darüber hinaus. von der strategie bis zur umsetzung — alles aus einer hand.",
    items: [
      {
        company: "selbstständig, hille (owl)",
        role: "online-marketing-berater",
        description: "beratung und umsetzung für lokale kmu: google ads, meta ads, seo-optimierung, landing-page-erstellung und web-analytics-setup. spezialisiert auf praxen, handwerksbetriebe und lokale dienstleister.",
        period: "2022 — heute",
        path: "path-down-first.svg",
        pathHeight: "100%",
      },
      {
        company: "stimul sport resort, feodosiya",
        role: "digital marketing & performance manager",
        description: "+70% buchungswachstum yoy durch full-funnel-kampagnen. verantwortlich für paid social, seo, crm-strategie (hubspot) und event-marketing. team von 3 mitarbeitern koordiniert.",
        period: "2015 — 2022",
        path: "path-down-second.svg",
        pathHeight: "100%",
      },
      {
        company: "sunny bay hotel, feodosiya",
        role: "paid social & seo manager",
        description: "+35% website-traffic durch seo-optimierung. +20% umsatzsteigerung durch datenbasierte social-media-kampagnen. aufbau der ersten digitalen marketing-infrastruktur des hotels.",
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
    brief: "15+ years of experience in paid media, seo, cro, and web analytics. my focus: measurable results for local businesses in owl and beyond. from strategy to execution — everything from one source.",
    items: [
      {
        company: "self-employed, hille (owl)",
        role: "online marketing consultant",
        description: "consulting and execution for local smes: google ads, meta ads, seo optimization, landing page creation, and web analytics setup. specialized in medical practices, tradespeople, and local service providers.",
        period: "2022 — today",
        path: "path-down-first.svg",
        pathHeight: "100%",
      },
      {
        company: "stimul sport resort, feodosiya",
        role: "digital marketing & performance manager",
        description: "+70% bookings yoy through full-funnel campaigns. owned paid social, seo, crm strategy (hubspot), and event marketing. managed a team of 3.",
        period: "2015 — 2022",
        path: "path-down-second.svg",
        pathHeight: "100%",
      },
      {
        company: "sunny bay hotel, feodosiya",
        role: "paid social & seo manager",
        description: "+35% website traffic through seo optimization. +20% revenue growth with data-driven social campaigns. built the hotel's first digital marketing infrastructure.",
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
