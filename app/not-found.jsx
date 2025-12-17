"use client";

import BackToStart from "@/components/BackToStart";
import Footer from "@/components/Footer";
import useLanguage from "@/hooks/useLanguage";

import Link from "next/link";

const COPY = {
  en: {
    eyebrow: "404 // off the grid",
    title: "this page does not exist (anymore).",
    description:
      "the link you followed is probably outdated or the address was typed incorrectly. no worries — everything important is still within a click.",
    primaryAction: "back to homepage",
    secondaryAction: "jump to contact",
    hintPrefix: "need something specific? write me at",
    hintSuffix: "and i will point you in the right direction.",
  },
  de: {
    eyebrow: "404 // wohin denn?",
    title: "diese seite existiert nicht (mehr).",
    description:
      "der aufgerufene link ist veraltet oder wurde falsch eingegeben. alles wichtige findest du weiterhin mit einem klick.",
    primaryAction: "zur startseite",
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
          <div className="left">
            <p className="title mb-[.5em]">{copy.eyebrow}</p>
            <h1 id="not-found-title">{copy.title}</h1>
            <p className="my-[1.5em]">{copy.description}</p>
            <p>
              {copy.hintPrefix}{" "}
              <Link href="mailto:andrii@litkovskyi.de">andrii@litkovskyi.de</Link>{" "}
              {copy.hintSuffix}
            </p>
          </div>
          <div className="left mt-[3em]">
            <BackToStart
              label={copy.primaryAction}
              ctaLocation="not-found"
              url={"/"}
            />
          </div>
        </div>
        <Footer />
      </section>
    </main>
  );
};