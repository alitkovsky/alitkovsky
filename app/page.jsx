import Cover from "@/components/Cover";
import Expertise from "@/components/Expertise";
import Contact from "@/components/Contact";
import Intro from "@/components/Intro";
import Values from "@/components/Values";
import Process from "@/components/Process";
import Background from "@/components/Background";
import References from "@/components/References";
import Faq from "@/components/Faq";
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
      <Values />
      <Process />
      <Background />
      <References />
      <Faq />
      <Expertise />
      <Contact />
    </main>
    </>
  );
}