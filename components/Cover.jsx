"use client";
import useLanguage from "@/hooks/useLanguage";

const COVER_COPY = {
  de: {
    name: "andrii litkovskyi",
    tagline: "– automatische marketing-systeme für deutsche kmu",
    subline: "control center, intelligence hub & growth engine",
  },
  en: {
    name: "andrii litkovskyi",
    tagline: "– scalable growth infrastructures for agencies & e-com",
    subline: "control center, intelligence hub & growth engine",
  },
};

export default function Cover() {
  const { language } = useLanguage();
  const copy = COVER_COPY[language] ?? COVER_COPY.de;

  return (
    <section className="section cover">
      <div className="content">
        <h1 className="cover__headline is--animating">
          <span className="cover__headline-line">{copy.name}</span>
          <br />
          <span className="cover__headline-line">{copy.tagline}</span>
        </h1>
        {copy.subline && (
          <p className="cover__subline">{copy.subline}</p>
        )}
      </div>
    </section>
  );
}
