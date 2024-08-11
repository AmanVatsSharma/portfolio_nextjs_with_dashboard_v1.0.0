"use client";
import React from "react";
import { motion } from "framer-motion";
import { Project } from "../../../typing";
import { urlFor } from "@/pages/api/sanity";
import Link from "next/link";

type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm">
        swipe for more projects
      </h3>

      <div className="realtive w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80 scrollbar-thin">
        {projects?.map((project, i) => (
          <div
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-18 md:p-44 h-screen"
            key={i + 1}
          >
            <motion.img
              initial={{
                y: -300,
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              src={urlFor(project.image).url()}
              // src="https://cdn.sanity.io/images/ltuexkre/production/af7ca99b5a796d0698cf9121a4a0795b5022b6be-666x375.png"
              alt={project.title}
            />

            <div className="space-y-10 px-0 md:px-10 max-w-6xl">
              <h4 className="text-2xl md:text-3xl font-semibold text-center">
                <span className="underline decoration-[#f7ab0a]/50">
                  Case study {i + 1} of {projects?.length}:
                </span>
                {project?.title}
              </h4>
              <div className="flex space-x-2 items-center justify-center">
                {project.technologies.map(technology => (
                  <img key={technology._id}
                    src={urlFor(technology.image).url()}
                    alt={technology.title}
                    className="h-10 w-10 rounded-full"
                  />
                ))}
              </div>

              <p className="text-base md:text-lg text-center md:text-left">
                {project?.summary}
              </p>

              {project.linkToBuild && (
                <div className="text-center mt-2">
                  <Link
                    href={project.linkToBuild}
                    className="bg-[#f7ab0a] py-2 px-5 md:px-10 text-center rounded-md text-black font-bold text-lg"
                  >
                    Visit Project
                  </Link>

                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full absolute top-30% bg-[#f7ab0a]/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  );
};

export default Projects;
