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
            subtitle: "autonomous sales & customer operations",
            heroTagline: "zero lost leads. automated follow-ups. predictable revenue.",
            description: "das 'control center' automatisiert deinen gesamten sales- und kundenprozess von lead-erfassung bis retention. kombiniert 3 super-workflows: autonomous sales agent (lead → kunde), lifecycle guardian (onboarding → retention), administration droid (rechnungen → compliance).",
            icon: "crm-email-marketing",
            stack: ["n8n", "PostgreSQL", "HubSpot / Pipedrive", "Stripe", "DocuSign"],

            // NEW: Super-Workflow modules
            modules: [
               {
                  name: "Autonomous Sales Agent",
                  slug: "autonomous-sales-agent",
                  description: "lead-erfassung → anreicherung → outreach → conversion",
                  descriptionShort: "automatisierte lead-to-customer pipeline",
                  roi: "3,680%",
                  timeline: "6-8 wochen",
                  status: "production-ready"
               },
               {
                  name: "Lifecycle Guardian",
                  slug: "lifecycle-guardian",
                  description: "onboarding → health scoring → churn prevention → expansion",
                  descriptionShort: "customer success automation",
                  roi: "380%",
                  timeline: "6-8 wochen",
                  status: "production-ready"
               },
               {
                  name: "Administration Droid",
                  slug: "administration-droid",
                  description: "rechnungen → vertraege → zahlungen → compliance",
                  descriptionShort: "finanz- und verwaltungsautomation",
                  roi: "3,500%",
                  timeline: "6-8 wochen",
                  status: "production-ready"
               }
            ],

            // NEW: Detailed technology stack
            technology: {
               automation: { name: "n8n", cost: "€0-100/monat", description: "self-hosted oder cloud" },
               database: { name: "PostgreSQL 14+", cost: "€0-30/monat", description: "supabase oder aws rds" },
               crm: { name: "HubSpot / Pipedrive", cost: "€0-45/monat", description: "deal-pipeline + custom properties" },
               payment: { name: "Stripe", cost: "1,5% + €0,25/transaktion", description: "zahlungsabwicklung" },
               signature: { name: "DocuSign / PandaDoc", cost: "€25/monat", description: "e-signatur" },
               analytics: { name: "Looker Studio", cost: "€0/monat", description: "real-time dashboards" },
               communication: { name: "Slack + Brevo/SendGrid", cost: "€0-25/monat", description: "benachrichtigungen + email-sequenzen" }
            },

            // UPDATED: More specific metrics
            metrics: [
               { value: 98, suffix: "%", label: "schnellere lead-reaktion (6h → 4min)" },
               { value: 86, suffix: "%", label: "reduktion verlorener leads" },
               { value: 325, suffix: "%", label: "mehr gebuchte meetings" },
            ],

            // NEW: Implementation phases
            phases: [
               {
                  number: 1,
                  title: "Architektur-Design",
                  duration: "Woche 1-2",
                  deliverables: ["workflow-architektur", "datenbank-schema", "integrations-design"]
               },
               {
                  number: 2,
                  title: "Plattform-Setup",
                  duration: "Woche 2-3",
                  deliverables: ["crm-konfiguration", "api-integrationen", "webhooks-setup"]
               },
               {
                  number: 3,
                  title: "Automation-Build",
                  duration: "Woche 3-4",
                  deliverables: ["n8n-workflows", "email-sequenzen", "scoring-modelle"]
               },
               {
                  number: 4,
                  title: "Dashboard & Analytics",
                  duration: "Woche 4-5",
                  deliverables: ["looker studio dashboard", "sql views", "automatisierte reports"]
               },
               {
                  number: 5,
                  title: "Testing & Launch",
                  duration: "Woche 5-6",
                  deliverables: ["qa-testing", "team-training", "dokumentation"]
               }
            ],

            // NEW: Pricing tiers
            pricing: {
               starter: {
                  label: "Starter",
                  price: "€2.500-€5.000",
                  description: "Ein Super-Workflow nach Wahl",
                  includes: ["architektur-design", "basis-setup", "2h training", "30 tage support"],
                  recommended: false
               },
               professional: {
                  label: "Professional",
                  price: "€7.500-€12.000",
                  description: "Zwei Super-Workflows + custom integrations",
                  includes: ["komplettes setup", "custom workflows", "team-training (4h)", "90 tage support"],
                  recommended: true
               },
               enterprise: {
                  label: "Enterprise",
                  price: "€15.000-€25.000",
                  description: "Alle drei Control Center Module",
                  includes: ["white-glove setup", "custom development", "quarterly reviews", "6 monate support"],
                  recommended: false
               }
            },

            // EXISTING: Keep current structure
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

            // NEW: FAQ section
            faq: [
               {
                  question: "Wie lange dauert die Implementierung?",
                  answer: "6-8 Wochen für das komplette Control Center. Du kannst mit einem Super-Workflow (z.B. Autonomous Sales Agent) in 2-3 Wochen starten und später erweitern."
               },
               {
                  question: "Brauche ich technische Kenntnisse?",
                  answer: "Grundlegende technische Kenntnisse sind hilfreich aber nicht erforderlich. Wenn du mit Zapier oder Make.com umgehen kannst, schaffst du das. Ansonsten bieten wir Full-Service-Setup (in Professional/Enterprise-Paketen enthalten)."
               },
               {
                  question: "Was kostet es monatlich nach dem Setup?",
                  answer: "€0-€200/Monat je nach Stack: n8n self-hosted (€0) oder cloud (€50-100), HubSpot Free (€0) oder Starter (€45), Email-Plattform (€0-25), PostgreSQL Supabase (€0-25). Starter typisch €0-50/Monat, Professional €100-200/Monat."
               },
               {
                  question: "Kann ich die Workflows anpassen?",
                  answer: "Absolut. Alle n8n-Workflows sind vollständig editierbar. Wir liefern Basis-Implementierungen und passen dann an deine spezifischen Geschäftsprozesse, Tools und Teamstruktur an."
               },
               {
                  question: "Was passiert wenn Workflows ausfallen?",
                  answer: "Wir bauen Monitoring und Alerts ein (Slack-Benachrichtigungen bei Fehlern). Workflows sind resilient mit Fallback-Logik designed. Support-Pakete beinhalten Optimierungs-Reviews und Updates."
               }
            ],

            // NEW: Related projects
            relatedProjects: ["autonomous-sales-agent", "lifecycle-guardian", "administration-droid"],

            cta: {
               label: "control center erst-check buchen",
            },
         },
         "intelligence-hub": {
            slug: "intelligence-hub",
            title: "the intelligence hub",
            subtitle: "competitive intelligence & market monitoring",
            heroTagline: "24/7 automatisierte marktbeobachtung statt manuelle recherche",
            description: "der 'intelligence hub' überwacht 24/7 wettbewerber, kundenfeedback und markttrends. ki-gesteuerte insights liefern dir strategische vorteile bevor dein wettbewerb reagiert.",
            icon: "analytics",
            stack: ["n8n", "PostgreSQL", "Puppeteer/Apify", "OpenAI GPT-4", "Looker Studio"],

            // NEW: Super-Workflow modules
            modules: [
               {
                  name: "Market Pulse Dashboard",
                  slug: "market-pulse-dashboard",
                  description: "competitor tracking → customer feedback → market trends → ai insights",
                  descriptionShort: "360° competitive intelligence automation",
                  roi: "2,450%",
                  timeline: "5-6 wochen",
                  status: "production-ready"
               }
            ],

            // NEW: Detailed technology stack
            technology: {
               automation: { name: "n8n", cost: "€0-100/monat", description: "workflow automation platform" },
               database: { name: "PostgreSQL 14+", cost: "€0-30/monat", description: "data warehouse" },
               scraping: { name: "Puppeteer / Apify", cost: "€0-50/monat", description: "web scraping + competitor monitoring" },
               ai: { name: "OpenAI GPT-4 / Claude", cost: "€20-50/monat", description: "strategic insight generation" },
               analytics: { name: "Looker Studio", cost: "€0/monat", description: "intelligence dashboards" },
               communication: { name: "Slack", cost: "€0/monat", description: "critical alerts" }
            },

            // UPDATED: More specific metrics
            metrics: [
               { value: 92, suffix: "%", label: "weniger manuelle recherche (12h → 1h/woche)" },
               { value: 217, suffix: "%", label: "mehr erkannte wettbewerber-changes" },
               { value: 2, suffix: "tage", label: "bedrohungen erkennen (vs 4 wochen)" },
            ],

            // NEW: Implementation phases
            phases: [
               {
                  number: 1,
                  title: "Architektur & Database",
                  duration: "Woche 1-2",
                  deliverables: ["6 workflows design", "postgresql schema", "datenmodell"]
               },
               {
                  number: 2,
                  title: "Monitoring Setup",
                  duration: "Woche 2-3",
                  deliverables: ["competitor tracking", "review aggregation", "social listening", "20+ api integrationen"]
               },
               {
                  number: 3,
                  title: "Alerts & Reports",
                  duration: "Woche 3-4",
                  deliverables: ["critical alerts (slack/email/sms)", "weekly digest", "ai insight generation"]
               },
               {
                  number: 4,
                  title: "Intelligence Dashboard",
                  duration: "Woche 4-5",
                  deliverables: ["looker studio dashboard (6 pages)", "materialized views", "auto-refresh workflow"]
               },
               {
                  number: 5,
                  title: "Testing & Launch",
                  duration: "Woche 5-6",
                  deliverables: ["end-to-end testing", "team training (4h)", "dokumentation"]
               }
            ],

            // NEW: Pricing tiers
            pricing: {
               starter: {
                  label: "Basic",
                  price: "€3.500-€6.000",
                  description: "Competitor tracking + customer feedback",
                  includes: ["5 competitors monitored", "2 review platforms", "weekly digest", "30 tage support"],
                  recommended: false
               },
               professional: {
                  label: "Standard",
                  price: "€9.000-€15.000",
                  description: "Complete intelligence system",
                  includes: ["10 competitors", "6 review platforms", "social listening", "ai insights", "90 tage support"],
                  recommended: true
               },
               enterprise: {
                  label: "Advanced",
                  price: "€18.000-€30.000",
                  description: "Custom intelligence + predictive analytics",
                  includes: ["unlimited competitors", "custom data sources", "predictive models", "6 monate support"],
                  recommended: false
               }
            },

            // EXISTING: Keep current structure
            whatIncluded: [
               "competitor monitoring (preise, produkte, hiring, website-changes)",
               "review aggregation (g2, capterra, trustpilot, google, app/play store)",
               "social listening (twitter, reddit, linkedin, youtube, hacker news)",
               "ai sentiment analysis + theme extraction",
               "critical alerts (preisänderungen, launches, complaints)",
               "weekly intelligence digest (competitor + customer + market trends)",
            ],
            whoIsItFor: [
               "manuelle marktforschung kostet 10+ stunden/woche",
               "wettbewerber-changes werden zu spät erkannt (4+ wochen)",
               "kundenfeedback liegt verstreut und wird nicht systematisch analysiert",
               "strategische entscheidungen basieren auf bauchgefühl statt daten",
            ],
            expectedResults: [
               "92% weniger zeit für manuelle recherche",
               "bedrohungen in 2 tagen statt 4 wochen erkennen",
               "12-15 strategische insights pro monat (statt 2-3)",
            ],

            // NEW: FAQ section
            faq: [
               {
                  question: "Wie lange dauert die Implementierung?",
                  answer: "5-6 Wochen für das komplette System. Du kannst mit Basic Monitoring (Competitor Tracking + Feedback Aggregation) in 3 Wochen starten."
               },
               {
                  question: "Wie viele Wettbewerber soll ich tracken?",
                  answer: "Start mit 5-7 direkten Wettbewerbern. Qualität > Quantität. Besser 5 intensiv überwachen als 20 oberflächlich."
               },
               {
                  question: "Was wenn ich keine Review-Daten habe?",
                  answer: "Du kannst trotzdem Support-Tickets, Surveys und Market Trends nutzen. Das System adaptiert sich an verfügbare Datenquellen. Selbst mit 2-3 Quellen bekommst du wertvolle Insights."
               },
               {
                  question: "Kann ich das ohne AI (GPT-4/Claude) nutzen?",
                  answer: "Ja, aber Insights sind weniger sophisticated. Du kannst regelbasierte Analysen (Threshold-Alerts, Keyword-Matching) statt AI nutzen. ROI sinkt um ~40% ohne AI."
               },
               {
                  question: "Was wenn ein Wettbewerber meinen Scraper blockt?",
                  answer: "Mehrere Lösungen: (1) Apify Pre-built Scrapers (robuster), (2) IP-Rotation/Proxies, (3) ChangeDetection.io als Backup, (4) Für kritische Wettbewerber: manuelles Update monatlich."
               }
            ],

            // NEW: Related projects
            relatedProjects: ["market-pulse-dashboard"],

            cta: {
               label: "intelligence hub check vereinbaren",
            },
         },
         "growth-engine": {
            slug: "growth-engine",
            title: "the growth engine",
            subtitle: "automated content creation & distribution",
            heroTagline: "3x content output, 80% weniger zeit",
            description: "die 'growth engine' transformiert content-marketing von manuellem chaos in eine skalierbare wachstumsmaschine. kombiniert 2 super-workflows: content factory (ideation → blog → social → email) + youtube growth loop (trending topics → scripts → publishing).",
            icon: "seo",
            stack: ["n8n", "PostgreSQL", "OpenAI GPT-4", "WordPress", "YouTube API"],

            // NEW: Super-Workflow modules
            modules: [
               {
                  name: "Content Factory",
                  slug: "content-factory",
                  description: "ideation → generation → publishing → performance tracking → optimization",
                  descriptionShort: "end-to-end content automation",
                  roi: "2,150%",
                  timeline: "4-5 wochen",
                  status: "production-ready"
               },
               {
                  name: "YouTube Growth Loop",
                  slug: "youtube-growth-loop",
                  description: "trending topics → scripts → metadata → publishing → optimization",
                  descriptionShort: "youtube automation system",
                  roi: "3,411%",
                  timeline: "4-6 wochen",
                  status: "production-ready"
               }
            ],

            // NEW: Detailed technology stack
            technology: {
               automation: { name: "n8n", cost: "€0-100/monat", description: "workflow automation" },
               database: { name: "PostgreSQL 14+", cost: "€0-30/monat", description: "content warehouse" },
               ai: { name: "OpenAI GPT-4 + DALL-E 3", cost: "€100-250/monat", description: "blog generation + images (12 posts/monat)" },
               cms: { name: "WordPress", cost: "€5-25/monat", description: "blog platform mit rest api" },
               social: { name: "LinkedIn + Twitter + YouTube APIs", cost: "€0/monat", description: "multi-platform publishing" },
               email: { name: "Brevo / ActiveCampaign", cost: "€25-50/monat", description: "newsletter automation" },
               analytics: { name: "Looker Studio", cost: "€0/monat", description: "content performance dashboard" }
            },

            // UPDATED: More specific metrics
            metrics: [
               { value: 200, suffix: "%", label: "mehr content output (4 → 12 posts/monat)" },
               { value: 83, suffix: "%", label: "zeitersparnis (18h → 3h/woche)" },
               { value: 243, suffix: "%", label: "organisches traffic-wachstum" },
            ],

            // NEW: Implementation phases
            phases: [
               {
                  number: 1,
                  title: "Architektur Design",
                  duration: "Woche 1",
                  deliverables: ["6 workflows", "content scoring model", "database schema"]
               },
               {
                  number: 2,
                  title: "Platform Setup",
                  duration: "Woche 2",
                  deliverables: ["wordpress rest api", "social apis", "youtube api", "email platform"]
               },
               {
                  number: 3,
                  title: "Content Templates",
                  duration: "Woche 3",
                  deliverables: ["blog prompts", "social prompts", "seo formulas", "quality checklist"]
               },
               {
                  number: 4,
                  title: "Performance Dashboard",
                  duration: "Woche 4",
                  deliverables: ["looker studio dashboard", "roi tracking", "optimization opportunities"]
               },
               {
                  number: 5,
                  title: "Testing & Launch",
                  duration: "Woche 5",
                  deliverables: ["qa testing", "first automated posts", "team training"]
               }
            ],

            // NEW: Pricing tiers
            pricing: {
               starter: {
                  label: "Starter",
                  price: "€3.000-€5.000",
                  description: "Content Factory (Blog + Social)",
                  includes: ["blog automation", "2 social platforms", "basic dashboard", "30 tage support"],
                  recommended: false
               },
               professional: {
                  label: "Professional",
                  price: "€7.000-€10.000",
                  description: "Content Factory + Email + YouTube",
                  includes: ["complete multi-platform", "youtube automation", "performance tracking", "90 tage support"],
                  recommended: true
               },
               enterprise: {
                  label: "Enterprise",
                  price: "€12.000-€18.000",
                  description: "Beide Growth Engine Module + Custom",
                  includes: ["content factory", "youtube growth loop", "custom integrations", "6 monate support"],
                  recommended: false
               }
            },

            // EXISTING: Keep current structure
            whatIncluded: [
               "content ideation (youtube trends, google trends, keywords)",
               "ai blog generation (gpt-4, 1.800-2.200 worte)",
               "multi-platform publishing (wordpress, linkedin, twitter, youtube, email)",
               "performance tracking (traffic, engagement, conversions)",
               "content repurposing (blog → video, video → social)",
               "optimization engine (seo updates für underperformer)",
            ],
            whoIsItFor: [
               "content teams verbringen 18+ stunden/woche mit manuellem posting",
               "du publizierst 2-4 blog posts/monat aber brauchst 12+",
               "content liegt in google docs statt traffic/leads zu generieren",
               "cross-platform distribution ist manuell und zeitaufwendig",
            ],
            expectedResults: [
               "3x content output bei gleicher teamgröße",
               "83% zeitersparnis (18h → 3h/woche)",
               "200%+ organisches traffic-wachstum (6 monate)",
            ],

            // NEW: FAQ section
            faq: [
               {
                  question: "Wie lange dauert die Implementierung?",
                  answer: "4-5 Wochen für die komplette Content Factory. Du kannst mit Basic Automation (Ideation + Blog Generator + WordPress Publisher) in 2 Wochen starten."
               },
               {
                  question: "Was wenn der AI-generierte Content nicht gut genug ist?",
                  answer: "Wir iterieren an Prompts bis Qualität 80-90% erreicht (kleine Edits nötig vor Publish). Inkludiere deine besten Beispiele, spezifische Instructions und unique Insights in Prompts. Meiste Clients sehen production-ready Drafts nach 2-3 Wochen Prompt-Optimierung."
               },
               {
                  question: "Was kostet es monatlich für Tools?",
                  answer: "€150-400/Monat: n8n Cloud (€50-100) + OpenAI API (€100-250 für 12 blog posts/monat) + Email-Plattform (€25-50) + Hosting (€20-50). Total Setup-Kosten: €3.000-6.000 einmalig."
               },
               {
                  question: "Kann ich das für nicht-englischen Content nutzen?",
                  answer: "Ja. Einfach Prompts für deine Sprache anpassen. GPT-4 unterstützt 50+ Sprachen. DALL-E funktioniert für alle Sprachen (Bilder sind universal)."
               },
               {
                  question: "Was wenn ich keine Zeit habe 8 Videos/Monat aufzunehmen?",
                  answer: "Start kleiner: Automatisiere Ideas + Scripts, aber publiziere nur 4 Videos/Monat. Du sparst trotzdem 6 Stunden pro Video, und kannst skalieren wenn bereit."
               }
            ],

            // NEW: Related projects
            relatedProjects: ["content-factory", "youtube-growth-loop"],

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
            subtitle: "autonomous sales & customer operations",
            heroTagline: "zero lost leads. automated follow-ups. predictable revenue.",
            description: "the 'control center' automates your entire sales and customer process from lead capture to retention. combines 3 super-workflows: autonomous sales agent (lead → customer), lifecycle guardian (onboarding → retention), administration droid (invoicing → compliance).",
            icon: "crm-email-marketing",
            stack: ["n8n", "PostgreSQL", "HubSpot / Pipedrive", "Stripe", "DocuSign"],

            // NEW: Super-Workflow modules
            modules: [
               {
                  name: "Autonomous Sales Agent",
                  slug: "autonomous-sales-agent",
                  description: "lead capture → enrichment → outreach → conversion",
                  descriptionShort: "automated lead-to-customer pipeline",
                  roi: "3,680%",
                  timeline: "6-8 weeks",
                  status: "production-ready"
               },
               {
                  name: "Lifecycle Guardian",
                  slug: "lifecycle-guardian",
                  description: "onboarding → health scoring → churn prevention → expansion",
                  descriptionShort: "customer success automation",
                  roi: "380%",
                  timeline: "6-8 weeks",
                  status: "production-ready"
               },
               {
                  name: "Administration Droid",
                  slug: "administration-droid",
                  description: "invoicing → contracts → payments → compliance",
                  descriptionShort: "finance & admin automation",
                  roi: "3,500%",
                  timeline: "6-8 weeks",
                  status: "production-ready"
               }
            ],

            // NEW: Detailed technology stack
            technology: {
               automation: { name: "n8n", cost: "€0-100/month", description: "self-hosted or cloud" },
               database: { name: "PostgreSQL 14+", cost: "€0-30/month", description: "supabase or aws rds" },
               crm: { name: "HubSpot / Pipedrive", cost: "€0-45/month", description: "deal pipeline + custom properties" },
               payment: { name: "Stripe", cost: "1.5% + €0.25/transaction", description: "payment processing" },
               signature: { name: "DocuSign / PandaDoc", cost: "€25/month", description: "e-signature" },
               analytics: { name: "Looker Studio", cost: "€0/month", description: "real-time dashboards" },
               communication: { name: "Slack + Brevo/SendGrid", cost: "€0-25/month", description: "alerts + email sequences" }
            },

            // UPDATED: More specific metrics
            metrics: [
               { value: 98, suffix: "%", label: "faster lead response (6h → 4min)" },
               { value: 86, suffix: "%", label: "reduction in lost leads" },
               { value: 325, suffix: "%", label: "more booked meetings" },
            ],

            // NEW: Implementation phases
            phases: [
               {
                  number: 1,
                  title: "Architecture Design",
                  duration: "Week 1-2",
                  deliverables: ["workflow architecture", "database schema", "integration design"]
               },
               {
                  number: 2,
                  title: "Platform Setup",
                  duration: "Week 2-3",
                  deliverables: ["crm configuration", "api integrations", "webhooks setup"]
               },
               {
                  number: 3,
                  title: "Automation Build",
                  duration: "Week 3-4",
                  deliverables: ["n8n workflows", "email sequences", "scoring models"]
               },
               {
                  number: 4,
                  title: "Dashboard & Analytics",
                  duration: "Week 4-5",
                  deliverables: ["looker studio dashboard", "sql views", "automated reports"]
               },
               {
                  number: 5,
                  title: "Testing & Launch",
                  duration: "Week 5-6",
                  deliverables: ["qa testing", "team training", "documentation"]
               }
            ],

            // NEW: Pricing tiers
            pricing: {
               starter: {
                  label: "Starter",
                  price: "€2,500-€5,000",
                  description: "Single Super-Workflow of your choice",
                  includes: ["architecture design", "basic setup", "2h training", "30-day support"],
                  recommended: false
               },
               professional: {
                  label: "Professional",
                  price: "€7,500-€12,000",
                  description: "Two Super-Workflows + custom integrations",
                  includes: ["complete setup", "custom workflows", "team training (4h)", "90-day support"],
                  recommended: true
               },
               enterprise: {
                  label: "Enterprise",
                  price: "€15,000-€25,000",
                  description: "All three Control Center modules",
                  includes: ["white-glove setup", "custom development", "quarterly reviews", "6-month support"],
                  recommended: false
               }
            },

            // EXISTING: Keep current structure
            whatIncluded: [
               "CRM setup (HubSpot/Pipedrive) with pipeline and status logic",
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

            // NEW: FAQ section
            faq: [
               {
                  question: "How long does implementation take?",
                  answer: "6-8 weeks for the complete Control Center. You can start with one Super-Workflow (e.g., Autonomous Sales Agent) in 2-3 weeks and expand later."
               },
               {
                  question: "Do I need technical skills?",
                  answer: "Basic technical knowledge is helpful but not required. If you're comfortable with Zapier or Make.com, you can handle this. Otherwise, we provide full-service setup (included in Professional/Enterprise packages)."
               },
               {
                  question: "What's the monthly cost after setup?",
                  answer: "€0-€200/month depending on your stack: n8n self-hosted (€0) or cloud (€50-100), HubSpot Free (€0) or Starter (€45), email platform (€0-25), PostgreSQL Supabase (€0-25). Starter typically €0-50/month, Professional €100-200/month."
               },
               {
                  question: "Can I customize the workflows?",
                  answer: "Absolutely. All n8n workflows are fully editable. We provide baseline implementations, then customize to fit your specific business processes, tools, and team structure."
               },
               {
                  question: "What if workflows break or need updates?",
                  answer: "We build monitoring and alerts (Slack notifications for errors). Workflows are designed to be resilient with fallback logic. Support packages include optimization reviews and updates."
               }
            ],

            // NEW: Related projects
            relatedProjects: ["autonomous-sales-agent", "lifecycle-guardian", "administration-droid"],

            cta: {
               label: "book a control center first check",
            },
         },
         "intelligence-hub": {
            slug: "intelligence-hub",
            title: "the intelligence hub",
            subtitle: "competitive intelligence & market monitoring",
            heroTagline: "24/7 automated market monitoring instead of manual research",
            description: "the 'intelligence hub' monitors competitors, customer feedback, and market trends 24/7. ai-powered insights deliver strategic advantages before your competition reacts.",
            icon: "analytics",
            stack: ["n8n", "PostgreSQL", "Puppeteer/Apify", "OpenAI GPT-4", "Looker Studio"],

            // NEW: Super-Workflow modules
            modules: [
               {
                  name: "Market Pulse Dashboard",
                  slug: "market-pulse-dashboard",
                  description: "competitor tracking → customer feedback → market trends → ai insights",
                  descriptionShort: "360° competitive intelligence automation",
                  roi: "2,450%",
                  timeline: "5-6 weeks",
                  status: "production-ready"
               }
            ],

            // NEW: Detailed technology stack
            technology: {
               automation: { name: "n8n", cost: "€0-100/month", description: "workflow automation platform" },
               database: { name: "PostgreSQL 14+", cost: "€0-30/month", description: "data warehouse" },
               scraping: { name: "Puppeteer / Apify", cost: "€0-50/month", description: "web scraping + competitor monitoring" },
               ai: { name: "OpenAI GPT-4 / Claude", cost: "€20-50/month", description: "strategic insight generation" },
               analytics: { name: "Looker Studio", cost: "€0/month", description: "intelligence dashboards" },
               communication: { name: "Slack", cost: "€0/month", description: "critical alerts" }
            },

            // UPDATED: More specific metrics
            metrics: [
               { value: 92, suffix: "%", label: "less manual research (12h → 1h/week)" },
               { value: 217, suffix: "%", label: "more competitor changes detected" },
               { value: 2, suffix: "days", label: "threat detection (vs 4 weeks)" },
            ],

            // NEW: Implementation phases
            phases: [
               {
                  number: 1,
                  title: "Architecture & Database",
                  duration: "Week 1-2",
                  deliverables: ["6 workflows design", "postgresql schema", "data model"]
               },
               {
                  number: 2,
                  title: "Monitoring Setup",
                  duration: "Week 2-3",
                  deliverables: ["competitor tracking", "review aggregation", "social listening", "20+ api integrations"]
               },
               {
                  number: 3,
                  title: "Alerts & Reports",
                  duration: "Week 3-4",
                  deliverables: ["critical alerts (slack/email/sms)", "weekly digest", "ai insight generation"]
               },
               {
                  number: 4,
                  title: "Intelligence Dashboard",
                  duration: "Week 4-5",
                  deliverables: ["looker studio dashboard (6 pages)", "materialized views", "auto-refresh workflow"]
               },
               {
                  number: 5,
                  title: "Testing & Launch",
                  duration: "Week 5-6",
                  deliverables: ["end-to-end testing", "team training (4h)", "documentation"]
               }
            ],

            // NEW: Pricing tiers
            pricing: {
               starter: {
                  label: "Basic",
                  price: "€3,500-€6,000",
                  description: "Competitor tracking + customer feedback",
                  includes: ["5 competitors monitored", "2 review platforms", "weekly digest", "30-day support"],
                  recommended: false
               },
               professional: {
                  label: "Standard",
                  price: "€9,000-€15,000",
                  description: "Complete intelligence system",
                  includes: ["10 competitors", "6 review platforms", "social listening", "ai insights", "90-day support"],
                  recommended: true
               },
               enterprise: {
                  label: "Advanced",
                  price: "€18,000-€30,000",
                  description: "Custom intelligence + predictive analytics",
                  includes: ["unlimited competitors", "custom data sources", "predictive models", "6-month support"],
                  recommended: false
               }
            },

            // EXISTING: Keep current structure
            whatIncluded: [
               "competitor monitoring (pricing, products, hiring, website changes)",
               "review aggregation (g2, capterra, trustpilot, google, app/play store)",
               "social listening (twitter, reddit, linkedin, youtube, hacker news)",
               "ai sentiment analysis + theme extraction",
               "critical alerts (price changes, launches, complaints)",
               "weekly intelligence digest (competitor + customer + market trends)",
            ],
            whoIsItFor: [
               "manual market research costs 10+ hours/week",
               "competitor changes detected too late (4+ weeks)",
               "customer feedback scattered and not systematically analyzed",
               "strategic decisions based on gut feeling instead of data",
            ],
            expectedResults: [
               "92% less time on manual research",
               "detect threats in 2 days instead of 4 weeks",
               "12-15 strategic insights per month (instead of 2-3)",
            ],

            // NEW: FAQ section
            faq: [
               {
                  question: "How long does implementation take?",
                  answer: "5-6 weeks for the complete system. You can start with Basic Monitoring (Competitor Tracking + Feedback Aggregation) in 3 weeks."
               },
               {
                  question: "How many competitors should I track?",
                  answer: "Start with 5-7 direct competitors. Quality > quantity. Better to deeply monitor 5 than superficially monitor 20."
               },
               {
                  question: "What if I don't have review data?",
                  answer: "You can still use support tickets, surveys, and market trends. The system adapts to available data sources. Even with 2-3 sources, you get valuable insights."
               },
               {
                  question: "Can I use this without AI (GPT-4/Claude)?",
                  answer: "Yes, but insights are less sophisticated. You can use rule-based analysis (threshold alerts, keyword matching) instead of AI. ROI decreases by ~40% without AI."
               },
               {
                  question: "What if a competitor blocks my scraper?",
                  answer: "Multiple solutions: (1) Apify pre-built scrapers (more robust), (2) IP rotation/proxies, (3) ChangeDetection.io as backup, (4) For critical competitors: manual update monthly."
               }
            ],

            // NEW: Related projects
            relatedProjects: ["market-pulse-dashboard"],

            cta: {
               label: "book an intelligence hub check",
            },
         },
         "growth-engine": {
            slug: "growth-engine",
            title: "the growth engine",
            subtitle: "automated content creation & distribution",
            heroTagline: "3x content output, 80% less time",
            description: "the 'growth engine' transforms content marketing from manual chaos into a scalable growth machine. combines 2 super-workflows: content factory (ideation → blog → social → email) + youtube growth loop (trending topics → scripts → publishing).",
            icon: "seo",
            stack: ["n8n", "PostgreSQL", "OpenAI GPT-4", "WordPress", "YouTube API"],

            // NEW: Super-Workflow modules
            modules: [
               {
                  name: "Content Factory",
                  slug: "content-factory",
                  description: "ideation → generation → publishing → performance tracking → optimization",
                  descriptionShort: "end-to-end content automation",
                  roi: "2,150%",
                  timeline: "4-5 weeks",
                  status: "production-ready"
               },
               {
                  name: "YouTube Growth Loop",
                  slug: "youtube-growth-loop",
                  description: "trending topics → scripts → metadata → publishing → optimization",
                  descriptionShort: "youtube automation system",
                  roi: "3,411%",
                  timeline: "4-6 weeks",
                  status: "production-ready"
               }
            ],

            // NEW: Detailed technology stack
            technology: {
               automation: { name: "n8n", cost: "€0-100/month", description: "workflow automation" },
               database: { name: "PostgreSQL 14+", cost: "€0-30/month", description: "content warehouse" },
               ai: { name: "OpenAI GPT-4 + DALL-E 3", cost: "€100-250/month", description: "blog generation + images (12 posts/month)" },
               cms: { name: "WordPress", cost: "€5-25/month", description: "blog platform with rest api" },
               social: { name: "LinkedIn + Twitter + YouTube APIs", cost: "€0/month", description: "multi-platform publishing" },
               email: { name: "Brevo / ActiveCampaign", cost: "€25-50/month", description: "newsletter automation" },
               analytics: { name: "Looker Studio", cost: "€0/month", description: "content performance dashboard" }
            },

            // UPDATED: More specific metrics
            metrics: [
               { value: 200, suffix: "%", label: "more content output (4 → 12 posts/month)" },
               { value: 83, suffix: "%", label: "time saved (18h → 3h/week)" },
               { value: 243, suffix: "%", label: "organic traffic growth" },
            ],

            // NEW: Implementation phases
            phases: [
               {
                  number: 1,
                  title: "Architecture Design",
                  duration: "Week 1",
                  deliverables: ["6 workflows", "content scoring model", "database schema"]
               },
               {
                  number: 2,
                  title: "Platform Setup",
                  duration: "Week 2",
                  deliverables: ["wordpress rest api", "social apis", "youtube api", "email platform"]
               },
               {
                  number: 3,
                  title: "Content Templates",
                  duration: "Week 3",
                  deliverables: ["blog prompts", "social prompts", "seo formulas", "quality checklist"]
               },
               {
                  number: 4,
                  title: "Performance Dashboard",
                  duration: "Week 4",
                  deliverables: ["looker studio dashboard", "roi tracking", "optimization opportunities"]
               },
               {
                  number: 5,
                  title: "Testing & Launch",
                  duration: "Week 5",
                  deliverables: ["qa testing", "first automated posts", "team training"]
               }
            ],

            // NEW: Pricing tiers
            pricing: {
               starter: {
                  label: "Starter",
                  price: "€3,000-€5,000",
                  description: "Content Factory (Blog + Social)",
                  includes: ["blog automation", "2 social platforms", "basic dashboard", "30-day support"],
                  recommended: false
               },
               professional: {
                  label: "Professional",
                  price: "€7,000-€10,000",
                  description: "Content Factory + Email + YouTube",
                  includes: ["complete multi-platform", "youtube automation", "performance tracking", "90-day support"],
                  recommended: true
               },
               enterprise: {
                  label: "Enterprise",
                  price: "€12,000-€18,000",
                  description: "Both Growth Engine modules + Custom",
                  includes: ["content factory", "youtube growth loop", "custom integrations", "6-month support"],
                  recommended: false
               }
            },

            // EXISTING: Keep current structure
            whatIncluded: [
               "content ideation (youtube trends, google trends, keywords)",
               "ai blog generation (gpt-4, 1,800-2,200 words)",
               "multi-platform publishing (wordpress, linkedin, twitter, youtube, email)",
               "performance tracking (traffic, engagement, conversions)",
               "content repurposing (blog → video, video → social)",
               "optimization engine (seo updates for underperformers)",
            ],
            whoIsItFor: [
               "content teams spend 18+ hours/week on manual posting",
               "you publish 2-4 blog posts/month but need 12+",
               "content sits in google docs instead of generating traffic/leads",
               "cross-platform distribution is manual and time-consuming",
            ],
            expectedResults: [
               "3x content output with same team size",
               "83% time savings (18h → 3h/week)",
               "200%+ organic traffic growth (6 months)",
            ],

            // NEW: FAQ section
            faq: [
               {
                  question: "How long does implementation take?",
                  answer: "4-5 weeks for the complete Content Factory. You can start with Basic Automation (Ideation + Blog Generator + WordPress Publisher) in 2 weeks."
               },
               {
                  question: "What if AI-generated content isn't good enough?",
                  answer: "We iterate on prompts until quality reaches 80-90% (minor edits needed before publish). Include your best examples, specific instructions, and unique insights in prompts. Most clients see production-ready drafts after 2-3 weeks of prompt optimization."
               },
               {
                  question: "What's the monthly cost for tools?",
                  answer: "€150-400/month: n8n Cloud (€50-100) + OpenAI API (€100-250 for 12 blog posts/month) + email platform (€25-50) + hosting (€20-50). Total setup cost: €3,000-6,000 one-time."
               },
               {
                  question: "Can I use this for non-English content?",
                  answer: "Yes. Just customize prompts for your language. GPT-4 supports 50+ languages. DALL-E works for all languages (images are universal)."
               },
               {
                  question: "What if I don't have time to record 8 videos/month?",
                  answer: "Start smaller: Automate ideas + scripts, but only publish 4 videos/month. You still save 6 hours per video, and can scale when ready."
               }
            ],

            // NEW: Related projects
            relatedProjects: ["content-factory", "youtube-growth-loop"],

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
