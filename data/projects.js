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
      "stimul-sport-resort": {
        slug: "stimul-sport-resort",
        title: "von bauchgefühl zu buchungsmaschine",
        subtitle: "wie datengetriebenes marketing +70% buchungswachstum ermöglichte",
        tags: ["paid social", "crm", "analytics", "team leadership", "hubspot", "event marketing"],
        client: "stimul sport resort",
        industry: "tourismus & hospitality",
        period: "2015–2022",
        location: "feodosiya, ukraine",
        metrics: [
          { value: 70, suffix: "%", label: "mehr buchungen yoy" },
          { value: 3, suffix: "", label: "team-mitglieder geführt" },
          { value: 100, suffix: "%", label: "attribution erreicht" },
        ],
        hero: "ein 150-zimmer sport-resort transformierte sein marketing von bauchgefühl-entscheidungen zu einer datengetriebenen buchungsmaschine.",
        problem: {
          title: "die herausforderung",
          content: [
            "das stimul sport resort — ein etabliertes 150-zimmer-resort mit sportanlagen — kämpfte mit stagnierendem wachstum trotz steigender werbeausgaben.",
            "das kernproblem: marketing-entscheidungen basierten auf intuition statt auf daten. werbebudgets wurden über verschiedene kanäle verteilt, ohne zu wissen, welche kampagnen tatsächlich zu buchungen führten.",
            "es gab kein end-to-end-tracking, keine klare zuordnung von marketing-aktivitäten zu umsatz, und keine systematische optimierung der kampagnen. das team arbeitete reaktiv statt strategisch.",
          ],
        },
        solution: {
          title: "der lösungsansatz",
          content: [
            "der erste schritt war die implementierung eines vollständigen tracking-systems. zum ersten mal konnten wir jeden touchpoint der customer journey messen — vom ersten anzeigenklick bis zur finalen buchung.",
            "parallel dazu wurde hubspot als crm eingeführt, um leads systematisch zu erfassen, zu qualifizieren und zu betreuen. automatisierte e-mail-sequenzen übernahmen die nachverfolgung von anfragen.",
            "die paid-social-strategie wurde komplett neu aufgesetzt: statt breiter streuung fokussierten wir auf datengetriebene zielgruppen-segmentierung und kontinuierliche a/b-tests.",
            "um die wachsende komplexität zu bewältigen, baute ich ein marketing-team von 3 mitarbeitern auf und etablierte klare prozesse für kampagnen-management und reporting.",
          ],
        },
        results: {
          title: "die ergebnisse",
          content: [
            "innerhalb eines jahres stiegen die buchungen um 70% im vergleich zum vorjahr. zum ersten mal konnte das management genau sehen, welcher marketing-euro welchen return generierte.",
            "das crm-system reduzierte die reaktionszeit auf anfragen von tagen auf stunden. die automatisierten follow-up-sequenzen erhöhten die conversion-rate von leads zu buchungen signifikant.",
            "das aufgebaute team arbeitet heute eigenständig nach den etablierten prozessen. die marketing-strategie ist skalierbar und datengetrieben — keine bauchgefühl-entscheidungen mehr.",
          ],
        },
        services: [
          "paid social strategie & management",
          "hubspot crm implementierung",
          "marketing automation",
          "conversion tracking setup",
          "team aufbau & führung",
          "event marketing",
        ],
        quote: "+70% buchungen in einem jahr sprechen für sich. aber was ihn wirklich auszeichnet: er denkt unternehmerisch, nicht nur in kampagnen. er hat ein team aufgebaut, prozesse etabliert und immer das große ganze im blick behalten. einer der besten leute, mit denen ich je gearbeitet habe.",
        quoteAuthor: "uriyi litkovskyi",
        quoteRole: "geschäftsführer, stimul sport resort",
      },
      "sunny-bay-hotel": {
        slug: "sunny-bay-hotel",
        title: "von null zur nummer 1",
        subtitle: "aufbau der ersten digitalen marketing-infrastruktur eines hotels",
        tags: ["seo", "social media", "tracking", "infrastruktur", "content", "schulung"],
        client: "sunny bay hotel",
        industry: "tourismus & hospitality",
        period: "2009–2015",
        location: "feodosiya, ukraine",
        metrics: [
          { value: 35, suffix: "%", label: "mehr website-traffic" },
          { value: 20, suffix: "%", label: "umsatzsteigerung" },
          { value: 1, suffix: ".", label: "digitale infrastruktur" },
        ],
        hero: "ein traditionsreiches hotel wurde von online-unsichtbarkeit zum digitalen vorreiter in seiner region — der startpunkt meiner marketing-karriere.",
        problem: {
          title: "die herausforderung",
          content: [
            "das sunny bay hotel — ein etabliertes haus mit langer tradition — existierte online praktisch nicht. keine seo-optimierte website, keine social-media-präsenz, kein tracking.",
            "potenzielle gäste, die nach unterkünften in der region suchten, fanden ausschließlich den wettbewerb. das hotel verließ sich vollständig auf offline-kanäle und stammgäste.",
            "die digitale transformation der branche hatte bereits begonnen, aber das hotel hatte keine expertise und keine infrastruktur, um mitzuhalten.",
          ],
        },
        solution: {
          title: "der lösungsansatz",
          content: [
            "als erstes wurde die website technisch und inhaltlich für suchmaschinen optimiert. keyword-recherche identifizierte die suchbegriffe, mit denen potenzielle gäste nach unterkünften suchten.",
            "parallel dazu wurden social-media-kanäle aufgebaut und mit regelmäßigem, relevantem content bespielt. das ziel: nicht nur reichweite, sondern engagement und buchungsanfragen.",
            "erstmalig wurde conversion-tracking implementiert. wir konnten nun messen, welche marketing-aktivitäten zu konkreten anfragen und buchungen führten.",
            "ein wichtiger teil war die schulung des hotel-teams in den grundlagen des online-marketings, damit die arbeit nachhaltig weitergeführt werden konnte.",
          ],
        },
        results: {
          title: "die ergebnisse",
          content: [
            "innerhalb von zwei jahren stieg der organische website-traffic um 35%. das hotel erschien nun bei relevanten suchanfragen auf den vorderen positionen.",
            "die social-media-präsenz und gezielten kampagnen führten zu 20% umsatzwachstum. erstmals kamen buchungsanfragen messbar über digitale kanäle.",
            "das hotel hatte nun eine funktionierende digitale marketing-infrastruktur — die basis für weiteres wachstum. diese erfahrung war der grundstein für meine weitere karriere im performance marketing.",
          ],
        },
        services: [
          "technische seo-optimierung",
          "content-strategie & erstellung",
          "social media management",
          "conversion tracking setup",
          "team-schulung",
          "reporting & analyse",
        ],
        quote: "andrii kam zu uns, als wir online praktisch unsichtbar waren. er hat von null angefangen — seo, social media, das erste richtige tracking. nach zwei jahren hatten wir 35% mehr website-traffic und einen messbaren umsatzanstieg. aber was mich am meisten beeindruckt hat: er hat nie aufgehört zu lernen und hat jeden prozess hinterfragt, bis er funktioniert hat.",
        quoteAuthor: "helena warlamova",
        quoteRole: "geschäftsführerin, sunny bay hotel",
      },
      "lokale-kmu": {
        slug: "lokale-kmu",
        title: "lokale sichtbarkeit für kmu",
        subtitle: "maßgeschneiderte digital-strategien für praxen, handwerker und dienstleister",
        tags: ["google ads", "local seo", "landing pages", "web analytics", "reporting", "beratung"],
        client: "praxen & handwerker",
        industry: "lokale dienstleister",
        period: "2022–heute",
        location: "owl, deutschland",
        metrics: [
          { value: 90, suffix: "%", label: "der kunden suchen online" },
          { value: 30, suffix: "%", label: "finden ärzte über google" },
          { value: 100, suffix: "%", label: "transparenz im reporting" },
        ],
        hero: "lokale unternehmen in deutschland erreichen ihre kunden dort, wo sie heute suchen — online, lokal, messbar.",
        problem: {
          title: "die herausforderung",
          content: [
            "90% der kunden recherchieren heute online, bevor sie einen handwerker kontaktieren oder einen arzttermin buchen. 30% der patienten finden ihren arzt über google.",
            "viele lokale unternehmen — von der zahnarztpraxis bis zum elektrikerbetrieb — sind online unsichtbar oder investieren in marketing ohne messbare ergebnisse.",
            "die herausforderung: begrenztes budget, wenig zeit, keine marketing-expertise im haus. und gleichzeitig der druck, digital nicht den anschluss zu verlieren.",
          ],
        },
        solution: {
          title: "der lösungsansatz",
          content: [
            "jedes projekt beginnt mit einer analyse: wo steht das unternehmen? wo suchen die kunden? welche wettbewerber sind bereits sichtbar?",
            "google ads mit präzisem geo-targeting sorgen für sofortige sichtbarkeit bei relevanten suchanfragen. 'zahnarzt bielefeld' oder 'elektriker minden' — genau dort, wo kunden aktiv suchen.",
            "parallel dazu wird local seo aufgebaut: google business profil, lokale verzeichnisse, website-optimierung für standortbezogene suchen. das schafft nachhaltige organische präsenz.",
            "landing pages werden auf conversion optimiert — nicht nur besucher, sondern anfragen und termine. und: monatliches reporting zeigt transparent, was funktioniert.",
          ],
        },
        results: {
          title: "der ansatz",
          content: [
            "lokale unternehmen erreichen ihre zielgruppe genau dort, wo sie suchen. keine streuverluste, keine blackbox.",
            "die kombination aus bezahlter werbung für schnelle ergebnisse und organischer optimierung für nachhaltigkeit schafft stabile lead-quellen.",
            "jeder marketing-euro ist nachvollziehbar. monatliche reports zeigen: was wurde gemacht, was hat es gebracht, was sind die nächsten schritte.",
            "beratung auf augenhöhe — keine komplizierten konzepte, sondern pragmatische lösungen, die zum alltag eines kleinen unternehmens passen.",
          ],
        },
        services: [
          "google ads management",
          "local seo optimierung",
          "landing page erstellung",
          "google business profil",
          "web analytics setup",
          "monatliches reporting",
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
      "stimul-sport-resort": {
        slug: "stimul-sport-resort",
        title: "from gut feeling to booking machine",
        subtitle: "how data-driven marketing enabled +70% booking growth",
        tags: ["paid social", "crm", "analytics", "team leadership", "hubspot", "event marketing"],
        client: "stimul sport resort",
        industry: "tourism & hospitality",
        period: "2015–2022",
        location: "feodosiya, ukraine",
        metrics: [
          { value: 70, suffix: "%", label: "more bookings yoy" },
          { value: 3, suffix: "", label: "team members led" },
          { value: 100, suffix: "%", label: "attribution achieved" },
        ],
        hero: "a 150-room sport resort transformed its marketing from gut-feeling decisions to a data-driven booking machine.",
        problem: {
          title: "the challenge",
          content: [
            "stimul sport resort — an established 150-room resort with sports facilities — was struggling with stagnant growth despite increasing ad spend.",
            "the core problem: marketing decisions were based on intuition rather than data. ad budgets were spread across channels without knowing which campaigns actually drove bookings.",
            "there was no end-to-end tracking, no clear attribution of marketing activities to revenue, and no systematic campaign optimization. the team worked reactively rather than strategically.",
          ],
        },
        solution: {
          title: "the approach",
          content: [
            "the first step was implementing a complete tracking system. for the first time, we could measure every touchpoint of the customer journey — from first ad click to final booking.",
            "in parallel, hubspot was introduced as crm to systematically capture, qualify, and nurture leads. automated email sequences took over inquiry follow-up.",
            "the paid social strategy was completely rebuilt: instead of broad distribution, we focused on data-driven audience segmentation and continuous a/b testing.",
            "to manage the growing complexity, i built a marketing team of 3 employees and established clear processes for campaign management and reporting.",
          ],
        },
        results: {
          title: "the results",
          content: [
            "within one year, bookings increased by 70% compared to the previous year. for the first time, management could see exactly which marketing euro generated which return.",
            "the crm system reduced response time to inquiries from days to hours. automated follow-up sequences significantly increased the conversion rate from leads to bookings.",
            "the team i built now works independently according to established processes. the marketing strategy is scalable and data-driven — no more gut-feeling decisions.",
          ],
        },
        services: [
          "paid social strategy & management",
          "hubspot crm implementation",
          "marketing automation",
          "conversion tracking setup",
          "team building & leadership",
          "event marketing",
        ],
        quote: "+70% bookings in one year speaks for itself. but what really sets him apart: he thinks like an entrepreneur, not just in campaigns. he built a team, established processes, and always kept the big picture in mind. one of the best people i've ever worked with.",
        quoteAuthor: "uriyi litkovskyi",
        quoteRole: "ceo, stimul sport resort",
      },
      "sunny-bay-hotel": {
        slug: "sunny-bay-hotel",
        title: "from zero to number one",
        subtitle: "building a hotel's first digital marketing infrastructure",
        tags: ["seo", "social media", "tracking", "infrastructure", "content", "training"],
        client: "sunny bay hotel",
        industry: "tourism & hospitality",
        period: "2009–2015",
        location: "feodosiya, ukraine",
        metrics: [
          { value: 35, suffix: "%", label: "more website traffic" },
          { value: 20, suffix: "%", label: "revenue growth" },
          { value: 1, suffix: "st", label: "digital infrastructure" },
        ],
        hero: "a traditional hotel went from online invisibility to digital leader in its region — the starting point of my marketing career.",
        problem: {
          title: "the challenge",
          content: [
            "sunny bay hotel — an established property with a long tradition — practically didn't exist online. no seo-optimized website, no social media presence, no tracking.",
            "potential guests searching for accommodations in the region found only competitors. the hotel relied entirely on offline channels and repeat guests.",
            "the digital transformation of the industry had already begun, but the hotel had no expertise and no infrastructure to keep up.",
          ],
        },
        solution: {
          title: "the approach",
          content: [
            "first, the website was optimized technically and content-wise for search engines. keyword research identified the search terms potential guests used to look for accommodations.",
            "in parallel, social media channels were built and filled with regular, relevant content. the goal: not just reach, but engagement and booking inquiries.",
            "for the first time, conversion tracking was implemented. we could now measure which marketing activities led to concrete inquiries and bookings.",
            "an important part was training the hotel team in online marketing fundamentals so the work could be sustained long-term.",
          ],
        },
        results: {
          title: "the results",
          content: [
            "within two years, organic website traffic increased by 35%. the hotel now appeared in top positions for relevant search queries.",
            "social media presence and targeted campaigns led to 20% revenue growth. for the first time, booking inquiries came measurably through digital channels.",
            "the hotel now had a functioning digital marketing infrastructure — the foundation for further growth. this experience laid the groundwork for my further career in performance marketing.",
          ],
        },
        services: [
          "technical seo optimization",
          "content strategy & creation",
          "social media management",
          "conversion tracking setup",
          "team training",
          "reporting & analysis",
        ],
        quote: "andrii joined us when we were practically invisible online. he started from scratch — seo, social media, the first real tracking setup. two years later, we had 35% more website traffic and measurable revenue growth. but what impressed me most: he never stopped learning and questioned every process until it worked.",
        quoteAuthor: "helena warlamova",
        quoteRole: "ceo, sunny bay hotel",
      },
      "lokale-kmu": {
        slug: "lokale-kmu",
        title: "local visibility for smes",
        subtitle: "tailored digital strategies for practices, tradespeople, and service providers",
        tags: ["google ads", "local seo", "landing pages", "web analytics", "reporting", "consulting"],
        client: "practices & tradespeople",
        industry: "local service providers",
        period: "2022–today",
        location: "owl, germany",
        metrics: [
          { value: 90, suffix: "%", label: "of customers search online" },
          { value: 30, suffix: "%", label: "find doctors via google" },
          { value: 100, suffix: "%", label: "transparency in reporting" },
        ],
        hero: "local businesses in germany reach their customers where they search today — online, local, measurable.",
        problem: {
          title: "the challenge",
          content: [
            "90% of customers research online today before contacting a tradesperson or booking a doctor's appointment. 30% of patients find their doctor through google.",
            "many local businesses — from dental practices to electrician shops — are invisible online or invest in marketing without measurable results.",
            "the challenge: limited budget, little time, no in-house marketing expertise. and at the same time, pressure not to fall behind digitally.",
          ],
        },
        solution: {
          title: "the approach",
          content: [
            "every project starts with analysis: where does the business stand? where do customers search? which competitors are already visible?",
            "google ads with precise geo-targeting ensure immediate visibility for relevant search queries. 'dentist bielefeld' or 'electrician minden' — exactly where customers actively search.",
            "in parallel, local seo is built: google business profile, local directories, website optimization for location-based searches. this creates sustainable organic presence.",
            "landing pages are optimized for conversion — not just visitors, but inquiries and appointments. and: monthly reporting transparently shows what works.",
          ],
        },
        results: {
          title: "the approach",
          content: [
            "local businesses reach their target audience exactly where they search. no wastage, no black box.",
            "the combination of paid advertising for quick results and organic optimization for sustainability creates stable lead sources.",
            "every marketing euro is traceable. monthly reports show: what was done, what it achieved, what are the next steps.",
            "consulting at eye level — no complicated concepts, but pragmatic solutions that fit the daily life of a small business.",
          ],
        },
        services: [
          "google ads management",
          "local seo optimization",
          "landing page creation",
          "google business profile",
          "web analytics setup",
          "monthly reporting",
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
