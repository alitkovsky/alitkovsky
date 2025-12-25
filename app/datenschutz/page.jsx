import Datenschutz from "@/components/Datenschutz";

export const metadata = {
  title: "datenschutz – andrii litkovskyi",
  description: "datenschutzerklärung & cookie-richtlinie für andrii litkovskyi.",
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