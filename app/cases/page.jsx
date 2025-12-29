import CaseStudy from "@/components/CaseStudy";

export const metadata = {
  title: "Case Studies – Andrii Litkovskyi",
  description: "Case studies showcasing SEO, Google Ads, and marketing automation projects with measurable results for local businesses.",
  alternates: {
    canonical: '/cases',
    languages: {
      'de': '/cases',
      'en': '/cases',
      'x-default': '/cases',
    },
  },
};
export default function CaseStudyPagePage() {
  return (
   <main className="app-main">
      <CaseStudy />
   </main>
  )
};