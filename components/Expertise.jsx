"use client";

import Link from "next/link";
import TextEffect from "@/components/TextEffect";

import useLanguage from "@/hooks/useLanguage";

const EXPERTISE_COPY = {
  de: {
    biography: [
      "ich bin andrii — online-marketing-berater aus hille, kreis minden-lübbecke. seit über 15 jahren helfe ich unternehmen dabei, online sichtbar zu werden und planbar kunden zu gewinnen.",
      "mein ansatz: persönliche beratung auf augenhöhe, hands-on umsetzung und ein tiefes verständnis für lokale märkte. ich arbeite nicht mit standardpaketen — jede strategie wird individuell auf deine ziele zugeschnitten.",
      "ob google ads, meta-kampagnen, seo oder marketing-automatisierung mit hubspot — ich bring die erfahrung und die zertifizierungen mit, um dein marketing aufs nächste level zu heben.",
    ],
    headings: {
      certifications: "zertifizierungen",
      education: "bildung",
      colophon: "kolophon",
    },
    links: {
      viewCertificate: "zertifikat ansehen",
    },
    colophon: {
      designAndCodePrefix: "design und code von",
      typesetInPrefix: "typeset in",
      typesetByJoiner: "von",
      copyrightSuffix: "andrii litkovskyi marketing — made in germany",
    },
  },
  en: {
    biography: [
      "i'm andrii — an online marketing consultant based in hille (minden-lübbecke), germany. for 15+ years i've helped businesses get found online and win customers predictably.",
      "my approach: personal consulting on equal footing, hands-on execution, and a deep understanding of local markets. no cookie-cutter packages — every strategy is tailored to your goals.",
      "whether it's google ads, meta campaigns, seo, or hubspot marketing automation — i bring the experience and certifications to take your marketing to the next level.",
    ],
    headings: {
      certifications: "certifications",
      education: "education",
      colophon: "colophon",
    },
    links: {
      viewCertificate: "view certificate",
    },
    colophon: {
      designAndCodePrefix: "design and code by",
      typesetInPrefix: "typeset in",
      typesetByJoiner: "by",
      copyrightSuffix: "andrii litkovskyi marketing — made in germany",
    },
  },
};

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

export default function Expertise() {
  const { language } = useLanguage();

  const copy = EXPERTISE_COPY[language] ?? EXPERTISE_COPY.en;
  const fallbackCopy = EXPERTISE_COPY.en;

  const biography = copy.biography ?? fallbackCopy.biography ?? [];
  const headings = copy.headings ?? fallbackCopy.headings ?? {};
  const viewCertificate = copy.links?.viewCertificate ?? fallbackCopy.links?.viewCertificate ?? "view certificate";
  const colophon = copy.colophon ?? fallbackCopy.colophon ?? {};

  return (
    <section className="section expertise" id="expertise">
      <div className="content">
        <div className="biography">
          {biography.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="certification">
          <h2>{headings.certifications ?? "Certifications"}</h2>
          {certification.items.map((item, index) => {
            return (
              <p key={index}>
                <span className="title">{item.direction}<br /></span>
                <span className="description">by&nbsp;{item.platform}&nbsp;|&nbsp;{item.date}<br /></span>
                <span className="description">
                  {item.link ? (
                    <TextEffect
                      as="a"
                      variant="ellipseAuto"
                      href={item.link}
                      trigger="hover"
                      className="inline-block"
                      autoActive
                    >
                      {viewCertificate}
                    </TextEffect>
                  ) : null}
                </span>
              </p>
            );
          })}
        </div>

        <div className="education">
          <h2>{headings.education ?? "Education"}</h2>
          {education.items.map((item, index) => {
            return (
              <p key={index}>
                <span className="title">{item.degree}<br /></span>
                <span className="description">in&nbsp;{item.institution},&nbsp;{item.location}<br />{item.start}&nbsp;—&nbsp;{item.end}<br /></span>
                {/* <span className="skills">Skills: {item.skills}<br /></span> */}
              </p>
            );
          })}
        </div>
        <TextEffect
          as="div"
          variant="sidelineBold"
          trigger="visible"
          visibilityRootMargin="0px 0px -25%"
          className="colophon inline-block"
        >
          <h2>{headings.colophon ?? "Colophon"}</h2>
          <p>
            <span className="description">{colophon.designAndCodePrefix ?? "Design and code by"} <Link href="/">Andrii Litkovskyi</Link><br /></span>
            <span className="description">{colophon.typesetInPrefix ?? "Typeset in"} <Link href="https://fonts.google.com/specimen/Comfortaa" target="_blank" rel="noopener noreferrer">Comfortaa</Link> {colophon.typesetByJoiner ?? "by"} <Link href="https://fonts.google.com/?query=Johan%20Aakerlund" target="_blank" rel="noopener noreferrer">Johan Aakerlund</Link><br /><br /></span>
            <span className="copyright">©&nbsp;<span className="year">{new Date().getFullYear()}</span> {colophon.copyrightSuffix ?? "Andrii Litkovskyi Marketing — made in Germany"}</span>
            {/* <TextEffect
              as="a"
              variant="ellipseAuto"
              href="https://www.linkedin.com/in/andrii-litkovskyi/"
              trigger="hover"
              openInNewTab
              className="inline-block mt-2"
            >
              linkedIn
            </TextEffect> */}
          </p>
        </TextEffect>

      </div>
    </section>
  );
};
