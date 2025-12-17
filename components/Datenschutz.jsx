"use client";

import useLanguage from "@/hooks/useLanguage";

const DATENSCHUTZ_COPY = {
  de: {
    title: "datenschutzerklärung & cookie-richtlinie",
    intro: {
      controller: "verantwortlicher:",
      name: "Andrii Litkovskyi",
      address: "Mindener Str. 87",
      city: "32479 Hille, Deutschland",
      email: "andrii@litkovskyi.de",
      phone: "+49 176 58238236",
      description: "der schutz deiner personenbezogenen daten ist mir ein wichtiges anliegen. diese datenschutzerklärung informiert dich darüber, welche daten bei deinem besuch auf meiner website erhoben werden und zu welchen zwecken diese verwendet werden.",
    },
    cookies: {
      heading: "1. verwendung von cookies",
      whatAreCookies: {
        heading: "1.1 was sind cookies?",
        text: "cookies sind kleine textdateien, die auf deinem endgerät gespeichert werden, wenn du eine website besuchst. sie ermöglichen es der website, dein gerät wiederzuerkennen und bestimmte informationen zu speichern.",
      },
      whichCookies: {
        heading: "1.2 welche cookies verwenden wir?",
      },
      necessary: {
        title: "notwendige cookies",
        tableHeaders: ["cookie-name", "zweck", "laufzeit", "typ"],
        cookies: [
          { name: "cookie_consent_v1", purpose: "speichert deine cookie-einwilligungsentscheidung", duration: "12 monate", type: "first-party" },
          { name: "cookie_consent_timestamp", purpose: "speichert zeitpunkt der einwilligung", duration: "12 monate", type: "first-party" },
          { name: "nav-theme", purpose: "speichert deine theme-präferenz (hell/dunkel)", duration: "1 jahr", type: "first-party" },
          { name: "app-language", purpose: "speichert deine sprachpräferenz (de/en)", duration: "1 jahr", type: "first-party" },
          { name: "app-language-source", purpose: "speichert, wie die sprache ermittelt wurde (auto/manuell)", duration: "1 jahr", type: "first-party" },
        ],
      },
      analytics: {
        title: "analytische cookies",
        notice: "diese cookies werden nur mit deiner ausdrücklichen einwilligung gesetzt.",
        tableHeaders: ["cookie-name", "anbieter", "zweck", "laufzeit"],
        cookies: [
          { name: "_ga", provider: "Google Analytics", purpose: "unterscheidung von website-besuchern", duration: "2 jahre" },
          { name: "_gid", provider: "Google Analytics", purpose: "unterscheidung von website-besuchern", duration: "24 stunden" },
          { name: "_ga_XXXXXXXXXX", provider: "Google Analytics 4", purpose: "speichert den session-status", duration: "2 jahre" },
          { name: "_clck", provider: "Microsoft Clarity", purpose: "speichert eindeutige benutzer-id", duration: "1 jahr" },
          { name: "_clsk", provider: "Microsoft Clarity", purpose: "verbindet mehrere seitenaufrufe", duration: "1 tag" },
        ],
      },
      marketing: {
        title: "marketing cookies",
        notice: "diese cookies werden nur mit deiner ausdrücklichen einwilligung gesetzt.",
        tableHeaders: ["cookie-name", "anbieter", "zweck", "laufzeit"],
        cookies: [
          { name: "_gcl_au", provider: "Google Ads", purpose: "conversion-tracking und remarketing", duration: "90 tage" },
          { name: "IDE", provider: "Google DoubleClick", purpose: "anzeigen-tracking", duration: "13 monate" },
          { name: "test_cookie", provider: "Google DoubleClick", purpose: "prüft cookie-unterstützung", duration: "15 minuten" },
        ],
      },
      legalBasis: {
        label: "rechtsgrundlage:",
        text: "die verwendung von cookies erfolgt auf grundlage deiner einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.",
      },
    },
    googleAnalytics: {
      heading: "2. google analytics 4",
      intro: "wir verwenden google analytics 4, einen webanalysedienst der Google Ireland Limited (\"Google\"). google analytics verwendet cookies, die eine analyse deiner nutzung der website ermöglichen.",
      scope: {
        heading: "2.1 umfang der datenverarbeitung",
        items: [
          "pseudonymisierte nutzer-ids",
          "besuchte seiten und verweildauer",
          "verwendetes gerät und browser",
          "ungefährer standort (land/stadt)",
          "interaktionen mit website-elementen",
        ],
      },
      ipAnonymization: {
        heading: "2.2 ip-anonymisierung",
        text: "wir haben die ip-anonymisierung aktiviert. deine ip-adresse wird von google innerhalb von mitgliedstaaten der EU oder anderen vertragsstaaten des EWR vor der übermittlung in die USA gekürzt.",
      },
      usTransfer: {
        heading: "2.3 datenübermittlung in die USA",
        text: "google ist unter dem EU-US Data Privacy Framework zertifiziert und verpflichtet sich zur einhaltung europäischer datenschutzstandards. die datenübermittlung erfolgt auf grundlage von standardvertragsklauseln.",
      },
      moreInfo: "weitere informationen:",
      privacyPolicy: "google analytics datenschutzerklärung:",
    },
    clarity: {
      heading: "3. microsoft clarity",
      intro: "wir verwenden microsoft clarity, einen webanalysedienst der Microsoft Corporation. clarity erfasst, wie benutzer unsere website nutzen, einschließlich klicks, scrollverhalten und mausbewegungen.",
      scope: {
        heading: "3.1 verarbeitete daten",
        items: [
          "session-aufzeichnungen (anonymisiert)",
          "heatmaps des nutzerverhaltens",
          "technische informationen (browser, gerät)",
        ],
      },
      masking: "sensible daten wie passwörter und kreditkartendaten werden automatisch maskiert.",
      moreInfo: "weitere informationen:",
      privacyStatement: "microsoft privacy statement:",
    },
    calendly: {
      heading: "4. calendly",
      intro: "wir verwenden calendly für online-terminbuchungen. wenn du auf den buchungsbutton klickst, wird calendly geladen. dabei werden folgende daten an calendly übermittelt:",
      items: [
        "ip-adresse",
        "browser-informationen",
        "von dir eingegebene kontaktdaten (name, e-mail, telefon)",
      ],
      transfer: "calendly ist ein dienst der Calendly LLC, USA. die datenübermittlung erfolgt auf grundlage von standardvertragsklauseln.",
      moreInfo: "weitere informationen:",
      privacyPolicy: "calendly privacy policy:",
    },
    hosting: {
      heading: "5. hosting & technische infrastruktur",
      vercel: {
        heading: "5.1 vercel",
        text: "diese website wird auf servern von Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA gehostet. beim aufruf unserer website werden automatisch technische daten erfasst:",
        items: [
          "ip-adresse (anonymisiert)",
          "datum und uhrzeit des zugriffs",
          "browsertyp und version",
          "betriebssystem",
          "referrer-url",
          "angefragte seite",
        ],
        legal: "diese datenverarbeitung erfolgt auf grundlage unseres berechtigten interesses an einer sicheren und effizienten bereitstellung der website (Art. 6 Abs. 1 lit. f DSGVO).",
        moreInfo: "vercel privacy policy:",
      },
      ssl: {
        heading: "5.2 ssl/tls-verschlüsselung",
        text: "diese website nutzt ssl/tls-verschlüsselung für die sichere übertragung deiner daten. die ssl-zertifikate werden von vercel bereitgestellt und gelten für die domains litkovskyi.de und litkovskyi.com. du erkennst eine verschlüsselte verbindung am schloss-symbol in der browserzeile.",
      },
      domains: {
        heading: "5.3 domain-registrierung",
        text: "die domains litkovskyi.de und litkovskyi.com sind bei IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Deutschland registriert.",
      },
      fonts: {
        heading: "5.4 schriftarten",
        text: "diese website verwendet die schriftarten Comfortaa und Satisfy. die schriftarten werden lokal von unseren servern geladen (self-hosted via Next.js), nicht von externen google-servern. es werden keine daten an google übermittelt.",
      },
    },
    socialMedia: {
      heading: "6. social media links",
      intro: "unsere website enthält links zu folgenden social-media-plattformen:",
      items: [
        { name: "LinkedIn", url: "linkedin.com/in/andrii-litkovskyi", provider: "LinkedIn Corporation, USA" },
        { name: "Instagram", url: "instagram.com/litkovskyi", provider: "Meta Platforms Ireland Ltd." },
        { name: "Upwork", url: "upwork.com", provider: "Upwork Global Inc., USA" },
      ],
      note: "diese links sind einfache hyperlinks. beim anklicken wirst du auf die jeweilige plattform weitergeleitet. erst dort gelten die datenschutzbestimmungen des jeweiligen anbieters. wir verwenden keine social-media-plugins, die bereits beim seitenaufruf daten übertragen.",
    },
    rights: {
      heading: "7. deine rechte",
      intro: "du hast folgende rechte bezüglich deiner personenbezogenen daten:",
      items: [
        { right: "auskunft (Art. 15 DSGVO):", description: "du hast das recht, auskunft über die von uns verarbeiteten daten zu erhalten." },
        { right: "berichtigung (Art. 16 DSGVO):", description: "du kannst die berichtigung unrichtiger daten verlangen." },
        { right: "löschung (Art. 17 DSGVO):", description: "du kannst die löschung deiner daten verlangen, sofern keine gesetzlichen aufbewahrungspflichten bestehen." },
        { right: "einschränkung (Art. 18 DSGVO):", description: "du kannst die einschränkung der verarbeitung verlangen." },
        { right: "datenübertragbarkeit (Art. 20 DSGVO):", description: "du kannst deine daten in einem strukturierten format erhalten." },
        { right: "widerspruch (Art. 21 DSGVO):", description: "du kannst der verarbeitung deiner daten widersprechen." },
        { right: "widerruf (Art. 7 Abs. 3 DSGVO):", description: "du kannst deine einwilligung jederzeit widerrufen." },
      ],
      cookieSettings: {
        heading: "cookie-einstellungen ändern",
        text: "du kannst deine cookie-einstellungen jederzeit ändern:",
        button: "cookie-einstellungen öffnen",
      },
      contact: {
        heading: "7.1 kontakt für datenschutzanfragen",
        text: "für anfragen bezüglich deiner datenschutzrechte wende dich bitte an:",
      },
      complaint: {
        heading: "7.2 beschwerderecht",
        text: "du hast das recht, dich bei einer datenschutz-aufsichtsbehörde über die verarbeitung deiner personenbezogenen daten zu beschweren:",
        authority: "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen",
        address: "Postfach 20 04 44",
        city: "40102 Düsseldorf",
        website: "website:",
      },
    },
    updates: {
      heading: "8. änderungen dieser datenschutzerklärung",
      text: "wir behalten uns vor, diese datenschutzerklärung anzupassen, um sie an geänderte rechtsverhältnisse oder bei änderungen der website sowie der datenverarbeitung anzupassen. dies gilt jedoch nur für erklärungen zur datenverarbeitung. sofern einwilligungen erforderlich sind oder bestandteile der datenschutzerklärung regelungen des vertragsverhältnisses enthalten, erfolgen die änderungen nur mit zustimmung der nutzer.",
      lastUpdated: "stand dieser datenschutzerklärung:",
    },
    back: "← zurück zur startseite",
  },
  en: {
    title: "privacy policy & cookie policy",
    intro: {
      controller: "controller:",
      name: "Andrii Litkovskyi",
      address: "Mindener Str. 87",
      city: "32479 Hille, Germany",
      email: "andrii@litkovskyi.de",
      phone: "+49 176 58238236",
      description: "protecting your personal data is important to me. this privacy policy informs you about what data is collected when you visit my website and for what purposes it is used.",
    },
    cookies: {
      heading: "1. use of cookies",
      whatAreCookies: {
        heading: "1.1 what are cookies?",
        text: "cookies are small text files stored on your device when you visit a website. they enable the website to recognize your device and store certain information.",
      },
      whichCookies: {
        heading: "1.2 which cookies do we use?",
      },
      necessary: {
        title: "necessary cookies",
        tableHeaders: ["cookie name", "purpose", "duration", "type"],
        cookies: [
          { name: "cookie_consent_v1", purpose: "stores your cookie consent decision", duration: "12 months", type: "first-party" },
          { name: "cookie_consent_timestamp", purpose: "stores consent timestamp", duration: "12 months", type: "first-party" },
          { name: "nav-theme", purpose: "stores your theme preference (light/dark)", duration: "1 year", type: "first-party" },
          { name: "app-language", purpose: "stores your language preference (de/en)", duration: "1 year", type: "first-party" },
          { name: "app-language-source", purpose: "stores how the language was determined (auto/manual)", duration: "1 year", type: "first-party" },
        ],
      },
      analytics: {
        title: "analytics cookies",
        notice: "these cookies are only set with your explicit consent.",
        tableHeaders: ["cookie name", "provider", "purpose", "duration"],
        cookies: [
          { name: "_ga", provider: "Google Analytics", purpose: "distinguishes website visitors", duration: "2 years" },
          { name: "_gid", provider: "Google Analytics", purpose: "distinguishes website visitors", duration: "24 hours" },
          { name: "_ga_XXXXXXXXXX", provider: "Google Analytics 4", purpose: "stores session state", duration: "2 years" },
          { name: "_clck", provider: "Microsoft Clarity", purpose: "stores unique user id", duration: "1 year" },
          { name: "_clsk", provider: "Microsoft Clarity", purpose: "connects multiple page views", duration: "1 day" },
        ],
      },
      marketing: {
        title: "marketing cookies",
        notice: "these cookies are only set with your explicit consent.",
        tableHeaders: ["cookie name", "provider", "purpose", "duration"],
        cookies: [
          { name: "_gcl_au", provider: "Google Ads", purpose: "conversion tracking and remarketing", duration: "90 days" },
          { name: "IDE", provider: "Google DoubleClick", purpose: "ad tracking", duration: "13 months" },
          { name: "test_cookie", provider: "Google DoubleClick", purpose: "checks cookie support", duration: "15 minutes" },
        ],
      },
      legalBasis: {
        label: "legal basis:",
        text: "the use of cookies is based on your consent pursuant to Art. 6 (1) (a) GDPR and § 25 (1) TTDSG.",
      },
    },
    googleAnalytics: {
      heading: "2. google analytics 4",
      intro: "we use google analytics 4, a web analytics service provided by Google Ireland Limited (\"Google\"). google analytics uses cookies that enable analysis of your use of the website.",
      scope: {
        heading: "2.1 scope of data processing",
        items: [
          "pseudonymized user ids",
          "visited pages and time spent",
          "device and browser used",
          "approximate location (country/city)",
          "interactions with website elements",
        ],
      },
      ipAnonymization: {
        heading: "2.2 ip anonymization",
        text: "we have activated ip anonymization. your ip address is truncated by google within member states of the EU or other parties to the EEA agreement before transmission to the USA.",
      },
      usTransfer: {
        heading: "2.3 data transfer to the USA",
        text: "google is certified under the EU-US Data Privacy Framework and is committed to complying with european data protection standards. data transfer is based on standard contractual clauses.",
      },
      moreInfo: "more information:",
      privacyPolicy: "google analytics privacy policy:",
    },
    clarity: {
      heading: "3. microsoft clarity",
      intro: "we use microsoft clarity, a web analytics service provided by Microsoft Corporation. clarity captures how users use our website, including clicks, scroll behavior, and mouse movements.",
      scope: {
        heading: "3.1 processed data",
        items: [
          "session recordings (anonymized)",
          "heatmaps of user behavior",
          "technical information (browser, device)",
        ],
      },
      masking: "sensitive data such as passwords and credit card details are automatically masked.",
      moreInfo: "more information:",
      privacyStatement: "microsoft privacy statement:",
    },
    calendly: {
      heading: "4. calendly",
      intro: "we use calendly for online appointment booking. when you click the booking button, calendly is loaded. the following data is transmitted to calendly:",
      items: [
        "ip address",
        "browser information",
        "contact details you enter (name, email, phone)",
      ],
      transfer: "calendly is a service of Calendly LLC, USA. data transfer is based on standard contractual clauses.",
      moreInfo: "more information:",
      privacyPolicy: "calendly privacy policy:",
    },
    hosting: {
      heading: "5. hosting & technical infrastructure",
      vercel: {
        heading: "5.1 vercel",
        text: "this website is hosted on servers of Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. when you access our website, technical data is automatically collected:",
        items: [
          "ip address (anonymized)",
          "date and time of access",
          "browser type and version",
          "operating system",
          "referrer url",
          "requested page",
        ],
        legal: "this data processing is based on our legitimate interest in secure and efficient website provision (Art. 6 (1) (f) GDPR).",
        moreInfo: "vercel privacy policy:",
      },
      ssl: {
        heading: "5.2 ssl/tls encryption",
        text: "this website uses ssl/tls encryption for secure transmission of your data. ssl certificates are provided by vercel and apply to the domains litkovskyi.de and litkovskyi.com. you can recognize an encrypted connection by the lock symbol in the browser bar.",
      },
      domains: {
        heading: "5.3 domain registration",
        text: "the domains litkovskyi.de and litkovskyi.com are registered with IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Germany.",
      },
      fonts: {
        heading: "5.4 fonts",
        text: "this website uses the fonts Comfortaa and Satisfy. the fonts are loaded locally from our servers (self-hosted via Next.js), not from external google servers. no data is transmitted to google.",
      },
    },
    socialMedia: {
      heading: "6. social media links",
      intro: "our website contains links to the following social media platforms:",
      items: [
        { name: "LinkedIn", url: "linkedin.com/in/andrii-litkovskyi", provider: "LinkedIn Corporation, USA" },
        { name: "Instagram", url: "instagram.com/litkovskyi", provider: "Meta Platforms Ireland Ltd." },
        { name: "Upwork", url: "upwork.com", provider: "Upwork Global Inc., USA" },
      ],
      note: "these links are simple hyperlinks. when you click them, you are redirected to the respective platform. only there do the privacy policies of the respective provider apply. we do not use social media plugins that transmit data when the page loads.",
    },
    rights: {
      heading: "7. your rights",
      intro: "you have the following rights regarding your personal data:",
      items: [
        { right: "access (Art. 15 GDPR):", description: "you have the right to obtain information about the data we process." },
        { right: "rectification (Art. 16 GDPR):", description: "you can request the correction of inaccurate data." },
        { right: "erasure (Art. 17 GDPR):", description: "you can request the deletion of your data, unless legal retention obligations exist." },
        { right: "restriction (Art. 18 GDPR):", description: "you can request the restriction of processing." },
        { right: "data portability (Art. 20 GDPR):", description: "you can receive your data in a structured format." },
        { right: "objection (Art. 21 GDPR):", description: "you can object to the processing of your data." },
        { right: "withdrawal (Art. 7 (3) GDPR):", description: "you can withdraw your consent at any time." },
      ],
      cookieSettings: {
        heading: "change cookie settings",
        text: "you can change your cookie settings at any time:",
        button: "open cookie settings",
      },
      contact: {
        heading: "7.1 contact for data protection inquiries",
        text: "for inquiries regarding your data protection rights, please contact:",
      },
      complaint: {
        heading: "7.2 right to complain",
        text: "you have the right to lodge a complaint with a data protection supervisory authority about the processing of your personal data:",
        authority: "State Commissioner for Data Protection and Freedom of Information North Rhine-Westphalia",
        address: "Postfach 20 04 44",
        city: "40102 Düsseldorf, Germany",
        website: "website:",
      },
    },
    updates: {
      heading: "8. changes to this privacy policy",
      text: "we reserve the right to adapt this privacy policy to changed legal circumstances or changes to the website and data processing. however, this only applies to statements on data processing. if consent is required or if components of the privacy policy contain provisions of the contractual relationship, changes will only be made with user consent.",
      lastUpdated: "last updated:",
    },
    back: "← back to homepage",
  },
};

