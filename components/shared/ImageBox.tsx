import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface ImageBoxProps {
  image?: { asset?: any }
  alt?: string
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
}

export default function ImageBox({
  image,
  alt = 'Cover image',
  size = '(min-width: 808px) 50vw, 100vw',
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image)?.url()

  return (
    <>
      {imageUrl && (
        <Image
          className="relative h-full w-full  object-contain"
          alt={alt}
          width={0}
          height={0}
          sizes={size}
          src={imageUrl}
        />
      )}
    </>
  )
}
