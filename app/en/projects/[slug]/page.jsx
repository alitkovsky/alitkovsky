import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const projectData = getProjectBySlug(slug, "en");

  if (!projectData) {
    return {
      title: "Project not found",
    };
  }

  const title = `${projectData.title} - Andrii Litkovskyi`;
  const description = projectData.hero || projectData.subtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `/en/projects/${slug}`,
      languages: {
        de: `/projects/${slug}`,
        en: `/en/projects/${slug}`,
        "x-default": `/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/en/projects/${slug}`,
      type: "article",
    },
  };
}

export default async function ProjectDetailPageEn({ params }) {
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
