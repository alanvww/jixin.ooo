import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from 'lib/sanity.api'
import type { Image } from 'sanity'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return null
  }

  return imageBuilder?.image(source).auto('format').fit('crop')
}
