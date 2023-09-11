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

type Project = {
  id: number
  name: string
  year: number
}

export function WorkPage({ page, settings, preview, loading }: WorkPageProps) {
  const { overview, showcaseProjects, title = 'All my works' } = page ?? {}

  // Get unique years from the projects
  const uniqueYears = Array.from(
    new Set(showcaseProjects?.map((project) => project.year))
  )

  // Sort the years in descending order
  const years = uniqueYears.sort((a, b) => b - a)

  const [selectedYear, setSelectedYear] = useState<number | null | undefined>(
    null
  )
  const filteredProjects = selectedYear
    ? showcaseProjects?.filter((project) => project.year === selectedYear)
    : showcaseProjects?.sort((a, b) => b.year - a.year)

  return (
    <>
      <WorkPageHead page={page} settings={settings} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div className="space-y-20">
          {/* Header */}
          {title && (
            <div className={` text-center  text-[#6E6E6E]`}>
              <div className="my-1 text-2xl font-normal tracking-tight  md:my-3 md:text-4xl">
                <button
                  className="mx-0 w-full text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E]  md:mx-5  md:w-auto"
                  onClick={() => setSelectedYear(null)}
                >
                  All
                </button>
                {years.map((year) => (
                  <button
                    className="mx-0 w-full text-[#6E6E6E] hover:text-black dark:text-white dark:hover:text-[#6E6E6E]  md:mx-5  md:w-auto"
                    key={year}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}

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

          {/* Workaround: scroll to top on route change */}
        </div>
      </Layout>
    </>
  )
}
