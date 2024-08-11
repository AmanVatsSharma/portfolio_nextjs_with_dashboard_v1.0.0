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
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-none duration-200 overflow-hidden">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center"
        src={urlFor(experience.companyImage).url()}
        // src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
        alt={experience.company}
        loading="lazy"
      />

      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">
          {experience.jobTitle}
        </h4>
        <p className="font-bold text-2xl mt-1">
          {experience.company}
        </p>
        <div className="flex space-x-2 my-2">
          {experience.technologies.map(technology => (
            <img
              className="h-10 w-10 rounded-full"
              key={technology._id}
              src={urlFor(technology.image).url()}
              // src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
              alt={technology.title}
            />
          ))}
                      <img
              className="md:h-10 md:w-10 rounded-full"
              src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png"
              alt={'technology.title'}
            />

        </div>
        <p className="uppercase py-5 text-gray-300">
          {new Date(experience.dateStarted).toDateString()} - {experience.isCurrentlyWorkingHere ? "Present" : new Date(experience.dateEnded).toDateString()}
        </p>
        <ul className="list-disc space-y-4 ml-5 text-lg max-h-96 overflow-y-scroll scrollbar-thin pr-3 scrollbar-track-black scrollbar-thumb-[#F7AB0A]/80">
          {/* {experience.points.map((point, i) => (
            <li key={i}>Summary Points</li>

          ))} */}
        </ul>
      </div>
    </article>
  );
};

export default ExperienceCard;
