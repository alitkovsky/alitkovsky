import dynamic from "next/dynamic";
import Cover from "@/components/Cover";
import Intro from "@/components/Intro";
import QRTracker from "@/components/QRTracker";
import SkipLink from "@/components/SkipLink";
import { LocalBusinessStructuredData } from "@/components/StructuredData";

const HomeLazySections = dynamic(() => import("@/components/HomeLazySections"));

export default async function Home({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      <SkipLink />
      {/* LocalBusiness structured data with reviews - only on homepage */}
      <LocalBusinessStructuredData />
      <main className="app-main" id="main-content">
        {/* Track business card QR scans */}
        <QRTracker searchParams={params} />

      <Cover />
      <Intro />
      <HomeLazySections />
    </main>
    </>
  );
}
