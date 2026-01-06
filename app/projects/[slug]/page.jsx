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

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
      languages: {
        de: `/projects/${slug}`,
        en: `/projects/${slug}`,
        "x-default": `/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/projects/${slug}`,
      type: "article",
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
