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
    <div className="group relative flex cursor-pointer">
      <motion.div
        className="relative"
        initial={{
          x: directionLeft ? -100 : 100,
          opacity: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        whileHover={{ scale: 1.1 }}
        viewport={{ once: true }}
      >
        {/* Animated border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#f7ab0a] to-[#f7ab0a]/50 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500" />
        
        <img
          src={urlFor(skill.image).url()}
          className="relative rounded-full border-2 border-[#333] object-cover w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 filter group-hover:grayscale transition duration-300 ease-in-out bg-[#1d1d1d] group-hover:border-[#f7ab0a]/50"
        />

        {/* Electric spark effects */}
        <div className="electric-spark absolute -top-1 left-[20%] opacity-0 group-hover:opacity-100" />
        <div className="electric-spark absolute top-[20%] -right-1 opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.2s' }} />
        <div className="electric-spark absolute -bottom-1 right-[20%] opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.4s' }} />
      </motion.div>

      <div className="absolute opacity-0 group-hover:opacity-90 transition duration-300 ease-in-out group-hover:bg-[#f7ab0a]/90 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 rounded-full z-0 cyber-gradient">
        <motion.div 
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1, ease: "linear" }}
          className="flex flex-col items-center justify-center h-full gap-1"
        >
          <p className="text-base sm:text-lg md:text-xl xl:text-2xl font-bold text-black opacity-100">{skill.progress}%</p>
          <p className="text-[8px] sm:text-xs md:text-sm text-black font-semibold opacity-100">{skill.title}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Skill;
