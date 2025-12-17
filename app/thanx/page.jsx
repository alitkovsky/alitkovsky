"use client";

import Link from "next/link";
import useLanguage from "@/hooks/useLanguage";
import BackToStart from "@/components/BackToStart";
import Footer from "@/components/Footer";

const COPY = {
  de: {
    eyebrow: "termin bestätigt",
    title: "danke, dein termin ist bestätigt!",
    lede: "ich schicke dir gleich eine bestätigung mit agenda, zugangsdaten und optionalen fragen, damit wir in den 30 minuten maximal vorankommen.",
    nextSteps: {
      heading: "was jetzt passiert",
      items: [
        "die einladung landet in deinem postfach — check gern auch den spam-ordner.",
        "ich bereite ein micro-audit zu ads, tracking oder seo vor.",
        "du bekommst nach dem call ein kurzes recap mit den wichtigsten to-dos.",
      ],
    },
    backLink: "zurück zur startseite",
    questionLink: "frage vorab senden",
  },
  en: {
    eyebrow: "appointment confirmed",
    title: "thanks, your appointment is confirmed!",
    lede: "i'll send you a confirmation shortly with the agenda, access details, and optional questions so we can make the most of our 30 minutes.",
    nextSteps: {
      heading: "what happens now",
      items: [
        "the invitation will land in your inbox — check your spam folder just in case.",
        "i'll prepare a micro-audit on ads, tracking, or seo.",
        "after the call, you'll receive a short recap with the key to-dos.",
      ],
    },
    backLink: "back to homepage",
    questionLink: "send a question ahead",
  },
};

export default function ThanxPage() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.de;

  return (
    <main className="app-main">
      <section className="section thank-you">
        <div className="content">
          <div className="left">
            <p className="title mb-[1em]">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="mt-[1em]">{copy.lede}</p>
          </div>
          <div className="left">
            <h2>{copy.nextSteps.heading}</h2>
            <ul>
              {copy.nextSteps.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="left mt-[3em]">
            <BackToStart
              label={copy.backLink}
              ctaLocation="thank-you"
              url={"/"}
            />
            {/* <Link
              href="mailto:andrii@litkovskyi.de"
              className="thank-you__link thank-you__link--ghost"
            >
              {copy.questionLink}
            </Link> */}
          </div>
        </div>
        <Footer />
      </section>
    </main>
  );
};