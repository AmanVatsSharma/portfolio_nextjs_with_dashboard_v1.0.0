import { createClient } from "next-sanity";
import SanityClient from 'next-sanity-client';
import imageUrlBuilder from '@sanity/image-url'
import createImageUrlBuilder from "@sanity/image-url";


export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
};

// set up client for testing data in the getProps page functions
// export const sanityClient = createClient(config);

// export function urlFor(source: any) {
//   try {
//     createImageUrlBuilder(sanityClient).image(source);
//   } catch (error) {
//     console.error('Error generating image URL:', error);
//   }
// }


// new method 

const client = new SanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fyyf2zob",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: process.env.NODE_ENV === "production",
});


export function urlFor(source: any) {
  try {
    return imageUrlBuilder(client).image(source);
  } catch (error) {
    console.error('Error generating image URL:', error);
    return '';
  }
}

