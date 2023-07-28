import { toPlainText } from '@portabletext/react'
import { SiteMeta } from 'components/global/SiteMeta'
import { SettingsPayload, WorkPagePayload } from 'types'

export interface WorkPageHeadProps {
  settings?: SettingsPayload
  page?: WorkPagePayload
}

export default function WorkPageHead({ settings, page }: WorkPageHeadProps) {
  return (
    <SiteMeta
      description={page?.overview ? toPlainText(page.overview) : ''}
      image={settings?.ogImage}
      title={page?.title}
    />
  )
}
