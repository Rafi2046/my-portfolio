import { About } from "@/components/About";
import { AlsoShipping } from "@/components/AlsoShipping";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AlsoShipping />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
