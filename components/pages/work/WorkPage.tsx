'use client'
import { ProjectListItem } from 'components/pages/work/ProjectListItem'
import Layout from 'components/shared/Layout'
import { motion } from 'framer-motion'
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

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
}

export function WorkPage({ page, settings, preview, loading }: WorkPageProps) {
  const { showcaseProjects, title = 'All my works' } = page ?? {}

  const [isYearExpanded, setIsYearExpanded] = useState(false)
  const [isCateExpanded, setIsCateExpanded] = useState(false)

  const filters = [
    {
      id: 'year',
      title: 'Year',
      options: [
        { title: '2023', value: 2023 },
        { title: '2022', value: 2022 },
        { title: '2021', value: 2021 },
        { title: '2020', value: 2020 },
      ],
    },
    {
      id: 'type',
      title: 'Type',
      options: [
        { title: 'Drawings & Paintings', value: 'drawing-painting' },
        { title: 'Experiences', value: 'experiences' },
        { title: 'Installations', value: 'installations' },
        { title: 'Performances', value: 'performances' },
        { title: 'Prints', value: 'prints' },
      ],
    },
  ]

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
  const [selectedCategory, setSelectedCategory] = useState<
    string | null | undefined
  >(null)

  let filteredProjects

  if (selectedYear && selectedCategory) {
    filteredProjects = showcaseProjects?.filter(
      (project) => project.year === selectedYear
    )
    filteredProjects = filteredProjects?.filter((project) => {
      return project.tags && project.tags.includes(selectedCategory)
    })
    console.log(selectedCategory)
  } else {
    filteredProjects = showcaseProjects?.sort(
      (a: any, b: any) => b.year - a.year
    )
  }

  if (selectedCategory && !selectedYear) {
    filteredProjects = showcaseProjects?.filter((project) => {
      return project.tags && project.tags.includes(selectedCategory)
    })
  }

  if (!selectedCategory && selectedYear) {
    filteredProjects = showcaseProjects?.filter(
      (project) => project.year === selectedYear
    )
  }

  return (
    <>
      <WorkPageHead page={page} settings={settings} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div className="space-y-20">
          {/* Header */}

          <div className={` text-center  text-[#6E6E6E]`}>
            {/* All buttons */}
            <div className="grid grid-cols-2 ">
              <button
                className={
                  'mx-auto my-1 p-2 text-2xl font-normal  tracking-tight  text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E] md:mx-5 md:my-3  md:w-auto md:text-2xl'
                }
                onClick={() => {
                  setIsYearExpanded(!isYearExpanded)
                }}
              >
                <a>By Year</a>
              </button>
              <button
                className={
                  'mx-auto my-1 p-2 text-2xl font-normal  tracking-tight  text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E] md:mx-5 md:my-3  md:w-auto md:text-2xl'
                }
                onClick={() => {
                  setIsCateExpanded(!isCateExpanded)
                }}
              >
                <a>By Work Type</a>
              </button>
            </div>

            {isYearExpanded ? (
              <ul
                role="list"
                className=" my-1 place-content-center text-2xl font-normal	 tracking-tight transition-all  delay-150 duration-500 ease-out md:my-3  md:flex md:text-2xl"
              >
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
              </ul>
            ) : null}

            {isYearExpanded && isCateExpanded ? (
              <div className="my-5 border-b-2 border-[#6E6E6E] dark:border-white"></div>
            ) : null}
            {isCateExpanded ? (
              <ul
                role="list"
                className=" my-1 place-content-center text-2xl font-normal tracking-tight transition-all delay-150 duration-500 ease-out md:my-3  md:flex md:text-2xl"
              >
                <li
                  className="mx-0 w-full text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E]  md:mx-5  md:w-auto"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Types
                </li>
                {categoryBody.map((cate) => (
                  <li
                    className={
                      'mx-0 w-full text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E]  md:mx-5  md:w-auto'
                    }
                    key={cate}
                    onClick={() =>
                      setSelectedCategory(
                        filters[1].options
                          .filter((project) => project.title === cate)[0]
                          .value.toString()
                      )
                    }
                  >
                    {cate}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <Suspense fallback={<p>Loading projects...</p>}>
            {/* Showcase projects */}
            {filteredProjects && filteredProjects.length > 0 ? (
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="container mx-auto grid max-w-[100rem] gap-4 rounded-md  xl:grid-cols-3"
              >
                {filteredProjects?.map((project, key) => {
                  const href = resolveHref(project._type, project.slug)
                  if (!href) {
                    return <></>
                  }
                  return (
                    <Link key={project.slug} href={href}>
                      <ProjectListItem project={project} odd={key % 2} />
                    </Link>
                  )
                })}
              </motion.div>
            ) : selectedYear && selectedCategory ? (
              <div className="text-center text-xl text-[#6E6E6E] dark:text-white md:text-2xl">
                No projects found for{' '}
                {
                  filters[1].options.filter(
                    (project) => project.value === selectedCategory
                  )[0].title
                }{' '}
                in {selectedYear}
              </div>
            ) : (
              <div className="text-center text-[#6E6E6E] dark:text-white">
                No projects found
              </div>
            )}
          </Suspense>
        </div>
      </Layout>
    </>
  )
}
