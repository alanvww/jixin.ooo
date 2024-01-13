'use client'

import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import ScrollUp from 'components/shared/ScrollUp'
import Link from 'next/link'
import { Suspense } from 'react'
import type { ProjectPayload, SettingsPayload } from 'types'

import Layout from '../../shared/Layout'
import ProjectPageHead from './ProjectPageHead'

export interface ProjectPageProps {
  project: ProjectPayload
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
}

export function ProjectPage({
  project,
  settings,
  homePageTitle,
  preview,
  loading,
}: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    coverImage,
    description,
    duration,
    overview,
    tags,
    title,
    year,
    medium,
    size,
    edition,
    collaboration,
    url,
  } = project || {}
  const worktype = [
    { title: 'Drawing & Painting', value: 'drawing-painting' },
    { title: 'Experience', value: 'experiences' },
    { title: 'Installation', value: 'installations' },
    { title: 'Performance', value: 'performances' },
    { title: 'Print', value: 'prints' },
  ]

  return (
    <>
      <ProjectPageHead project={project} title={homePageTitle} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <Suspense fallback={<p>Loading project details...</p>}>
          <div>
            <div className="mb-20 space-y-6 ">
              {/* Header */}
              <Header title={title} description={overview} />

              <div className="mb-20 flex flex-col md:flex-row-reverse  ">
                <div className="flex-1 flex-col">
                  {/* Work Type */}
                  {tags && (
                    <div className="mb-5 md:mb-10 ">
                      <h2 className="text-lg font-bold text-gray-800/30 dark:text-gray-400/50">
                        Work Type
                      </h2>
                      <p className=" max-w-3xl text-xl text-gray-600 dark:text-white ">
                        {tags
                          ?.map(
                            (tag) =>
                              worktype.find((type) => type.value === tag)?.title
                          )
                          .join(', ')}
                      </p>
                    </div>
                  )}
                  {/* Medium */}
                  {medium && medium != '' && (
                    <div className="mb-5 md:mb-10 ">
                      <h2 className="text-lg font-bold text-gray-800/30 dark:text-gray-400/50">
                        Medium
                      </h2>
                      <p className=" max-w-3xl text-xl text-gray-600 dark:text-white ">
                        {medium}
                      </p>
                    </div>
                  )}
                  {/* Year */}
                  {year && year != null && (
                    <div className="mb-5 md:mb-10">
                      <h2 className="text-lg font-bold text-gray-800/30 dark:text-gray-400/50">
                        Year
                      </h2>
                      <p className=" max-w-3xl text-xl text-gray-600 dark:text-white">
                        {year}
                      </p>
                    </div>
                  )}
                  {/* Size */}
                  {size && size != '' && (
                    <div className="mb-5 md:mb-10">
                      <h2 className="text-lg font-bold text-gray-800/30 dark:text-gray-400/50">
                        Size
                      </h2>
                      <p className=" max-w-3xl text-xl text-gray-600 dark:text-white">
                        {size}
                      </p>
                    </div>
                  )}
                  {/* Edition */}
                  {edition && edition != '' && (
                    <div className="mb-5 md:mb-10">
                      <h2 className="text-lg font-bold text-gray-800/30 dark:text-gray-400/50">
                        Edition
                      </h2>
                      <p className=" max-w-3xl text-xl text-gray-600 dark:text-white">
                        {edition}
                      </p>
                    </div>
                  )}
                  {/* collaboration */}
                  {collaboration && collaboration != '' && (
                    <div className="mb-5 md:mb-10">
                      <h2 className="text-lg font-bold text-gray-800/30 dark:text-gray-400/50">
                        Collaboration
                      </h2>
                      <p className=" max-w-3xl text-xl text-gray-600 dark:text-white">
                        {collaboration}
                      </p>
                    </div>
                  )}
                  {/* URL */}
                  {url && url.toString() != '' && (
                    <div className="mb-5 md:mb-10">
                      <h2 className="text-lg font-bold text-gray-800/30 dark:text-gray-400/50">
                        URL
                      </h2>
                      <p className=" max-w-3xl text-xl text-gray-600 dark:text-white">
                        <Link href={url} target="_blank">
                          {url.toString()}
                        </Link>
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <div className="flex-auto">
                    <CustomPortableText
                      paragraphClasses=" max-w-3xl text-xl text-gray-600"
                      value={description}
                    />
                  </div>
                )}
              </div>

              {/* Workaround: scroll to top on route change */}
              <ScrollUp />
            </div>
          </div>
        </Suspense>
      </Layout>
    </>
  )
}
