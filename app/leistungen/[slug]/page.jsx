import { notFound } from "next/navigation";
import ServiceDetail from "@/components/ServiceDetail";
import { getAllServiceSlugs, getServiceBySlug } from "@/data/services";

// Generate static params for all services
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

// SEO metadata for each service
const SERVICE_META = {
  "seo": {
    title: "SEO & Local SEO Beratung in OWL | Andrii Litkovskyi",
    description: "SEO-Optimierung für Praxen, Handwerker und Dienstleister in Minden-Lübbecke und OWL. Bei Google gefunden werden — technisch sauber, lokal sichtbar. +50% organische Sichtbarkeit.",
    keywords: "SEO Beratung OWL, Local SEO Minden, SEO Bielefeld, Suchmaschinenoptimierung Praxis, SEO Handwerker",
  },
  "google-ads": {
    title: "Google Ads Beratung in OWL | Andrii Litkovskyi",
    description: "Google Ads für lokale Unternehmen in Minden-Lübbecke und OWL. Sofort sichtbar bei Google — präzises Geo-Targeting, messbare Ergebnisse. 2-3x mehr Anfragen.",
    keywords: "Google Ads Beratung OWL, Google Ads Minden, AdWords Bielefeld, PPC Agentur, Google Werbung lokal",
  },
  "paid-social": {
    title: "Paid Social & Meta Ads Beratung | Andrii Litkovskyi",
    description: "Facebook und Instagram Ads für lokale Unternehmen in OWL. Zielgruppe erreichen, bevor sie suchen. Retargeting und Markenbekanntheit aufbauen.",
    keywords: "Facebook Ads OWL, Instagram Werbung, Meta Ads Beratung, Social Media Marketing Minden, Paid Social",
  },
  "web-analytics": {
    title: "Web Analytics & Tracking Setup | Andrii Litkovskyi",
    description: "GA4 Setup, Google Tag Manager, Conversion-Tracking für bessere Marketing-Entscheidungen. Wissen, was funktioniert — keine Bauchgefühle, sondern Daten.",
    keywords: "Google Analytics Beratung, GA4 Setup, Tag Manager, Conversion Tracking, Web Analytics",
  },
  "crm-automatisierung": {
    title: "CRM & Marketing-Automatisierung | Andrii Litkovskyi",
    description: "HubSpot Beratung und Marketing-Automation für KMU. Aus Leads Kunden machen — ohne manuelles Nachfassen. 30% weniger manuelle Arbeit.",
    keywords: "HubSpot Beratung, CRM Setup, Marketing Automatisierung, E-Mail Marketing, Lead Management",
  },
};

// Generate metadata for each service
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const serviceData = getServiceBySlug(slug, "de");
  const serviceMeta = SERVICE_META[slug];

  if (!serviceData || !serviceMeta) {
    return {
      title: "Leistung nicht gefunden",
    };
  }

  return {
    title: serviceMeta.title,
    description: serviceMeta.description,
    keywords: serviceMeta.keywords,
    alternates: {
      canonical: `/leistungen/${slug}`,
      languages: {
        de: `/leistungen/${slug}`,
        en: `/leistungen/${slug}`,
        "x-default": `/leistungen/${slug}`,
      },
    },
    openGraph: {
      title: serviceMeta.title,
      description: serviceMeta.description,
      url: `/leistungen/${slug}`,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const serviceData = getServiceBySlug(slug);

  if (!serviceData) {
    notFound();
  }

  return (
    <main className="app-main">
      <ServiceDetail slug={slug} />
    </main>
  );
}
