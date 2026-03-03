import ServicesList from "@/components/ServicesList";

export const metadata = {
  title: "Solutions: CRM, Workflows & Data | Andrii Litkovskyi",
  description: "CRM setup, structured automation, and clear reporting for administration, sales, and marketing operations.",
  keywords: "CRM setup, process optimization, workflow automation, reporting quality, data operations, business systems",
  alternates: {
    canonical: "/en/solutions",
    languages: {
      de: "/solutions",
      en: "/en/solutions",
      "x-default": "/solutions",
    },
  },
  openGraph: {
    title: "Solutions for Stable Digital Operations | Andrii Litkovskyi",
    description: "From CRM setup to reporting: digital processes that stay usable in daily work.",
    url: "/en/solutions",
    type: "website",
  },
};

export default function SolutionsPageEn() {
  return (
    <main className="app-main">
      <ServicesList />
    </main>
  );
}
