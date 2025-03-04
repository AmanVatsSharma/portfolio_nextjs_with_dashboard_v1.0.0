'use client'
import React, { useEffect, useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";
import Link from "next/link";
import { PageInfo } from "../../../typing";
import { GetStaticProps } from "next";
import { fetchPageInfo } from "@/utils/fetchPageInfo";
import { urlFor } from '../../pages/api/sanity';

type Props = {
  pageInfo: PageInfo;
};


const Hero = ({ pageInfo }: Props) => {

  const [text, count] = useTypewriter({
    words: [
      `Hi, I am ${pageInfo.name} `,
      "Guy-who-loves-coffee.tsx",
      "<ButLovesToCodeMore />",
      "<Cofee-aur-Code />",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  // console.log(pageInfo.name)
  const [heroImageUrl, setHeroImageUrl] = useState<string>("https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT-4YbvE-R4dDvsyWHMCfRCfq1lA1PMs6kPweGsPGkPtgebbR0h");

  useEffect(() => {
    try {
      setHeroImageUrl(urlFor(pageInfo.heroImage).url())
    } catch (error) {
      setHeroImageUrl("https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT-4YbvE-R4dDvsyWHMCfRCfq1lA1PMs6kPweGsPGkPtgebbR0h")
    }


  }, [pageInfo])


  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden ">
      <BackgroundCircles />
      <img
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        src={heroImageUrl}
        alt="Aman Sharma"
      />
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          {pageInfo?.role}
        </h2>
        <h1 className="text-4xl lg:text-6xl font-semibold px-10">
          <span className="mr-3">
            {text}
            <Cursor />
          </span>
        </h1>

        <div className="pt-5">
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;

export const getStaticProps: GetStaticProps = async () => {
  const pageInfo: PageInfo = await fetchPageInfo();
  return {
    props: {
      pageInfo,
    },
  };
}

