"use client";

import Link from "next/link";

import useLanguage from "@/hooks/useLanguage";

const COPY = {
  en: {
    eyebrow: "404 // off the grid",
    title: "this page does not exist (anymore).",
    description:
      "the link you followed is probably outdated or the address was typed incorrectly. no worries — everything important is still within a click.",
    primaryAction: "← back to homepage",
    secondaryAction: "jump to contact",
    hintPrefix: "need something specific? write me at",
    hintSuffix: "and i will point you in the right direction.",
  },
  de: {
    eyebrow: "404 // wohin denn?",
    title: "diese seite existiert nicht (mehr).",
    description:
      "der aufgerufene link ist veraltet oder wurde falsch eingegeben. alles wichtige findest du weiterhin mit einem klick.",
    primaryAction: "← zur startseite",
    secondaryAction: "zum kontaktbereich",
    hintPrefix: "du brauchst etwas bestimmtes? schreib mir an",
    hintSuffix: "und ich melde mich schnellstmöglich.",
  },
};

export default function NotFound() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.en;

  return (
    <main className="app-main">
      <section className="section not-found" aria-labelledby="not-found-title">
        <div className="content">
          <p className="not-found__eyebrow">{copy.eyebrow}</p>
          <h1 id="not-found-title">{copy.title}</h1>
          <p className="not-found__description">{copy.description}</p>
          <div className="not-found__actions">
            <Link href="/" className="not-found__link not-found__link--primary">
              {copy.primaryAction}
            </Link>
            <Link
              href="/#contact"
              className="not-found__link not-found__link--secondary"
              prefetch={false}
              scroll
            >
              {copy.secondaryAction}
            </Link>
          </div>
          <p className="not-found__hint">
            {copy.hintPrefix}{" "}
            <a href="mailto:andrii@litkovskyi.de">andrii@litkovskyi.de</a>{" "}
            {copy.hintSuffix}
          </p>
        </div>
      </section>
    </main>
  );
};