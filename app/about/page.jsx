import { redirect } from "next/navigation";

export const metadata = {
  title: "Ueber mich - Digital Operations & Systemintegration",
  description: "15+ Jahre Erfahrung an der Schnittstelle von Marketing, Daten und Administration. Ich baue robuste digitale Prozesse fuer Teams und Unternehmen.",
  alternates: {
    canonical: '/about',
    languages: {
      'de': '/about',
      'en': '/about',
      'x-default': '/about',
    },
  },
};

export default function AboutPage() {
  redirect("/#expertise");
}
