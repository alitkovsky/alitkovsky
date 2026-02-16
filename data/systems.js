export const SYSTEMS_DATA = {
   de: {
      pageTitle: "lösungen",
      pageSubtitle: "digitale prozess-systeme fuer klare ablaeufe",
      backToSystems: "alle lösungen",
      whatIncluded: "enthaltene module",
      whoIsItFor: "symptome & diagnose",
      expectedResults: "ergebnisse",
      relatedProject: "case study",
      systems: {
         "control-center": {
            slug: "control-center",
            title: "the control center",
            subtitle: "crm & workflow operations",
            heroTagline: "anfragen sauber erfassen, priorisieren und nachverfolgen",
            description: "das 'control center' strukturiert deinen operativen anfrageprozess. ich verbinde crm, kommunikation und aufgabenlogik so, dass zuständigkeiten klar sind und jeder schritt nachvollziehbar bleibt.",
            icon: "crm-email-marketing", // Re-using existing icon for now
            stack: ["HubSpot / Pipedrive", "Brevo", "n8n / Make"],
            metrics: [
               { value: 0, suffix: "", label: "anfragen gehen verloren" },
               { value: 5, suffix: "min", label: "reaktionszeit im prozess" },
               { value: 100, suffix: "%", label: "datenhoheit (dsgvo)" },
            ],
            whatIncluded: [
               "crm-setup (hubspot/pipedrive) mit pipeline- und statuslogik",
               "automatische aufgaben- und eigentuemer-zuweisung via n8n/make",
               "sofort-benachrichtigungen an zuständige teammitglieder",
               "follow-up-regeln und vorlagen fuer konsistente rueckmeldungen",
               "dokumentation aller schritte fuer vertretung und uebergabe",
               "datenschutzfreundliche automations-architektur",
            ],
            whoIsItFor: [
               "anfragen kommen aus mehreren kanaelen und werden uneinheitlich bearbeitet",
               "dein team arbeitet mit excel-listen statt zentralem crm",
               "rueckrufe oder angebote werden zu spaet nachgefasst",
               "es fehlen klare zustaendigkeiten und verlaufsdokumentation",
            ],
            expectedResults: [
               "jeder kontakt ist im crm eindeutig nachvollziehbar",
               "schnellere reaktionszeit durch klare verteilung",
               "weniger manuelle routine bei gleicher teamgroesse",
            ],
            cta: {
               label: "control center erst-check buchen",
            },
         },
         "intelligence-hub": {
            slug: "intelligence-hub",
            title: "the intelligence hub",
            subtitle: "data quality, tracking & reporting",
            heroTagline: "belastbare daten statt reporting-chaos",
            description: "der 'intelligence hub' schafft eine gemeinsame datenbasis fuer entscheidungen. ich standardisiere tracking, consent und reporting, damit teams auf dieselben zahlen schauen und schneller handeln.",
            icon: "analytics", // Re-using existing icon
            stack: ["GA4 & GTM", "Consent Mode v2", "Looker Studio"],
            metrics: [
               { value: 100, suffix: "%", label: "datennachvollziehbarkeit" },
               { value: 30, suffix: "%", label: "weniger reporting-aufwand" },
               { value: 0, suffix: "", label: "blindflug bei kpi-entscheidungen" },
            ],
            whatIncluded: [
               "tracking-konzept und standardisierte event-logik",
               "consent mode v2 implementierung und consent-pruefung",
               "verbindung crm-daten mit reporting-kpis",
               "dashboards fuer management und operative teams",
               "datenqualitaets-checks und anomaliemeldungen",
               "dokumentation der messlogik und kennzahlen",
            ],
            whoIsItFor: [
               "mehrere datenquellen liefern widerspruechliche werte",
               "reporting dauert zu lange und ist schwer vergleichbar",
               "teams diskutieren zahlen statt entscheidungen",
               "consent- und datenschutzfragen sind operativ unklar",
            ],
            expectedResults: [
               "eine gemeinsame datenbasis fuer alle teams",
               "kuerzere reporting-zyklen mit klaren verantwortlichkeiten",
               "belastbare grundlage fuer budget- und prozessentscheidungen",
            ],
            cta: {
               label: "intelligence hub check vereinbaren",
            },
         },
         "growth-engine": {
            slug: "growth-engine",
            title: "the growth engine",
            subtitle: "routine automation fuer marketing & backoffice",
            heroTagline: "wiederkehrende aufgaben automatisieren, fokus zurueckgewinnen",
            description: "die 'growth engine' automatisiert wiederkehrende routinearbeit in marketing und administration. so sinkt manueller aufwand, und teams koennen sich auf prioritaeten konzentrieren.",
            icon: "seo", // Re-using existing icon
            stack: ["Shopware / WooCommerce", "CRM & E-Mail Tools", "n8n / Make"],
            metrics: [
               { value: 20, suffix: "h/wo", label: "zeitersparnis durch automation" },
               { value: 24, suffix: "/7", label: "stabile workflow-ausfuehrung" },
               { value: 3, suffix: "x", label: "schnellere prozess-durchlaeufe" },
            ],
            whatIncluded: [
               "workflow-automatisierung fuer statusupdates und follow-ups",
               "content- und versandprozesse mit freigabelogik",
               "sync von produkt- und kundendaten zwischen systemen",
               "automatisierte aufgaben fuer teams und vertretungen",
               "standardisierte vorlagen fuer routinekommunikation",
               "monitoring und fehlerwarnungen fuer kritische schritte",
            ],
            whoIsItFor: [
               "wiederkehrende aufgaben kosten zu viel arbeitszeit",
               "daten werden manuell zwischen tools kopiert",
               "teams sind in routine gebunden statt in prioritaeten",
               "ablaeufe stoppen, sobald einzelne personen ausfallen",
            ],
            expectedResults: [
               "weniger manuelle routinearbeit im tagesgeschaeft",
               "konsistente ablaeufe auch bei hoher auslastung",
               "schnellere durchlaufzeit in operativen prozessen",
            ],
            cta: {
               label: "growth engine erst-check",
            },
         },
      },
      cta: {
         label: "kostenloses erstgespraech",
      },
   },
   en: {
      pageTitle: "solutions",
      pageSubtitle: "digital process systems for reliable day-to-day execution",
      backToSystems: "all solutions",
      whatIncluded: "modules included",
      whoIsItFor: "symptoms & diagnosis",
      expectedResults: "expected outcomes",
      relatedProject: "case study",
      systems: {
         "control-center": {
            slug: "control-center",
            title: "the control center",
            subtitle: "crm & workflow operations",
            heroTagline: "capture, prioritize, and follow up requests with clear ownership",
            description: "the 'control center' structures your incoming inquiry process. i connect CRM, communication, and task logic so responsibilities are clear and each step is traceable.",
            icon: "crm-email-marketing",
            stack: ["HubSpot / Pipedrive", "Brevo", "n8n / Make"],
            metrics: [
               { value: 0, suffix: "", label: "requests lost" },
               { value: 5, suffix: "min", label: "process response time" },
               { value: 100, suffix: "%", label: "traceable workflow history" },
            ],
            whatIncluded: [
               "CRM setup with pipeline and status logic",
               "automated task and owner assignment via n8n/make",
               "instant notifications to responsible team members",
               "follow-up rules and templates for consistent communication",
               "full step documentation for handoffs and coverage",
               "privacy-friendly automation architecture",
            ],
            whoIsItFor: [
               "requests come from multiple channels and are handled inconsistently",
               "teams still work in spreadsheets instead of a central CRM",
               "callbacks and offers are followed up too late",
               "ownership and process visibility are unclear",
            ],
            expectedResults: [
               "every contact is clearly traceable inside CRM",
               "faster response time through clear ownership",
               "less manual routine with the same team size",
            ],
            cta: {
               label: "book a control center first check",
            },
         },
         "intelligence-hub": {
            slug: "intelligence-hub",
            title: "the intelligence hub",
            subtitle: "data quality, tracking & reporting",
            heroTagline: "decision-ready data instead of reporting noise",
            description: "the 'intelligence hub' creates one shared data foundation for operations. i standardize tracking, consent, and reporting so teams work from the same numbers and move faster.",
            icon: "analytics",
            stack: ["GA4 & GTM", "Consent Mode v2", "Looker Studio"],
            metrics: [
               { value: 100, suffix: "%", label: "traceable KPI logic" },
               { value: 30, suffix: "%", label: "lower reporting effort" },
               { value: 0, suffix: "", label: "decision blind spots" },
            ],
            whatIncluded: [
               "tracking concept with standardized event design",
               "consent mode v2 implementation and validation",
               "CRM-to-reporting KPI integration",
               "dashboards for management and operational teams",
               "data quality checks and anomaly alerts",
               "measurement documentation and governance",
            ],
            whoIsItFor: [
               "multiple data sources show conflicting results",
               "reporting takes too long and remains hard to compare",
               "teams debate numbers instead of decisions",
               "consent and privacy setup is operationally unclear",
            ],
            expectedResults: [
               "one shared data baseline for all teams",
               "shorter reporting cycles with clear ownership",
               "reliable input for budget and process decisions",
            ],
            cta: {
               label: "book an intelligence hub check",
            },
         },
         "growth-engine": {
            slug: "growth-engine",
            title: "the growth engine",
            subtitle: "routine automation for marketing & backoffice",
            heroTagline: "automate recurring tasks and reclaim team focus",
            description: "the 'growth engine' automates repetitive work across marketing and administration. this reduces manual effort and gives teams more capacity for priorities.",
            icon: "seo",
            stack: ["Shopware / WooCommerce", "CRM & Email Tools", "n8n / Make"],
            metrics: [
               { value: 20, suffix: "h/wk", label: "time saved through automation" },
               { value: 24, suffix: "/7", label: "stable workflow execution" },
               { value: 3, suffix: "x", label: "faster process cycle time" },
            ],
            whatIncluded: [
               "workflow automation for status updates and follow-ups",
               "content and sending flows with approval logic",
               "product and customer data sync between tools",
               "automated task generation for team handoffs",
               "standardized templates for routine communication",
               "monitoring and alerts for critical failures",
            ],
            whoIsItFor: [
               "repetitive tasks consume too much team time",
               "data is copied manually between tools",
               "teams are stuck in routine instead of priorities",
               "processes stall when key people are unavailable",
            ],
            expectedResults: [
               "less manual routine in daily operations",
               "consistent execution even under high workload",
               "faster throughput in operational processes",
            ],
            cta: {
               label: "book a growth engine first check",
            },
         },
      },
      cta: {
         label: "book a free first check",
      },
   },
};

export function getAllSystemSlugs() {
   return Object.keys(SYSTEMS_DATA.de.systems);
}

export function getSystemBySlug(slug, language = "de") {
   const data = SYSTEMS_DATA[language] ?? SYSTEMS_DATA.de;
   return data.systems[slug] ?? null;
}

export function getAllSystems(language = "de") {
   const data = SYSTEMS_DATA[language] ?? SYSTEMS_DATA.de;
   return Object.values(data.systems);
}

export function getSystemsPageCopy(language = "de") {
   const data = SYSTEMS_DATA[language] ?? SYSTEMS_DATA.de;
   return {
      pageTitle: data.pageTitle,
      pageSubtitle: data.pageSubtitle,
      backToSystems: data.backToSystems,
      whatIncluded: data.whatIncluded,
      whoIsItFor: data.whoIsItFor,
      expectedResults: data.expectedResults,
      relatedProject: data.relatedProject,
      cta: data.cta,
   };
}
