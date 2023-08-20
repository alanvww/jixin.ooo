import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  //overview?: PortableTextBlock[]
  slug?: string
  //tags?: string[]
  title?: string
  year?: number
  //medium?: string
  //size?: string
  //edition?: string
  //collaboration?: string
  //url?: URL
}

// Page payloads

export interface HomePagePayload {
  overview?: PortableTextBlock[]
  title?: string
}

export interface WorkPagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface ProjectPayload {
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  slug: string
  tags?: string[]
  title?: string
  year?: number
  medium?: string
  size?: string
  edition?: string
  collaboration?: string
  url?: URL
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}
