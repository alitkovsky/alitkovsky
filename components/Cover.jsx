"use client";

import { useEffect, useRef } from "react";
import useLanguage from "@/hooks/useLanguage";

const COVER_COPY = {
  de: {
    name: "andrii litkovskyi",
    tagline: "– mehr lokale kunden durch digitales marketing",
    subline: "seo, google ads & marketing-automation für praxen, handwerker und dienstleister in owl",
  },
  en: {
    name: "andrii litkovskyi",
    tagline: "– more local customers through digital marketing",
    subline: "seo, google ads & marketing automation for practices, tradespeople and service providers in owl",
  },
};

export default function Cover() {
  const { language } = useLanguage();
  const copy = COVER_COPY[language] ?? COVER_COPY.de;
  const headlineRef = useRef(null);

  useEffect(() => {
    // Trigger animation after hydration is complete
    if (headlineRef.current) {
      headlineRef.current.classList.add("is--animating");
    }
  }, []);

  return (
    <section className="section cover">
      <div className="content">
        <h1 ref={headlineRef} className="cover__headline">
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
