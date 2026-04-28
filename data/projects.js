// Super-Workflow Projects - Production-Ready Automation Systems

export const PROJECTS_DATA = {
  de: {
    backToProjects: "alle projekte",
    industryLabel: "branche",
    clientLabel: "zielgruppe",
    periodLabel: "implementierung",
    problemLabel: "herausforderung",
    solutionLabel: "lösung",
    resultsLabel: "ergebnisse",
    servicesLabel: "module",
    technologyLabel: "technologie-stack",
    phasesLabel: "implementierungs-phasen",
    pricingLabel: "preise",
    faqLabel: "häufige fragen",
    keyResults: "kernresultate",
    nextProject: "nächstes projekt",
    prevProject: "vorheriges projekt",
    statusLabel: "status",
    roiLabel: "roi",
    timelineLabel: "timeline",

    projects: {
      "autonomous-sales-agent": {
        slug: "autonomous-sales-agent",
        title: "autonomous sales agent: zero lost leads",
        subtitle: "end-to-end sales automation from lead capture to conversion",
        category: "control-center",
        tags: ["n8n", "crm", "email automation", "lead scoring", "postgresql", "hubspot", "pipedrive"],
        industry: "b2b saas, professional services, agencies",
        implementation: "6-8 wochen",
        status: "✅ Production Ready",

        metrics: [
          { value: 98, suffix: "%", label: "schnellere reaktion (6h → 4min)" },
          { value: 86, suffix: "%", label: "reduktion verlorener leads" },
          { value: 325, suffix: "%", label: "mehr gebuchte meetings" },
        ],

        hero: "die meisten smbs verlieren 30-40% ihrer inbound leads weil follow-up manuell und langsam ist. dieser super-workflow erfasst jeden lead, scored ihn sofort und führt personalisierte outreach-sequenzen automatisch durch—rettet €47k+ verlorenen umsatz pro quartal.",

        challenge: {
          title: "das problem",
          content: [
            "35-40% der inbound leads werden nie nachverfolgt (verlorener umsatz: €5-15k/monat)",
            "sales teams verbringen 15+ stunden/woche mit manuellem crm-eintrag und pipeline-updates",
            "lead-reaktionszeit durchschnittlich 6 stunden (sollte <10 minuten für hot leads sein)",
            "keine sichtbarkeit über pipeline-gesundheit oder gestockte deals bis es zu spät ist"
          ]
        },

        solution: {
          title: "die automation-lösung",
          content: [
            "Lead Hunter Workflow: erfasst leads von google maps, linkedin, website-formularen, empfehlungen → speichert in postgresql mit anreicherungsdaten",
            "Lead Enricher Workflow: reichert mit firmographics (firmengröße, industrie, standort), technographics (tech stack), engagement-signalen an → vergibt score 0-100",
            "Auto Outreach Workflow: hot leads (70+) bekommen 4-email aggressive sequenz über 10 tage. warm leads (40-69) bekommen 4-email geduldige sequenz über 6 wochen. personalisiert mit {{firstName}}, {{companyName}}, {{observation}}",
            "Sales Prep Workflow: fasst calls zusammen, generiert proposals, synct stripe-zahlungen → pipedrive/hubspot deals",
            "Deal Tracker Workflow: alarmiert bei gestockten deals (7-14+ tage keine aktivität), aktualisiert pipeline-stadien automatisch, erstellt next-action tasks",
            "Dashboard Refresh Workflow: stündliche refresh des looker studio dashboards mit 10 kpis, funnel-visualisierung, email-performance"
          ]
        },

        results: {
          title: "typische kunden-resultate (6 monate)",
          content: [
            "Lead-reaktionszeit: 6 stunden → 4 minuten (98% schneller)",
            "Verlorene leads: 35% → <5% (86% reduktion)",
            "Meetings/monat: 8 → 34 (+325% steigerung)",
            "Admin-stunden/woche: 15 → 1,5 (90% zeitersparnis)",
            "Pipeline-wert: €45k → €127k (+182% wachstum)",
            "Close rate: 15% → 24% (+60% verbesserung)",
            "ROI: 3,680% über 6 monate | Payback: 5 tage"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/monat", description: "6 interconnected workflows" },
          database: { name: "PostgreSQL 14+", cost: "€0-30/monat", description: "4 core tables mit materialized views" },
          crm: { name: "HubSpot / Pipedrive", cost: "€0-45/monat", description: "deal pipeline + custom properties" },
          email: { name: "Brevo / SendGrid", cost: "€0-25/monat", description: "email sequenzen mit tracking" },
          analytics: { name: "Looker Studio", cost: "€0/monat", description: "real-time sales dashboard" },
          alerts: { name: "Slack", cost: "€0/monat", description: "critical notifications" }
        },

        phases: [
          {
            phase: 1,
            title: "Architektur-Design",
            timeline: "Woche 1-2",
            deliverables: [
              "complete n8n workflow architecture (6 workflows dokumentiert)",
              "postgresql database schema (4 tables mit indexes)",
              "lead scoring model (0-100 scale mit weights)",
              "integration architecture diagram"
            ]
          },
          {
            phase: 2,
            title: "CRM Setup",
            timeline: "Woche 2-3",
            deliverables: [
              "hubspot oder pipedrive configuration (custom properties + pipeline)",
              "api credentials und webhook setup",
              "bi-directional sync workflow (postgresql ↔ crm)",
              "deduplication logic"
            ]
          },
          {
            phase: 3,
            title: "Email Sequenzen",
            timeline: "Woche 3-4",
            deliverables: [
              "hot outreach sequenz (4 emails, 10-tage timeline, 18-25% reply rate)",
              "warm nurture sequenz (4 emails, 6-wochen timeline, 30-50% engagement)",
              "personalization logic (dynamic observations based on firmographics)",
              "a/b test subject line variants"
            ]
          },
          {
            phase: 4,
            title: "Dashboard & Analytics",
            timeline: "Woche 4-5",
            deliverables: [
              "looker studio dashboard (10 kpi scorecards, funnel, performance charts)",
              "postgresql materialized views (optimiert für dashboard queries)",
              "hourly auto-refresh workflow (n8n triggers + error alerts)",
              "slack notifications für critical events"
            ]
          },
          {
            phase: 5,
            title: "Testing & Launch",
            timeline: "Woche 5-6",
            deliverables: [
              "end-to-end workflow testing (100 test leads)",
              "sales team training (4-stunden session: system overview + crm updates)",
              "documentation handover (architecture + maintenance guide)",
              "30-tage optimization support"
            ]
          }
        ],

        pricing: {
          setup: {
            starter: "€2.500-€5.000",
            professional: "€7.500-€12.000",
            enterprise: "€15.000-€25.000"
          },
          monthly: {
            tools: "€0-€200/monat",
            breakdown: "n8n (€0-100) + crm (€0-45) + email (€0-25) + database (€0-30)"
          }
        },

        faq: [
          {
            question: "Wie lange dauert die implementierung?",
            answer: "6-8 wochen für komplettes deployment. du kannst mit basic automation (lead enricher + email sequenzen) in 2-3 wochen starten."
          },
          {
            question: "Brauche ich technische kenntnisse?",
            answer: "grundlegende technische kenntnisse empfohlen (sql, apis, n8n). wenn du mit zapier oder make.com umgehen kannst, schaffst du das. ansonsten hire einen freelancer für setup (budget €3-5k) oder wähle unsere professional/enterprise pakete mit full implementation."
          },
          {
            question: "Was wenn ich kein crm habe?",
            answer: "wir setzen hubspot free (€0/monat, ausreichend für 100-500 leads) oder pipedrive essential (€14/monat) auf. du kannst später upgraden wenn nötig."
          }
        ],

        relatedSolution: "control-center",
        relatedProjects: ["lifecycle-guardian", "administration-droid"],
      },

      "lifecycle-guardian": {
        slug: "lifecycle-guardian",
        title: "lifecycle guardian: customer retention automation",
        subtitle: "predictive churn prevention and expansion revenue engine",
        category: "control-center",
        tags: ["customer success", "churn prevention", "health scoring", "onboarding", "upsell", "hubspot"],
        industry: "saas, subscription businesses, membership platforms",
        implementation: "6-8 wochen",
        status: "✅ Production Ready",

        metrics: [
          { value: 67, suffix: "%", label: "onboarding completion increase (60% → 100%)" },
          { value: 53, suffix: "%", label: "churn reduction (15% → 7%)" },
          { value: 240, suffix: "%", label: "expansion mrr increase" },
        ],

        hero: "die meisten saas businesses verlieren 10-20% mrr jährlich an churn. customer success teams verbringen 80% der zeit mit firefighting at-risk accounts statt expansion zu treiben. onboarding ist manuell, health scoring ist raterei, und churn passiert bevor du es siehst.",

        challenge: {
          title: "das problem",
          content: [
            "onboarding completion rate 60% (40% kunden aktivieren sich nie richtig)",
            "churn wird zu spät erkannt (durchschnittlich 2-3 monate nach problem-beginn)",
            "customer success teams reaktiv statt proaktiv (keine zeit für expansion)",
            "health score basiert auf bauchgefühl statt echten daten"
          ]
        },

        solution: {
          title: "die automation-lösung",
          content: [
            "customer onboarding (7-email sequenzen, task completion tracking)",
            "health score calculator (0-100 score based on usage, engagement, support, payment)",
            "churn prevention engine (automated retention campaigns 30-45 tage vor cancellation)",
            "upsell detector (expansion opportunities based on usage patterns)",
            "offboarding manager (exit surveys + win-back campaigns)",
            "dashboard (real-time health scores, churn risk, expansion pipeline)"
          ]
        },

        results: {
          title: "typische kunden-resultate",
          content: [
            "onboarding completion: 60% → 100%",
            "time to onboard: 12 tage → 4 tage",
            "churn rate: 15% → 7%",
            "at-risk recovery: 0% → 50%",
            "upsell conversion: 0% → 20%",
            "csm hours/week: 15 → 1,5",
            "net revenue retention: 85% → 115%"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/monat", description: "7 workflows" },
          database: { name: "PostgreSQL", cost: "€0-30/monat", description: "7 tables, health score formula" },
          crm: { name: "HubSpot", cost: "€45/monat", description: "45+ custom properties" },
          payment: { name: "Stripe", cost: "1,5% + €0,25", description: "webhooks für payment events" },
          support: { name: "Zendesk/Intercom", cost: "€49-79/monat", description: "ticket data" },
          email: { name: "Brevo", cost: "€25/monat", description: "retention campaigns" }
        },

        phases: [
          {
            phase: 1,
            title: "Architecture & Database",
            timeline: "Woche 1-2",
            deliverables: ["7 tables", "health score formula", "workflow design"]
          },
          {
            phase: 2,
            title: "Platform Setup",
            timeline: "Woche 2-3",
            deliverables: ["hubspot 45+ custom properties", "stripe webhooks"]
          },
          {
            phase: 3,
            title: "Email Templates",
            timeline: "Woche 3-4",
            deliverables: ["onboarding 7 emails", "retention 3 sequenzen"]
          },
          {
            phase: 4,
            title: "Dashboard",
            timeline: "Woche 4-5",
            deliverables: ["health scores", "churn risk table", "expansion pipeline"]
          },
          {
            phase: 5,
            title: "Testing & Training",
            timeline: "Woche 5-6",
            deliverables: ["csm team onboarding", "playbook documentation"]
          }
        ],

        pricing: {
          setup: {
            starter: "€3.500-€6.000",
            professional: "€9.000-€15.000",
            enterprise: "€18.000-€30.000"
          },
          monthly: {
            tools: "€120-€250/monat",
            breakdown: "n8n + hubspot + stripe + support + email"
          }
        },

        faq: [
          {
            question: "Was wenn ich nur 50 kunden habe?",
            answer: "roi skaliert runter bleibt aber positiv. mit 50 kunden bei €199 mrr: churn reduction €15k/jahr + upsell €5k/jahr + time savings €15k/jahr = €35k return vs €10k investment = 250% roi."
          }
        ],

        relatedSolution: "control-center",
        relatedProjects: ["autonomous-sales-agent", "administration-droid"],
      },

      "content-factory": {
        slug: "content-factory",
        title: "content factory: 3x content output, 80% less time",
        subtitle: "ai-powered content creation and multi-platform distribution",
        category: "growth-engine",
        tags: ["content automation", "ai content", "wordpress", "social media", "seo", "gpt-4"],
        industry: "content marketers, agencies, b2b saas, solopreneurs",
        implementation: "4-5 wochen",
        status: "✅ Production Ready",

        metrics: [
          { value: 200, suffix: "%", label: "content output increase (4 → 12 posts/monat)" },
          { value: 83, suffix: "%", label: "time saved (18h/woche → 3h/woche)" },
          { value: 243, suffix: "%", label: "organic traffic growth" },
        ],

        hero: "content marketing teams verbringen 18+ stunden/woche mit manuellem posting, cross-platform distribution und performance tracking. die meisten publizieren 2-4 blog posts/monat wenn sie 12+ brauchen. content liegt in google docs statt traffic, leads und revenue zu generieren.",

        challenge: {
          title: "das problem",
          content: [
            "content teams verbringen 18+ stunden/woche mit manuellem posting",
            "du publizierst 2-4 blog posts/monat aber brauchst 12+",
            "content liegt in google docs statt traffic/leads zu generieren",
            "cross-platform distribution ist manuell und zeitaufwendig"
          ]
        },

        solution: {
          title: "die automation-lösung",
          content: [
            "content ideation (youtube trends, google trends, keywords)",
            "content generator (gpt-4 blog posts 1,800-2,200 worte)",
            "multi-platform publisher (wordpress, linkedin, twitter, youtube, email)",
            "performance tracker (traffic, engagement, conversions)",
            "content repurposer (blog → video, video → carousel)",
            "optimization engine (seo updates für underperformer)"
          ]
        },

        results: {
          title: "typische kunden-resultate",
          content: [
            "blog posts/monat: 4 → 12",
            "social posts/monat: 20 → 60",
            "content creation time: 18h/woche → 3h/woche",
            "organic traffic: 3,500 → 12,000 visitors/monat",
            "lead conversions/monat: 25 → 85"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/monat", description: "6 workflows" },
          database: { name: "PostgreSQL", cost: "€0-30/monat", description: "content warehouse" },
          ai: { name: "OpenAI GPT-4 + DALL-E 3", cost: "€100-250/monat", description: "blog generation + images" },
          cms: { name: "WordPress", cost: "€5-25/monat", description: "blog platform" },
          social: { name: "LinkedIn + Twitter + YouTube APIs", cost: "€0/monat", description: "multi-platform" },
          email: { name: "Brevo", cost: "€25-50/monat", description: "newsletter automation" }
        },

        phases: [
          {
            phase: 1,
            title: "Architecture Design",
            timeline: "Woche 1",
            deliverables: ["6 workflows", "content scoring model", "database schema"]
          },
          {
            phase: 2,
            title: "Platform Setup",
            timeline: "Woche 2",
            deliverables: ["wordpress rest api", "social apis", "youtube api"]
          },
          {
            phase: 3,
            title: "Content Templates",
            timeline: "Woche 3",
            deliverables: ["blog prompts", "social prompts", "seo formulas"]
          },
          {
            phase: 4,
            title: "Performance Dashboard",
            timeline: "Woche 4",
            deliverables: ["looker studio dashboard", "roi tracking"]
          },
          {
            phase: 5,
            title: "Testing & Launch",
            timeline: "Woche 5",
            deliverables: ["qa testing", "first automated posts", "team training"]
          }
        ],

        pricing: {
          setup: {
            starter: "€3.000-€5.000",
            professional: "€7.000-€10.000",
            enterprise: "€12.000-€18.000"
          },
          monthly: {
            tools: "€150-400/monat",
            breakdown: "n8n + openai + wordpress + email + hosting"
          }
        },

        faq: [
          {
            question: "Was wenn der ai-generierte content nicht gut genug ist?",
            answer: "wir iterieren an prompts bis qualität 80-90% erreicht. inkludiere deine besten beispiele, spezifische instructions und unique insights in prompts."
          }
        ],

        relatedSolution: "growth-engine",
        relatedProjects: ["youtube-growth-loop"],
      },

      "market-pulse-dashboard": {
        slug: "market-pulse-dashboard",
        title: "market pulse dashboard: 24/7 competitive intelligence",
        subtitle: "automated competitor tracking, customer feedback & market trends",
        category: "intelligence-hub",
        tags: ["competitive intelligence", "market monitoring", "web scraping", "ai insights", "puppeteer"],
        industry: "all industries, especially b2b saas & ecommerce",
        implementation: "5-6 wochen",
        status: "✅ Production Ready",

        metrics: [
          { value: 92, suffix: "%", label: "weniger manuelle recherche (12h → 1h/woche)" },
          { value: 217, suffix: "%", label: "mehr erkannte wettbewerber-changes" },
          { value: 2, suffix: "tage", label: "bedrohungen erkennen (vs 4 wochen)" },
        ],

        hero: "die meisten smbs verbringen 10-15 stunden/woche mit manueller marktforschung und entdecken wettbewerber-changes trotzdem zu spät (4+ wochen). kundenfeedback liegt verstreut und wird nicht systematisch analysiert. strategische entscheidungen basieren auf bauchgefühl statt daten.",

        challenge: {
          title: "das problem",
          content: [
            "manuelle marktforschung kostet 10-15 stunden/woche",
            "wettbewerber-changes werden zu spät erkannt (4+ wochen)",
            "kundenfeedback liegt verstreut (reviews, tickets, social)",
            "strategische entscheidungen basieren auf bauchgefühl"
          ]
        },

        solution: {
          title: "die automation-lösung",
          content: [
            "competitor monitor (preise, produkte, hiring, website-changes)",
            "customer feedback aggregator (reviews, tickets, social, surveys)",
            "market trend analyzer (google trends, news, reddit)",
            "ai insight engine (gpt-4/claude strategic analysis)",
            "alert engine (critical events: price drops, launches, complaints)",
            "weekly digest generator (competitor + customer + market trends)"
          ]
        },

        results: {
          title: "typische kunden-resultate",
          content: [
            "manual research time: 12h/woche → 1h/woche (92% reduction)",
            "competitor changes detected: 30% → 95% (+217%)",
            "time to detect threats: 4 wochen → 2 tage (93% faster)",
            "strategic insights/monat: 2-3 → 12-15 (+400%)",
            "prevented competitive losses: €90k revenue saved (6 monate)"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/monat", description: "6 workflows" },
          database: { name: "PostgreSQL", cost: "€0-30/monat", description: "8 core tables" },
          scraping: { name: "Puppeteer/Apify", cost: "€0-50/monat", description: "competitor monitoring" },
          ai: { name: "OpenAI GPT-4 / Claude", cost: "€20-50/monat", description: "insight generation" },
          analytics: { name: "Looker Studio", cost: "€0/monat", description: "intelligence dashboards" }
        },

        phases: [
          {
            phase: 1,
            title: "Architecture & Database",
            timeline: "Woche 1-2",
            deliverables: ["6 workflows design", "postgresql schema"]
          },
          {
            phase: 2,
            title: "Monitoring Setup",
            timeline: "Woche 2-3",
            deliverables: ["competitor tracking", "review aggregation", "social listening"]
          },
          {
            phase: 3,
            title: "Alerts & Reports",
            timeline: "Woche 3-4",
            deliverables: ["critical alerts", "weekly digest", "ai insights"]
          },
          {
            phase: 4,
            title: "Intelligence Dashboard",
            timeline: "Woche 4-5",
            deliverables: ["looker studio dashboard (6 pages)", "materialized views"]
          },
          {
            phase: 5,
            title: "Testing & Launch",
            timeline: "Woche 5-6",
            deliverables: ["end-to-end testing", "team training (4h)"]
          }
        ],

        pricing: {
          setup: {
            starter: "€3.500-€6.000",
            professional: "€9.000-€15.000",
            enterprise: "€18.000-€30.000"
          },
          monthly: {
            tools: "€20-150/monat",
            breakdown: "n8n + postgresql + scraping + ai"
          }
        },

        faq: [
          {
            question: "Wie viele wettbewerber soll ich tracken?",
            answer: "start mit 5-7 direkten wettbewerbern. qualität > quantität. besser 5 intensiv überwachen als 20 oberflächlich."
          }
        ],

        relatedSolution: "intelligence-hub",
        relatedProjects: [],
      },

      "administration-droid": {
        slug: "administration-droid",
        title: "administration droid: automated back-office",
        subtitle: "invoice generation, contract management & payment tracking",
        category: "control-center",
        tags: ["invoicing", "contracts", "payments", "compliance", "quickbooks", "docusign"],
        industry: "agencies, professional services, saas",
        implementation: "6-8 wochen",
        status: "✅ Production Ready",

        metrics: [
          { value: 96, suffix: "%", label: "faster invoicing (45min → 2min)" },
          { value: 53, suffix: "%", label: "faster payment collection (45 → 21 tage)" },
          { value: 80, suffix: "%", label: "reduction in admin hours" },
        ],

        hero: "die meisten smbs verbringen 80+ stunden/monat mit manueller rechnungserstellung, vertragsmanagement und zahlungsverfolgung. late payments betragen 40% aller rechnungen. vertrags-renewals werden verpasst weil keine alerts existieren.",

        challenge: {
          title: "das problem",
          content: [
            "invoice creation time: 45 min/rechnung (zu langsam)",
            "manual admin hours/monat: 80 stunden",
            "payment collection time: 45 tage durchschnitt",
            "late payments: 40% aller rechnungen",
            "contract renewal misses: 8/jahr (lost revenue)"
          ]
        },

        solution: {
          title: "die automation-lösung",
          content: [
            "invoice generator (automatic von crm deals → quickbooks/xero)",
            "payment tracker (3-tage, 7-tage, 14-tage reminder sequenzen)",
            "contract manager (docusign automation, renewal alerts)",
            "receipt processor (ocr receipt processing + categorization)",
            "vendor manager (payment schedules + vendor reminders)",
            "financial dashboard (cash flow, ar aging, expense tracking)"
          ]
        },

        results: {
          title: "typische kunden-resultate",
          content: [
            "invoice creation time: 45min → 2min (96% faster)",
            "manual admin hours/monat: 80 → 16 (80% reduction)",
            "payment collection time: 45 → 21 tage (53% faster)",
            "late payments: 40% → 5% (88% reduction)",
            "contract renewal misses: 8/jahr → 0/jahr (100% prevention)"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/monat", description: "6 workflows" },
          database: { name: "PostgreSQL", cost: "€0-30/monat", description: "5 core tables" },
          accounting: { name: "QuickBooks/Xero", cost: "€15-45/monat", description: "invoice + accounting" },
          signature: { name: "DocuSign/PandaDoc", cost: "€19-25/monat", description: "e-signature" },
          ocr: { name: "Mindee/Taggun", cost: "€30-50/monat", description: "receipt processing" }
        },

        phases: [
          {
            phase: 1,
            title: "Architecture Design",
            timeline: "Woche 1-2",
            deliverables: ["6 workflows", "database schema"]
          },
          {
            phase: 2,
            title: "Platform Setup",
            timeline: "Woche 2-3",
            deliverables: ["quickbooks/xero", "docusign", "ocr setup"]
          },
          {
            phase: 3,
            title: "Document Templates",
            timeline: "Woche 3-4",
            deliverables: ["invoice template", "contract templates", "payment reminders"]
          },
          {
            phase: 4,
            title: "Financial Dashboard",
            timeline: "Woche 4-5",
            deliverables: ["looker studio dashboard", "ar aging", "cash flow forecast"]
          },
          {
            phase: 5,
            title: "Testing & Launch",
            timeline: "Woche 5-6",
            deliverables: ["qa testing", "finance team training"]
          }
        ],

        pricing: {
          setup: {
            starter: "€2.500-€5.000",
            professional: "€7.500-€12.000",
            enterprise: "€15.000-€25.000"
          },
          monthly: {
            tools: "€64-200/monat",
            breakdown: "n8n + accounting + signature + ocr"
          }
        },

        faq: [
          {
            question: "Was wenn ich bereits quickbooks nutze?",
            answer: "perfekt - dieses system integriert nativ mit quickbooks online. verbinde einfach via api (oauth2 authentication)."
          }
        ],

        relatedSolution: "control-center",
        relatedProjects: ["autonomous-sales-agent", "lifecycle-guardian"],
      },

      "youtube-growth-loop": {
        slug: "youtube-growth-loop",
        title: "youtube growth loop: 3x videos, 75% less time",
        subtitle: "automated video ideation, scripting, metadata & publishing",
        category: "growth-engine",
        tags: ["youtube automation", "video seo", "gpt-4", "youtube api", "content automation"],
        industry: "content creators, educators, agencies, brands",
        implementation: "4-6 wochen",
        status: "✅ Production Ready",

        metrics: [
          { value: 300, suffix: "%", label: "more videos (2 → 8/monat)" },
          { value: 75, suffix: "%", label: "time saved (8h → 2h per video)" },
          { value: 45, suffix: "%", label: "better ctr (4.0% → 5.8%)" },
        ],

        hero: "die meisten creator publizieren 2 videos/monat wenn sie 8+ brauchen. video creation dauert 8 stunden per video. ctr ist 4% (durchschnitt) weil metadata nicht optimiert ist. channel-wachstum ist 360 subs/jahr statt 1,920.",

        challenge: {
          title: "das problem",
          content: [
            "videos published/monat: 2 (zu wenig)",
            "time per video: 8 stunden (ideation + scripting + metadata)",
            "average ctr: 4.0% (sub-optimal)",
            "subscriber growth/jahr: 360 (zu langsam)"
          ]
        },

        solution: {
          title: "die automation-lösung",
          content: [
            "idea engine (trending topics from youtube, google trends, competitor analysis)",
            "script writer (gpt-4 complete scripts mit hook, intro, main, outro, cta)",
            "metadata optimizer (seo-optimized titles, descriptions, tags)",
            "thumbnail generator (ai-generated thumbnails + a/b testing)",
            "publishing automator (youtube api scheduling at optimal times)",
            "performance tracker (views, ctr, retention, engagement)"
          ]
        },

        results: {
          title: "typische creator-resultate",
          content: [
            "videos published/monat: 2 → 8 (+300%)",
            "time per video: 8h → 2h (75% reduction)",
            "average ctr: 4.0% → 5.8% (+45%)",
            "average retention: 52% → 62% (+19%)",
            "subscriber growth/jahr: 360 → 1,920 (+433%)",
            "monthly views: 5,000 → 20,000 (+300%)"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/monat", description: "6 workflows" },
          database: { name: "PostgreSQL", cost: "€0-30/monat", description: "video ideas + performance" },
          ai: { name: "OpenAI GPT-4 + DALL-E", cost: "€3-5/monat", description: "scripts + thumbnails (8 videos)" },
          youtube: { name: "YouTube Data + Analytics API", cost: "€0/monat", description: "publishing + metrics" },
          design: { name: "Canva Pro", cost: "€11/monat", description: "thumbnail design" }
        },

        phases: [
          {
            phase: 1,
            title: "Architecture Design",
            timeline: "Woche 1",
            deliverables: ["6 workflows", "idea scoring model"]
          },
          {
            phase: 2,
            title: "Platform Setup",
            timeline: "Woche 2",
            deliverables: ["youtube api", "openai api", "canva pro"]
          },
          {
            phase: 3,
            title: "Video Templates",
            timeline: "Woche 3",
            deliverables: ["script prompts (5 video types)", "20 title formulas", "thumbnail layouts"]
          },
          {
            phase: 4,
            title: "Performance Dashboard",
            timeline: "Woche 4",
            deliverables: ["looker studio dashboard", "optimization opportunities"]
          },
          {
            phase: 5,
            title: "Testing & Launch",
            timeline: "Woche 5",
            deliverables: ["first automated videos", "optimization"]
          }
        ],

        pricing: {
          setup: {
            starter: "€2.000-€3.500",
            professional: "€5.000-€8.000",
            enterprise: "€10.000-€15.000"
          },
          monthly: {
            tools: "€14-150/monat",
            breakdown: "openai (€3-5) + canva (€11) + n8n (€0-100)"
          }
        },

        faq: [
          {
            question: "Was wenn ich keine zeit habe 8 videos/monat aufzunehmen?",
            answer: "start kleiner: automatisiere ideas + scripts, aber publiziere nur 4 videos/monat. du sparst trotzdem 6 stunden pro video."
          }
        ],

        relatedSolution: "growth-engine",
        relatedProjects: ["content-factory"],
      },
    },
  },

  en: {
    backToProjects: "all projects",
    industryLabel: "industry",
    clientLabel: "target audience",
    periodLabel: "implementation",
    problemLabel: "challenge",
    solutionLabel: "solution",
    resultsLabel: "results",
    servicesLabel: "modules",
    technologyLabel: "technology stack",
    phasesLabel: "implementation phases",
    pricingLabel: "pricing",
    faqLabel: "frequently asked questions",
    keyResults: "key results",
    nextProject: "next project",
    prevProject: "previous project",
    statusLabel: "status",
    roiLabel: "roi",
    timelineLabel: "timeline",

    projects: {
      "autonomous-sales-agent": {
        slug: "autonomous-sales-agent",
        title: "autonomous sales agent: zero lost leads",
        subtitle: "end-to-end sales automation from lead capture to conversion",
        category: "control-center",
        tags: ["n8n", "crm", "email automation", "lead scoring", "postgresql", "hubspot", "pipedrive"],
        industry: "b2b saas, professional services, agencies",
        implementation: "6-8 weeks",
        status: "✅ Production Ready",

        metrics: [
          { value: 98, suffix: "%", label: "faster response (6h → 4min)" },
          { value: 86, suffix: "%", label: "reduction in lost leads" },
          { value: 325, suffix: "%", label: "more booked meetings" },
        ],

        hero: "most smbs lose 30-40% of inbound leads because follow-up is manual and slow. this super-workflow captures every lead, scores them instantly, and runs personalized outreach sequences automatically—recovering €47k+ in lost revenue per quarter.",

        challenge: {
          title: "the problem",
          content: [
            "35-40% of inbound leads never get followed up (lost revenue: €5-15k/month)",
            "sales teams spend 15+ hours/week on manual crm entry and pipeline updates",
            "lead response time averages 6 hours (should be <10 minutes for hot leads)",
            "no visibility into pipeline health or stalled deals until it's too late"
          ]
        },

        solution: {
          title: "the automation solution",
          content: [
            "Lead Hunter workflow: captures leads from google maps, linkedin, website forms, referrals → stores in postgresql with enrichment data",
            "Lead Enricher workflow: enriches with firmographics (company size, industry, location), technographics (tech stack), engagement signals → assigns score 0-100",
            "Auto Outreach workflow: hot leads (70+) get 4-email aggressive sequence over 10 days. warm leads (40-69) get 4-email patient sequence over 6 weeks. personalized with {{firstName}}, {{companyName}}, {{observation}}",
            "Sales Prep workflow: summarizes calls, generates proposals, syncs stripe payments → pipedrive/hubspot deals",
            "Deal Tracker workflow: alerts on stalled deals (7-14+ days no activity), auto-updates pipeline stages, creates next-action tasks",
            "Dashboard Refresh workflow: hourly refresh of looker studio dashboard with 10 kpis, funnel visualization, email performance"
          ]
        },

        results: {
          title: "typical client results (6 months)",
          content: [
            "Lead response time: 6 hours → 4 minutes (98% faster)",
            "Lost leads: 35% → <5% (86% reduction)",
            "Meetings/month: 8 → 34 (+325% increase)",
            "Admin hours/week: 15 → 1.5 (90% time savings)",
            "Pipeline value: €45k → €127k (+182% growth)",
            "Close rate: 15% → 24% (+60% improvement)",
            "ROI: 3,680% over 6 months | Payback: 5 days"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/month", description: "6 interconnected workflows" },
          database: { name: "PostgreSQL 14+", cost: "€0-30/month", description: "4 core tables with materialized views" },
          crm: { name: "HubSpot / Pipedrive", cost: "€0-45/month", description: "deal pipeline + custom properties" },
          email: { name: "Brevo / SendGrid", cost: "€0-25/month", description: "email sequences with tracking" },
          analytics: { name: "Looker Studio", cost: "€0/month", description: "real-time sales dashboard" },
          alerts: { name: "Slack", cost: "€0/month", description: "critical notifications" }
        },

        phases: [
          {
            phase: 1,
            title: "Architecture Design",
            timeline: "Week 1-2",
            deliverables: [
              "complete n8n workflow architecture (6 workflows documented)",
              "postgresql database schema (4 tables with indexes)",
              "lead scoring model (0-100 scale with weights)",
              "integration architecture diagram"
            ]
          },
          {
            phase: 2,
            title: "CRM Setup",
            timeline: "Week 2-3",
            deliverables: [
              "hubspot or pipedrive configuration (custom properties + pipeline)",
              "api credentials and webhook setup",
              "bi-directional sync workflow (postgresql ↔ crm)",
              "deduplication logic"
            ]
          },
          {
            phase: 3,
            title: "Email Sequences",
            timeline: "Week 3-4",
            deliverables: [
              "hot outreach sequence (4 emails, 10-day timeline, 18-25% reply rate)",
              "warm nurture sequence (4 emails, 6-week timeline, 30-50% engagement)",
              "personalization logic (dynamic observations based on firmographics)",
              "a/b test subject line variants"
            ]
          },
          {
            phase: 4,
            title: "Dashboard & Analytics",
            timeline: "Week 4-5",
            deliverables: [
              "looker studio dashboard (10 kpi scorecards, funnel, performance charts)",
              "postgresql materialized views (optimized for dashboard queries)",
              "hourly auto-refresh workflow (n8n triggers + error alerts)",
              "slack notifications for critical events"
            ]
          },
          {
            phase: 5,
            title: "Testing & Launch",
            timeline: "Week 5-6",
            deliverables: [
              "end-to-end workflow testing (100 test leads)",
              "sales team training (4-hour session: system overview + crm updates)",
              "documentation handover (architecture + maintenance guide)",
              "30-day optimization support"
            ]
          }
        ],

        pricing: {
          setup: {
            starter: "€2,500-€5,000",
            professional: "€7,500-€12,000",
            enterprise: "€15,000-€25,000"
          },
          monthly: {
            tools: "€0-€200/month",
            breakdown: "n8n (€0-100) + crm (€0-45) + email (€0-25) + database (€0-30)"
          }
        },

        faq: [
          {
            question: "How long does implementation take?",
            answer: "6-8 weeks for full deployment. You can start with basic automation (Lead Enricher + Email Sequences) in 2-3 weeks."
          },
          {
            question: "Do I need technical skills?",
            answer: "Basic technical knowledge recommended (SQL, APIs, n8n). If you're comfortable with Zapier or Make.com, you can handle this. Otherwise, hire a freelancer for setup (budget €3-5k) or choose our Professional/Enterprise packages with full implementation."
          },
          {
            question: "What if I don't have a CRM?",
            answer: "We set up HubSpot Free (€0/month, sufficient for 100-500 leads) or Pipedrive Essential (€14/month). You can upgrade later if needed."
          }
        ],

        relatedSolution: "control-center",
        relatedProjects: ["lifecycle-guardian", "administration-droid"],
      },

      // NOTE: For brevity, I'm providing abbreviated EN versions for the other 5 projects
      // In production, you'd want complete EN translations matching the DE content

      "lifecycle-guardian": {
        slug: "lifecycle-guardian",
        title: "lifecycle guardian: customer retention automation",
        subtitle: "predictive churn prevention and expansion revenue engine",
        category: "control-center",
        tags: ["customer success", "churn prevention", "health scoring", "onboarding", "upsell", "hubspot"],
        industry: "saas, subscription businesses, membership platforms",
        implementation: "6-8 weeks",
        status: "✅ Production Ready",

        metrics: [
          { value: 67, suffix: "%", label: "onboarding completion increase (60% → 100%)" },
          { value: 53, suffix: "%", label: "churn reduction (15% → 7%)" },
          { value: 240, suffix: "%", label: "expansion mrr increase" },
        ],

        hero: "most saas businesses lose 10-20% mrr annually to churn. customer success teams spend 80% of time firefighting at-risk accounts instead of driving expansion. onboarding is manual, health scoring is guesswork, and churn happens before you see it coming.",

        challenge: {
          title: "the problem",
          content: [
            "onboarding completion rate 60% (40% of customers never fully activate)",
            "churn detected too late (average 2-3 months after problem starts)",
            "customer success teams reactive instead of proactive (no time for expansion)",
            "health score based on gut feeling instead of real data"
          ]
        },

        solution: {
          title: "the automation solution",
          content: [
            "customer onboarding (7-email sequences, task completion tracking)",
            "health score calculator (0-100 score based on usage, engagement, support, payment)",
            "churn prevention engine (automated retention campaigns 30-45 days before cancellation)",
            "upsell detector (expansion opportunities based on usage patterns)",
            "offboarding manager (exit surveys + win-back campaigns)",
            "dashboard (real-time health scores, churn risk, expansion pipeline)"
          ]
        },

        results: {
          title: "typical client results",
          content: [
            "onboarding completion: 60% → 100%",
            "time to onboard: 12 days → 4 days",
            "churn rate: 15% → 7%",
            "at-risk recovery: 0% → 50%",
            "upsell conversion: 0% → 20%",
            "csm hours/week: 15 → 1.5",
            "net revenue retention: 85% → 115%"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/month", description: "7 workflows" },
          database: { name: "PostgreSQL", cost: "€0-30/month", description: "7 tables, health score formula" },
          crm: { name: "HubSpot", cost: "€45/month", description: "45+ custom properties" },
          payment: { name: "Stripe", cost: "1.5% + €0.25", description: "webhooks for payment events" },
          support: { name: "Zendesk/Intercom", cost: "€49-79/month", description: "ticket data" },
          email: { name: "Brevo", cost: "€25/month", description: "retention campaigns" }
        },

        phases: [
          {
            phase: 1,
            title: "Architecture & Database",
            timeline: "Week 1-2",
            deliverables: [
              "7 core tables (customers, health_scores, events, campaigns, upsells, churn_signals, offboarding)",
              "health score formula (0-100 calculation based on 12 weighted signals)",
              "workflow architecture diagram (7 interconnected workflows)",
              "integration design (hubspot, stripe, support platforms)"
            ]
          },
          {
            phase: 2,
            title: "Platform Setup",
            timeline: "Week 2-3",
            deliverables: [
              "hubspot configuration (45+ custom properties for health tracking)",
              "stripe webhook setup (payment events → health score impact)",
              "support platform integration (ticket volume → health score)",
              "bi-directional sync workflows (postgresql ↔ platforms)"
            ]
          },
          {
            phase: 3,
            title: "Email Templates & Campaigns",
            timeline: "Week 3-4",
            deliverables: [
              "onboarding sequence (7 emails over 14 days with task completion tracking)",
              "retention campaigns (3 sequences: early warning, at-risk, last chance)",
              "expansion campaigns (2 sequences: upsell qualification, feature discovery)",
              "offboarding sequence (exit survey + 3-email win-back over 60 days)"
            ]
          },
          {
            phase: 4,
            title: "Health Scoring & Alerts",
            timeline: "Week 4-5",
            deliverables: [
              "health score calculator (daily refresh, 12 weighted signals)",
              "churn prediction model (30-45 day early warning based on score trends)",
              "expansion detector (usage pattern analysis for upsell timing)",
              "slack alerts (critical health drops, high-value churn risks)"
            ]
          },
          {
            phase: 5,
            title: "Dashboard & Launch",
            timeline: "Week 5-6",
            deliverables: [
              "looker studio dashboard (health scores by segment, churn funnel, expansion pipeline)",
              "csm training (4-hour session: system overview, playbooks, escalation)",
              "end-to-end testing (50 test customers through full lifecycle)",
              "30-day optimization support (weekly check-ins, playbook refinement)"
            ]
          }
        ],

        pricing: {
          setup: {
            starter: "€3,500-€7,000",
            professional: "€9,000-€15,000",
            enterprise: "€18,000-€30,000"
          },
          monthly: {
            tools: "€120-€280/month",
            breakdown: "n8n (€0-100) + hubspot (€45) + stripe (1.5%+0.25) + support (€49-79) + email (€25)"
          }
        },

        faq: [
          {
            question: "How long does implementation take?",
            answer: "6-8 weeks for full deployment. You can start with basic health scoring + onboarding automation in 3-4 weeks."
          },
          {
            question: "What if we don't have HubSpot?",
            answer: "HubSpot is recommended (€45/month with needed features). Alternatively, we can integrate with Pipedrive, Close, or custom CRM (adds 1-2 weeks)."
          },
          {
            question: "Can this work for B2C subscription businesses?",
            answer: "Yes! Works for any subscription model (SaaS, membership, e-commerce subscriptions). Health scoring adapts to your business model."
          },
          {
            question: "Do I need a full-time CSM?",
            answer: "No. This system automates 80% of reactive CS work. You can manage 100-300 customers with 10-15 hours/week."
          }
        ],

        relatedSolution: "control-center",
        relatedProjects: ["autonomous-sales-agent", "administration-droid"],
      },

      "content-factory": {
        slug: "content-factory",
        title: "content factory: 3x content output, 80% less time",
        subtitle: "ai-powered content creation and multi-platform distribution",
        category: "growth-engine",
        tags: ["content automation", "ai content", "wordpress", "social media", "seo", "gpt-4"],
        industry: "content marketers, agencies, b2b saas, solopreneurs",
        implementation: "4-5 weeks",
        status: "✅ Production Ready",

        metrics: [
          { value: 200, suffix: "%", label: "content output increase (4 → 12 posts/month)" },
          { value: 83, suffix: "%", label: "time saved (18h/week → 3h/week)" },
          { value: 243, suffix: "%", label: "organic traffic growth" },
        ],

        hero: "content marketing teams spend 18+ hours/week on manual posting, cross-platform distribution and performance tracking. most publish 2-4 blog posts/month when they need 12+. content sits in google docs instead of generating traffic, leads and revenue.",

        challenge: {
          title: "the problem",
          content: [
            "content teams spend 18+ hours/week on manual posting",
            "you publish 2-4 blog posts/month but need 12+",
            "content sits in google docs instead of generating traffic/leads",
            "cross-platform distribution is manual and time-consuming"
          ]
        },

        solution: {
          title: "the automation solution",
          content: [
            "content ideation (youtube trends, google trends, keywords)",
            "content generator (gpt-4 blog posts 1,800-2,200 words)",
            "multi-platform publisher (wordpress, linkedin, twitter, youtube, email)",
            "performance tracker (traffic, engagement, conversions)",
            "content repurposer (blog → video, video → carousel)",
            "optimization engine (seo updates for underperformers)"
          ]
        },

        results: {
          title: "typical client results",
          content: [
            "blog posts/month: 4 → 12",
            "social posts/month: 20 → 60",
            "content creation time: 18h/week → 3h/week",
            "organic traffic: 3,500 → 12,000 visitors/month",
            "lead conversions/month: 25 → 85"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/month", description: "6 workflows" },
          database: { name: "PostgreSQL", cost: "€0-30/month", description: "content warehouse" },
          ai: { name: "OpenAI GPT-4 + DALL-E 3", cost: "€100-250/month", description: "blog generation + images" },
          cms: { name: "WordPress", cost: "€5-25/month", description: "blog platform" },
          social: { name: "LinkedIn + Twitter + YouTube APIs", cost: "€0/month", description: "multi-platform" },
          email: { name: "Brevo", cost: "€25-50/month", description: "newsletter automation" }
        },

        phases: [
          {
            phase: 1,
            title: "Architecture Design",
            timeline: "Week 1",
            deliverables: [
              "6 workflow architecture (ideation, generation, publishing, repurposing, tracking, optimization)",
              "content scoring model (topic relevance, seo potential, engagement prediction)",
              "database schema (topics, content pieces, performance metrics, platform analytics)",
              "content calendar integration (auto-scheduling based on peak engagement times)"
            ]
          },
          {
            phase: 2,
            title: "Platform Setup",
            timeline: "Week 2",
            deliverables: [
              "wordpress rest api configuration (auto-publishing with featured images + tags)",
              "social platform apis (linkedin, twitter, youtube data api)",
              "email platform integration (brevo/sendgrid for newsletter distribution)",
              "analytics setup (ga4, social insights, youtube analytics)"
            ]
          },
          {
            phase: 3,
            title: "Content Templates & Prompts",
            timeline: "Week 3",
            deliverables: [
              "blog post prompts (5 templates for different content types: how-to, listicles, case studies)",
              "social post prompts (linkedin thought leadership, twitter threads, carousel posts)",
              "seo optimization formulas (keyword integration, meta descriptions, internal linking)",
              "brand voice guidelines (tone, style, terminology to match your existing content)"
            ]
          },
          {
            phase: 4,
            title: "Performance Dashboard",
            timeline: "Week 4",
            deliverables: [
              "looker studio dashboard (traffic sources, top performers, conversion funnels)",
              "roi tracking (content → leads → revenue attribution)",
              "content performance scoring (automated ranking of top/bottom performers)",
              "optimization alerts (underperforming content flagged for improvement)"
            ]
          },
          {
            phase: 5,
            title: "Testing & Launch",
            timeline: "Week 5",
            deliverables: [
              "end-to-end testing (10 test blog posts, 30 social posts across platforms)",
              "first automated content batch (2 weeks of scheduled posts)",
              "team training (2-hour session: content approval workflow, dashboard usage)",
              "30-day optimization support (weekly review of performance, prompt refinement)"
            ]
          }
        ],

        pricing: {
          setup: {
            starter: "€3,000-€5,000",
            professional: "€7,000-€10,000",
            enterprise: "€12,000-€18,000"
          },
          monthly: {
            tools: "€150-400/month",
            breakdown: "n8n (€0-100) + gpt-4 (€100-250) + wordpress (€5-25) + email (€25-50) + database (€0-30)"
          }
        },

        faq: [
          {
            question: "Will AI content hurt my SEO?",
            answer: "No. Google cares about quality and helpfulness, not how content is created. Our system includes human review checkpoints, seo optimization, and brand voice consistency—resulting in content that performs as well or better than manual writing."
          },
          {
            question: "How much human oversight is needed?",
            answer: "3-5 hours/week for content review and approval. The system generates drafts—you approve, edit if needed, and publish. Most clients spend 30-60 minutes per blog post on final review vs 4-6 hours writing from scratch."
          },
          {
            question: "Can I customize the content style?",
            answer: "Yes! We train prompts on your existing content (tone, terminology, structure) and build custom templates for your industry. Content matches your brand voice consistently."
          },
          {
            question: "What if I don't have WordPress?",
            answer: "WordPress recommended (easiest integration). We can also work with Webflow, Ghost, HubSpot CMS, or custom platforms (adds 1-2 weeks for API setup)."
          }
        ],

        relatedSolution: "growth-engine",
        relatedProjects: ["youtube-growth-loop"],
      },

      "market-pulse-dashboard": {
        slug: "market-pulse-dashboard",
        title: "market pulse dashboard: 24/7 competitive intelligence",
        subtitle: "automated competitor tracking, customer feedback & market trends",
        category: "intelligence-hub",
        tags: ["competitive intelligence", "market monitoring", "web scraping", "ai insights", "puppeteer"],
        industry: "all industries, especially b2b saas & ecommerce",
        implementation: "5-6 weeks",
        status: "✅ Production Ready",

        metrics: [
          { value: 92, suffix: "%", label: "less manual research (12h → 1h/week)" },
          { value: 217, suffix: "%", label: "more competitor changes detected" },
          { value: 2, suffix: "days", label: "threat detection time (vs 4 weeks)" },
        ],

        hero: "most smbs spend 10-15 hours/week on manual market research and still discover competitor changes too late (4+ weeks). customer feedback is scattered and not systematically analyzed. strategic decisions are based on gut feeling instead of data.",

        challenge: {
          title: "the problem",
          content: [
            "manual market research costs 10-15 hours/week",
            "competitor changes detected too late (4+ weeks)",
            "customer feedback scattered (reviews, tickets, social)",
            "strategic decisions based on gut feeling"
          ]
        },

        solution: {
          title: "the automation solution",
          content: [
            "competitor monitor (pricing, products, hiring, website changes)",
            "customer feedback aggregator (reviews, tickets, social, surveys)",
            "market trend analyzer (google trends, news, reddit)",
            "ai insight engine (gpt-4/claude strategic analysis)",
            "alert engine (critical events: price drops, launches, complaints)",
            "weekly digest generator (competitor + customer + market trends)"
          ]
        },

        results: {
          title: "typical client results",
          content: [
            "manual research time: 12h/week → 1h/week (92% reduction)",
            "competitor changes detected: 30% → 95% (+217%)",
            "time to detect threats: 4 weeks → 2 days (93% faster)",
            "strategic insights/month: 2-3 → 12-15 (+400%)",
            "prevented competitive losses: €90k revenue saved (6 months)"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/month", description: "6 workflows" },
          database: { name: "PostgreSQL", cost: "€0-30/month", description: "8 core tables" },
          scraping: { name: "Puppeteer/Apify", cost: "€0-50/month", description: "competitor monitoring" },
          ai: { name: "OpenAI GPT-4 / Claude", cost: "€20-50/month", description: "insight generation" },
          analytics: { name: "Looker Studio", cost: "€0/month", description: "intelligence dashboards" }
        },

        phases: [
          {
            phase: 1,
            title: "Architecture & Database",
            timeline: "Week 1-2",
            deliverables: [
              "6 workflow architecture (monitoring, aggregation, analysis, alerts, reporting, optimization)",
              "postgresql schema (8 tables: competitors, products, reviews, social_mentions, trends, insights, alerts, digests)",
              "monitoring frequency matrix (daily, weekly, real-time for different data types)",
              "scraping strategy (respectful rate limits, fallback sources, change detection algorithms)"
            ]
          },
          {
            phase: 2,
            title: "Monitoring Setup",
            timeline: "Week 2-3",
            deliverables: [
              "competitor tracking (5-7 competitors: pricing, product changes, feature launches, hiring signals)",
              "review aggregation (g2, capterra, trustpilot, google reviews, app stores)",
              "social listening (twitter, reddit, linkedin mentions for your brand + competitors)",
              "market trend tracking (google trends, industry news, regulatory changes)"
            ]
          },
          {
            phase: 3,
            title: "Alerts & Reports",
            timeline: "Week 3-4",
            deliverables: [
              "critical alert workflows (price changes >15%, new feature launches, negative sentiment spikes)",
              "weekly digest generator (competitor summary, customer feedback themes, market trends)",
              "ai insight engine (gpt-4/claude analysis: threats, opportunities, strategic recommendations)",
              "slack/email notifications (configurable thresholds for different alert types)"
            ]
          },
          {
            phase: 4,
            title: "Intelligence Dashboard",
            timeline: "Week 4-5",
            deliverables: [
              "looker studio intelligence dashboard (6 pages: competitor overview, pricing matrix, feature comparison, customer feedback, market trends, ai insights)",
              "postgresql materialized views (optimized queries for dashboard performance)",
              "historical trend tracking (12-month rolling comparisons)",
              "export capabilities (weekly reports to pdf, csv data dumps for deeper analysis)"
            ]
          },
          {
            phase: 5,
            title: "Testing & Launch",
            timeline: "Week 5-6",
            deliverables: [
              "end-to-end testing (simulate 2 weeks of monitoring across all sources)",
              "alert calibration (fine-tune thresholds to minimize noise, maximize signal)",
              "team training (4-hour session: dashboard navigation, insight interpretation, action playbooks)",
              "30-day optimization support (weekly review of alerts, trend analysis accuracy)"
            ]
          }
        ],

        pricing: {
          setup: {
            starter: "€3,500-€6,000",
            professional: "€9,000-€15,000",
            enterprise: "€18,000-€30,000"
          },
          monthly: {
            tools: "€20-150/month",
            breakdown: "n8n (€0-100) + postgresql (€0-30) + scraping (€0-50) + ai (€20-50)"
          }
        },

        faq: [
          {
            question: "How many competitors should I track?",
            answer: "Start with 5-7 direct competitors. Quality > quantity. Better to monitor 5 intensively than 20 superficially. You can expand later based on market dynamics."
          },
          {
            question: "Is web scraping legal?",
            answer: "Yes, when done respectfully. We scrape only publicly available data, respect robots.txt, use reasonable rate limits, and avoid overloading servers. Always review your competitors' Terms of Service."
          },
          {
            question: "How accurate are AI insights?",
            answer: "GPT-4/Claude provides strategic analysis based on detected patterns. Think of it as a tireless analyst that spots trends you might miss—but you make the final strategic decisions. Accuracy improves as the system learns your industry."
          },
          {
            question: "Can I track non-SaaS competitors?",
            answer: "Yes! System works for ecommerce, local businesses, agencies, consulting firms. We adapt monitoring sources to your industry (e.g., Amazon/Shopify for ecommerce, LinkedIn for services)."
          }
        ],

        relatedSolution: "intelligence-hub",
        relatedProjects: [],
      },

      "administration-droid": {
        slug: "administration-droid",
        title: "administration droid: automated back-office",
        subtitle: "invoice generation, contract management & payment tracking",
        category: "control-center",
        tags: ["invoicing", "contracts", "payments", "compliance", "quickbooks", "docusign"],
        industry: "agencies, professional services, saas",
        implementation: "6-8 weeks",
        status: "✅ Production Ready",

        metrics: [
          { value: 96, suffix: "%", label: "faster invoicing (45min → 2min)" },
          { value: 53, suffix: "%", label: "faster payment collection (45 → 21 days)" },
          { value: 80, suffix: "%", label: "reduction in admin hours" },
        ],

        hero: "most smbs spend 80+ hours/month on manual invoice creation, contract management and payment tracking. late payments account for 40% of all invoices. contract renewals get missed because no alerts exist.",

        challenge: {
          title: "the problem",
          content: [
            "invoice creation time: 45 min/invoice (too slow)",
            "manual admin hours/month: 80 hours",
            "payment collection time: 45 days average",
            "late payments: 40% of all invoices",
            "contract renewal misses: 8/year (lost revenue)"
          ]
        },

        solution: {
          title: "the automation solution",
          content: [
            "invoice generator (automatic from crm deals → quickbooks/xero)",
            "payment tracker (3-day, 7-day, 14-day reminder sequences)",
            "contract manager (docusign automation, renewal alerts)",
            "receipt processor (ocr receipt processing + categorization)",
            "vendor manager (payment schedules + vendor reminders)",
            "financial dashboard (cash flow, ar aging, expense tracking)"
          ]
        },

        results: {
          title: "typical client results",
          content: [
            "invoice creation time: 45min → 2min (96% faster)",
            "manual admin hours/month: 80 → 16 (80% reduction)",
            "payment collection time: 45 → 21 days (53% faster)",
            "late payments: 40% → 5% (88% reduction)",
            "contract renewal misses: 8/year → 0/year (100% prevention)"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/month", description: "6 workflows" },
          database: { name: "PostgreSQL", cost: "€0-30/month", description: "5 core tables" },
          accounting: { name: "QuickBooks/Xero", cost: "€15-45/month", description: "invoice + accounting" },
          signature: { name: "DocuSign/PandaDoc", cost: "€19-25/month", description: "e-signature" },
          ocr: { name: "Mindee/Taggun", cost: "€30-50/month", description: "receipt processing" }
        },

        phases: [
          {
            phase: 1,
            title: "Architecture Design",
            timeline: "Week 1-2",
            deliverables: [
              "6 workflow architecture (invoice generation, payment tracking, contract management, receipt processing, vendor management, dashboard)",
              "postgresql schema (5 tables: invoices, payments, contracts, receipts, vendors)",
              "integration architecture (crm → accounting → payment → notifications)",
              "document template design (invoice, contract, payment reminder layouts)"
            ]
          },
          {
            phase: 2,
            title: "Platform Setup",
            timeline: "Week 2-3",
            deliverables: [
              "quickbooks/xero api configuration (oauth authentication, webhook setup)",
              "docusign/pandadoc integration (template library, signing workflows)",
              "ocr service setup (mindee/taggun for receipt parsing)",
              "crm sync (hubspot/pipedrive deals → invoice trigger workflows)"
            ]
          },
          {
            phase: 3,
            title: "Document Templates",
            timeline: "Week 3-4",
            deliverables: [
              "invoice template (branded pdf with payment terms, line items, tax calculations)",
              "contract templates (3 standard agreements: msa, sow, nda)",
              "payment reminder sequences (3-day friendly, 7-day firm, 14-day final notice)",
              "receipt categorization rules (expense types, gl code assignment)"
            ]
          },
          {
            phase: 4,
            title: "Financial Dashboard",
            timeline: "Week 4-5",
            deliverables: [
              "looker studio financial dashboard (revenue, ar aging, cash flow forecast)",
              "ar aging report (0-30, 31-60, 61-90, 90+ day buckets)",
              "cash flow forecast (30-day rolling projection based on invoices + payment history)",
              "vendor payment calendar (upcoming obligations, autopay schedules)"
            ]
          },
          {
            phase: 5,
            title: "Testing & Launch",
            timeline: "Week 5-6",
            deliverables: [
              "end-to-end testing (20 test invoices through full lifecycle)",
              "finance team training (4-hour session: system overview, approval workflows, escalations)",
              "compliance review (payment terms, contract language, tax calculations)",
              "30-day optimization support (weekly check-ins, workflow refinement)"
            ]
          }
        ],

        pricing: {
          setup: {
            starter: "€2,500-€5,000",
            professional: "€7,500-€12,000",
            enterprise: "€15,000-€25,000"
          },
          monthly: {
            tools: "€64-200/month",
            breakdown: "n8n (€0-100) + accounting (€15-45) + signature (€19-25) + ocr (€30-50)"
          }
        },

        faq: [
          {
            question: "What if I already use QuickBooks?",
            answer: "Perfect—this system integrates natively with QuickBooks Online. Just connect via API (OAuth2 authentication) and you're ready. Works with QuickBooks Desktop too (via QuickBooks Web Connector)."
          },
          {
            question: "Can I customize invoice templates?",
            answer: "Yes! We design templates matching your brand (logo, colors, layout). You can have multiple templates for different service types or client segments."
          },
          {
            question: "Is this GDPR compliant?",
            answer: "Yes. All data stored in EU-hosted PostgreSQL, encrypted at rest and in transit. DocuSign/PandaDoc are GDPR-compliant. Full audit trail for all financial transactions."
          },
          {
            question: "What about multi-currency?",
            answer: "Supported! QuickBooks/Xero handle multi-currency. System automatically applies exchange rates and updates accounting entries."
          }
        ],

        relatedSolution: "control-center",
        relatedProjects: ["autonomous-sales-agent", "lifecycle-guardian"],
      },

      "youtube-growth-loop": {
        slug: "youtube-growth-loop",
        title: "youtube growth loop: 3x videos, 75% less time",
        subtitle: "automated video ideation, scripting, metadata & publishing",
        category: "growth-engine",
        tags: ["youtube automation", "video seo", "gpt-4", "youtube api", "content automation"],
        industry: "content creators, educators, agencies, brands",
        implementation: "4-6 weeks",
        status: "✅ Production Ready",

        metrics: [
          { value: 300, suffix: "%", label: "more videos (2 → 8/month)" },
          { value: 75, suffix: "%", label: "time saved (8h → 2h per video)" },
          { value: 45, suffix: "%", label: "better ctr (4.0% → 5.8%)" },
        ],

        hero: "most creators publish 2 videos/month when they need 8+. video creation takes 8 hours per video. ctr is 4% (average) because metadata isn't optimized. channel growth is 360 subs/year instead of 1,920.",

        challenge: {
          title: "the problem",
          content: [
            "videos published/month: 2 (too few)",
            "time per video: 8 hours (ideation + scripting + metadata)",
            "average ctr: 4.0% (sub-optimal)",
            "subscriber growth/year: 360 (too slow)"
          ]
        },

        solution: {
          title: "the automation solution",
          content: [
            "idea engine (trending topics from youtube, google trends, competitor analysis)",
            "script writer (gpt-4 complete scripts with hook, intro, main, outro, cta)",
            "metadata optimizer (seo-optimized titles, descriptions, tags)",
            "thumbnail generator (ai-generated thumbnails + a/b testing)",
            "publishing automator (youtube api scheduling at optimal times)",
            "performance tracker (views, ctr, retention, engagement)"
          ]
        },

        results: {
          title: "typical creator results",
          content: [
            "videos published/month: 2 → 8 (+300%)",
            "time per video: 8h → 2h (75% reduction)",
            "average ctr: 4.0% → 5.8% (+45%)",
            "average retention: 52% → 62% (+19%)",
            "subscriber growth/year: 360 → 1,920 (+433%)",
            "monthly views: 5,000 → 20,000 (+300%)"
          ]
        },

        technology: {
          automation: { name: "n8n", cost: "€0-100/month", description: "6 workflows" },
          database: { name: "PostgreSQL", cost: "€0-30/month", description: "video ideas + performance" },
          ai: { name: "OpenAI GPT-4 + DALL-E", cost: "€3-5/month", description: "scripts + thumbnails (8 videos)" },
          youtube: { name: "YouTube Data + Analytics API", cost: "€0/month", description: "publishing + metrics" },
          design: { name: "Canva Pro", cost: "€11/month", description: "thumbnail design" }
        },

        phases: [
          {
            phase: 1,
            title: "Architecture Design",
            timeline: "Week 1",
            deliverables: [
              "6 workflow architecture (ideation, scripting, metadata, thumbnails, publishing, analytics)",
              "idea scoring model (trending score, competition analysis, audience alignment)",
              "script templates (5 video types: how-to, listicles, storytelling, product reviews, tutorials)",
              "database schema (ideas, scripts, videos, performance metrics)"
            ]
          },
          {
            phase: 2,
            title: "Platform Setup",
            timeline: "Week 2",
            deliverables: [
              "youtube api integration (data api for publishing, analytics api for metrics)",
              "openai api setup (gpt-4 for scripts, dall-e for thumbnail concepts)",
              "canva pro account (thumbnail template library, brand kit)",
              "google trends api (trending topic discovery by niche)"
            ]
          },
          {
            phase: 3,
            title: "Video Templates",
            timeline: "Week 3",
            deliverables: [
              "script prompts for 5 video types (customized to your niche and audience)",
              "20 title formulas (proven patterns for different content types)",
              "thumbnail layouts (10 templates with optimal text placement, contrast, facial expressions)",
              "metadata optimization checklist (keywords, hashtags, chapter markers)"
            ]
          },
          {
            phase: 4,
            title: "Performance Dashboard",
            timeline: "Week 4",
            deliverables: [
              "looker studio youtube dashboard (views, ctr, retention, engagement by video type)",
              "trend analysis (best performing topics, optimal posting times, title patterns)",
              "optimization opportunities (underperforming videos flagged for thumbnail updates)",
              "growth projections (subscriber, view, and revenue forecasts)"
            ]
          },
          {
            phase: 5,
            title: "Testing & Launch",
            timeline: "Week 5",
            deliverables: [
              "first automated video batch (4 complete videos: ideas, scripts, metadata, thumbnails)",
              "a/b testing setup (2 thumbnail variants per video, track which performs better)",
              "creator training (2-hour session: system overview, script approval, thumbnail customization)",
              "30-day optimization support (weekly performance review, prompt refinement)"
            ]
          }
        ],

        pricing: {
          setup: {
            starter: "€2,000-€3,500",
            professional: "€5,000-€8,000",
            enterprise: "€10,000-€15,000"
          },
          monthly: {
            tools: "€14-150/month",
            breakdown: "openai (€3-5) + canva (€11) + n8n (€0-100) + postgresql (€0-30)"
          }
        },

        faq: [
          {
            question: "What if I don't have time to record 8 videos/month?",
            answer: "Start smaller: automate ideas + scripts, but only publish 4 videos/month. You still save 6 hours per video. Scale up when ready."
          },
          {
            question: "Will AI scripts sound robotic?",
            answer: "No. We train GPT-4 on your existing videos (tone, terminology, humor) to match your voice. Most creators make minor edits (10-15 min) before recording."
          },
          {
            question: "Can this work for educational/tutorial content?",
            answer: "Yes! Tutorial scripts include clear steps, examples, and visual cues. We customize prompts for your teaching style and subject matter."
          },
          {
            question: "Do thumbnails really matter that much?",
            answer: "Absolutely. CTR is 45% higher with optimized thumbnails. We generate multiple variants, track performance, and refine based on what works for your audience."
          }
        ],

        relatedSolution: "growth-engine",
        relatedProjects: ["content-factory"],
      },
    },
  },
};

// Helper functions
export function getAllProjectSlugs() {
  return Object.keys(PROJECTS_DATA.de.projects);
}

export function getProjectBySlug(slug, language = "de") {
  const data = PROJECTS_DATA[language] ?? PROJECTS_DATA.de;
  return data.projects[slug] ?? null;
}

export function getAllProjects(language = "de") {
  const data = PROJECTS_DATA[language] ?? PROJECTS_DATA.de;
  return Object.values(data.projects);
}

export function getProjectsByCategory(category, language = "de") {
  const data = PROJECTS_DATA[language] ?? PROJECTS_DATA.de;
  return Object.values(data.projects).filter(p => p.category === category);
}

export function getProjectsPageCopy(language = "de") {
  const data = PROJECTS_DATA[language] ?? PROJECTS_DATA.de;
  return {
    backToProjects: data.backToProjects,
    industryLabel: data.industryLabel,
    clientLabel: data.clientLabel,
    periodLabel: data.periodLabel,
    problemLabel: data.problemLabel,
    solutionLabel: data.solutionLabel,
    resultsLabel: data.resultsLabel,
    servicesLabel: data.servicesLabel,
    technologyLabel: data.technologyLabel,
    phasesLabel: data.phasesLabel,
    pricingLabel: data.pricingLabel,
    faqLabel: data.faqLabel,
    keyResults: data.keyResults,
    nextProject: data.nextProject,
    prevProject: data.prevProject,
    statusLabel: data.statusLabel,
    roiLabel: data.roiLabel,
    timelineLabel: data.timelineLabel,
  };
}
