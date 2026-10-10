import { About } from "@/components/About";
import { AppHub } from "@/components/AppHub";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { PageTransition } from "@/components/PageTransition";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Proof } from "@/components/Proof";
import { Skills } from "@/components/Skills";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <>
      <PageTransition>
      <main className="flex-1">
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Proof />
        <Process />
        <Skills />
        <Timeline />
        <AppHub />
        <Contact />
      </main>
      </PageTransition>
      <Footer />
    </>
  );
}
