import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ProofStrip } from "@/components/ProofStrip";
import { Skills } from "@/components/Skills";
import { StackMarquee } from "@/components/StackMarquee";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <StackMarquee />
        <ProofStrip />
        <About />
        <Projects />
        <Timeline />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
