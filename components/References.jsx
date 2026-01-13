"use client";

import Link from "next/link";
import useLanguage from "@/hooks/useLanguage";
import HandwritingEffect from "@/components/HandwritingEffect";

const COPY = {
  de: {
    references: [
      {
        quote: "andrii kam zu uns, als wir online praktisch unsichtbar waren. er hat von null angefangen — seo, social media, das erste richtige tracking. nach zwei jahren hatten wir 35% mehr website-traffic und einen messbaren umsatzanstieg. aber was mich am meisten beeindruckt hat: er hat nie aufgehört zu lernen und hat jeden prozess hinterfragt, bis er funktioniert hat.",
        name: "helena warlamova",
        role: "geschäftsführerin",
        company: "sunny bay hotel",
        linkedin: "",
      },
      {
        quote: "als andrii bei uns anfing, war er hungrig nach daten und ergebnissen. er hat unsere paid-social-strategie komplett umgekrempelt und zum ersten mal konnten wir genau sehen, welche kampagnen wirklich buchungen bringen. seine technische tiefe kombiniert mit einem gespür für kreative kampagnen ist selten. ich wusste früh, dass er mehr verantwortung übernehmen wird.",
        name: "alexandra paptsova",
        role: "marketingleiter",
        company: "stimul sport resort",
        linkedin: "",
      },
      {
        quote: "andrii hat unser digitalmarketing von einer nebensache zu unserem wichtigsten wachstumstreiber gemacht. +70% buchungen in einem jahr sprechen für sich. aber was ihn wirklich auszeichnet: er denkt unternehmerisch, nicht nur in kampagnen. er hat ein team aufgebaut, prozesse etabliert und immer das große ganze im blick behalten. einer der besten leute, mit denen ich je gearbeitet habe.",
        name: "uriyi litkovskyi",
        role: "geschäftsführer",
        company: "stimul sport resort",
        linkedin: "",
      },
    ],
  },
  en: {
    references: [
      {
        quote: "andrii joined us when we were practically invisible online. he started from scratch — seo, social media, the first real tracking setup. two years later, we had 35% more website traffic and measurable revenue growth. but what impressed me most: he never stopped learning and questioned every process until it worked.",
        name: "helena warlamova",
        role: "ceo",
        company: "sunny bay hotel",
        linkedin: "",
      },
      {
        quote: "when andrii started with us, he was hungry for data and results. he completely revamped our paid social strategy, and for the first time we could see exactly which campaigns actually drove bookings. his technical depth combined with a feel for creative campaigns is rare. i knew early on he would take on more responsibility.",
        name: "alexandra paptsova",
        role: "head of marketing",
        company: "stimul sport resort",
        linkedin: "",
      },
      {
        quote: "andrii turned our digital marketing from an afterthought into our main growth driver. +70% bookings in one year speaks for itself. but what really sets him apart: he thinks like an entrepreneur, not just in campaigns. he built a team, established processes, and always kept the big picture in mind. one of the best people i've ever worked with.",
        name: "uriyi litkovskyi",
        role: "ceo",
        company: "stimul sport resort",
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