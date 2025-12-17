"use client";

import useLanguage from "@/hooks/useLanguage";
import Link from "next/link";

import Footer from "@/components/Footer";

const IMPRESSUM_COPY = {
  de: {
    title: "impressum",
    provider: {
      heading: "angaben gemäß § 5 DDG",
      name: "andrii litkovskyi",
      address: "mindener str. 87",
      city: "32479 hille",
      country: "deutschland",
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
      name: "andrii litkovskyi",
      address: "mindener str. 87",
      city: "32479 hille",
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
      name: "andrii litkovskyi",
      address: "mindener str. 87",
      city: "32479 hille",
      country: "germany",
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
      text: "vat identification number pursuant to § 27a of the german vat act:",
      value: "DE458131768",
    },
    responsible: {
      heading: "responsible for content pursuant to § 18 para. 2 MStV",
      name: "andrii litkovskyi",
      address: "mindener str. 87",
      city: "32479 hille",
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
    <section className="section impressum" id="impressum">
      <div className="content">
        <div className="title">
          <h1>{copy.title}</h1>
        </div>
        <div className="left">

          {/* Provider Information */}
          <p className="title">{copy.provider.heading}</p>
          <p>
            {copy.provider.name}<br/>
            {copy.provider.address}<br/>
            {copy.provider.city}<br/>
            {copy.provider.country}
          </p>

          {/* Contact */}
          <p className="title">{copy.contact.heading}</p>
          <p>{copy.contact.phone} {copy.contact.phoneValue}<br/>
            {copy.contact.email}{" "}
              <Link
                href={`mailto:${copy.contact.emailValue}`}
              >
                {copy.contact.emailValue}
              </Link>
          </p>
          </div>

          <div className="right">
            {/* VAT ID */}
            <p className="title">{copy.vatId.heading}</p>
            <p>
              {copy.vatId.text}{" "}{copy.vatId.value}
            </p>

            {/* Responsible for Content */}
            <p className="title">{copy.responsible.heading}</p>
            <p>
              {copy.responsible.name}<br/>
              {copy.responsible.address}<br/>
              {copy.responsible.city}
            </p>
          </div>


          {/* EU Dispute Resolution */}
          <div className="left">
            <h2>{copy.dispute.heading}</h2>
            <p>
              {copy.dispute.text}{" "}
              <Link
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.dispute.linkText}
              </Link>
            </p>
            <p>{copy.dispute.afterLink}</p>
            <p className="title">{copy.dispute.consumer.heading}</p>
            <p>{copy.dispute.consumer.text}</p>
          </div>

          {/* Liability for Content */}
          <div className="right">
            <h2>{copy.liability.heading}</h2>
            <p>{copy.liability.text}</p>
            <p>{copy.liability.text2}</p>
          </div>

          {/* Liability for Links */}
          <div className="left">
            <h2>{copy.links.heading}</h2>
            <p>{copy.links.text}</p>
            <p>{copy.links.text2}</p>
          </div>

          <div></div>

          {/* Copyright */}
          <div className="right">
            <h2>{copy.copyright.heading}</h2>
            <p>{copy.copyright.text}</p>
            <p>{copy.copyright.text2}</p>

            {/* Source */}
            <p>
              {copy.source.text}{" "}
              <Link
                href="https://www.e-recht24.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.source.linkText}
              </Link>
            </p>
          </div>

          {/* Back Button */}
          <div className="left">
            <Link href="/">
              {copy.back}
            </Link>
          </div>
      </div>
      <Footer />
    </section>
  );
};