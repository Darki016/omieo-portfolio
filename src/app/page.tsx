import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen text-white selection:bg-purple-500/30 page-fade-in">
      <Hero />
      <ScrollReveal><StatsBar /></ScrollReveal>
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal><Skills /></ScrollReveal>
      <ScrollReveal><Projects /></ScrollReveal>
      <ScrollReveal><Process /></ScrollReveal>
      <ScrollReveal><Services /></ScrollReveal>
      <ScrollReveal><Testimonials /></ScrollReveal>
      <ScrollReveal><Contact /></ScrollReveal>
      <Footer />
    </main>
  );
}
