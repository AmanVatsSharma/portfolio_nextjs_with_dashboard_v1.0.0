import About from "@/components/app/About";
import Header from "@/components/app/Header";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-scroll z-0">
      {/* header section here */}
      <Header />

      {/* hero section here */}
      <section id="hero" className="snap-center" >
        <Hero />
      </section>

      {/* about section here */}
      <section>
        <About/>
      </section>

      {/* experience section here */}

      {/* skills section here */}

      {/* projects section here */}

      {/* certifications section here */}

      {/* contact me section here */}
    </div>
  );
}
