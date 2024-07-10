import About from "@/components/app/About";
import ContactMe from "@/components/app/ContactMe";
import Header from "@/components/app/Header";
import Projects from "@/components/app/Projects";
import Skills from "@/components/app/Skills";
import WorkExperience from "@/components/app/WorkExperience";
import Hero from "@/components/Hero";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Experience, PageInfo, Project, Skill, Social } from "../../typing";
import { fetchProjects } from "@/utils/fetchProjects";
import { fetchPageInfo } from "@/utils/fetchPageInfo";
import { fetchSkills } from "@/utils/fetchSkills";
import { fetchSocial } from "@/utils/fetchSocial";
import { fetchExperience } from "@/utils/fetchExperiences";
import { getStaticProps } from "@/utils/fetchData";
type Props = {
  pageInfo: PageInfo[];
  experiences: Experience[];
  skills: Skill[];
  socials: Social[];
  projects: Project[];
};
export const Home: NextPage<Props>  = ( { pageInfo, experiences, skills, socials, projects} : Props ) => {
  console.log("Fetched socials:", socials);
  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80">
      {/* header section here */}
      <Header socials={socials} />

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

      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <img
              className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
              src="https://i.imgur.com/e2yvD6A.png"
              alt=""
            />
          </div>
        </footer>
      </Link>
    </div>
  );
};


