import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { MenuItem } from 'types'

interface NavbarProps {
  menuItems?: MenuItem[]
}

export function Navbar({ menuItems }: NavbarProps) {
  return (
    <div className="bg-white/0.8	 fixed inset-y-1/2 z-10 flex w-full items-center gap-x-5 px-4 py-4 backdrop-blur-sm  md:px-16 md:py-5 lg:px-32">
      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`w-1/3 text-center text-lg  hover:text-black md:text-3xl ${
                menuItem?._type === 'home'
                  ? 'font-extrabold text-black'
                  : 'text-gray-600'
              }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          )
        })}
    </div>
  )
}
