"use client";

import Link from "next/link";
import TextEffect from "@/components/TextEffect";

const education = {
  title: "Education",
  items: [
    {
      institution: "Taurida V.I. Vernadsky National University",
      location: "simferopol · ukraine",
      degree: "Master's degree in Tourism and Travel Services Management focus Marketing",
      start: "september 2004",
      end: "juni 2009",
      skills: "Tourism, Travel Services Management, Marketing",
    },
  ]
};

const certification = {
  title: "Certification",
  items: [
    {
      platform: "Content Marketing Institute",
      link: "https://www.linkedin.com/learning/certificates/dd2e4956921f69e82c024361171b6a4364a3b12bf7a8d298f7f8b4d974c69785",
      direction: "Digital Marketing Professional Certificate",
      date: "march 2025",
      skills: "Content Marketing, Digital Marketing, Marketing",
    },
    {
      platform: "HubSpot Academy",
      link: "https://app.hubspot.com/academy/achievements/41jh50tc/en/1/andrii-litkovskyi/hubspot-marketing-hub-software",
      direction: "HubSpot Marketing Hub Software",
      date: "march 2025",
      skills: "HubSpot Marketing Hub Software, Marketing",
    },
    {
      platform: "LinkedIn",
      link: "https://verify.skilljar.com/c/ompyyiw62qyi",
      direction: "LinkedIn Certified Marketing Insider",
      date: "march 2025",
      skills: "LinkedIn Certified Marketing Insider, Marketing",
    },
    {
      platform: "Google Digital Academy",
      link: "https://skillshop.credential.net/8f0ae8dd-61e4-436b-8def-22f710dc4802",
      direction: "Google Analytics Certification",
      date: "january 2025",
      skills: "Google Analytics, Analytics, Marketing",
    },
    {
      platform: "telc",
      link: "https://results.telc.net/qr/4DfpYIMoQ3u1skjqxfDgxU3uv472s0sDmrqtjq5D10_SKNDXlANETac3r5mTpnxe",
      direction: "German B2 Certificate",
      date: "september 2024",
      skills: "German B2, German, Language",
    },
    {
      platform: "EF SET",
      link: "https://cert.efset.org/227RcM",
      direction: "English C1 Certificate",
      date: "july 2023",
      skills: "English C1, English, Language",
    },
  ]
};

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="content">
        <div className="biography">
          <p>
          Ich baue Marketing, das wirkt, und zwar zielklar, datenbasiert, freundlich im Ton. Ich plane und steuere Search- und Sozialkampagnen, schreibe Landingpages, die konvertieren, und liefere saubere Analysen in GA4 und Looker. Mein Fokus ist B2B, wo Strategie und Performance zusammengehören. Ergebnisse zuletzt: +48 % Sichtbarkeit, +35 % Conversions, +25 % qualifizierte Leads, -22 % CPC. Was mich auszeichnet, ist ruhiger Kopf, klare Prioritäten, ehrliche Kommunikation und das gemeinsame Ziel, dass Zahlen und Menschen zufrieden sind.
          </p>
        </div>

        <div className="certification">
          <h2>Certifications</h2>
          {certification.items.map((item, index) => {
            return (
              <p key={index}>
                <span className="title">{item.direction}<br /></span>
                <span className="description">by&nbsp;{item.platform}&nbsp;|&nbsp;{item.date}<br /></span>
                <span className="skills">Skills: {item.skills}<br /></span>
                <span className="description">
                  {item.link ? (
                    <Link href={item.link} target="_blank">view certificate</Link>
                  ) : null}
                </span>
              </p>
            );
          })}
        </div>

        <div className="education">
          <h2>Education</h2>
          {education.items.map((item, index) => {
            return (
              <p key={index}>
                <span className="title">{item.degree}<br /></span>
                <span className="description">in&nbsp;{item.institution},&nbsp;{item.location}<br />{item.start}&nbsp;—&nbsp;{item.end}<br /></span>
                <span className="skills">Skills: {item.skills}<br /></span>
              </p>
            );
          })}
        </div>
        <TextEffect
          as="div"
          variant="sidelineAuto"
          trigger="visible"
          visibilityRootMargin="0px 0px -33%"
          className="colophon inline-block"
        >
          <h2>Colophon</h2>
          <p>
            <span className="description">Design and code by <Link href="/">Andrii Litkovskyi</Link><br /></span>
            <span className="description">Typeset in <Link href="https://fonts.google.com/specimen/Comfortaa" target="_blank">Comfortaa</Link> by <Link href="https://fonts.google.com/?query=Johan%20Aakerlund" target="_blank">Johan Aakerlund</Link><br /><br /></span>
            <span className="copyright">©&nbsp;<span className="year">{new Date().getFullYear()}</span> — made in Germany</span>
          </p>
        </TextEffect>

      </div>
    </section>
  );
};