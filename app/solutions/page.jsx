import ServicesList from "@/components/ServicesList";

export const metadata = {
  title: "Lösungen: Prozesse, CRM & Marketing | Andrii Litkovskyi",
  description: "Einrichtung von CRM-Systemen (HubSpot), saubere Datenanalysen und digitales Marketing. Ich sorge für technische Infrastruktur und funktionierende Abläufe.",
  keywords: "Prozessoptimierung Hille, CRM Beratung OWL, HubSpot Einrichtung, Google Ads Optimierung, Digitale Verwaltung, Datenanalyse Minden",
  alternates: {
    canonical: "/solutions",
    languages: {
      de: "/solutions",
      en: "/solutions",
      "x-default": "/solutions",
    },
  },
  openGraph: {
    title: "Lösungen für Struktur & Wachstum | Andrii Litkovskyi",
    description: "Von der CRM-Integration bis zur Kampagne. Ich optimiere Ihre digitalen Werkzeuge für bessere Ergebnisse.",
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
