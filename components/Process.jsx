"use client";

import useLanguage from "@/hooks/useLanguage";

const COPY = {
  de: {
    intro: "kein geheimnis, kein hexenwerk — so läuft's ab, wenn wir zusammenarbeiten. schritt für schritt, transparent und ohne überraschungen.",
    labels: {
      actions: "was passiert",
      fromMe: "von mir",
      fromYou: "von dir",
      result: "ergebnis",
    },
    steps: [
      {
        title: "kontakt",
        description: {
          summary: "du meldest dich — per telefon, whatsapp, formular oder mail. keine förmliche anfrage nötig, einfach schreiben was du brauchst oder dass du quatschen willst.",
          actions: [
            "du schreibst mir eine nachricht oder rufst an",
            "ich melde mich innerhalb von 24h zurück",
            "wir klären kurz, ob ich dir helfen kann",
            "terminvereinbarung für ein erstgespräch",
          ],
          fromMe: [
            "schnelle rückmeldung",
            "erste einschätzung ob's passt",
            "terminvorschläge",
          ],
          fromYou: [
            "kurze info was du suchst",
            "kontaktdaten",
            "optional: link zu deiner aktuellen website",
          ],
          result: "termin für ein kostenloses erstgespräch steht",
        },
      },
      {
        title: "erstgespräch",
        description: {
          summary: "20 minuten, kostenlos, unverbindlich. wir lernen uns kennen, du erzählst was dich beschäftigt, ich höre zu und stelle fragen. kein verkaufsgespräch, versprochen.",
          actions: [
            "videocall oder telefonat (deine wahl)",
            "du erzählst von deinem business und deinen zielen",
            "ich stelle fragen zu zielgruppe, wettbewerb, budget",
            "wir checken ob die chemie stimmt",
            "erste ideen und mögliche ansätze",
          ],
          fromMe: [
            "aktives zuhören",
            "ehrliche einschätzung",
            "erste strategische impulse",
            "keine bullshit-versprechen",
          ],
          fromYou: [
            "20 minuten zeit",
            "offenheit über deine situation",
            "infos zu bisherigen marketing-maßnahmen",
            "vorstellung von budget-rahmen (grob reicht)",
          ],
          result: "klarheit ob wir zusammenpassen + ich hab genug info für die analyse",
        },
      },
      {
        title: "analyse & angebot",
        description: {
          summary: "ich tauche ab in deine branche, deinen wettbewerb, deine online-präsenz. danach bekommst du ein angebot mit festpreis — kein stundenzählen, keine überraschungen.",
          actions: [
            "analyse deiner aktuellen website (technisch + inhaltlich)",
            "wettbewerbsanalyse (was machen andere in deiner branche)",
            "keyword-recherche und suchvolumen-check",
            "identifikation von quick wins und langfristigen potenzialen",
            "erstellung eines individuellen angebots",
          ],
          fromMe: [
            "gründliche analyse (2-3 tage)",
            "dokumentierte erkenntnisse",
            "klares angebot mit festpreis",
            "timeline und meilensteine",
          ],
          fromYou: [
            "zugang zu google analytics (falls vorhanden)",
            "zugang zu google search console (falls vorhanden)",
            "info über bisherige marketing-aktivitäten",
            "geduld (analyse braucht zeit)",
          ],
          result: "transparentes angebot mit festpreis + analyse-dokument mit allen erkenntnissen",
        },
      },
      {
        title: "strategie & umsetzung",
        description: {
          summary: "hier passiert die magie. von der landingpage über google ads bis zum tracking-setup — ich setze um, du lehnst dich zurück. natürlich mit regelmäßigen updates.",
          actions: [
            "entwicklung der marketing-strategie",
            "setup von tracking und analytics",
            "erstellung/optimierung von landingpages",
            "einrichtung von werbekampagnen (google, meta)",
            "seo-optimierung (technisch + inhaltlich)",
            "regelmäßige abstimmung und updates",
          ],
          fromMe: [
            "komplette umsetzung",
            "wöchentliche status-updates",
            "transparente dokumentation",
            "schnelle reaktion bei fragen",
          ],
          fromYou: [
            "feedback zu entwürfen",
            "freigaben (zeitnah, bitte)",
            "inhalte/texte/bilder (falls nicht im paket)",
            "zugänge zu relevanten accounts",
          ],
          result: "fertige, funktionierende marketing-infrastruktur + erste kampagnen laufen",
        },
      },
      {
        title: "optimierung & reporting",
        description: {
          summary: "launch ist erst der anfang. ich behalte die zahlen im blick, optimiere kontinuierlich und halte dich mit reports auf dem laufenden. optional, aber empfohlen.",
          actions: [
            "kontinuierliches monitoring aller kampagnen",
            "a/b-tests und performance-optimierung",
            "monatliche reports mit allen kpis",
            "regelmäßige strategie-reviews",
            "anpassung an marktveränderungen",
          ],
          fromMe: [
            "monatliche reports (verständlich, nicht nur zahlen)",
            "proaktive optimierungsvorschläge",
            "schnelle reaktion bei problemen",
            "transparenz über ergebnisse",
          ],
          fromYou: [
            "feedback zur performance",
            "info über geschäftliche veränderungen",
            "budget-updates falls nötig",
          ],
          result: "stetig bessere ergebnisse + volle transparenz über dein marketing-investment",
        },
      },
    ],
  },
  en: {
    intro: "no secrets, no magic tricks — here's how it works when we team up. step by step, transparent, no surprises.",
    labels: {
      actions: "what happens",
      fromMe: "from me",
      fromYou: "from you",
      result: "result",
    },
    steps: [
      {
        title: "contact",
        description: {
          summary: "you reach out — via phone, whatsapp, form, or email. no formal request needed, just tell me what you need or that you'd like to chat.",
          actions: [
            "you send me a message or give me a call",
            "i get back to you within 24h",
            "we quickly figure out if i can help",
            "schedule a first call",
          ],
          fromMe: [
            "fast response",
            "first assessment if it's a fit",
            "appointment options",
          ],
          fromYou: [
            "brief info on what you're looking for",
            "contact details",
            "optional: link to your current website",
          ],
          result: "free intro call is scheduled",
        },
      },
      {
        title: "intro call",
        description: {
          summary: "20 minutes, free, no strings. we get to know each other, you tell me what's on your mind, i listen and ask questions. no sales pitch, promise.",
          actions: [
            "video call or phone (your choice)",
            "you share about your business and goals",
            "i ask about target audience, competition, budget",
            "we check if there's chemistry",
            "first ideas and possible approaches",
          ],
          fromMe: [
            "active listening",
            "honest assessment",
            "first strategic impulses",
            "no bullshit promises",
          ],
          fromYou: [
            "20 minutes of your time",
            "openness about your situation",
            "info on previous marketing efforts",
            "rough idea of budget range (ballpark is fine)",
          ],
          result: "clarity on whether we're a good fit + i have enough info for the analysis",
        },
      },
      {
        title: "analysis & proposal",
        description: {
          summary: "i dive deep into your industry, competition, and online presence. then you get a fixed-price proposal — no hourly tracking, no surprises.",
          actions: [
            "analysis of your current website (technical + content)",
            "competitor analysis (what others in your industry do)",
            "keyword research and search volume check",
            "identification of quick wins and long-term potential",
            "creation of a tailored proposal",
          ],
          fromMe: [
            "thorough analysis (2-3 days)",
            "documented findings",
            "clear fixed-price proposal",
            "timeline and milestones",
          ],
          fromYou: [
            "access to google analytics (if available)",
            "access to google search console (if available)",
            "info on past marketing activities",
            "patience (analysis takes time)",
          ],
          result: "transparent fixed-price proposal + analysis document with all findings",
        },
      },
      {
        title: "strategy & execution",
        description: {
          summary: "this is where the magic happens. from landing pages to google ads to tracking setup — i execute, you sit back. with regular updates, of course.",
          actions: [
            "development of marketing strategy",
            "tracking and analytics setup",
            "creation/optimization of landing pages",
            "setup of ad campaigns (google, meta)",
            "seo optimization (technical + content)",
            "regular check-ins and updates",
          ],
          fromMe: [
            "complete execution",
            "weekly status updates",
            "transparent documentation",
            "quick response to questions",
          ],
          fromYou: [
            "feedback on drafts",
            "approvals (timely, please)",
            "content/copy/images (if not in package)",
            "access to relevant accounts",
          ],
          result: "finished, working marketing infrastructure + first campaigns running",
        },
      },
      {
        title: "optimization & reporting",
        description: {
          summary: "launch is just the beginning. i keep an eye on the numbers, optimize continuously, and keep you in the loop with reports. optional, but recommended.",
          actions: [
            "continuous monitoring of all campaigns",
            "a/b tests and performance optimization",
            "monthly reports with all kpis",
            "regular strategy reviews",
            "adaptation to market changes",
          ],
          fromMe: [
            "monthly reports (understandable, not just numbers)",
            "proactive optimization suggestions",
            "quick response to issues",
            "transparency about results",
          ],
          fromYou: [
            "feedback on performance",
            "info on business changes",
            "budget updates if needed",
          ],
          result: "continuously improving results + full transparency on your marketing investment",
        },
      },
    ],
  },
};

export default function Process() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.de;

  return (
    <section className="section process" id="process">
      <div className="content">
        <div className="title">
          <p>{copy.intro}</p>
        </div>

        <div className="cards">
          {copy.steps.map((step, index) => (
            <div key={step.title} className="card" data-cursor="link">
              <div className="index">
                <p className="title">{String(index + 1).padStart(2, "0")}</p>
                <i aria-hidden className="plus-icon">+</i>
              </div>

              <p className="stage">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
