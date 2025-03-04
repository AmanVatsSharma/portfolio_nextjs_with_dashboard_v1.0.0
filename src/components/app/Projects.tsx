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
      className="h-screen relative flex flex-col text-left max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80">
        {projects?.map((project, i) => (
          <div
            key={i}
            className="w-screen flex-shrink-0 snap-center flex flex-col items-center justify-start pt-32 px-8 md:px-44"
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative w-full max-w-xl mx-auto mb-4"
            >
              <Image
                src={urlFor(project.image).url()}
                alt={project.title}
                width={800}
                height={450}
                className="object-contain rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="max-w-4xl space-y-4 px-5"
            >
              <div className="flex items-center justify-center space-x-3">
                <h4 className="text-2xl font-semibold text-center">
                  <span className="text-[#f7ab0a]/80">{project?.title}</span>
                </h4>
                <span className="text-sm text-gray-500">({i + 1} of {projects?.length})</span>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {project.technologies?.map((technology) => (
                  <motion.div
                    key={technology._id}
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f7ab0a]/50 to-[#f7ab0a]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                    <Image
                      src={urlFor(technology.image).url()}
                      alt={technology.title}
                      width={32}
                      height={32}
                      className="relative rounded-full bg-[#1d1d1d] p-1 hover:bg-[#2d2d2d] transition-colors duration-300"
                    />
                  </motion.div>
                ))}
              </div>

              <div className="bg-[#1d1d1d]/60 backdrop-blur-sm rounded-lg p-4 max-h-24 overflow-y-auto custom-scrollbar">
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {project?.summary}
                </p>
              </div>

              {project.linkToBuild && (
                <div className="text-center">
                  <Link
                    href={project.linkToBuild}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-[#f7ab0a] text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(247,171,10,0.5)]"
                    >
                      View Project
                    </motion.button>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-[#f7ab0a]/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  );
};

export default Projects;
