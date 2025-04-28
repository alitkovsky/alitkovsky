import Cover from "@/components/Cover";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Intro from "@/components/Intro";
import Values from "@/components/Values";
import Background from "@/components/Background";

export default function Home() {
  return (
    <main className="app-main">
      <Cover />
      <Intro />
      <Values />
      <Background />
      <About />
      <Contact />
    </main>
  );
};