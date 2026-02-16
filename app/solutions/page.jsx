import ServicesList from "@/components/ServicesList";

export const metadata = {
  title: "Loesungen: CRM, Prozesse & Daten | Andrii Litkovskyi",
  description: "Einrichtung von CRM-Systemen, strukturierte Automatisierung und klares Reporting. Ich optimiere digitale Prozesse fuer Verwaltung, Vertrieb und Marketing.",
  keywords: "CRM Einrichtung OWL, Prozessoptimierung Hille, Datenanalyse Minden, Digitale Verwaltung, HubSpot Integration, Workflow Automatisierung",
  alternates: {
    canonical: "/solutions",
    languages: {
      de: "/solutions",
      en: "/solutions",
      "x-default": "/solutions",
    },
  },
  openGraph: {
    title: "Loesungen fuer stabile digitale Ablaeufe | Andrii Litkovskyi",
    description: "Von CRM-Setup bis Reporting: digitale Prozesse, die nachvollziehbar und alltagstauglich funktionieren.",
    url: "/solutions",
    type: "website",
  },
};

export default function SolutionsPage() {
  return (
    <main className="app-main">
      <ServicesList />
    </main>
  );
}
