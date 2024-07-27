import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'


const imageBuilder = createImageUrlBuilder({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||"fyyf2zob"
})

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max').url()
}
