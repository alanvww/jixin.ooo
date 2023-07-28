import { homePageQuery } from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'
import type { HomePagePayload } from 'types'

import { WorkPage, WorkPageProps } from './WorkPage'

export default function WorkPagePreview({
  page: initialPage,
  settings,
}: WorkPageProps) {
  const [page, loading] = useLiveQuery<HomePagePayload | null>(
    initialPage,
    homePageQuery
  )

  if (!page) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    )
  }

  return <WorkPage page={page} settings={settings} preview loading={loading} />
}
