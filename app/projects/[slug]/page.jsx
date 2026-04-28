import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each project
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const projectData = getProjectBySlug(slug, "de");

  if (!projectData) {
    return {
      title: "Projekt nicht gefunden",
    };
  }

  const title = `${projectData.title} – Andrii Litkovskyi`;
  const description = projectData.hero || projectData.subtitle;

  // Generate keywords from tags, category, and industry
  const keywords = [
    ...(projectData.tags || []),
    projectData.category,
    projectData.industry,
    "workflow automation",
    "process automation",
    "super-workflow",
    projectData.status?.includes("Production Ready") ? "production ready" : "",
  ]
    .filter(Boolean)
    .join(", ");

  // Get related solution for additional context
  const relatedSolution = projectData.relatedSolution || projectData.category;

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Andrii Litkovskyi" }],
    creator: "Andrii Litkovskyi",
    publisher: "Andrii Litkovskyi",
    category: projectData.category,
    alternates: {
      canonical: `/projects/${slug}`,
      languages: {
        de: `/projects/${slug}`,
        en: `/en/projects/${slug}`,
        "x-default": `/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/projects/${slug}`,
      siteName: "Andrii Litkovskyi - Workflow Automation",
      locale: "de_DE",
      type: "article",
      publishedTime: "2025-03-11T00:00:00.000Z",
      modifiedTime: "2025-03-11T00:00:00.000Z",
      authors: ["Andrii Litkovskyi"],
      tags: projectData.tags,
      images: [
        {
          url: `/og-images/projects/${slug}.png`,
          width: 1200,
          height: 630,
          alt: projectData.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@alitkovsky",
      images: [`/og-images/projects/${slug}.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const projectData = getProjectBySlug(slug);

  if (!projectData) {
    notFound();
  }

  return (
    <main className="app-main">
      <ProjectDetail slug={slug} />
    </main>
  );
}
