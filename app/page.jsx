import dynamic from "next/dynamic";
import Cover from "@/components/Cover";
import Intro from "@/components/Intro";
import QRTracker from "@/components/QRTracker";
import SkipLink from "@/components/SkipLink";
import { LocalBusinessStructuredData } from "@/components/StructuredData";

const HomeLazySections = dynamic(() => import("@/components/HomeLazySections"));

export default function Home() {
  return (
    <>
      <SkipLink />
      {/* LocalBusiness structured data with reviews - only on homepage */}
      <LocalBusinessStructuredData />
      <main className="app-main" id="main-content">
        {/* Track business card QR scans */}
        <QRTracker />

      {/* <Cover /> */}
      <Intro />
      <HomeLazySections />
    </main>
    </>
  );
}
