import { redirect } from "next/navigation";

export const metadata = {
  title: "About – Andrii Litkovskyi Marketing",
  description: "Marketing consultant with 15+ years of experience in SEO, Google Ads, and Meta Ads for local businesses in Germany.",
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