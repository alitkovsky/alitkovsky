// Project data - shared between server and client components

export const PROJECTS_DATA = {
  de: {
    backToProjects: "alle projekte",
    industryLabel: "branche",
    clientLabel: "kunde",
    periodLabel: "zeitraum",
    problemLabel: "herausforderung",
    solutionLabel: "lösung",
    resultsLabel: "ergebnisse",
    servicesLabel: "leistungen",
    keyResults: "kernresultate",
    nextProject: "nächstes projekt",
    prevProject: "vorheriges projekt",
    projects: {
      "tracking-audit": {
        slug: "tracking-audit",
        title: "tracking-transparenz wiederhergestellt",
        subtitle: "tracking-audit & consent mode v2 fuer e-commerce",
        tags: ["ga4", "gtm", "consent mode v2", "cookiebot", "google ads", "gdpr"],
        client: "e-commerce marke (dach)",
        industry: "fashion & lifestyle",
        period: "14 tage",
        location: "dach region",
        metrics: [
          { value: 35, suffix: "%", label: "daten-recovery" },
          { value: 100, suffix: "%", label: "dsgvo-konform" },
          { value: 18, suffix: "%", label: "cpa-reduktion" },
        ],
        hero: "ein e-commerce-team stellte nach consent-aenderungen wieder belastbare conversion-signale her und sicherte gleichzeitig die compliance-basis.",
        problem: {
          title: "die herausforderung",
          content: [
            "nach aenderungen an cookie-banner und tags liefen shop-umsatz und ads-reporting auseinander.",
            "im marketing-dashboard fehlten conversions, waehrend das shop-system weiterhin verkaeufe zeigte. dadurch wurden budget- und bidding-entscheidungen unsicher.",
            "zusaetzlich bestand ein compliance-risiko: nicht notwendige scripts wurden teilweise vor consent ausgeliefert.",
          ],
        },
        solution: {
          title: "der lösungsansatz",
          content: [
            "ich habe das setup als systemproblem betrachtet, nicht als einzelnes tag-problem: zuerst audit von tag-architektur, consent-signalen und event-definitionen.",
            "dabei wurden doppelte implementierungen sichtbar (theme-code und gtm) sowie veraltete trigger ohne klare eigentuemer.",
            "anschliessend habe ich den gtm-container neu strukturiert, consent mode v2 sauber eingebunden, event-namen standardisiert und eine testcheckliste eingefuehrt.",
            "das team erhielt eine dokumentierte messlogik, damit spaetere aenderungen kontrolliert und nachvollziehbar bleiben.",
          ],
        },
        results: {
          title: "die ergebnisse",
          content: [
            "innerhalb von 48 stunden nach rollout waren conversions wieder konsistent in google ads und ga4 sichtbar.",
            "die abweichung zwischen shop- und reporting-daten sank deutlich, wodurch bidding wieder auf belastbaren signalen laufen konnte.",
            "das neue setup bestand die interne dsgvo-pruefung und bleibt durch dokumentation und governance wartbar.",
          ],
        },
        services: [
          "tracking-audit & datenqualitaets-check",
          "gtm-neuaufbau mit tag-governance",
          "consent mode v2 & cookiebot orchestration",
          "enhanced conversions und conversion-linking",
          "qa-debugging mit testprotokoll",
          "dokumentation & team-handover",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      "local-seo-dental": {
        slug: "local-seo-dental",
        title: "lokale sichtbarkeit strukturiert verbessert",
        subtitle: "local seo & reputation management für eine zahnarztpraxis",
        tags: ["local seo", "google business profile", "schema.org", "ahrefs", "wordpress", "content"],
        client: "private zahnarztpraxis",
        industry: "healthcare / dental",
        period: "6 monate (laufend)",
        location: "nrw, deutschland",
        metrics: [
          { value: 1, suffix: ".", label: "local map pack ranking" },
          { value: 48, suffix: "%", label: "mehr anrufe" },
          { value: 12, suffix: "x", label: "organische keywords" },
        ],
        hero: "eine zahnarztpraxis verbesserte lokale sichtbarkeit, anfragequalitaet und termin-planbarkeit durch konsistente standortdaten und klare follow-up-prozesse.",
        problem: {
          title: "die herausforderung",
          content: [
            "die medizinische qualitaet war hoch, die digitale lokale praesenz jedoch inkonsistent.",
            "google business profile, website und verzeichniseintraege sendeten unterschiedliche standortsignale (nap), wodurch rankingergebnisse schwankten.",
            "ausserdem fehlte ein wiederholbarer prozess, um bewertungen und anfragen strukturiert nachzuverfolgen.",
          ],
        },
        solution: {
          title: "der lösungsansatz",
          content: [
            "ich habe den fall als operations-thema aufgebaut: zuerst datenhygiene, dann inhaltsstruktur, danach review-workflow.",
            "die nap-daten wurden ueber relevante verzeichnisse harmonisiert, das gbp bereinigt und schema-markup fuer localbusiness/medicalwebpage eingefuehrt.",
            "fuer prioritaere behandlungen entstanden eigene landingpages mit klarer intent-zuordnung.",
            "ergänzend wurde ein review-follow-up mit qr und sms-vorlagen umgesetzt, damit feedback kontinuierlich statt sporadisch eingeht.",
          ],
        },
        results: {
          title: "die ergebnisse",
          content: [
            "die praxis erreichte stabile top-3 sichtbarkeit fuer zentrale lokale suchanfragen.",
            "das anrufvolumen stieg innerhalb von vier monaten um 48%, bei hoeherer relevanz der anfragen.",
            "durch den standardisierten lokalen prozess wurde die terminplanung planbarer und weniger von zufallstreffern abhaengig.",
          ],
        },
        services: [
          "local visibility audit & nap-harmonisierung",
          "google business profile strukturierung",
          "schema.org fuer localbusiness/medicalwebpage",
          "landingpage-konzept fuer prioritaere behandlungen",
          "review-follow-up workflow",
          "anruf- und anfrage-reporting",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      "google-ads-dach": {
        slug: "google-ads-dach",
        title: "dach-ads auf qualifizierte leads ausgerichtet",
        subtitle: "google ads signal-qualitaet & dach-adaption fuer b2b saas",
        tags: ["google ads", "gtm", "dach", "b2b", "german copywriting", "negative keywords"],
        client: "b2b saas company",
        industry: "software / logistics",
        period: "3 monate",
        location: "dach region",
        metrics: [
          { value: 52, suffix: "%", label: "cpl-reduktion" },
          { value: 30, suffix: "%", label: "höhere conversion rate" },
          { value: 4, suffix: "k€", label: "ersparnis/monat" },
        ],
        hero: "ein internationales b2b-saas-team stabilisierte lead-qualitaet und kosten im dach-markt, indem kampagnenlogik, sprache und crm-signale sauber verbunden wurden.",
        problem: {
          title: "die herausforderung",
          content: [
            "der account erzeugte klicks, aber zu wenige qualifizierte demos fuer den vertrieb.",
            "automatisch uebersetzte anzeigentexte und breite keyword-logik fuehrten zu hohem streuverlust und unpassenden suchanfragen.",
            "marketing-reporting und crm-rueckmeldungen waren nicht sauber gekoppelt, dadurch fehlte eine belastbare optimierungsschleife.",
          ],
        },
        solution: {
          title: "der lösungsansatz",
          content: [
            "ich habe den account als funnel-system neu strukturiert: suchintentionen segmentiert, keyword-cluster geschaerft und negative-keyword-governance eingefuehrt.",
            "anzeigen und landing-messages wurden auf den deutschen b2b-kontext angepasst (terminologie, ton, nutzenargumentation).",
            "parallel habe ich conversion-tracking bereinigt und mit crm-feedback verbunden, sodass optimierungen auf qualitaet statt nur klickvolumen basieren.",
            "alle aenderungen wurden als wiederholbarer arbeitsablauf dokumentiert, damit marketing und vertrieb mit denselben signalen arbeiten.",
          ],
        },
        results: {
          title: "die ergebnisse",
          content: [
            "der cost per lead sank um 52% bei gleichzeitig stabilerer demo-qualitaet.",
            "die conversion rate stieg um 30%, weil suchintention, anzeige und landingpage besser zusammenpassten.",
            "durch die negative-keyword-architektur wurden rund 4k euro pro monat an ineffizientem spend eingespart, bei klarerer uebergabe an sales.",
          ],
        },
        services: [
          "google ads struktur-audit",
          "keyword-segmentierung & negative-keyword governance",
          "dach copy- und messaging-adaption",
          "tracking- und attribution-cleanup",
          "landingpage signal-fit optimierung",
          "crm feedback loop fuer kampagnensteuerung",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
    },
    cta: {
      label: "aehnlichen prozess besprechen",
    },
    backLabel: "zurück zu allen projekten",
  },
  en: {
    backToProjects: "all projects",
    industryLabel: "industry",
    clientLabel: "client",
    periodLabel: "period",
    problemLabel: "challenge",
    solutionLabel: "solution",
    resultsLabel: "results",
    servicesLabel: "services",
    keyResults: "key results",
    nextProject: "next project",
    prevProject: "previous project",
    projects: {
      "tracking-audit": {
        slug: "tracking-audit",
        title: "tracking transparency restored",
        subtitle: "tracking audit & consent mode v2 implementation for e-commerce",
        tags: ["ga4", "gtm", "consent mode v2", "cookiebot", "google ads", "gdpr"],
        client: "e-commerce brand (dach)",
        industry: "fashion & lifestyle",
        period: "14 days",
        location: "dach region",
        metrics: [
          { value: 35, suffix: "%", label: "data recovery" },
          { value: 100, suffix: "%", label: "gdpr compliant" },
          { value: 18, suffix: "%", label: "cpa reduction" },
        ],
        hero: "an e-commerce team restored reliable conversion signals after consent changes while keeping the setup compliant and maintainable.",
        problem: {
          title: "the challenge",
          content: [
            "after cookie-banner and tagging changes, shop revenue and ad reporting no longer matched.",
            "conversion data disappeared from marketing dashboards while the shop backend still showed orders, making budget and bidding decisions unreliable.",
            "there was also a compliance risk: non-essential scripts were partially firing before consent.",
          ],
        },
        solution: {
          title: "the approach",
          content: [
            "i treated this as a system issue, not a single-tag fix: first, a full audit of tag architecture, consent signals, and event definitions.",
            "the audit uncovered duplicate implementations (theme code plus GTM) and obsolete triggers without ownership.",
            "i then rebuilt the GTM container structure, implemented consent mode v2 cleanly, standardized event naming, and introduced a QA checklist.",
            "the final step was measurement documentation so future changes remain controlled and traceable.",
          ],
        },
        results: {
          title: "the results",
          content: [
            "within 48 hours after rollout, conversions were visible again across Google Ads and GA4.",
            "the gap between shop and reporting data dropped significantly, allowing bidding to run on stable signals again.",
            "the setup passed internal GDPR checks and is now maintainable through clear documentation and governance.",
          ],
        },
        services: [
          "tracking audit and data-quality check",
          "gtm rebuild with tag governance",
          "consent mode v2 and cookiebot orchestration",
          "enhanced conversions and conversion linking",
          "qa debugging with test protocol",
          "documentation and team handover",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      "local-seo-dental": {
        slug: "local-seo-dental",
        title: "structured local visibility improvement",
        subtitle: "local seo & reputation management for a dental practice",
        tags: ["local seo", "google business profile", "schema.org", "ahrefs", "wordpress", "content"],
        client: "private dental practice",
        industry: "healthcare / dental",
        period: "6 months (ongoing)",
        location: "nrw, germany",
        metrics: [
          { value: 1, suffix: "st", label: "local map pack ranking" },
          { value: 48, suffix: "%", label: "more phone calls" },
          { value: 12, suffix: "x", label: "organic keywords" },
        ],
        hero: "a dental practice improved local visibility, inquiry quality, and schedule predictability through consistent location data and structured follow-up workflows.",
        problem: {
          title: "the challenge",
          content: [
            "clinical quality was strong, but local digital visibility was inconsistent.",
            "Google Business Profile, website content, and directory listings sent conflicting location signals (NAP), which caused unstable rankings.",
            "the team also lacked a repeatable process for collecting reviews and following up inquiries consistently.",
          ],
        },
        solution: {
          title: "the approach",
          content: [
            "i structured the work as an operations sequence: data hygiene first, content architecture second, review workflow third.",
            "NAP data was harmonized across relevant directories, GBP was cleaned up, and localbusiness/medicalwebpage schema markup was implemented.",
            "for priority treatments, we built dedicated landing pages with clear intent mapping.",
            "in parallel, i introduced a review follow-up flow using QR prompts and SMS templates for consistent feedback collection.",
          ],
        },
        results: {
          title: "the results",
          content: [
            "the practice reached stable top-3 visibility for core local searches.",
            "phone call volume increased by 48% within four months, with higher inquiry relevance.",
            "the standardized local workflow made appointment planning more predictable and less dependent on ad-hoc visibility spikes.",
          ],
        },
        services: [
          "local visibility audit and NAP harmonization",
          "Google Business Profile structuring",
          "schema.org for localbusiness and medicalwebpage",
          "landing-page design for priority treatments",
          "review follow-up workflow",
          "call and inquiry reporting",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      "google-ads-dach": {
        slug: "google-ads-dach",
        title: "dach ads aligned for qualified leads",
        subtitle: "google ads signal quality and dach adaptation for b2b saas",
        tags: ["google ads", "gtm", "dach", "b2b", "german copywriting", "negative keywords"],
        client: "b2b saas company",
        industry: "software / logistics",
        period: "3 months",
        location: "dach region",
        metrics: [
          { value: 52, suffix: "%", label: "cpl reduction" },
          { value: 30, suffix: "%", label: "higher conversion rate" },
          { value: 4, suffix: "k€", label: "saved/month" },
        ],
        hero: "an international b2b saas team stabilized lead quality and acquisition costs in the dach market by aligning campaign logic, language, and crm feedback signals.",
        problem: {
          title: "the challenge",
          content: [
            "the account generated clicks but too few qualified demos for sales.",
            "machine-translated ad copy and broad keyword logic created irrelevant search matches and heavy budget waste.",
            "marketing reporting and CRM outcomes were disconnected, so there was no reliable optimization feedback loop.",
          ],
        },
        solution: {
          title: "the approach",
          content: [
            "i rebuilt the account as a funnel system: segmented search intent, tightened keyword clusters, and introduced negative-keyword governance.",
            "ad and landing-page messaging was adapted to the german b2b context, including terminology, tone, and value framing.",
            "in parallel, i cleaned conversion tracking and connected optimization decisions with CRM feedback, so performance was measured by lead quality, not click volume.",
            "all changes were documented as an operating routine for ongoing collaboration between marketing and sales.",
          ],
        },
        results: {
          title: "the results",
          content: [
            "cost per lead dropped by 52% while qualified demo flow became more stable.",
            "conversion rate improved by 30% because search intent, ad copy, and landing context were aligned.",
            "the negative-keyword structure removed around EUR 4k/month in inefficient spend and improved handoff quality to sales.",
          ],
        },
        services: [
          "Google Ads structure audit",
          "keyword segmentation and negative-keyword governance",
          "dach copy and messaging adaptation",
          "tracking and attribution cleanup",
          "landing-page signal-fit optimization",
          "crm feedback loop for campaign steering",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
    },
    cta: {
      label: "discuss a similar process setup",
    },
    backLabel: "back to all projects",
  },
};

// Get all project slugs for static generation
export function getAllProjectSlugs() {
  return Object.keys(PROJECTS_DATA.en.projects);
}

// Get project data by slug
export function getProjectBySlug(slug, language = "en") {
  const data = PROJECTS_DATA[language] ?? PROJECTS_DATA.en;
  return data.projects[slug] ?? null;
}

// Get adjacent projects for navigation
export function getAdjacentProjects(currentSlug) {
  const slugs = getAllProjectSlugs();
  const currentIndex = slugs.indexOf(currentSlug);

  return {
    prev: currentIndex > 0 ? slugs[currentIndex - 1] : null,
    next: currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null,
  };
}
