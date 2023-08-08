import { CustomPortableText } from 'components/shared/CustomPortableText'
import { urlForImage } from 'lib/sanity.image'
import type { ShowcaseProject } from 'types'

interface ProjectProps {
  project: ShowcaseProject
  odd: number
}

export function ProjectListItem(props: ProjectProps) {
  const { project, odd } = props
  return (
    <div
      className={`z-0 grid h-48 gap-x-5 rounded-md border text-[#ffffff]/80
       hover:ring-2   hover:ring-green-600 dark:border-[#6E6E6E]`}
      style={{
        backgroundImage: `url(${urlForImage(project.coverImage)
          ?.crop('center')
          .width(600)
          .fit('crop')
          .quality(60)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="z-1 rounded-md p-3	 
        	backdrop-blur-sm	backdrop-brightness-50	  backdrop-filter		 
      			 transition ease-in-out  hover:text-transparent 
      hover:backdrop-blur-0 hover:backdrop-brightness-100 hover:transition
      "
      >
        <div className=" z-2 md:text-md text-md my-2	font-extrabold leading-relaxed drop-shadow-md 	 	 ">
          {project.year}
        </div>
        <div className="z-2 mb-5 text-xl	font-extrabold leading-relaxed	    md:text-2xl ">
          {project.title}
        </div>
      </div>
    </div>
  )
}
