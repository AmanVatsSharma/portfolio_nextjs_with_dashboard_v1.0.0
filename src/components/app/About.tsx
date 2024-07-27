"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageInfo } from "../../../typing";
import { urlFor } from "@/pages/api/sanity";

type Props = {
  pageInfo: PageInfo
};

const About = ({ pageInfo }: Props) => {
  const [profilePicUrl, setProfilePicURl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyc-P95gOMmgGJ5_7pP6hLJ6L9B2cSnpNn-w&s")
  setTimeout(() => {
    setProfilePicURl(urlFor(pageInfo.profilPic).url())
  }, 1200)

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 1.5,
      }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>
      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        src={profilePicUrl}
        loading="lazy"
        fetchPriority="low"
        className="-mb-20 md:mb-0 flex-shrink-0w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px] "
      />
      <div className="px-0 space-y-10 md:px-10 ">
        <h4 className="text-4xl font-semibold">
          Here is a
          <span className="underline decoration-[#f7ab0a]/50"> little </span>{" "}
          background
        </h4>
        <p className="text-sm">
          {pageInfo.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
};

export default About;
