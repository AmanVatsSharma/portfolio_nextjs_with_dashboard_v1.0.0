/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Experience } from "../../../typing";
import { urlFor } from "@/pages/api/sanity";

type Props = {
  experience: Experience
};

const ExperienceCard = ({ experience }: Props) => {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-4 sm:space-y-7 flex-shrink-0 w-[280px] sm:w-[350px] md:w-[450px] xl:w-[600px] snap-center bg-[#292929] p-4 sm:p-7 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center"
        src={urlFor(experience.companyImage).url()}
        // src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
        alt={experience.company}
        loading="lazy"
      />

      <div className="px-2 sm:px-6 md:px-10">
        <h4 className="text-xl sm:text-2xl md:text-3xl font-light">
          {experience.jobTitle}
        </h4>
        <p className="font-bold text-lg sm:text-xl mt-1">
          {experience.company}
        </p>
        <div className="flex flex-wrap gap-2 my-2">
          {experience.technologies?.map(technology => (
            <img
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-full"
              key={technology._id}
              src={urlFor(technology.image).url()}
              // src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
              alt={technology.title}
            />
          ))}
        </div>
        <p className="uppercase py-3 sm:py-5 text-gray-300 text-sm sm:text-base">
          {new Date(experience.dateStarted).toDateString()} - {experience.isCurrentlyWorkingHere ? "Present" : new Date(experience.dateEnded).toDateString()}
        </p>
        <ul className="list-disc space-y-2 sm:space-y-4 ml-5 text-base sm:text-lg max-h-48 sm:max-h-96 overflow-y-scroll scrollbar-thin pr-3 scrollbar-track-black scrollbar-thumb-[#F7AB0A]/80">
          {experience.points?.map((point, i) => (
            <li key={i} className="text-sm sm:text-base">{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ExperienceCard;
