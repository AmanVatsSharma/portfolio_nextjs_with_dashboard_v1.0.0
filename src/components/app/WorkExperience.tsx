"use client";
import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from './ExperienceCard';
import { Experience } from "../../../typing";

type Props = {
  experiences: Experience[]
};

const WorkExperience = ({ experiences }: Props) => {
  // console.log(experiences)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full px-4 sm:px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-16 sm:top-24 uppercase text-gray-500 text-xl sm:text-2xl tracking-[15px] sm:tracking-[20px]">
        Experience
      </h3>

      <div className="w-full flex space-x-3 sm:space-x-5 overflow-x-scroll p-4 sm:p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80 mt-16 sm:mt-0">
        {/* ExperienceCards  */}
        {experiences.map(experience => (
          <ExperienceCard key={experience._id} experience={experience}/>
        ))}
        {/* <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard /> */}
      </div>
    </motion.div>
  );
};

export default WorkExperience;
