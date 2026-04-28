import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'da3pwhay'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export const queries = {
  featuredArtworks: `*[_type == "artwork" && featured == true] | order(order asc) {
    _id, title, slug, technique, year, image, description, price, available
  }`,

  allArtworks: `*[_type == "artwork"] | order(order asc) {
    _id, title, slug, technique, year, dimensions, image, description, featured, price, available
  }`,

  artworksByTechnique: (technique: string) =>
    `*[_type == "artwork" && technique == "${technique}"] | order(order asc) {
      _id, title, slug, technique, year, dimensions, image, description, price, available
    }`,

  allDolls: `*[_type == "doll"] | order(order asc) {
    _id, title, slug, material, height, images, description, available, price
  }`,

  allExhibitions: `*[_type == "exhibition"] | order(dateStart desc) {
    _id, title, type, venue, city, country, dateStart, dateEnd, description, image, upcoming
  }`,

  about: `*[_type == "about"][0] {
    name, tagline, photo, bio, statement, education, awards, contacts
  }`,
}
