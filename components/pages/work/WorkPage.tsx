import { ProjectListItem } from 'components/pages/work/ProjectListItem'
import Layout from 'components/shared/Layout'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { useState } from 'react'
import { Suspense } from 'react'
import type { WorkPagePayload } from 'types'
import { SettingsPayload } from 'types'

import WorkPageHead from './WorkPageHead'

export interface WorkPageProps {
  settings: SettingsPayload
  page: WorkPagePayload
  preview?: boolean
  loading?: boolean
}


export function WorkPage({ page, settings, preview, loading }: WorkPageProps) {
  const { showcaseProjects, title = 'All my works' } = page ?? {}

  const [isYearExpanded, setIsYearExpanded] = useState(false);
  const [isCateExpanded, setIsCateExpanded] = useState(false);




  const filters = [{
    id: 'year',
    title: 'Year',
    options: [
      { title: '2023', value: 2023 },
      { title: '2022', value: 2022 },
      { title: '2021', value: 2021 },
      { title: '2020', value: 2020 },
    ]
  },
  {
    id: 'type',
    title: 'Type',
    options: [
      { title: 'Drawings & Paintings', value: 'drawing-painting' },
      { title: 'Experiences', value: 'experiences' },
      { title: 'Installations', value: 'installations' },
      { title: 'Performances', value: 'performances' },
      { title: 'Prints', value: 'prints' }]
  }]

  // Get unique years from the projects
  const uniqueYears = Array.from(
    new Set(filters[0].options.map((project) => project.value))
  )

  const category = Array.from(
    new Set(filters[1].options.map((project) => project.value))
  )

  const categoryBody = Array.from(
    new Set(filters[1].options.map((project) => project.title))
  )

  // Sort the years in descending order
  const years = uniqueYears.sort((a, b) => b - a)

  const [selectedYear, setSelectedYear] = useState<number | null | undefined>(
    null
  )
  const [selectedCategory, setSelectedCategory] = useState<string | null | undefined>(null)


  let filteredProjects

  if (selectedYear && selectedCategory) {
    filteredProjects = showcaseProjects?.filter((project) => project.year === selectedYear)
    filteredProjects = filteredProjects?.filter((project) => {
      return project.tags && project.tags.includes(selectedCategory)
    })
    console.log(selectedCategory)
  } else {
    filteredProjects = showcaseProjects?.sort((a, b) => b.year - a.year)
  }


  if (selectedCategory && !selectedYear) {
    filteredProjects = showcaseProjects?.filter((project) => {
      return project.tags && project.tags.includes(selectedCategory)
    })

  }

  if (!selectedCategory && selectedYear) {
    filteredProjects = showcaseProjects?.filter((project) => project.year === selectedYear)

  }




  return (
    <>
      <WorkPageHead page={page} settings={settings} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div className="space-y-20">
          {/* Header */}
         
          <div className={` text-center  text-[#6E6E6E]`}>
          <button
          className={' p-2  dark:text-white my-1 text-2xl font-normal tracking-tight  md:my-3 md:text-4xl mx-0 text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E]  md:mx-5  md:w-auto'}
          onClick={() => {
            setIsYearExpanded(!isYearExpanded);
          }}
        >
          <a>By Year</a>
          
        </button>
       <span className=' p-2  dark:text-white my-1 text-2xl font-normal tracking-tight  md:my-3 md:text-4xl'>|</span>
        <button
          className={'mx-0 text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E]  md:mx-5  md:w-auto p-2  dark:text-white my-1 text-2xl font-normal tracking-tight  md:my-3 md:text-4xl'}
          onClick={() => {
            setIsCateExpanded(!isCateExpanded);
          }}
        >
          <a>By Work Type</a>
        </button>
           {isYearExpanded ?  <ul role="list" className="md:flex place-content-center  my-1 text-2xl font-normal tracking-tight  md:my-3 md:text-4xl">
              <li
                className="mx-0 w-full text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E]  md:mx-5  md:w-auto"
                onClick={() => setSelectedYear(null)}
              >
                All Years
              </li>
              {years.map((year) => (
                <li
                  className="mx-0 w-full text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E]  md:mx-5  md:w-auto"
                  key={year}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </li>
              ))}
            </ul>: null}

     {isYearExpanded && isCateExpanded ? <div className='my-5 md:my-10 border-b-2 border-[#6E6E6E] dark:border-white'></div> : null}
        {isCateExpanded ?  <ul role="list" className="md:flex place-content-center my-1 text-2xl font-normal tracking-tight  md:my-3 md:text-4xl">
              <li
                className="mx-0 w-full text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E]  md:mx-5  md:w-auto"
                onClick={() => setSelectedCategory(null)}
              >
                All Types
              </li>
              {categoryBody.map((cate) => (
                <li
                  className={"mx-0 w-full text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E]  md:mx-5  md:w-auto"}
                  key={cate}
                  onClick={() => setSelectedCategory(filters[1].options.filter((project)=> project.title === cate)[0].value.toString())}
                >
                  {cate}
                </li>
              ))}
            </ul>: null }
          </div>

          <Suspense fallback={<p>Loading projects...</p>}>
            {/* Showcase projects */}
            {filteredProjects && filteredProjects.length > 0 && (
              <div className="mx-auto grid max-w-[100rem] gap-4 rounded-md xl:grid-cols-3">
                {filteredProjects?.map((project, key) => {
                  const href = resolveHref(project._type, project.slug)
                  if (!href) {
                    return null
                  }
                  return (
                    <Link key={key} href={href}>
                      <ProjectListItem project={project} odd={key % 2} />
                    </Link>
                  )
                })}
              </div>
            )}
          </Suspense>

        </div>
      </Layout>
    </>
  )
}
