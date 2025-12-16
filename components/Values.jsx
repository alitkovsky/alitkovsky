"use client";

import TextEffect from "@/components/TextEffect";
import LogoLoop from "@/components/LogoLoop";
import BookCTA from "@/components/BookCTA";
import ToolList from "@/components/ToolList";
import WiggleSvg from "@/components/WiggleSvg";

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

export default function Values() {
  return (
    <section className="section values" id="values">
      <div className="content">
        <div className="title">
          <h1>transparent</h1>
          <h1>hands-on</h1>
          <TextEffect
            as="h1"
            variant="ellipseBold"
            trigger="visible"
            visibilityRootMargin="0px 0px -33%"
            className="inline-block"
          >
            auf augenhöhe
          </TextEffect>
          <h1>lokal verankert</h1>
        </div>
        <div className="main">
          <p className="description">
            Marketing ohne Buzzwords und leere Versprechen. Ich arbeite seit über 15 Jahren im Online-Marketing — von Paid Social über SEO bis CRM-Automatisierung. Was mich antreibt: echte Ergebnisse für echte Unternehmen. Keine Langzeitverträge, keine versteckten Kosten. Nur klare Strategien, die funktionieren.
          </p>
          <p className="description results">
            <strong>Meine bisherigen Ergebnisse für Kunden:</strong><br />
            +48% Sichtbarkeit / +35% Conversions / +25% qualifizierte Leads / −22% Werbekosten
          </p>
        </div>
        <div className="tools">
          <h3 className="title">
            core tools
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
            ariaLabel="Marketing tools"
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
          <BookCTA label="book a free call to find out more" ctaLocation="values" />
        </div>
      </div>
    </section>
  );
};
