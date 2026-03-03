import Impressum from "@/components/Impressum";

export const metadata = {
  title: "Imprint - Andrii Litkovskyi Digital Operations",
  description: "Legal notice for Andrii Litkovskyi according to German legal requirements.",
  alternates: {
    canonical: "/en/impressum",
    languages: {
      de: "/impressum",
      en: "/en/impressum",
      "x-default": "/impressum",
    },
  },
};

export default function ImpressumPageEn() {
  return (
    <main className="app-main">
      <Impressum />
    </main>
  );
}