export default function Datenschutz() {
  const { language } = useLanguage();
  const copy = DATENSCHUTZ_COPY[language] ?? DATENSCHUTZ_COPY.de;

  const handleOpenCookieSettings = () => {
    window.dispatchEvent(new CustomEvent("openCookieSettings"));
  };

  const formatDate = (lang) => {
    return new Date().toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="datenschutz-content">
      <h1 className="datenschutz-title">
        {copy.title}
      </h1>

      {/* Introduction */}
      <section className="datenschutz-section">
        <p className="datenschutz-text">
          <strong>{copy.intro.controller}</strong>
          <br />
          {copy.intro.name}
          <br />
          {copy.intro.address}
          <br />
          {copy.intro.city}
          <br />
          e-mail: {copy.intro.email}
          <br />
          {language === "de" ? "telefon" : "phone"}: {copy.intro.phone}
        </p>
        <p className="datenschutz-text">
          {copy.intro.description}
        </p>
      </section>

      {/* Cookie Usage */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">{copy.cookies.heading}</h2>

        <div className="datenschutz-subsection">
          <h3 className="datenschutz-subheading">{copy.cookies.whatAreCookies.heading}</h3>
          <p className="datenschutz-text">
            {copy.cookies.whatAreCookies.text}
          </p>
        </div>

        <div className="datenschutz-subsection">
          <h3 className="datenschutz-subheading">
            {copy.cookies.whichCookies.heading}
          </h3>

          {/* Necessary Cookies Table */}
          <h4 className="datenschutz-table-title">{copy.cookies.necessary.title}</h4>
          <div className="datenschutz-table-wrapper">
            <table className="datenschutz-table">
              <thead>
                <tr>
                  {copy.cookies.necessary.tableHeaders.map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.cookies.necessary.cookies.map((cookie, idx) => (
                  <tr key={idx}>
                    <td><code>{cookie.name}</code></td>
                    <td>{cookie.purpose}</td>
                    <td>{cookie.duration}</td>
                    <td>{cookie.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Analytics Cookies Table */}
          <h4 className="datenschutz-table-title">{copy.cookies.analytics.title}</h4>
          <p className="datenschutz-notice">
            {copy.cookies.analytics.notice}
          </p>
          <div className="datenschutz-table-wrapper">
            <table className="datenschutz-table">
              <thead>
                <tr>
                  {copy.cookies.analytics.tableHeaders.map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.cookies.analytics.cookies.map((cookie, idx) => (
                  <tr key={idx}>
                    <td><code>{cookie.name}</code></td>
                    <td>{cookie.provider}</td>
                    <td>{cookie.purpose}</td>
                    <td>{cookie.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Marketing Cookies Table */}
          <h4 className="datenschutz-table-title">{copy.cookies.marketing.title}</h4>
          <p className="datenschutz-notice">
            {copy.cookies.marketing.notice}
          </p>
          <div className="datenschutz-table-wrapper">
            <table className="datenschutz-table">
              <thead>
                <tr>
                  {copy.cookies.marketing.tableHeaders.map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.cookies.marketing.cookies.map((cookie, idx) => (
                  <tr key={idx}>
                    <td><code>{cookie.name}</code></td>
                    <td>{cookie.provider}</td>
                    <td>{cookie.purpose}</td>
                    <td>{cookie.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="datenschutz-info-box">
          <p>
            <strong>{copy.cookies.legalBasis.label}</strong> {copy.cookies.legalBasis.text}
          </p>
        </div>
      </section>

      {/* Google Analytics */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">{copy.googleAnalytics.heading}</h2>
        <p className="datenschutz-text">
          {copy.googleAnalytics.intro}
        </p>
        <h3 className="datenschutz-subheading">
          {copy.googleAnalytics.scope.heading}
        </h3>
        <ul className="datenschutz-list">
          {copy.googleAnalytics.scope.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <h3 className="datenschutz-subheading">{copy.googleAnalytics.ipAnonymization.heading}</h3>
        <p className="datenschutz-text">
          {copy.googleAnalytics.ipAnonymization.text}
        </p>
        <h3 className="datenschutz-subheading">
          {copy.googleAnalytics.usTransfer.heading}
        </h3>
        <p className="datenschutz-text">
          {copy.googleAnalytics.usTransfer.text}
        </p>
        <div className="datenschutz-link-box">
          <p>
            <strong>{copy.googleAnalytics.moreInfo}</strong>
            <br />
            {copy.googleAnalytics.privacyPolicy}{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="datenschutz-link"
            >
              https://policies.google.com/privacy
            </a>
          </p>
        </div>
      </section>

      {/* Microsoft Clarity */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">{copy.clarity.heading}</h2>
        <p className="datenschutz-text">
          {copy.clarity.intro}
        </p>
        <h3 className="datenschutz-subheading">{copy.clarity.scope.heading}</h3>
        <ul className="datenschutz-list">
          {copy.clarity.scope.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <p className="datenschutz-text">
          {copy.clarity.masking}
        </p>
        <div className="datenschutz-link-box">
          <p>
            <strong>{copy.clarity.moreInfo}</strong>
            <br />
            {copy.clarity.privacyStatement}{" "}
            <a
              href="https://privacy.microsoft.com/privacystatement"
              target="_blank"
              rel="noopener noreferrer"
              className="datenschutz-link"
            >
              https://privacy.microsoft.com/privacystatement
            </a>
          </p>
        </div>
      </section>

      {/* Calendly */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">{copy.calendly.heading}</h2>
        <p className="datenschutz-text">
          {copy.calendly.intro}
        </p>
        <ul className="datenschutz-list">
          {copy.calendly.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <p className="datenschutz-text">
          {copy.calendly.transfer}
        </p>
        <div className="datenschutz-link-box">
          <p>
            <strong>{copy.calendly.moreInfo}</strong>
            <br />
            {copy.calendly.privacyPolicy}{" "}
            <a
              href="https://calendly.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="datenschutz-link"
            >
              https://calendly.com/privacy
            </a>
          </p>
        </div>
      </section>

      {/* Hosting & Technical Infrastructure */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">{copy.hosting.heading}</h2>

        <h3 className="datenschutz-subheading">{copy.hosting.vercel.heading}</h3>
        <p className="datenschutz-text">
          {copy.hosting.vercel.text}
        </p>
        <ul className="datenschutz-list">
          {copy.hosting.vercel.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <p className="datenschutz-text">
          {copy.hosting.vercel.legal}
        </p>
        <div className="datenschutz-link-box">
          <p>
            <strong>{copy.hosting.vercel.moreInfo}</strong>{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="datenschutz-link"
            >
              https://vercel.com/legal/privacy-policy
            </a>
          </p>
        </div>

        <h3 className="datenschutz-subheading">{copy.hosting.ssl.heading}</h3>
        <p className="datenschutz-text">
          {copy.hosting.ssl.text}
        </p>

        <h3 className="datenschutz-subheading">{copy.hosting.domains.heading}</h3>
        <p className="datenschutz-text">
          {copy.hosting.domains.text}
        </p>

        <h3 className="datenschutz-subheading">{copy.hosting.fonts.heading}</h3>
        <p className="datenschutz-text">
          {copy.hosting.fonts.text}
        </p>
      </section>

      {/* Social Media Links */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">{copy.socialMedia.heading}</h2>
        <p className="datenschutz-text">
          {copy.socialMedia.intro}
        </p>
        <ul className="datenschutz-list">
          {copy.socialMedia.items.map((item, idx) => (
            <li key={idx}>
              <strong>{item.name}</strong> ({item.url}) — {item.provider}
            </li>
          ))}
        </ul>
        <p className="datenschutz-text">
          {copy.socialMedia.note}
        </p>
      </section>

      {/* User Rights */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">{copy.rights.heading}</h2>
        <p className="datenschutz-text">
          {copy.rights.intro}
        </p>
        <ul className="datenschutz-list">
          {copy.rights.items.map((item, idx) => (
            <li key={idx}>
              <strong>{item.right}</strong> {item.description}
            </li>
          ))}
        </ul>

        <div className="datenschutz-action-box">
          <h3 className="datenschutz-subheading">
            {copy.rights.cookieSettings.heading}
          </h3>
          <p className="datenschutz-text">
            {copy.rights.cookieSettings.text}
          </p>
          <button
            onClick={handleOpenCookieSettings}
            className="datenschutz-button"
          >
            🍪 {copy.rights.cookieSettings.button}
          </button>
        </div>

        <h3 className="datenschutz-subheading">
          {copy.rights.contact.heading}
        </h3>
        <p className="datenschutz-text">
          {copy.rights.contact.text}
        </p>
        <div className="datenschutz-contact-box">
          <p>
            <strong>{copy.intro.name}</strong>
            <br />
            {copy.intro.address}
            <br />
            {copy.intro.city.split(",")[0]}
            <br />
            e-mail:{" "}
            <a
              href={`mailto:${copy.intro.email}`}
              className="datenschutz-link"
            >
              {copy.intro.email}
            </a>
            <br />
            {language === "de" ? "telefon" : "phone"}: {copy.intro.phone}
          </p>
        </div>

        <h3 className="datenschutz-subheading">{copy.rights.complaint.heading}</h3>
        <p className="datenschutz-text">
          {copy.rights.complaint.text}
        </p>
        <div className="datenschutz-contact-box">
          <p>
            <strong>
              {copy.rights.complaint.authority}
            </strong>
            <br />
            {copy.rights.complaint.address}
            <br />
            {copy.rights.complaint.city}
            <br />
            {copy.rights.complaint.website}{" "}
            <a
              href="https://www.ldi.nrw.de"
              target="_blank"
              rel="noopener noreferrer"
              className="datenschutz-link"
            >
              https://www.ldi.nrw.de
            </a>
          </p>
        </div>
      </section>

      {/* Updates */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">
          {copy.updates.heading}
        </h2>
        <p className="datenschutz-text">
          {copy.updates.text}
        </p>
        <p className="datenschutz-text">
          <strong>{copy.updates.lastUpdated}</strong>{" "}
          {formatDate(language)}
        </p>
      </section>

      {/* Back Button */}
      <div className="datenschutz-back">
        <a href="/" className="datenschutz-back-link">
          {copy.back}
        </a>
      </div>

      <style jsx>{`
        .datenschutz-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
          line-height: 1.8;
        }

        .datenschutz-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--color-text-primary, #111827);
        }

        .datenschutz-section {
          margin-bottom: 3rem;
        }

        .datenschutz-heading {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--color-text-primary, #111827);
        }

        .datenschutz-subheading {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--color-text-primary, #111827);
        }

        .datenschutz-table-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--color-text-primary, #111827);
        }

        .datenschutz-subsection {
          margin-bottom: 2rem;
        }

        .datenschutz-text {
          font-size: 1rem;
          color: var(--color-text-secondary, #4b5563);
          margin-bottom: 1rem;
        }

        .datenschutz-notice {
          font-size: 0.875rem;
          color: var(--color-text-secondary, #6b7280);
          margin-bottom: 0.75rem;
        }

        .datenschutz-list {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          color: var(--color-text-secondary, #4b5563);
        }

        .datenschutz-list li {
          margin-bottom: 0.5rem;
        }

        .datenschutz-table-wrapper {
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }

        .datenschutz-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #d1d5db;
          font-size: 0.875rem;
        }

        .datenschutz-table thead {
          background-color: #f3f4f6;
        }

        .datenschutz-table th,
        .datenschutz-table td {
          padding: 0.75rem;
          text-align: left;
          border: 1px solid #d1d5db;
        }

        .datenschutz-table th {
          font-weight: 600;
          color: var(--color-text-primary, #111827);
        }

        .datenschutz-table td {
          color: var(--color-text-secondary, #4b5563);
        }

        .datenschutz-table code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }

        .datenschutz-info-box,
        .datenschutz-link-box,
        .datenschutz-contact-box,
        .datenschutz-action-box {
          background-color: #eff6ff;
          border-left: 4px solid #2563eb;
          padding: 1rem;
          margin: 1.5rem 0;
          border-radius: 0.25rem;
        }

        .datenschutz-info-box p,
        .datenschutz-link-box p,
        .datenschutz-contact-box p {
          margin: 0;
          font-size: 0.875rem;
          color: #1e3a8a;
        }

        .datenschutz-link {
          color: #2563eb;
          text-decoration: none;
        }

        .datenschutz-link:hover {
          text-decoration: underline;
        }

        .datenschutz-button {
          background-color: #2563eb;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 1rem;
        }

        .datenschutz-button:hover {
          background-color: #1d4ed8;
        }

        .datenschutz-back {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }

        .datenschutz-back-link {
          color: #2563eb;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .datenschutz-back-link:hover {
          text-decoration: underline;
        }

        /* Dark mode support */
        [data-theme="dark"] .datenschutz-title,
        [data-theme="dark"] .datenschutz-heading,
        [data-theme="dark"] .datenschutz-subheading,
        [data-theme="dark"] .datenschutz-table-title {
          color: #f9fafb;
        }

        [data-theme="dark"] .datenschutz-text,
        [data-theme="dark"] .datenschutz-list {
          color: #d1d5db;
        }

        [data-theme="dark"] .datenschutz-notice {
          color: #9ca3af;
        }

        [data-theme="dark"] .datenschutz-table {
          border-color: #374151;
        }

        [data-theme="dark"] .datenschutz-table thead {
          background-color: #1f2937;
        }

        [data-theme="dark"] .datenschutz-table th {
          color: #f9fafb;
        }

        [data-theme="dark"] .datenschutz-table td {
          color: #d1d5db;
          border-color: #374151;
        }

        [data-theme="dark"] .datenschutz-table th {
          border-color: #374151;
        }

        [data-theme="dark"] .datenschutz-table code {
          background-color: #374151;
          color: #f9fafb;
        }

        [data-theme="dark"] .datenschutz-info-box,
        [data-theme="dark"] .datenschutz-link-box,
        [data-theme="dark"] .datenschutz-contact-box,
        [data-theme="dark"] .datenschutz-action-box {
          background-color: #1e3a5f;
          border-left-color: #3b82f6;
        }

        [data-theme="dark"] .datenschutz-info-box p,
        [data-theme="dark"] .datenschutz-link-box p,
        [data-theme="dark"] .datenschutz-contact-box p {
          color: #bfdbfe;
        }

        [data-theme="dark"] .datenschutz-link {
          color: #60a5fa;
        }

        [data-theme="dark"] .datenschutz-button {
          background-color: #3b82f6;
        }

        [data-theme="dark"] .datenschutz-button:hover {
          background-color: #2563eb;
        }

        [data-theme="dark"] .datenschutz-back {
          border-top-color: #374151;
        }

        [data-theme="dark"] .datenschutz-back-link {
          color: #60a5fa;
        }

        @media (max-width: 768px) {
          .datenschutz-title {
            font-size: 2rem;
          }

          .datenschutz-heading {
            font-size: 1.5rem;
          }

          .datenschutz-subheading {
            font-size: 1.25rem;
          }

          .datenschutz-table {
            font-size: 0.75rem;
          }

          .datenschutz-table th,
          .datenschutz-table td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
