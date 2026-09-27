import { notFound } from "next/navigation";
import SolutionDetail from "@/components/SolutionDetail";
import { getAllSystemSlugs, getSystemBySlug } from "@/data/solutions";

// Renamed legacy slugs redirect in public/_redirects.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllSystemSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
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
  const serviceData = getSystemBySlug(slug);
  if (!serviceData) {
    notFound();
  }

  return (
    <main className="app-main">
      <SolutionDetail slug={slug} />
    </main>
  );
}
