import Datenschutz from "@/components/Datenschutz";

export const metadata = {
  title: "Privacy Policy - Andrii Litkovskyi",
  description: "Privacy policy and cookie guideline for litkovskyi.de including analytics, tracking, and your rights.",
  alternates: {
    canonical: "/en/datenschutz",
    languages: {
      de: "/datenschutz",
      en: "/en/datenschutz",
      "x-default": "/datenschutz",
    },
  },
};

export default function DatenschutzPageEn() {
  return (
    <main className="app-main">
      <Datenschutz />
    </main>
  );
}
