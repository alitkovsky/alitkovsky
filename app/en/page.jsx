import dynamic from "next/dynamic";
import Intro from "@/components/Intro";
import QRTracker from "@/components/QRTracker";
import SkipLink from "@/components/SkipLink";
import { LocalBusinessStructuredData } from "@/components/StructuredData";

const HomeLazySections = dynamic(() => import("@/components/HomeLazySections"));

export const metadata = {
  title: "Andrii Litkovskyi | Digital Operations & System Integration | Hille & OWL",
  description: "CRM integration, data analysis, and workflow optimization for SMB teams in OWL. I build reliable digital systems for day-to-day execution.",
  alternates: {
    canonical: "/en",
    languages: {
      de: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    url: "/en",
  },
};

export default async function EnHome({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      <SkipLink />
      {/* LocalBusiness structured data with reviews - only on homepage */}
      <LocalBusinessStructuredData />
      <main className="app-main" id="main-content">
        {/* Track business card QR scans */}
        <QRTracker searchParams={params} />

      {/* <Cover /> */}
      <Intro />
      <HomeLazySections />
    </main>
    </>
  );
}
