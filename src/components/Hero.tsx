"use client";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./app/BackgroundCircles";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {};

const Hero = (props: Props) => {
  const [text, count] = useTypewriter({
    words: [
      "Hi, My Name is Aman Sharma",
      "Guy-who-loves-coffee.tsx",
      "<ButLovesToCodeMore />",
      "<Cofee-aur-Code />",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden px-4 sm:px-8 relative">
      <BackgroundCircles />
      
      {/* Add a subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111]/50 to-[#111] pointer-events-none" />

      <motion.img
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
        }}
        className="relative rounded-full h-24 w-24 sm:h-32 sm:w-32 mx-auto object-cover filter hover:grayscale transition duration-300"
        src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT-4YbvE-R4dDvsyWHMCfRCfq1lA1PMs6kPweGsPGkPtgebbR0h"
        alt="Aman Sharma"
      />
      
      <div className="z-20">
        <h2 className="text-xs sm:text-sm uppercase text-gray-500 pb-2 tracking-[10px] sm:tracking-[15px]">
          Software Engineer
        </h2>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold px-2 sm:px-10">
          <span className="mr-1 sm:mr-3">
            {text}
            <Cursor cursorStyle="_" />
          </span>
        </h1>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-5 flex flex-wrap justify-center gap-2 sm:gap-4"
        >
          <Link href="#about">
            <button className="heroButton group relative overflow-hidden">
              <span className="absolute w-full h-full bg-[#f7ab0a]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              About
            </button>
          </Link>
          <Link href="#experience">
            <button className="heroButton group relative overflow-hidden">
              <span className="absolute w-full h-full bg-[#f7ab0a]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              Experience
            </button>
          </Link>
          <Link href="#skills">
            <button className="heroButton group relative overflow-hidden">
              <span className="absolute w-full h-full bg-[#f7ab0a]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              Skills
            </button>
          </Link>
          <Link href="#projects">
            <button className="heroButton group relative overflow-hidden">
              <span className="absolute w-full h-full bg-[#f7ab0a]/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              Projects
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
