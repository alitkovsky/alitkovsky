import ServicesList from "@/components/ServicesList";

export const metadata = {
  title: "Leistungen – Online-Marketing-Beratung | Andrii Litkovskyi",
  description: "SEO, Google Ads, Paid Social & CRM-Automatisierung für lokale Unternehmen in OWL. Mehr Kunden durch digitales Marketing.",
  keywords: "SEO Beratung OWL, Google Ads Minden, Online Marketing Bielefeld, Local SEO, Marketing Automatisierung, HubSpot Beratung",
  alternates: {
    canonical: '/leistungen',
    languages: {
      'de': '/leistungen',
      'en': '/leistungen',
      'x-default': '/leistungen',
    },
  },
  openGraph: {
    title: "Leistungen – Online-Marketing-Beratung | Andrii Litkovskyi",
    description: "SEO, Google Ads, Paid Social, Web Analytics und CRM-Automatisierung für lokale Unternehmen in OWL. Mehr Kunden durch digitales Marketing.",
    url: '/leistungen',
    type: 'website',
  },
};

export default function LeistungenPage() {
  return (
    <main className="app-main">
      <ServicesList />
    </main>
  );
}
