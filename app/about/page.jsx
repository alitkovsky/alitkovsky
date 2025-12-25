import { redirect } from "next/navigation";

export const metadata = {
  title: "About – Andrii Litkovskyi",
  description: "A few words about my way.",
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