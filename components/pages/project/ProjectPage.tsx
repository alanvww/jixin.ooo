import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import ImageBox from 'components/shared/ImageBox'
import ScrollUp from 'components/shared/ScrollUp'
import Link from 'next/link'
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
  } = project || {}
  return (
    <>
      <ProjectPageHead project={project} title={homePageTitle} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div>
          <div className="mb-20 space-y-6 ">
            {/* Header */}
            <Header title={title} description={overview} />

            <div className="mb-20 flex flex-col md:flex-row-reverse  ">
              <div className="flex-1 flex-col">
                {/* Medium */}
                {medium && medium != '' && (
                  <div className="mb-5 md:mb-10 ">
                    <h2 className="text-2xl font-bold text-gray-800/30">
                      Medium
                    </h2>
                    <p className=" max-w-3xl text-xl text-gray-600">{medium}</p>
                  </div>
                )}
                {/* Year */}
                {year && year != null && (
                  <div className="mb-5 md:mb-10">
                    <h2 className="text-2xl font-bold text-gray-800/30">
                      Year
                    </h2>
                    <p className=" max-w-3xl text-xl text-gray-600">{year}</p>
                  </div>
                )}
                {/* Size */}
                {size && size != '' && (
                  <div className="mb-5 md:mb-10">
                    <h2 className="text-2xl font-bold text-gray-800/30">
                      Size
                    </h2>
                    <p className=" max-w-3xl text-xl text-gray-600">{size}</p>
                  </div>
                )}
                {/* Edition */}
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
          <div className="absolute left-0 w-screen border-t" />
        </div>
      </Layout>
    </>
  )
}
