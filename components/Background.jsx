import SvgStrokeEffect from "@/components/SvgStrokeEffect";
import WiggleSvg from "@/components/WiggleSvg";

export  default function Background() {
  return (
    <section className="section background" id="background">
      <div className="content">
        <div className="brief">
          <p>
            I bring 15+ years of experience across paid media, SEO, CRO, and analytics. Proven track record in both B2B and B2C, with 70%+ YoY booking growth in my latest role.
            I bring 15+ years of experience across paid media, SEO, CRO, and analytics. Proven track record in both B2B and B2C, with 70%+ YoY booking growth in my latest role.
            I bring 15+ years of experience across paid media, SEO, CRO, and analytics. Proven track record in both B2B and B2C, with 70%+ YoY booking growth in my latest role.
          </p>
        </div>

        <div className="items">
          <div className="item">
            <div className="left">
              <p className="company">andrii litkovskyi marketing, hille</p>
              <h3 className="role">Digital Marketing Consultant</h3>
              <p className="description">
                I've been commissioned to create custom websites, apps, and identity systems for select clients including National Geographic photographers, Academy award-winning film-makers, and global entrepreneurs. I've been commissioned to create custom websites, apps, and identity systems for select clients including National Geographic photographers, Academy award-winning film-makers, and global entrepreneurs.
              </p>
            </div>
            <div className="right">
              <p>2022 — 2025</p>
              {/* <SvgStrokeEffect
                file="path-down-first.svg"
                width={60}
                height="100%"
                className="background-arrow"
              /> */}
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
                  +30 % Markenbekanntheitssteigerung durch gezielte Rebranding- und SEO-Maßnahmen. +20 % Conversion-Rate durch optimierte Paid-Media-Kampagnen (Google Ads, Facebook Ads). +40 % Umsatzwachstum durch datengetriebene Performance-Marketing-Strategien. Lead-Generierung & CRM-Strategie mit HubSpot zur erfolgreichen Kundenbindung implementiert. Event- & Messeplanung mit Fokus auf Kundeninteraktion und Marktdurchdringung. Koordination mit Vertrieb & Produktmanagement zur Ausrichtung der Marketingstrategie.
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
                  +35 % Website-Traffic durch strategische SEO- & Social-Media-Optimierung. +20 % Umsatzsteigerung durch datenbasierte Paid Social Media Kampagnen. Keyword- & Marktanalysen zur Identifikation neuer Wachstumschancen. Optimierung der Customer Journey durch Retargeting & Content-Marketing-Strategien.
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
      </div>
    </section>
  );
};
