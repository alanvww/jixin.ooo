import HomePagePreview from 'components/pages/home/HomePagePreview'
import { WorkPage } from 'components/pages/work/WorkPage'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { settingsQuery, workPageQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { SettingsPayload, WorkPagePayload } from 'types'

interface PageProps {
  page: WorkPagePayload
  settings: SettingsPayload
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

export default function WorksPage(props: PageProps) {
  const { page, settings, preview } = props

  if (preview) {
    return <HomePagePreview page={page} settings={settings} />
  }

  return <WorkPage page={page} settings={settings} />
}

const fallbackPage: WorkPagePayload = {
  title: '',
  overview: [],
  showcaseProjects: [],
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, page] = await Promise.all([
    client.fetch<SettingsPayload | null>(settingsQuery),
    client.fetch<WorkPagePayload | null>(workPageQuery),
  ])

  return {
    props: {
      page: page ?? fallbackPage,
      settings: settings ?? {},
      preview: draftMode,
      token: draftMode ? readToken : null,
    },
  }
}
