"use client";
import React from "react";
import { motion } from "framer-motion";
import { Project } from "../../../typing";
import { urlFor } from "@/pages/api/sanity";
import Link from "next/link";
import Image from "next/image";

type Props = {
  projects: Project[];
};

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-16 sm:top-24 uppercase tracking-[15px] sm:tracking-[20px] text-gray-500 text-xl sm:text-2xl">
        Projects
      </h3>

      <h3 className="absolute top-28 sm:top-36 uppercase tracking-[2px] sm:tracking-[3px] text-gray-500 text-xs sm:text-sm">
        swipe for more projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80 scrollbar-thin">
        {projects?.map((project, i) => (
          <div
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-3 sm:space-y-5 items-center justify-center p-4 sm:p-18 md:p-44 h-screen"
            key={i + 1}
          >
            <motion.div
              initial={{
                y: -150,
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: true }}
              className="max-w-[85%] sm:max-w-[75%] md:max-w-[60%] relative"
            >
              <Image
                src={urlFor(project.image).url()}
                alt={project.title}
                width={800}
                height={450}
                className="object-contain rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </motion.div>

            <div className="space-y-4 sm:space-y-10 px-4 sm:px-10 max-w-6xl p-4 relative bg-[#1d1d1d]/60 backdrop-blur-lg rounded-lg border border-[#333] hover:border-[#f7ab0a]/30 transition-colors duration-300">
              <div className="relative">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center group">
                  <span className="underline decoration-[#f7ab0a]/50 hover:decoration-[#f7ab0a] transition-all duration-300">
                    Case study {i + 1} of {projects?.length}:
                  </span>{" "}
                  <span className="text-[#f7ab0a]/80">{project?.title}</span>
                </h4>
              </div>

              <div className="flex flex-wrap gap-3 items-center justify-center">
                {project.technologies?.map((technology) => (
                  <motion.div
                    key={technology._id}
                    className="relative"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f7ab0a]/50 to-[#f7ab0a]/30 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 blur" />
                    <Image
                      src={urlFor(technology.image).url()}
                      alt={technology.title}
                      width={40}
                      height={40}
                      className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full object-contain bg-[#1d1d1d] p-1 hover:bg-[#2d2d2d] transition-colors duration-300"
                    />
                  </motion.div>
                ))}
              </div>

              <p className="text-sm sm:text-base md:text-lg text-center md:text-left max-h-24 sm:max-h-32 overflow-y-auto px-2 text-gray-300 leading-relaxed">
                {project?.summary}
              </p>

              {project.linkToBuild && (
                <div className="text-center mt-4">
                  <Link
                    href={project.linkToBuild}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#f7ab0a] to-[#f7ab0a]/50 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300" />
                    <button className="relative px-6 py-2 bg-[#f7ab0a] text-black font-semibold rounded-lg transform hover:translate-y-[-2px] transition-all duration-300 hover:shadow-lg hover:shadow-[#f7ab0a]/20">
                      Visit Project
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full absolute top-[30%] bg-[#f7ab0a]/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  );
};

export default Projects;
