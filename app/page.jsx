import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import BioData from "@/components/BioData";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="isolate">
      <ScrollToTop />
      <Hero />
      <Intro />
      <Projects />
      <BioData />
      <Contact />
    </main>
  );
};