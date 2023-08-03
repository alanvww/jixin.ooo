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

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

export default function ImageBox({
  image,
  alt = 'Cover image',
  size = '(min-width: 808px) 50vw, 100vw',
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image)?.quality(80).url()

  return (
    <div className="relative mx-2 ">
      {imageUrl && (
        <Image
          className="relative h-auto w-full  object-contain"
          alt={alt}
          width={1000}
          height={1000}
          sizes={size}
          src={imageUrl}
          placeholder="blur"
          blurDataURL={rgbDataURL(110, 110, 110)}
          priority={true}
        />
      )}
    </div>
  )
}
