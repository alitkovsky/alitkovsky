import ProjectsList from "@/components/ProjectsList";

export const metadata = {
  title: "Projekte: System-Integration & Performance | Andrii Litkovskyi",
  description: "Fallstudien zu Prozessoptimierung und Marketing. Wie durch saubere Datenstrukturen und Automatisierung +70% Buchungen und effizientere Abläufe entstanden sind.",
  alternates: {
    canonical: '/projects',
    languages: {
      'de': '/projects',
      'en': '/projects',
      'x-default': '/projects',
    },
  },
  openGraph: {
    title: "Ergebnisse durch Struktur & Strategie | Andrii Litkovskyi",
    description: "Praxisbeispiele: Erfolgreiche Implementierung von CRM-Lösungen, Tracking-Konzepten und Performance-Kampagnen.",
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
