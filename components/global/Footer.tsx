import type { PortableTextBlock } from '@portabletext/types'

import { CustomPortableText } from '../shared/CustomPortableText'

export function Footer({ footer }: { footer?: PortableTextBlock[] }) {
  return (
    <footer className="bottom-0 w-full bg-transparent py-6 text-center text-[#6E6E6E] dark:text-white md:py-20 ">
      {footer && (
        <CustomPortableText
          paragraphClasses="text-md md:text-xl"
          value={footer}
        />
      )}
    </footer>
  )
}
