import CaseStudy from "@/components/CaseStudy";

export const metadata = {
  title: "Case Studies – Andrii Litkovskyi",
  description: "A few words about my projects.",
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