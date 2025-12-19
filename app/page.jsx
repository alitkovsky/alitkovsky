import Cover from "@/components/Cover";
import Expertise from "@/components/Expertise";
import Contact from "@/components/Contact";
import Intro from "@/components/Intro";
import Strategy from "@/components/Strategy";
import Values from "@/components/Values";
import Process from "@/components/Process";
import Background from "@/components/Background";
import References from "@/components/References";
import QRTracker from "@/components/QRTracker";
import SkipLink from "@/components/SkipLink";

export default async function Home({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      <SkipLink />
      <main className="app-main" id="main-content">
      {/* Track business card QR scans */}
      <QRTracker searchParams={params} />

      <Cover />
      <Intro />
      {/* <Strategy /> */}
      <Values />
      <Process />
      <Background />
      {/* <References /> */}
      <Expertise />
      <Contact />
    </main>
    </>
  );
}