import ProjectsList from "@/components/ProjectsList";

export const metadata = {
  title: "Projects: System Integration & Process Optimization | Andrii Litkovskyi",
  description: "Practical examples for CRM integration, tracking quality, and process automation with measurable operational impact.",
  alternates: {
    canonical: "/en/projects",
    languages: {
      de: "/projects",
      en: "/en/projects",
      "x-default": "/projects",
    },
  },
  openGraph: {
    title: "Operational Results Through Structure & Execution | Andrii Litkovskyi",
    description: "Case studies for better data quality, clearer workflows, and more reliable digital operations.",
    url: "/en/projects",
    type: "website",
  },
};

export default function ProjectsPageEn() {
  return (
    <main className="app-main">
      <ProjectsList />
    </main>
  );
}
