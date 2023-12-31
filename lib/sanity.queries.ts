import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    title,
  }
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`

export const workPageQuery = groq`
  *[_type == "work"][0]{
    _id,
    footer,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      "slug": slug.current,
      tags,
      title,
      year,
    },
    title,
  }
`

export const workPageTitleQuery = groq`
  *[_type == "work"][0].title
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    overview,
    "slug": slug.current,
    tags,
    title,
    year,
    medium,
    size,
    edition,
    collaboration,
    url,
  }
`

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
