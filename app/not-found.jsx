"use client";

import Link from "next/link";

import useLanguage from "@/hooks/useLanguage";

const COPY = {
  en: {
    eyebrow: "404 // off the grid",
    title: "This page does not exist (anymore).",
    description:
      "The link you followed is probably outdated or the address was typed incorrectly. No worries — everything important is still within a click.",
    primaryAction: "Back to homepage",
    secondaryAction: "Jump to contact",
    hintPrefix: "Need something specific? Write me at",
    hintSuffix: "and I will point you in the right direction.",
  },
  de: {
    eyebrow: "404 // wohin denn?",
    title: "Diese Seite existiert nicht (mehr).",
    description:
      "Der aufgerufene Link ist veraltet oder wurde falsch eingegeben. Alles Wichtige findest du weiterhin mit einem Klick.",
    primaryAction: "Zur Startseite",
    secondaryAction: "Zum Kontaktbereich",
    hintPrefix: "Du brauchst etwas Bestimmtes? Schreib mir an",
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
}
