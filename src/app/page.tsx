import About from "@/components/app/About";
import ContactMe from "@/components/app/ContactMe";
import Header from "@/components/app/Header";
import Projects from "@/components/app/Projects";
import Skills from "@/components/app/Skills";
import WorkExperience from "@/components/app/WorkExperience";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0">
      {/* header section here */}
      <Header />

      {/* hero section here */}
      <section id="hero" className="snap-start">
        <Hero />
      </section>

      {/* about section here */}
      <section id="about" className="snap-center">
        <About />
      </section>

      {/* experience section here */}
      <section id="experience" className="snap-center">
        <WorkExperience />
      </section>

      {/* skills section here */}
      <section id="skills" className="snap-start">
        <Skills />
      </section>

      {/* projects section here */}
      <section id="projects" className="snap-start">
        <Projects />
      </section>
      {/* certifications section here */}

      {/* contact me section here */}
      <section id="contact" className="snap-start">
        <ContactMe />
      </section>
    </div>
  );
}
