import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";


export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
};

// set up client for testing data in the getProps page functions
export const sanityClient = createClient(config);

export function urlFor(source: any) {
  const image = createImageUrlBuilder(sanityClient).image(source);
  return image
}
