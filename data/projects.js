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
        title: "die \"black box\" rettung",
        subtitle: "tracking-audit & consent mode v2 implementierung für e-commerce",
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
        hero: "ein e-commerce-shop im fashion-bereich bekam seine \"verlorene\" conversion-sichtbarkeit zurück — dsgvo-konform und zukunftssicher.",
        problem: {
          title: "die herausforderung",
          content: [
            "der kunde kam mit einem panik-problem: \"unser google ads dashboard zeigt 0 conversions, aber das shop-system zeigt verkäufe.\"",
            "nach verschärfung der eu-datenschutzregeln (dma) war das bisherige tracking-setup zusammengebrochen. €5.000/monat wurden für ads ausgegeben — aber effektiv blind.",
            "google ads conversion tracking war auf fast null gefallen. ga4-daten wichen 40% vom shopify-backend ab. und: das cookie-banner blockierte scripts nicht korrekt — ein dsgvo-risiko.",
          ],
        },
        solution: {
          title: "der lösungsansatz",
          content: [
            "statt eines \"schnellen patches\" schlug ich eine \"clean slate\" architektur vor. wir wollten nicht nur die zahlen fixen — wir brauchten ein setup, das legal (dsgvo) und zukunftssicher ist.",
            "die strategie: google consent mode v2 implementieren. das erlaubt google-tags, ihr verhalten basierend auf nutzer-consent anzupassen und \"verlorene\" modelling-daten zurückzugewinnen — ohne datenschutzgesetze zu verletzen.",
            "vor dem ersten tag-eingriff führte ich ein deep-dive audit durch. das ergebnis: die vorherige agentur hatte pixel direkt im theme-code und zusätzlich im gtm implementiert. resultat: doppelzählung wenn es funktionierte, totalausfall wenn das cookie-banner lud.",
            "der gtm-container war ein chaos aus 50+ ungenutzten triggern. er brauchte eine totale bereinigung.",
          ],
        },
        results: {
          title: "die ergebnisse",
          content: [
            "der impact war sofort messbar. innerhalb von 48 stunden nach deployment des neuen containers: google ads zeigte wieder conversions an.",
            "smart bidding wurde wieder aktiviert — weil der algorithmus endlich wieder daten erhielt, stabilisierte sich der cost per acquisition (cpa).",
            "der kunde bestand seine interne dsgvo-compliance-prüfung mit 100% score. die cookie-konfiguration wurde verifiziert: non-essential scripts werden erst nach consent geladen.",
          ],
        },
        services: [
          "tracking-audit & fehleranalyse",
          "gtm-container restructuring",
          "consent mode v2 setup",
          "cookiebot-integration",
          "enhanced conversions setup",
          "debugging & validierung",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      "local-seo-dental": {
        slug: "local-seo-dental",
        title: "der \"unsichtbare\" zahnarzt",
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
        hero: "eine hochqualifizierte zahnarztpraxis wurde von der lokalen unsichtbarkeit zur top-3 präsenz im google map pack — mit echten patienten statt nur traffic.",
        problem: {
          title: "die herausforderung",
          content: [
            "der kunde war ein erfahrener zahnarzt mit moderner klinik, aber sein terminkalender hatte lücken.",
            "das problem: wenn patienten nach \"zahnarzt minden\" oder hochwertigen begriffen wie \"zahnimplantate\" suchten, war die praxis im local map pack nicht zu finden.",
            "aggressive dental-ketten dominierten die top-3 plätze — trotz niedrigerer patientenzufriedenheit. der pain point: \"wir haben die beste technologie, aber neue patienten gehen zur praxis die straße runter, weil sie bei google maps #1 ranken.\"",
          ],
        },
        solution: {
          title: "der lösungsansatz",
          content: [
            "wir brauchten nicht \"zahnarzt deutschland\" zu ranken. wir mussten einen 10km radius dominieren.",
            "die strategie: eine \"hyper-local\" offensive. wir verlagerten den fokus von generischen keywords auf high-intent, standortbezogene suchanfragen (z.b. \"notfall zahnarzt [stadt]\").",
            "mit ahrefs und screaming frog identifizierte ich drei kritische probleme: nap-chaos (name, adresse, telefon variierten über 15 verzeichnisse), thin content (hochmargige services wie implantate waren auf einer generischen \"leistungen\"-seite versteckt), und fehlende localbusiness + medicalwebpage schema-markup.",
            "phase 1 war technische hygiene: gbp verifizieren, nap standardisieren, json-ld schema implementieren. phase 2 war content: dedizierte landing pages für priority-behandlungen. phase 3 war das \"review-ökosystem\" mit qr-code und follow-up-sms.",
          ],
        },
        results: {
          title: "die ergebnisse",
          content: [
            "die kampagne brachte nicht nur \"traffic\" — sie brachte patienten.",
            "map pack dominanz: die praxis rankt jetzt konsistent in den top 3 für \"zahnarzt [stadt]\" und \"zahnreinigung\". die neuen landing pages ranken für spezifische, hochpreisige behandlungen.",
            "anruf-volumen: wir trackten anrufe über das gbp-dashboard und sahen einen klaren aufwärtstrend von +48% innerhalb von 4 monaten. conversion-qualität: patienten die nach teuren prozeduren suchen, nicht nur nach check-ups.",
          ],
        },
        services: [
          "local seo strategie",
          "google business profile optimierung",
          "schema.org markup implementation",
          "content & landing page erstellung",
          "nap-audit & citations",
          "review-management system",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      "google-ads-dach": {
        slug: "google-ads-dach",
        title: "der \"lost in translation\" fix",
        subtitle: "google ads rescue & dach-markt expansion für b2b saas",
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
        hero: "ein internationales software-unternehmen verwandelte seine deutschland-kampagne vom geld-grab zum effizientesten kanal in europa — durch kulturelle anpassung statt nur übersetzung.",
        problem: {
          title: "die herausforderung",
          content: [
            "ein internationales software-unternehmen versuchte, den deutschen markt zu erobern. sie hatten einfach ihre us-kampagnen mit automatischen tools ins deutsche übersetzt.",
            "das problem: sie verbrannten budget mit keywords, die richtig aussahen, aber für muttersprachler etwas anderes bedeuteten.",
            "die symptome: hohe klicks, null demos. die ctr war okay, aber die bounce rate lag bei 90%. der pain point: \"wir wissen, dass deutschland ein riesiger markt für uns ist, aber unser cost per lead (cpl) ist 4x höher als in uk.\"",
          ],
        },
        solution: {
          title: "der lösungsansatz",
          content: [
            "deutsche b2b-käufer sind skeptisch. sie klicken nicht auf \"amazing software! buy now!\" ads. sie klicken auf präzise, lösungsorientierte technische copy.",
            "die strategie: ein komplettes \"cultural audit\" des accounts. wir wechselten von generischen \"broad match\" keywords zu hochspezifischer \"german engineering\" style copy.",
            "der pivot: wir stoppten das bieten auf generische begriffe wie \"logistik software\" (zu breit) und fokussierten auf long-tail \"problem-aware\" keywords wie \"tourenplanung software mittelstand\".",
            "ich analysierte den search terms report und fand drei budget-lecks: false friends (englische branchenbegriffe, die deutsche anders verwenden), das \"du\" vs. \"sie\" problem (ihre ads verwendeten das lockere \"du\", was für konservative deutsche logistik-manager respektlos wirkte), und broad match chaos (google matchte ihre ads auf consumer-level anfragen statt b2b enterprise suchen).",
          ],
        },
        results: {
          title: "die ergebnisse",
          content: [
            "die kampagne wurde vom geld-grab zum effizientesten kanal in europa.",
            "lead qualität: das sales team berichtete, dass leads endlich \"qualifiziert\" waren — echte entscheider statt studenten oder wettbewerber. cost per lead wurde halbiert bei gleichbleibendem volumen.",
            "ctr-anstieg: durch verwendung der korrekten deutschen terminologie stieg der ad relevance score, was den cpc senkte. €4k monatlich gespart allein durch die robuste negative keyword liste.",
          ],
        },
        services: [
          "google ads account audit",
          "negative keyword strategie",
          "kulturelle copy-anpassung",
          "conversion tracking cleanup",
          "landing page optimierung",
          "dach-markt expansion",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
    },
    cta: {
      label: "ähnliches projekt besprechen",
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
        title: "the \"black box\" rescue",
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
        hero: "an e-commerce fashion store recovered its \"lost\" conversion visibility — gdpr compliant and future-proof.",
        problem: {
          title: "the challenge",
          content: [
            "the client came with a panic-inducing problem: \"our google ads dashboard says we have 0 conversions, but the shop system shows sales.\"",
            "after the eu privacy regulations tightened (dma), their previous tracking setup collapsed. they were spending €5,000/month on ads but had effectively lost their \"vision\" — flying blind.",
            "google ads conversion tracking dropped to near zero. ga4 data didn't match shopify backend data (40% discrepancy). and: the cookie banner didn't actually block scripts — a gdpr risk.",
          ],
        },
        solution: {
          title: "the approach",
          content: [
            "instead of a \"quick patch,\" i proposed a \"clean slate\" architecture. we didn't just want to fix the numbers — we needed a setup that was legal (gdpr) and durable for the future.",
            "the strategy: implement google consent mode v2. this allows google tags to adjust their behavior based on user consent, recovering \"lost\" modeling data without violating privacy laws.",
            "before touching a single tag, i ran a deep-dive audit. the finding: the previous agency had \"hard-coded\" pixels directly into the theme code and added them in gtm. result: double-counting when it worked, total failure when the cookie banner loaded.",
            "the gtm container was a mess of 50+ unused triggers. it needed a total purge.",
          ],
        },
        results: {
          title: "the results",
          content: [
            "the impact was immediate. within 48 hours of deploying the new container: google ads started reporting conversions again.",
            "smart bidding was activated — because the algorithm finally received data, the cost per acquisition (cpa) stabilized.",
            "the client passed their internal gdpr compliance check with 100% scores. the cookie configuration was verified: non-essential scripts are blocked until consent is given.",
          ],
        },
        services: [
          "tracking audit & error analysis",
          "gtm container restructuring",
          "consent mode v2 setup",
          "cookiebot integration",
          "enhanced conversions setup",
          "debugging & validation",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      "local-seo-dental": {
        slug: "local-seo-dental",
        title: "the \"invisible\" dentist",
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
        hero: "a highly qualified dental practice went from local invisibility to top-3 presence in the google map pack — with real patients, not just traffic.",
        problem: {
          title: "the challenge",
          content: [
            "the client was a highly experienced dentist with a modern clinic, yet their appointment book had gaps.",
            "the problem: when patients searched for \"zahnarzt minden\" or high-value terms like \"dental implants,\" the clinic was nowhere to be found in the local map pack.",
            "aggressive dental chains dominated the top 3 spots — despite having lower patient satisfaction scores. the pain point: \"we have the best technology, but new patients are walking into the clinic down the street because they rank #1 on google maps.\"",
          ],
        },
        solution: {
          title: "the approach",
          content: [
            "we didn't need to rank for \"dentist germany.\" we needed to dominate a 10km radius.",
            "the strategy: a \"hyper-local\" offensive. we shifted focus from generic keywords to high-intent, location-based queries (e.g., \"emergency dentist [city]\").",
            "using ahrefs and screaming frog, i identified three critical issues: nap chaos (name, address, phone varied across 15 directories), thin content (high-margin services like implants were buried in a generic \"services\" list), and missing localbusiness + medicalwebpage schema markup.",
            "phase 1 was technical hygiene: verify gbp, standardize nap, implement json-ld schema. phase 2 was content: dedicated landing pages for priority treatments. phase 3 was the \"review ecosystem\" with qr code and follow-up sms.",
          ],
        },
        results: {
          title: "the results",
          content: [
            "the campaign didn't just bring \"traffic\" — it brought patients.",
            "map pack domination: the clinic now consistently ranks in the top 3 for \"zahnarzt [city]\" and \"zahnreinigung.\" the new landing pages rank for specific, high-cost treatments.",
            "phone volume: we tracked calls via the gbp dashboard, seeing a clear upward trend of +48% within 4 months. conversion quality: patients looking for expensive procedures, not just check-ups.",
          ],
        },
        services: [
          "local seo strategy",
          "google business profile optimization",
          "schema.org markup implementation",
          "content & landing page creation",
          "nap audit & citations",
          "review management system",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
      "google-ads-dach": {
        slug: "google-ads-dach",
        title: "the \"lost in translation\" fix",
        subtitle: "google ads rescue & dach market expansion for b2b saas",
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
        hero: "an international software company transformed its germany campaign from a money pit to the most efficient channel in europe — through cultural adaptation, not just translation.",
        problem: {
          title: "the challenge",
          content: [
            "an international software company was trying to break into the german market. they had simply translated their us campaigns into german using automated tools.",
            "the problem: they were burning budget on keywords that looked right but meant something else to a native speaker.",
            "the symptoms: high clicks, zero demos. the ctr was decent, but the bounce rate was 90%. the pain point: \"we know germany is a huge market for us, but our cost per lead (cpl) is 4x higher than in the uk.\"",
          ],
        },
        solution: {
          title: "the approach",
          content: [
            "german b2b buyers are skeptical. they don't click on \"amazing software! buy now!\" ads. they click on precise, solution-oriented technical copy.",
            "the strategy: a complete \"cultural audit\" of the account. we moved from generic \"broad match\" keywords to highly specific \"german engineering\" style copy.",
            "the pivot: we stopped bidding on generic terms like \"logistik software\" (too broad) and focused on long-tail \"problem-aware\" keywords like \"tourenplanung software mittelstand\" (route planning software for smes).",
            "i analyzed their search terms report and found three budget leaks: false friends (english industry terms germans use differently), the \"du\" vs. \"sie\" trap (their ads used casual \"du\" which felt disrespectful to conservative german logistics managers), and broad match chaos (google matched their ads to consumer-level queries instead of b2b enterprise searches).",
          ],
        },
        results: {
          title: "the results",
          content: [
            "the campaign went from a money pit to their most efficient channel in europe.",
            "lead quality: the sales team reported that leads were finally \"qualified\" — actual decision-makers rather than students or competitors. cost per lead was cut in half while maintaining the same volume.",
            "ctr spike: by using the correct german terminology, the ad relevance score went up, lowering the cpc. €4k saved monthly just from the robust negative keyword list.",
          ],
        },
        services: [
          "google ads account audit",
          "negative keyword strategy",
          "cultural copy adaptation",
          "conversion tracking cleanup",
          "landing page optimization",
          "dach market expansion",
        ],
        quote: null,
        quoteAuthor: null,
        quoteRole: null,
      },
    },
    cta: {
      label: "discuss a similar project",
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
