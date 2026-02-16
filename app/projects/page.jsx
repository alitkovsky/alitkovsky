import ProjectsList from "@/components/ProjectsList";

export const metadata = {
  title: "Projekte: Systemintegration & Prozessoptimierung | Andrii Litkovskyi",
  description: "Praxisbeispiele fuer CRM-Integration, Tracking-Qualitaet und automatisierte Prozesse mit messbarer Entlastung im Tagesgeschaeft.",
  alternates: {
    canonical: '/projects',
    languages: {
      'de': '/projects',
      'en': '/projects',
      'x-default': '/projects',
    },
  },
  openGraph: {
    title: "Ergebnisse durch Struktur und Umsetzung | Andrii Litkovskyi",
    description: "Case Studies: bessere Datenqualitaet, klarere Prozesse und effizientere digitale Arbeitsablaeufe.",
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
