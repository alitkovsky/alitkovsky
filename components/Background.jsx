import SvgStrokeEffect from "@/components/SvgStrokeEffect";
import WiggleSvg from "@/components/WiggleSvg";
import BookCTA from "@/components/BookCTA";

export  default function Background() {
  return (
    <section className="section background" id="background">
      <div className="content">
        <div className="brief">
          <p>
            Über 15 Jahre Erfahrung in Paid Media, SEO, CRO und Web Analytics. Mein Fokus: messbare Ergebnisse für lokale Unternehmen in OWL und darüber hinaus. Von der Strategie bis zur Umsetzung — alles aus einer Hand.
          </p>
        </div>

        <div className="items">
          <div className="item">
            <div className="left">
              <p className="company">selbstständig, hille (owl)</p>
              <h3 className="role">Online-Marketing-Berater</h3>
              <p className="description">
                beratung und Umsetzung für lokale KMU: Google Ads, Meta Ads, SEO-Optimierung, Landing-Page-Erstellung und Web-Analytics-Setup. Spezialisiert auf Praxen, Handwerksbetriebe und lokale Dienstleister.
              </p>
            </div>
            <div className="right">
              <p>2022 — heute</p>
              <WiggleSvg
                selector="path"
                distance={1.2}
                steps={7}
                duration={0.8}
              >
                <SvgStrokeEffect
                  file="path-down-first.svg"
                  width={80}
                  height="100%"
                  className="background-arrow"
                />
              </WiggleSvg>
            </div>
          </div>
          <div className="item">
            <div className="left">
                <p className="company">stimul sport resort, feodosiya</p>
                <h3 className="role">Digital Marketing & Performance Manager</h3>
                <p className="description">
                  +70% Buchungswachstum YoY durch Full-Funnel-Kampagnen. Verantwortlich für Paid Social, SEO, CRM-Strategie (HubSpot) und Event-Marketing. Team von 3 Mitarbeitern koordiniert.
                </p>
            </div>
            <div className="right">
              <p>2015 — 2022</p>
              <WiggleSvg
                selector="path"
                distance={1.2}
                steps={7}
                duration={0.8}
              >
                <SvgStrokeEffect
                  file="path-down-second.svg"
                  width={80}
                  height="100%"
                  className="background-arrow"
                />
              </WiggleSvg>
            </div>
          </div>
          <div className="item">
            <div className="left">
              <p className="company">sunny bay hotel, feodosiya</p>
                <h3 className="role">Paid Social & SEO Manager</h3>
                <p className="description">
                  +35% Website-Traffic durch SEO-Optimierung. +20% Umsatzsteigerung durch datenbasierte Social-Media-Kampagnen. Aufbau der ersten digitalen Marketing-Infrastruktur des Hotels.
                </p>
            </div>
            <div className="right">
              <p>2009 — 2015</p>
              <WiggleSvg
                selector="path"
                distance={1.2}
                steps={7}
                duration={0.8}
              >
                <SvgStrokeEffect
                  file="path-down-third.svg"
                  width={80}
                  height="80%"
                  className="background-arrow"
                />
              </WiggleSvg>
            </div>
          </div>
        </div>

        <div className="cta">
        <BookCTA label="give me a sign if you want to find out more" ctaLocation="background" />
        </div>
      </div>
    </section>
  );
};
