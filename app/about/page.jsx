import { redirect } from "next/navigation";

export const metadata = {
  title: "Über mich – Digital-Experte & Strukturgeber",
  description: "15+ Jahre Erfahrung in digitalen Prozessen, Marketing und Administration. Ich bringe Ordnung in Daten und Erfolg in Kampagnen. Ansässig in Hille.",
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