'use client'
import About from "@/components/app/About";
import ContactMe from "@/components/app/ContactMe";
import Header from "@/components/app/Header";
import Projects from "@/components/app/Projects";
import Skills from "@/components/app/Skills";
import WorkExperience from "@/components/app/WorkExperience";
import Hero from "@/components/app/Hero";
import { NextPage } from "next";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'

import Image from "next/image";
import Link from "next/link";
import { Experience, PageInfo, Project, Skill, Social } from '../../typing';
import { fetchPageInfo } from "@/utils/fetchPageInfo";
import { fetchExperience } from "@/utils/fetchExperiences";
import { fetchSkills } from "@/utils/fetchSkills";
import { fetchProjects } from "@/utils/fetchProjects";
import { getStaticProps, Props } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import { fetchSocial } from "@/utils/fetchSocial";
import TechLab from "@/components/app/TechLab";
import CodeMetrics from "@/components/app/CodeMetrics";
import TechLoader from '@/components/common/TechLoader';


const Home: NextPage = ({
}) => {

  const defaultPageInfo: PageInfo = {
    _createdAt: '',
    _id: '',
    _rev: '',
    _uploatedAt: '',
    _type: "pageInfo",
    address: '',
    backgroundInformation: '',
    email: '',
    role: '',
    heroImage: {
      _type: 'image',
      assets: {
        _ref: '',
        _type: "reference",
      }
    },
    name: '',
    phoneNumber: '',
    profilPic: {
      _type: 'image',
      assets: {
        _ref: '',
        _type: "reference",
      }
    },
  };

  const [pageInfo, setPageInfo] = useState<PageInfo>(defaultPageInfo);
  const [socials, setSocials] = useState<Social[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedPageInfo = await fetchPageInfo();
        const fetchedSocials = await fetchSocial();
        const fetchedExperiences = await fetchExperience();
        const fetchedSkills = await fetchSkills();
        const fetchedProjects = await fetchProjects();
        setSocials(fetchedSocials);
        setPageInfo(fetchedPageInfo);
        setExperiences(fetchedExperiences);
        setSkills(fetchedSkills);
        setProjects(fetchedProjects);
      } catch (error) {
        return console.log(error)
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [])

  if (loading) {
    return <TechLoader />;
  }

  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80">
      {/* header section here */}
      <Header socials={socials} />

      {/* hero section here */}
      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>

      {/* about section here */}
      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      {/* experience section here */}
      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>

      {/* skills section here */}
      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>

      {/* projects section here */}
      <section id="projects" className="snap-start">
        <Projects projects={projects} />
      </section>

      {/* contact me section here */}
      <section id="contact" className="snap-start">
        <ContactMe />
      </section>

      {/* tech lab section here */}
      <section id="tech-lab" className="snap-start">
        <TechLab />
      </section>

      {/* code metrics section here */}
      <section id="code-metrics" className="snap-start">
        <CodeMetrics />
      </section>

      <Link href="#hero">
        <footer className="fixed bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#f7ab0a]/10 to-[#f7ab0a]/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <img
              className="h-7 w-7 md:h-10 md:w-10 rounded-full filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
              src="https://img.lum.dolimg.com/v1/images/image_808f708e.jpeg"
              alt="Go to top"
            />
          </div>
        </footer>
      </Link>
    </div>
  );
};


export default Home
