import Datenschutz from "@/components/Datenschutz";

export const metadata = {
  title: "Datenschutz – Andrii Litkovskyi",
  description: "Datenschutzerklärung & Cookie-Richtlinie für litkovskyi.de. Informationen zu Cookies, Google Analytics, Microsoft Clarity und deinen Rechten.",
  alternates: {
    canonical: '/datenschutz',
    languages: {
      'de': '/datenschutz',
      'en': '/datenschutz',
      'x-default': '/datenschutz',
    },
  },
};

export default function DatenschutzPage() {
  return (
    <main className="app-main">
        <Datenschutz />
    </main>
  );
};