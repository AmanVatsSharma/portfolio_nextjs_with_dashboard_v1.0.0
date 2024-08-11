"use client";
import React from "react";
import { motion } from "framer-motion";
import { Skill as SkillType } from "../../../typing";
import { urlFor } from "@/pages/api/sanity";

type Props = {
  skill: SkillType;
  directionLeft?: boolean;
};

const Skill = ({skill, directionLeft }: Props) => {
  return (
    <div className="group flex relative cursor-pointer ">
      <motion.img
        initial={{
          x: directionLeft ? -200 : 200,
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        src={urlFor(skill.image).url()}
        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj13DpXfc1_RayzN0ecY0-p_ws7TK3sxpO6w&s"
        className="rounded-full border border-gray-500 object-cover w-16 h-16 xl:w-24 xl:h-24 filter group-hover:grayscale transition duration-300 ease-in-out"
      />

      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white w-16 h-16 md:w-24 md:h-24 xl:w-24 xl:h-24 rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-bold text-black opacity-100">{skill.progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default Skill;
