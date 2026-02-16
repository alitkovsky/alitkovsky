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
    title: "The Control Center | CRM & Workflow Operations",
    description: "Structured CRM processes, clear responsibilities, and automated follow-ups for reliable lead handling.",
    keywords: "CRM Integration, Workflow Operations, HubSpot, Pipedrive, Process Documentation, Lead Routing",
  },
  "intelligence-hub": {
    title: "The Intelligence Hub | Data Quality & Reporting",
    description: "Clean tracking, clear KPI dashboards, and decision-ready data for day-to-day operations.",
    keywords: "Data Quality, GA4, GTM, Reporting, Consent Mode, Process Controlling",
  },
  "growth-engine": {
    title: "The Growth Engine | Process Automation",
    description: "Automate recurring tasks across marketing and backoffice to reduce manual routine and speed up execution.",
    keywords: "Process Automation, Operations Efficiency, Workflow Automation, n8n, Make, Backoffice",
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
