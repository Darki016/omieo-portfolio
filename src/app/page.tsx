import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen text-white selection:bg-purple-500/30">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
      <Footer />
      {/* Other sections will be added here step by step */}
    </main>
  );
}
