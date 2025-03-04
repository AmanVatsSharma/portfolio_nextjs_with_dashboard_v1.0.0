"use client";
import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Skill as SKillType } from "../../../typing";

type Props = {
  skills: SKillType[]
};

const Skills = ({ skills }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="flex relative flex-col text-center md:text-left xl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center px-4 sm:px-8"
    >
      <h3 className="absolute top-16 sm:top-24 uppercase tracking-[15px] sm:tracking-[20px] text-gray-500 text-xl sm:text-2xl">
        Skills
      </h3>
      <h3 className="absolute top-28 sm:top-36 uppercase tracking-[2px] sm:tracking-[3px] text-gray-500 text-xs sm:text-sm">
        Hover over a skill for current profiency
      </h3>

      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-5 mt-24 sm:mt-32">
        {skills?.slice(0, skills.length / 2).map((skill, index) => (
          <Skill key={skill._id || index} skill={skill} />
        ))}
        {skills?.slice(skills.length / 2, skills.length).map((skill, index) => (
          <Skill key={skill._id || index} skill={skill} directionLeft />
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
