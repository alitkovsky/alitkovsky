import ServicesList from "@/components/ServicesList";

export const metadata = {
  title: "Lösungen – Online-Marketing-Beratung | Andrii Litkovskyi",
  description: "SEO, Google Ads, Paid Social & CRM-Automatisierung für lokale Unternehmen in OWL. Mehr Kunden durch digitales Marketing.",
  keywords: "SEO Beratung OWL, Google Ads Minden, Online Marketing Bielefeld, Local SEO, Marketing Automatisierung, HubSpot Beratung",
  alternates: {
    canonical: "/solutions",
    languages: {
      de: "/solutions",
      en: "/solutions",
      "x-default": "/solutions",
    },
  },
  openGraph: {
    title: "Lösungen – Online-Marketing-Beratung | Andrii Litkovskyi",
    description: "SEO, Google Ads, Paid Social, Web Analytics und CRM-Automatisierung für lokale Unternehmen in OWL. Mehr Kunden durch digitales Marketing.",
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
