import { CustomPortableText } from 'components/shared/CustomPortableText'
import { urlForImage } from 'lib/sanity.image'
import type { ShowcaseProject } from 'types'

interface ProjectProps {
  project: ShowcaseProject
  odd: number
}

export function ProjectListItem(props: ProjectProps) {
  const { project, odd } = props
  console.log(project)
  return (
    <div
      className={`grid h-48 gap-x-5 rounded-md border
       text-[#ffffff]/80	antialiased     hover:ring-2 hover:ring-green-600`}
      style={{
        backgroundImage: `url(${urlForImage(project.coverImage)})`,
        backgroundSize: 'cover',
      }}
    >
      <div
        className="rounded-md p-3	mix-blend-screen  
        drop-shadow-lg	backdrop-blur-sm	backdrop-brightness-50	  backdrop-filter		 
      			 transition-all	   
      hover:text-transparent hover:backdrop-blur-0 hover:backdrop-brightness-100
      "
      >
        <div className="md:text-md text-md my-2	font-extrabold leading-relaxed drop-shadow-md 	 	 filter">
          {project.year}
        </div>
        <div className="mb-5 text-xl	font-extrabold leading-relaxed	  filter  md:text-2xl ">
          {project.title}
        </div>
      </div>
    </div>
  )
}
