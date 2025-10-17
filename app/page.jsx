import Cover from "@/components/Cover";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Intro from "@/components/Intro";
import Values from "@/components/Values";
import CaseStudy from "@/components/CaseStudy";
import Background from "@/components/Background";
import References from "@/components/References";

export default function Home() {
  return (
    <main className="app-main">
      {/* <Cover /> */}
      <Intro />
      <Values />
      {/* <CaseStudy /> */}
      <Background />
      {/* <References /> */}
      <About />
      <Contact />
    </main>
  );
};