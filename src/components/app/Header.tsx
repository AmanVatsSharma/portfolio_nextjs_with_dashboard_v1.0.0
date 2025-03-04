"use client"
import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Social } from "../../../typing";
import { fetchSocial } from "@/utils/fetchSocial";
import { GetStaticProps } from "next";
import SocialsMapping from "./SocialsMapping";

interface Props {
socials : Social[]
}

function Header({socials} : Props) {
// console.log(socials)

  return (
    <header className="sticky top-0 flex items-start justify-between p-3 sm:p-5 max-w-7xl mx-auto z-20 xl:items-center">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center space-x-1 sm:space-x-2"
      >
        {
          socials.map((social) => (
            <SocialIcon
              key={social._id}
              url={social.url}
              fgColor="gray"
              bgColor="transparent"
              className="!h-8 !w-8 sm:!h-10 sm:!w-10"
            />
          ))
        }
      </motion.div>

      <motion.div
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="flex flex-row items-center text-grey-300 cursor-pointer space-x-1 sm:space-x-2"
      >
        <SocialIcon
          href="#contact"
          className="cursor-pointer !h-8 !w-8 sm:!h-10 sm:!w-10"
          network="email"
          fgColor="gray"
          bgColor="transparent"
        />
        <Link href="#contact">
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400 hover:text-[#f7ab0a]/40 transition-colors">
            Get in touch
          </p>
        </Link>
      </motion.div>
    </header>
  );
}

export default Header;

