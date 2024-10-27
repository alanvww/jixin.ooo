import Link from 'next/link'

export function MaintenanceNavbar() {
  return (
    <div className="fixed z-10 	flex h-screen w-full flex-col place-content-center items-center gap-y-5 px-4  py-4 align-middle md:inset-y-1/2 md:h-auto md:flex-row md:gap-x-5  md:px-16 md:py-5 lg:px-32">
      <Link
        className={`w-full text-center  text-2xl font-extrabold text-[#6E6E6E] hover:text-black dark:text-white   dark:hover:text-[#6E6E6E] md:w-1/3 
                md:text-3xl`}
        href={'/'}
      >
        Jixin Zheng
      </Link>
      <p
        className={`w-full text-center  text-lg  text-[#6E6E6E] hover:text-black dark:text-white   dark:hover:text-[#6E6E6E] md:w-1/3 
                md:text-3xl`}
      >
        This site is currently under maintenance. Please check back later.
      </p>
    </div>
  )
}
