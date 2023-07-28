import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
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
        className=" rounded-md	p-3  
        mix-blend-screen	drop-shadow-lg	backdrop-blur-sm	  backdrop-brightness-50		backdrop-filter 
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

  /*
  return (
    <div
      className={`flex flex-col gap-x-5 p-2 transition hover:bg-gray-50/50 xl:flex-row ${
        odd && 'border-b border-t xl:flex-row-reverse'
      }`}
    >
      <div className="w-full xl:w-9/12">
        <ImageBox
          image={project.coverImage}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div>
      <div className="flex xl:w-1/4">
        <TextBox project={project} />
      </div>
    </div>
  ) */
}

function TextBox({ project }: { project: ShowcaseProject }) {
  return (
    <div className="relative mt-2 flex w-full flex-col justify-between p-3 xl:mt-0">
      <div>
        {/* Title */}
        <div className="mb-2 text-xl font-extrabold tracking-tight md:text-2xl">
          {project.title}
        </div>
        {/* Overview  */}
        <div className="font-serif text-gray-500">
          <CustomPortableText value={project.overview!} />
        </div>
      </div>
      {/* Tags */}
      <div className="mt-4 flex flex-row gap-x-2">
        {project.tags?.map((tag, key) => (
          <div className="text-sm font-medium lowercase md:text-lg" key={key}>
            #{tag}
          </div>
        ))}
      </div>
    </div>
  )
}
