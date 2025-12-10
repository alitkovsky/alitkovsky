import Link from "next/link";

export const metadata = {
  title: "Danke – Termin bestätigt",
  description: "Dein Termin mit Andrii Litkovskyi ist bestätigt. Erfahre hier die nächsten Schritte.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThanxPage() {
  return (
    <main className="app-main thank-you">
      <section className="section thank-you">
        <div className="content">
          <p className="eyebrow">termin bestätigt</p>
          <h1>Danke, dein Termin ist bestätigt!</h1>
          <p className="lede">
            Ich schicke dir gleich eine Bestätigung mit Agenda, Zugangsdaten und optionalen Fragen, damit wir in den 30 Minuten maximal vorankommen.
          </p>
          <div className="thank-you__next">
            <h2>Was jetzt passiert</h2>
            <ul>
              <li>Die Einladung landet in deinem Postfach – check gern auch den Spam-Ordner.</li>
              <li>Ich bereite ein Micro-Audit zu Ads, Tracking oder SEO vor.</li>
              <li>Du bekommst nach dem Call ein kurzes Recap mit den wichtigsten To-Dos.</li>
            </ul>
          </div>
          <div className="thank-you__actions">
            <Link href="/" className="thank-you__link">
              zurück zur Startseite
            </Link>
            <Link href="mailto:andrii@litkovskyi.de" className="thank-you__link thank-you__link--ghost">
              Frage vorab senden
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
