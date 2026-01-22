"use client";

import Link from "next/link";
import useLanguage from "@/hooks/useLanguage";
import HandwritingEffect from "@/components/HandwritingEffect";

const COPY = {
  de: {
    references: [
      {
        quote: "Andrii kam nicht als Agentur, sondern als Architekt. Er hat unser komplettes Kampagnen-Tracking 'from scratch' neu aufgebaut. Endlich steuern wir unser Budget nicht mehr nach Klicks, sondern nach echtem Umsatz. Das 'Intelligence Hub' Setup hat uns die Augen geöffnet.",
        name: "Helena Warlamova",
        role: "Geschäftsführerin",
        company: "Sunny Bay Hotel",
        linkedin: "",
      },
      {
        quote: "Wir dachten, wir bräuchten einfach 'bessere Ads'. Andrii zeigte uns, dass unser Problem im CRM lag. Er implementierte das 'Control Center' und plötzlich wurden Leads innerhalb von Minuten bearbeitet – automatisch. Die Conversion-Rate hat sich verdoppelt, ohne dass wir mehr Geld für Werbung ausgegeben haben.",
        name: "Uriyi Litkovskyi",
        role: "Inhaber",
        company: "Stimul Sport Resort",
        linkedin: "",
      },
      {
        quote: "Früher war Marketing für uns eine Blackbox. Heute ist es eine Maschine. Andrii hat uns eine Infrastruktur gebaut, die wir selbst besitzen und verstehen. Keine Abhängigkeit mehr, sondern volle Kontrolle über unsere Daten und Prozesse. Das ist der Unterschied zwischen Dienstleistung und Partnerschaft.",
        name: "Alexandra Paptsova",
        role: "Head of Marketing",
        company: "Stimul Sport Resort",
        linkedin: "",
      },
    ],
  },
  en: {
    references: [
      {
        quote: "Andrii didn't come as an agency, but as an architect. He rebuilt our entire campaign tracking from scratch. Finally, we're steering budget based on real revenue, not clicks. The 'Intelligence Hub' setup was an eye-opener.",
        name: "Helena Warlamova",
        role: "CEO",
        company: "Sunny Bay Hotel",
        linkedin: "",
      },
      {
        quote: "We thought we just needed 'better ads'. Andrii showed us our problem was in the CRM. He implemented the 'Control Center' and suddenly leads were being processed in minutes – automatically. Our conversion rate doubled without spending a cent more on ads.",
        name: "Uriyi Litkovskyi",
        role: "Owner",
        company: "Stimul Sport Resort",
        linkedin: "",
      },
      {
        quote: "Marketing used to be a black box for us. Now it's a machine. Andrii built us infrastructure that we own and understand. No more dependency, but full control over our data and processes. That's the difference between a service provider and a partner.",
        name: "Alexandra Paptsova",
        role: "Head of Marketing",
        company: "Stimul Sport Resort",
        linkedin: "",
      },
    ],
  },
};

export default function References() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.de;

  return (
    <section
      className="section references"
      id="references"
      aria-label={language === "de" ? "Kundenstimmen" : "Customer Testimonials"}
    >
      <div className="content">
        {copy.references.map((ref, index) => (
          <article className="item" key={index}>
            <blockquote className="quote">
              <p>{ref.quote}</p>
            </blockquote>
            <footer>
              <cite className="person">
                {ref.linkedin ? (
                  <Link href={ref.linkedin} target="_blank" rel="noopener noreferrer">
                    <HandwritingEffect
                      as="span"
                      trigger="visible"
                      visibilityRootMargin="0px 0px -33%"
                      duration={2000}
                      className="inline-block"
                      letterSpacing={0}
                      fontSize={22}
                    >
                      {ref.name}
                    </HandwritingEffect>
                  </Link>
                ) : (
                  ref.name
                )}
              </cite>
              <span className="role">{ref.role}</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}