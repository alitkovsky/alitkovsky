import Impressum from "@/components/Impressum";

export const metadata = {
  title: "impressum – andrii litkovskyi",
  description: "impressum (legal notice) für andrii litkovskyi – angaben gemäß § 5 DDG.",
  alternates: {
    canonical: '/impressum',
    languages: {
      'de': '/impressum',
      'en': '/impressum',
      'x-default': '/impressum',
    },
  },
};

export default function ImpressumPage() {
  return (
    <main className="app-main">
      <Impressum />
    </main>
);
}
