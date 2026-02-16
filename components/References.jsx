"use client";

import Link from "next/link";
import useLanguage from "@/hooks/useLanguage";
import HandwritingEffect from "@/components/HandwritingEffect";

const COPY = {
  de: {
    references: [
      {
        quote: "Andrii kam nicht als klassische Agentur, sondern als Systemintegrator. Er hat unsere Datenfluesse und das Tracking von Grund auf neu strukturiert. Seitdem treffen wir Entscheidungen mit belastbaren Zahlen statt mit Annahmen.",
        name: "Helena Warlamova",
        role: "Geschäftsführerin",
        company: "Sunny Bay Hotel",
        linkedin: "",
      },
      {
        quote: "Wir dachten zuerst an bessere Kampagnen. Andrii zeigte uns, dass der Engpass in unseren CRM- und Follow-up-Prozessen lag. Nach der neuen Struktur wurden Anfragen deutlich schneller und konsistenter bearbeitet.",
        name: "Uriyi Litkovskyi",
        role: "Inhaber",
        company: "Stimul Sport Resort",
        linkedin: "",
      },
      {
        quote: "Der groesste Unterschied war operative Klarheit: klare Zustaendigkeiten, saubere Dokumentation und Systeme, die wir selbst verstehen und weiterfuehren koennen. Genau das macht Zusammenarbeit nachhaltig.",
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
        quote: "Andrii did not come in as a classic agency, but as a systems integrator. He rebuilt our data flow and tracking foundation from scratch. Since then, we make decisions based on reliable numbers, not assumptions.",
        name: "Helena Warlamova",
        role: "CEO",
        company: "Sunny Bay Hotel",
        linkedin: "",
      },
      {
        quote: "We first thought we needed better campaigns. Andrii showed us the real bottleneck was in our CRM and follow-up process. After the new setup, inquiries were handled faster and far more consistently.",
        name: "Uriyi Litkovskyi",
        role: "Owner",
        company: "Stimul Sport Resort",
        linkedin: "",
      },
      {
        quote: "The biggest change was operational clarity: clear ownership, clean documentation, and systems we can run ourselves. That is what makes a collaboration sustainable.",
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
