import ProjectsList from "@/components/ProjectsList";

export const metadata = {
  title: "Marketing Projekte & Case Studies | Andrii Litkovskyi",
  description: "Marketing-Projekte mit messbaren Ergebnissen: +70% Buchungen, +35% Traffic. SEO, Google Ads, und Marketing-Automation für lokale Unternehmen.",
  alternates: {
    canonical: '/projects',
    languages: {
      'de': '/projects',
      'en': '/projects',
      'x-default': '/projects',
    },
  },
  openGraph: {
    title: "Marketing Projekte & Case Studies | Andrii Litkovskyi",
    description: "Marketing-Projekte mit messbaren Ergebnissen: +70% Buchungen, +35% Traffic. SEO, Google Ads, und Marketing-Automation für lokale Unternehmen.",
    url: '/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return (
    <main className="app-main">
      <ProjectsList />
    </main>
  );
}
