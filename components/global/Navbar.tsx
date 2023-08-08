import ThemeSwitch from 'components/shared/ThemeSwitch'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { MenuItem } from 'types'

interface NavbarProps {
  menuItems?: MenuItem[]
}

export function Navbar({ menuItems }: NavbarProps) {
  return (
    <div className="	  top-0 z-10 flex w-full flex-row items-center gap-x-5 bg-white/80 px-4 py-4 dark:bg-black  md:px-16 md:py-5 lg:px-32">
      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`  text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E]  ${
                menuItem?._type === 'home'
                  ? 'grow text-left	text-2xl font-extrabold  text-[#6E6E6E] md:text-3xl'
                  : 'basis-1/8  text-right	  text-lg text-[#6E6E6E] md:text-2xl'
              }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          )
        })}
      <ThemeSwitch />
    </div>
  )
}
