import { notFound, redirect } from "next/navigation";
import ServiceDetail from "@/components/ServiceDetail";
import { getAllSystemSlugs, getSystemBySlug } from "@/data/systems";

const LEGACY_MAPPING = {
  seo: "growth-engine",
  "google-ads": "intelligence-hub",
  "paid-social": "growth-engine",
  "web-analytics": "intelligence-hub",
  "crm-automatisierung": "control-center",
};

export async function generateStaticParams() {
  const slugs = getAllSystemSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (LEGACY_MAPPING[slug]) {
    return {};
  }

  const serviceData = getSystemBySlug(slug, "en");
  if (!serviceData) {
    return {
      title: "Solution not found",
    };
  }

  return {
    title: `${serviceData.title} | Andrii Litkovskyi`,
    description: serviceData.description,
    alternates: {
      canonical: `/en/solutions/${slug}`,
      languages: {
        de: `/solutions/${slug}`,
        en: `/en/solutions/${slug}`,
        "x-default": `/solutions/${slug}`,
      },
    },
    openGraph: {
      title: serviceData.title,
      description: serviceData.description,
      url: `/en/solutions/${slug}`,
      type: "article",
    },
  };
}

export default async function ServiceDetailPageEn({ params }) {
  const { slug } = await params;

  if (LEGACY_MAPPING[slug]) {
    redirect(`/en/solutions/${LEGACY_MAPPING[slug]}`);
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
