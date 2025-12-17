"use client";

import useLanguage from "@/hooks/useLanguage";

const IMPRESSUM_COPY = {
  de: {
    title: "impressum",
    provider: {
      heading: "angaben gemäß § 5 DDG",
      name: "Andrii Litkovskyi",
      address: "Mindener Str. 87",
      city: "32479 Hille",
      country: "Deutschland",
    },
    contact: {
      heading: "kontakt",
      phone: "telefon:",
      phoneValue: "+49 176 58238236",
      email: "e-mail:",
      emailValue: "andrii@litkovskyi.de",
    },
    vatId: {
      heading: "umsatzsteuer-id",
      text: "umsatzsteuer-identifikationsnummer gemäß § 27a Umsatzsteuergesetz:",
      value: "DE458131768",
    },
    responsible: {
      heading: "verantwortlich für den inhalt nach § 18 abs. 2 MStV",
      name: "Andrii Litkovskyi",
      address: "Mindener Str. 87",
      city: "32479 Hille",
    },
    dispute: {
      heading: "eu-streitschlichtung",
      text: "die europäische kommission stellt eine plattform zur online-streitbeilegung (OS) bereit:",
      linkText: "https://ec.europa.eu/consumers/odr/",
      afterLink: "meine e-mail-adresse findest du oben im impressum.",
      consumer: {
        heading: "verbraucherstreitbeilegung",
        text: "ich bin nicht bereit oder verpflichtet, an streitbeilegungsverfahren vor einer verbraucherschlichtungsstelle teilzunehmen.",
      },
    },
    liability: {
      heading: "haftung für inhalte",
      text: "als diensteanbieter bin ich gemäß § 7 abs. 1 DDG für eigene inhalte auf diesen seiten nach den allgemeinen gesetzen verantwortlich. nach §§ 8 bis 10 DDG bin ich als diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde informationen zu überwachen oder nach umständen zu forschen, die auf eine rechtswidrige tätigkeit hinweisen.",
      text2: "verpflichtungen zur entfernung oder sperrung der nutzung von informationen nach den allgemeinen gesetzen bleiben hiervon unberührt. eine diesbezügliche haftung ist jedoch erst ab dem zeitpunkt der kenntnis einer konkreten rechtsverletzung möglich. bei bekanntwerden von entsprechenden rechtsverletzungen werde ich diese inhalte umgehend entfernen.",
    },
    links: {
      heading: "haftung für links",
      text: "meine website enthält links zu externen websites dritter, auf deren inhalte ich keinen einfluss habe. deshalb kann ich für diese fremden inhalte auch keine gewähr übernehmen. für die inhalte der verlinkten seiten ist stets der jeweilige anbieter oder betreiber der seiten verantwortlich. die verlinkten seiten wurden zum zeitpunkt der verlinkung auf mögliche rechtsverstöße überprüft. rechtswidrige inhalte waren zum zeitpunkt der verlinkung nicht erkennbar.",
      text2: "eine permanente inhaltliche kontrolle der verlinkten seiten ist jedoch ohne konkrete anhaltspunkte einer rechtsverletzung nicht zumutbar. bei bekanntwerden von rechtsverletzungen werde ich derartige links umgehend entfernen.",
    },
    copyright: {
      heading: "urheberrecht",
      text: "die durch mich erstellten inhalte und werke auf diesen seiten unterliegen dem deutschen urheberrecht. die vervielfältigung, bearbeitung, verbreitung und jede art der verwertung außerhalb der grenzen des urheberrechtes bedürfen meiner schriftlichen zustimmung. downloads und kopien dieser seite sind nur für den privaten, nicht kommerziellen gebrauch gestattet.",
      text2: "soweit die inhalte auf dieser seite nicht von mir erstellt wurden, werden die urheberrechte dritter beachtet. insbesondere werden inhalte dritter als solche gekennzeichnet. solltest du trotzdem auf eine urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden hinweis. bei bekanntwerden von rechtsverletzungen werde ich derartige inhalte umgehend entfernen.",
    },
    source: {
      text: "quelle:",
      linkText: "e-recht24.de",
    },
    back: "← zurück zur startseite",
  },
  en: {
    title: "legal notice",
    provider: {
      heading: "information pursuant to § 5 DDG",
      name: "Andrii Litkovskyi",
      address: "Mindener Str. 87",
      city: "32479 Hille",
      country: "Germany",
    },
    contact: {
      heading: "contact",
      phone: "phone:",
      phoneValue: "+49 176 58238236",
      email: "e-mail:",
      emailValue: "andrii@litkovskyi.de",
    },
    vatId: {
      heading: "vat id",
      text: "VAT identification number pursuant to § 27a of the German VAT Act:",
      value: "DE458131768",
    },
    responsible: {
      heading: "responsible for content pursuant to § 18 para. 2 MStV",
      name: "Andrii Litkovskyi",
      address: "Mindener Str. 87",
      city: "32479 Hille",
    },
    dispute: {
      heading: "eu dispute resolution",
      text: "the european commission provides a platform for online dispute resolution (ODR):",
      linkText: "https://ec.europa.eu/consumers/odr/",
      afterLink: "you can find my e-mail address in the legal notice above.",
      consumer: {
        heading: "consumer dispute resolution",
        text: "i am not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
      },
    },
    liability: {
      heading: "liability for content",
      text: "as a service provider, i am responsible for my own content on these pages in accordance with § 7 para. 1 DDG under general law. according to §§ 8 to 10 DDG, however, i am not obliged as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.",
      text2: "obligations to remove or block the use of information under general law remain unaffected. however, liability in this regard is only possible from the point in time at which a concrete infringement of the law becomes known. if i become aware of any such infringements, i will remove this content immediately.",
    },
    links: {
      heading: "liability for links",
      text: "my website contains links to external third-party websites over whose content i have no influence. therefore, i cannot accept any liability for this third-party content. the respective provider or operator of the pages is always responsible for the content of the linked pages. the linked pages were checked for possible legal violations at the time of linking. illegal content was not recognizable at the time of linking.",
      text2: "however, permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of an infringement. if i become aware of any infringements, i will remove such links immediately.",
    },
    copyright: {
      heading: "copyright",
      text: "the content and works created by me on these pages are subject to german copyright law. duplication, processing, distribution, and any form of commercialization of such material beyond the scope of the copyright law shall require my prior written consent. downloads and copies of this site are only permitted for private, non-commercial use.",
      text2: "insofar as the content on this site was not created by me, the copyrights of third parties are respected. in particular, third-party content is marked as such. should you nevertheless become aware of a copyright infringement, please inform me accordingly. if i become aware of any infringements, i will remove such content immediately.",
    },
    source: {
      text: "source:",
      linkText: "e-recht24.de",
    },
    back: "← back to homepage",
  },
};

