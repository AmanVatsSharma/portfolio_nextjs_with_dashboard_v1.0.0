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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner">Loading...</div> {/* Replace with your loading spinner */}
      </div>
    );
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
      {/* certifications section here */}

      {/* contact me section here */}
      <section id="contact" className="snap-start">
        <ContactMe />
      </section>

      <Link href="#hero">
        <footer className="sticky bottom-10 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <img
              className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
              src="https://img.lum.dolimg.com/v1/images/image_808f708e.jpeg"
              alt=""
            />
          </div>
        </footer>
      </Link>
    </div>
  );
};


export default Home
