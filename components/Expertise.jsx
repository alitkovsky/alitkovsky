"use client";

import Link from "next/link";
import TextEffect from "@/components/TextEffect";

import useLanguage from "@/hooks/useLanguage";

const EXPERTISE_COPY = {
  de: {
    biography: [
      "ich bin andrii - digital operations und systemintegrator aus hille (owl). ich helfe unternehmen dabei, crm, daten und prozesse so aufzusetzen, dass verwaltung, vertrieb und marketing reibungslos zusammenarbeiten.",
      "mein hintergrund im marketing hilft mir, kanaldenken zu vermeiden: ich betrachte den gesamten ablauf von anfrage, bearbeitung und dokumentation bis zum reporting.",
      "mein fokus liegt auf klaren zustaendigkeiten, sauberer datenqualitaet und automatisierten routineaufgaben. so entstehen stabile systeme statt kurzfristiger einzelmassnahmen.",
    ],
    headings: {
      certifications: "zertifizierungen",
      education: "ausbildung",
      colophon: "kolophon",
    },
    links: {
      viewCertificate: "zertifikat ansehen",
    },
    colophon: {
      designAndCodePrefix: "design und code",
      designAndCodeLove: "mit liebe",
      designAndCodeSuffix: "von",
      typesetInPrefix: "gesetzt in",
      typesetByJoiner: "von",
      copyrightSuffix: "andrii litkovskyi digital operations - systems architect",
    },
  },
  en: {
    biography: [
      "i am andrii - a digital operations and system integration specialist based in hille (owl). i help companies set up crm, data, and workflows so administration, sales, and marketing run in sync.",
      "my background in marketing helps me avoid channel silos: i focus on the full flow from incoming inquiry and processing to documentation and reporting.",
      "my core focus is clear ownership, clean data quality, and automation of recurring routine work. that is how teams get stable systems instead of short-term campaign fixes.",
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
      designAndCodePrefix: "design and code",
      designAndCodeLove: "with love",
      designAndCodeSuffix: "by",
      typesetInPrefix: "typeset in",
      typesetByJoiner: "by",
      copyrightSuffix: "andrii litkovskyi digital operations - systems architect",
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
    // Kept key certifications that are less "tool generic" and more "professional"
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

  // Pre-compute heading values to avoid Turbopack ?? minification bug
  const headingCertifications = headings.certifications ?? "Certifications";
  const headingEducation = headings.education ?? "Education";
  const headingColophon = headings.colophon ?? "Colophon";
  const colophonDesignAndCodePrefix = colophon.designAndCodePrefix ?? "Design and code";
  const colophonDesignAndCodeLove = colophon.designAndCodeLove ?? "with love";
  const colophonDesignAndCodeSuffix = colophon.designAndCodeSuffix ?? "by";
  const colophonTypesetIn = colophon.typesetInPrefix ?? "Typeset in";
  const colophonTypesetBy = colophon.typesetByJoiner ?? "by";
  const colophonCopyright = colophon.copyrightSuffix ?? "Andrii Litkovskyi Digital Operations - made in Germany";

  return (
    <section className="section expertise" id="expertise">
      <div className="content">
        <div className="biography">
          {biography.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="certification">
          <h2>{headingCertifications}</h2>
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
          <h2>{headingEducation}</h2>
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
          <h2>{headingColophon}</h2>
          <p>
            <span className="description">
              {colophonDesignAndCodePrefix}{" "}
              {/* <TextEffect
                as="span"
                variant="hearts"
                trigger="always"
                className="inline-block"
                effectOverrides={{
                  style: {
                    height: "400%",
                    top: "-40",
                    right: "",
                }}}
              >
                {colophonDesignAndCodeLove}
              </TextEffect> */}
              {colophonDesignAndCodeLove}{" "}
              {colophonDesignAndCodeSuffix}{" "}
              <Link href="/">Andrii Litkovskyi</Link>
              <br /><br />
            </span>
            <span className="copyright">©&nbsp;<span className="year">{new Date().getFullYear()}</span> {colophonCopyright}</span>
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