export default function Impressum() {
  const { language } = useLanguage();
  const copy = IMPRESSUM_COPY[language] ?? IMPRESSUM_COPY.de;

  return (
    <div className="impressum-content">
      <h1 className="impressum-title">{copy.title}</h1>

      {/* Provider Information */}
      <section className="impressum-section">
        <h2 className="impressum-heading">{copy.provider.heading}</h2>
        <div className="impressum-info-box">
          <p>
            {copy.provider.name}
            <br />
            {copy.provider.address}
            <br />
            {copy.provider.city}
            <br />
            {copy.provider.country}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="impressum-section">
        <h2 className="impressum-heading">{copy.contact.heading}</h2>
        <div className="impressum-info-box">
          <p>
            {copy.contact.phone} {copy.contact.phoneValue}
            <br />
            {copy.contact.email}{" "}
            <a
              href={`mailto:${copy.contact.emailValue}`}
              className="impressum-link"
            >
              {copy.contact.emailValue}
            </a>
          </p>
        </div>
      </section>

      {/* VAT ID */}
      <section className="impressum-section">
        <h2 className="impressum-heading">{copy.vatId.heading}</h2>
        <p className="impressum-text">{copy.vatId.text}</p>
        <div className="impressum-info-box">
          <p>
            <strong>{copy.vatId.value}</strong>
          </p>
        </div>
      </section>

      {/* Responsible for Content */}
      <section className="impressum-section">
        <h2 className="impressum-heading">{copy.responsible.heading}</h2>
        <div className="impressum-info-box">
          <p>
            {copy.responsible.name}
            <br />
            {copy.responsible.address}
            <br />
            {copy.responsible.city}
          </p>
        </div>
      </section>

      {/* EU Dispute Resolution */}
      <section className="impressum-section">
        <h2 className="impressum-heading">{copy.dispute.heading}</h2>
        <p className="impressum-text">
          {copy.dispute.text}
          <br />
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="impressum-link"
          >
            {copy.dispute.linkText}
          </a>
        </p>
        <p className="impressum-text">{copy.dispute.afterLink}</p>

        <h3 className="impressum-subheading">{copy.dispute.consumer.heading}</h3>
        <p className="impressum-text">{copy.dispute.consumer.text}</p>
      </section>

      {/* Liability for Content */}
      <section className="impressum-section">
        <h2 className="impressum-heading">{copy.liability.heading}</h2>
        <p className="impressum-text">{copy.liability.text}</p>
        <p className="impressum-text">{copy.liability.text2}</p>
      </section>

      {/* Liability for Links */}
      <section className="impressum-section">
        <h2 className="impressum-heading">{copy.links.heading}</h2>
        <p className="impressum-text">{copy.links.text}</p>
        <p className="impressum-text">{copy.links.text2}</p>
      </section>

      {/* Copyright */}
      <section className="impressum-section">
        <h2 className="impressum-heading">{copy.copyright.heading}</h2>
        <p className="impressum-text">{copy.copyright.text}</p>
        <p className="impressum-text">{copy.copyright.text2}</p>
      </section>

      {/* Source */}
      <section className="impressum-section impressum-source">
        <p className="impressum-text">
          {copy.source.text}{" "}
          <a
            href="https://www.e-recht24.de"
            target="_blank"
            rel="noopener noreferrer"
            className="impressum-link"
          >
            {copy.source.linkText}
          </a>
        </p>
      </section>

      {/* Back Button */}
      <div className="impressum-back">
        <a href="/" className="impressum-back-link">
          {copy.back}
        </a>
      </div>

      <style jsx>{`
        .impressum-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
          line-height: 1.8;
        }

        .impressum-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--color-text-primary, #111827);
        }

        .impressum-section {
          margin-bottom: 2.5rem;
        }

        .impressum-heading {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--color-text-primary, #111827);
        }

        .impressum-subheading {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: var(--color-text-primary, #111827);
        }

        .impressum-text {
          font-size: 1rem;
          color: var(--color-text-secondary, #4b5563);
          margin-bottom: 1rem;
        }

        .impressum-info-box {
          background-color: #f3f4f6;
          border-left: 4px solid #2563eb;
          padding: 1rem 1.25rem;
          margin: 1rem 0;
          border-radius: 0.25rem;
        }

        .impressum-info-box p {
          margin: 0;
          font-size: 1rem;
          color: var(--color-text-primary, #111827);
        }

        .impressum-link {
          color: #2563eb;
          text-decoration: none;
        }

        .impressum-link:hover {
          text-decoration: underline;
        }

        .impressum-source {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .impressum-source .impressum-text {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .impressum-back {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }

        .impressum-back-link {
          color: #2563eb;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .impressum-back-link:hover {
          text-decoration: underline;
        }

        /* Dark mode support */
        [data-theme="dark"] .impressum-title,
        [data-theme="dark"] .impressum-heading,
        [data-theme="dark"] .impressum-subheading {
          color: #f9fafb;
        }

        [data-theme="dark"] .impressum-text {
          color: #d1d5db;
        }

        [data-theme="dark"] .impressum-info-box {
          background-color: #1f2937;
          border-left-color: #3b82f6;
        }

        [data-theme="dark"] .impressum-info-box p {
          color: #f9fafb;
        }

        [data-theme="dark"] .impressum-link {
          color: #60a5fa;
        }

        [data-theme="dark"] .impressum-source {
          border-top-color: #374151;
        }

        [data-theme="dark"] .impressum-source .impressum-text {
          color: #9ca3af;
        }

        [data-theme="dark"] .impressum-back {
          border-top-color: #374151;
        }

        [data-theme="dark"] .impressum-back-link {
          color: #60a5fa;
        }

        @media (max-width: 768px) {
          .impressum-title {
            font-size: 2rem;
          }

          .impressum-heading {
            font-size: 1.25rem;
          }

          .impressum-subheading {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}
