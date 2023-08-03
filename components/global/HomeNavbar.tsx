import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { MenuItem } from 'types'

interface NavbarProps {
  menuItems?: MenuItem[]
}

export function HomeNavbar({ menuItems }: NavbarProps) {
  return (
    <div className="fixed z-10 	flex h-screen w-full flex-col place-content-center items-center gap-y-5 px-4  py-4 align-middle md:inset-y-1/2 md:h-auto md:flex-row md:gap-x-5  md:px-16 md:py-5 lg:px-32">
      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`w-full  text-center text-xl text-[#6E6E6E] hover:text-black   md:w-1/3 md:text-3xl ${
                menuItem?._type === 'home' ? 'font-extrabold ' : ''
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
