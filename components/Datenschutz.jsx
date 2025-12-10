"use client";

export default function Datenschutz() {
  const handleOpenCookieSettings = () => {
    window.dispatchEvent(new CustomEvent("openCookieSettings"));
  };

  return (
    <div className="datenschutz-content">
      <h1 className="datenschutz-title">
        Datenschutzerklärung & Cookie-Richtlinie
      </h1>

      {/* Introduction */}
      <section className="datenschutz-section">
        <p className="datenschutz-text">
          <strong>Verantwortlicher:</strong>
          <br />
          Andrii Litkovskyi
          <br />
          Mindener Str. 87
          <br />
          32479 Hille, Deutschland
          <br />
          E-Mail: andrii@litkovskyi.de
          <br />
          Telefon: +49 176 58238236
        </p>
        <p className="datenschutz-text">
          Der Schutz Ihrer personenbezogenen Daten ist mir ein wichtiges
          Anliegen. Diese Datenschutzerklärung informiert Sie darüber, welche
          Daten bei Ihrem Besuch auf meiner Website erhoben werden und zu
          welchen Zwecken diese verwendet werden.
        </p>
      </section>

      {/* Cookie Usage */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">1. Verwendung von Cookies</h2>

        <div className="datenschutz-subsection">
          <h3 className="datenschutz-subheading">1.1 Was sind Cookies?</h3>
          <p className="datenschutz-text">
            Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert
            werden, wenn Sie eine Website besuchen. Sie ermöglichen es der
            Website, Ihr Gerät wiederzuerkennen und bestimmte Informationen zu
            speichern.
          </p>
        </div>

        <div className="datenschutz-subsection">
          <h3 className="datenschutz-subheading">
            1.2 Welche Cookies verwenden wir?
          </h3>

          {/* Necessary Cookies Table */}
          <h4 className="datenschutz-table-title">Notwendige Cookies</h4>
          <div className="datenschutz-table-wrapper">
            <table className="datenschutz-table">
              <thead>
                <tr>
                  <th>Cookie-Name</th>
                  <th>Zweck</th>
                  <th>Laufzeit</th>
                  <th>Typ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>cookie_consent_v1</code>
                  </td>
                  <td>Speichert Ihre Cookie-Einwilligungsentscheidung</td>
                  <td>12 Monate</td>
                  <td>First-Party</td>
                </tr>
                <tr>
                  <td>
                    <code>cookie_consent_timestamp</code>
                  </td>
                  <td>Speichert Zeitpunkt der Einwilligung</td>
                  <td>12 Monate</td>
                  <td>First-Party</td>
                </tr>
                <tr>
                  <td>
                    <code>nav-theme</code>
                  </td>
                  <td>Speichert Ihre Theme-Präferenz (hell/dunkel)</td>
                  <td>Session</td>
                  <td>First-Party</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Analytics Cookies Table */}
          <h4 className="datenschutz-table-title">Analytische Cookies</h4>
          <p className="datenschutz-notice">
            Diese Cookies werden nur mit Ihrer ausdrücklichen Einwilligung
            gesetzt.
          </p>
          <div className="datenschutz-table-wrapper">
            <table className="datenschutz-table">
              <thead>
                <tr>
                  <th>Cookie-Name</th>
                  <th>Anbieter</th>
                  <th>Zweck</th>
                  <th>Laufzeit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>_ga</code>
                  </td>
                  <td>Google Analytics</td>
                  <td>Unterscheidung von Website-Besuchern</td>
                  <td>2 Jahre</td>
                </tr>
                <tr>
                  <td>
                    <code>_gid</code>
                  </td>
                  <td>Google Analytics</td>
                  <td>Unterscheidung von Website-Besuchern</td>
                  <td>24 Stunden</td>
                </tr>
                <tr>
                  <td>
                    <code>_ga_XXXXXXXXXX</code>
                  </td>
                  <td>Google Analytics 4</td>
                  <td>Speichert den Session-Status</td>
                  <td>2 Jahre</td>
                </tr>
                <tr>
                  <td>
                    <code>_clck</code>
                  </td>
                  <td>Microsoft Clarity</td>
                  <td>Speichert eindeutige Benutzer-ID</td>
                  <td>1 Jahr</td>
                </tr>
                <tr>
                  <td>
                    <code>_clsk</code>
                  </td>
                  <td>Microsoft Clarity</td>
                  <td>Verbindet mehrere Seitenaufrufe</td>
                  <td>1 Tag</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Marketing Cookies Table */}
          <h4 className="datenschutz-table-title">Marketing Cookies</h4>
          <p className="datenschutz-notice">
            Diese Cookies werden nur mit Ihrer ausdrücklichen Einwilligung
            gesetzt.
          </p>
          <div className="datenschutz-table-wrapper">
            <table className="datenschutz-table">
              <thead>
                <tr>
                  <th>Cookie-Name</th>
                  <th>Anbieter</th>
                  <th>Zweck</th>
                  <th>Laufzeit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>_gcl_au</code>
                  </td>
                  <td>Google Ads</td>
                  <td>Conversion-Tracking und Remarketing</td>
                  <td>90 Tage</td>
                </tr>
                <tr>
                  <td>
                    <code>IDE</code>
                  </td>
                  <td>Google DoubleClick</td>
                  <td>Anzeigen-Tracking</td>
                  <td>13 Monate</td>
                </tr>
                <tr>
                  <td>
                    <code>test_cookie</code>
                  </td>
                  <td>Google DoubleClick</td>
                  <td>Prüft Cookie-Unterstützung</td>
                  <td>15 Minuten</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="datenschutz-info-box">
          <p>
            <strong>Rechtsgrundlage:</strong> Die Verwendung von Cookies erfolgt
            auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO
            und § 25 Abs. 1 TTDSG.
          </p>
        </div>
      </section>

      {/* Google Analytics */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">2. Google Analytics 4</h2>
        <p className="datenschutz-text">
          Wir verwenden Google Analytics 4, einen Webanalysedienst der Google
          Ireland Limited ("Google"). Google Analytics verwendet Cookies, die
          eine Analyse Ihrer Nutzung der Website ermöglichen.
        </p>
        <h3 className="datenschutz-subheading">
          2.1 Umfang der Datenverarbeitung
        </h3>
        <ul className="datenschutz-list">
          <li>Pseudonymisierte Nutzer-IDs</li>
          <li>Besuchte Seiten und Verweildauer</li>
          <li>Verwendetes Gerät und Browser</li>
          <li>Ungefährer Standort (Land/Stadt)</li>
          <li>Interaktionen mit Website-Elementen</li>
        </ul>
        <h3 className="datenschutz-subheading">2.2 IP-Anonymisierung</h3>
        <p className="datenschutz-text">
          Wir haben die IP-Anonymisierung aktiviert. Ihre IP-Adresse wird von
          Google innerhalb von Mitgliedstaaten der EU oder anderen
          Vertragsstaaten des EWR vor der Übermittlung in die USA gekürzt.
        </p>
        <h3 className="datenschutz-subheading">
          2.3 Datenübermittlung in die USA
        </h3>
        <p className="datenschutz-text">
          Google ist unter dem EU-US Data Privacy Framework zertifiziert und
          verpflichtet sich zur Einhaltung europäischer Datenschutzstandards.
          Die Datenübermittlung erfolgt auf Grundlage von
          Standardvertragsklauseln.
        </p>
        <div className="datenschutz-link-box">
          <p>
            <strong>Weitere Informationen:</strong>
            <br />
            Google Analytics Datenschutzerklärung:{" "}
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
        <h2 className="datenschutz-heading">3. Microsoft Clarity</h2>
        <p className="datenschutz-text">
          Wir verwenden Microsoft Clarity, einen Webanalysedienst der Microsoft
          Corporation. Clarity erfasst, wie Benutzer unsere Website nutzen,
          einschließlich Klicks, Scrollverhalten und Mausbewegungen.
        </p>
        <h3 className="datenschutz-subheading">3.1 Verarbeitete Daten</h3>
        <ul className="datenschutz-list">
          <li>Session-Aufzeichnungen (anonymisiert)</li>
          <li>Heatmaps des Nutzerverhaltens</li>
          <li>Technische Informationen (Browser, Gerät)</li>
        </ul>
        <p className="datenschutz-text">
          Sensible Daten wie Passwörter und Kreditkartendaten werden
          automatisch maskiert.
        </p>
        <div className="datenschutz-link-box">
          <p>
            <strong>Weitere Informationen:</strong>
            <br />
            Microsoft Privacy Statement:{" "}
            <a
              href="https://privacy.microsoft.com/de-de/privacystatement"
              target="_blank"
              rel="noopener noreferrer"
              className="datenschutz-link"
            >
              https://privacy.microsoft.com/de-de/privacystatement
            </a>
          </p>
        </div>
      </section>

      {/* Calendly */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">4. Calendly</h2>
        <p className="datenschutz-text">
          Wir verwenden Calendly für Online-Terminbuchungen. Wenn Sie auf den
          Buchungsbutton klicken, wird Calendly geladen. Dabei werden folgende
          Daten an Calendly übermittelt:
        </p>
        <ul className="datenschutz-list">
          <li>IP-Adresse</li>
          <li>Browser-Informationen</li>
          <li>Von Ihnen eingegebene Kontaktdaten (Name, E-Mail, Telefon)</li>
        </ul>
        <p className="datenschutz-text">
          Calendly ist ein Dienst der Calendly LLC, USA. Die Datenübermittlung
          erfolgt auf Grundlage von Standardvertragsklauseln.
        </p>
        <div className="datenschutz-link-box">
          <p>
            <strong>Weitere Informationen:</strong>
            <br />
            Calendly Privacy Policy:{" "}
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

      {/* User Rights */}
      <section className="datenschutz-section">
        <h2 className="datenschutz-heading">5. Ihre Rechte</h2>
        <p className="datenschutz-text">
          Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
        </p>
        <ul className="datenschutz-list">
          <li>
            <strong>Auskunft (Art. 15 DSGVO):</strong> Sie haben das Recht,
            Auskunft über die von uns verarbeiteten Daten zu erhalten.
          </li>
          <li>
            <strong>Berichtigung (Art. 16 DSGVO):</strong> Sie können die
            Berichtigung unrichtiger Daten verlangen.
          </li>
          <li>
            <strong>Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung
            Ihrer Daten verlangen, sofern keine gesetzlichen
            Aufbewahrungspflichten bestehen.
          </li>
          <li>
            <strong>Einschränkung (Art. 18 DSGVO):</strong> Sie können die
            Einschränkung der Verarbeitung verlangen.
          </li>
          <li>
            <strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können
            Ihre Daten in einem strukturierten Format erhalten.
          </li>
          <li>
            <strong>Widerspruch (Art. 21 DSGVO):</strong> Sie können der
            Verarbeitung Ihrer Daten widersprechen.
          </li>
          <li>
            <strong>Widerruf (Art. 7 Abs. 3 DSGVO):</strong> Sie können Ihre
            Einwilligung jederzeit widerrufen.
          </li>
        </ul>

        <div className="datenschutz-action-box">
          <h3 className="datenschutz-subheading">
            Cookie-Einstellungen ändern
          </h3>
          <p className="datenschutz-text">
            Sie können Ihre Cookie-Einstellungen jederzeit ändern:
          </p>
          <button
            onClick={handleOpenCookieSettings}
            className="datenschutz-button"
          >
            🍪 Cookie-Einstellungen öffnen
          </button>
        </div>

        <h3 className="datenschutz-subheading">
          5.1 Kontakt für Datenschutzanfragen
        </h3>
        <p className="datenschutz-text">
          Für Anfragen bezüglich Ihrer Datenschutzrechte wenden Sie sich bitte
          an:
        </p>
        <div className="datenschutz-contact-box">
          <p>
            <strong>Andrii Litkovskyi</strong>
            <br />
            Mindener Str. 87
            <br />
            32479 Hille
            <br />
            E-Mail:{" "}
            <a
              href="mailto:andrii@litkovskyi.de"
              className="datenschutz-link"
            >
              andrii@litkovskyi.de
            </a>
            <br />
            Telefon: +49 176 58238236
          </p>
        </div>

        <h3 className="datenschutz-subheading">5.2 Beschwerderecht</h3>
        <p className="datenschutz-text">
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über
          die Verarbeitung Ihrer personenbezogenen Daten zu beschweren:
        </p>
        <div className="datenschutz-contact-box">
          <p>
            <strong>
              Landesbeauftragte für Datenschutz und Informationsfreiheit
              Nordrhein-Westfalen
            </strong>
            <br />
            Postfach 20 04 44
            <br />
            40102 Düsseldorf
            <br />
            Website:{" "}
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
          6. Änderungen dieser Datenschutzerklärung
        </h2>
        <p className="datenschutz-text">
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie
          an geänderte Rechtsverhältnisse oder bei Änderungen der Website sowie
          der Datenverarbeitung anzupassen. Dies gilt jedoch nur für
          Erklärungen zur Datenverarbeitung. Sofern Einwilligungen erforderlich
          sind oder Bestandteile der Datenschutzerklärung Regelungen des
          Vertragsverhältnisses enthalten, erfolgen die Änderungen nur mit
          Zustimmung der Nutzer.
        </p>
        <p className="datenschutz-text">
          <strong>Stand dieser Datenschutzerklärung:</strong>{" "}
          {new Date().toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </section>

      {/* Back Button */}
      <div className="datenschutz-back">
        <a href="/" className="datenschutz-back-link">
          ← Zurück zur Startseite
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
