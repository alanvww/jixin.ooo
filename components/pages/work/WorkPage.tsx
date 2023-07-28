import { ProjectListItem } from 'components/pages/work/ProjectListItem'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
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
  const { overview, showcaseProjects, title = 'Personal website' } = page ?? {}

  return (
    <>
      <WorkPageHead page={page} settings={settings} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div className="space-y-20">
          {/* Header */}
          {title && (
            <div
              className={` text-center 
      text-[#6E6E6E]`}
            >
              {/* Title */}
              {title && (
                <div className="text-3xl font-extrabold tracking-tight md:text-5xl">
                  {title}
                </div>
              )}
            </div>
          )}
          {/* Showcase projects */}
          {showcaseProjects && showcaseProjects.length > 0 && (
            <div className="mx-auto grid max-w-[100rem] gap-4 rounded-md xl:grid-cols-3">
              {showcaseProjects.map((project, key) => {
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

          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
