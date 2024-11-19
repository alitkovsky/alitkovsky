import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Projects from "@/components/Projects";
import BioData from "@/components/BioData";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Projects />
      <BioData />
      <Contact />
    </main>
  );
};