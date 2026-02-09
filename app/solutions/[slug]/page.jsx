import { notFound, redirect } from "next/navigation";
import ServiceDetail from "@/components/ServiceDetail";
import { getAllSystemSlugs, getSystemBySlug } from "@/data/systems";

// Generate static params for all solutions
export async function generateStaticParams() {
  const slugs = getAllSystemSlugs();
  return slugs.map((slug) => ({ slug }));
}

const LEGACY_MAPPING = {
  "seo": "growth-engine",
  "google-ads": "intelligence-hub",
  "paid-social": "growth-engine",
  "web-analytics": "intelligence-hub",
  "crm-automatisierung": "control-center",
};

// SEO metadata for each solution
const SERVICE_META = {
  "control-center": {
    title: "The Control Center | Sales Automation & CRM",
    description: "Automate your sales process. Zero leakage, instant follow-ups, and higher close rates. CRM setup and n8n/Make automation.",
    keywords: "CRM Automation, Sales Pipeline, Pipedrive, HubSpot, n8n, Make.com",
  },
  "intelligence-hub": {
    title: "The Intelligence Hub | Data & Tracking",
    description: "Server-side tracking and profit attribution. Connect ad spend to real revenue. GA4, GTM, and Offline Conversions.",
    keywords: "Server-side Tracking, CAPI, Google Ads Tracking, Attribution, Data Analytics",
  },
  "growth-engine": {
    title: "The Growth Engine | Marketing Operations",
    description: "Automate your marketing routine. Inventory sync, reviews, and retention flows. Scalable operations on autopilot.",
    keywords: "Marketing Automation, E-commerce Automation, Shopify, Klaviyo, Review Management",
  },
};

// Generate metadata for each solution
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Handle redirects in metadata? No, just let page redirect. 
  // But to avoid 500 error if slug is not found in systems, check legacy mapping.
  if (LEGACY_MAPPING[slug]) {
    return {}; // Return empty or basic meta, redirect will happen in page
  }

  const serviceData = getSystemBySlug(slug, "de");
  const serviceMeta = SERVICE_META[slug];

  if (!serviceData || !serviceMeta) {
    return {
      title: "System nicht gefunden",
    };
  }

  return {
    title: serviceMeta.title,
    description: serviceMeta.description,
    keywords: serviceMeta.keywords,
    alternates: {
      canonical: `/solutions/${slug}`,
      languages: {
        de: `/solutions/${slug}`,
        en: `/solutions/${slug}`,
        "x-default": `/solutions/${slug}`,
      },
    },
    openGraph: {
      title: serviceMeta.title,
      description: serviceMeta.description,
      url: `/solutions/${slug}`,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;

  if (LEGACY_MAPPING[slug]) {
    redirect(`/solutions/${LEGACY_MAPPING[slug]}`);
  }

  const serviceData = getSystemBySlug(slug);

  if (!serviceData) {
    notFound();
  }

  return (
    <main className="app-main">
      <ServiceDetail slug={slug} />
    </main>
  );
}
