import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import BioData from "@/components/BioData";

export default function Home() {
  return (
    <section className="h-screen">
      <Hero />
      <Stats />
      <BioData />
    </section>
  );
};