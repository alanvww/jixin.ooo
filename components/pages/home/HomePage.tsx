import { HomeNavbar } from 'components/global/HomeNavbar'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import AnimeBackground from 'components/shared/AnimeBackground'
import ScrollUp from 'components/shared/ScrollUp'
import * as React from 'react'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import HomePageHead from './HomePageHead'

export interface HomePageProps {
  settings: SettingsPayload
  page: HomePagePayload
  preview?: boolean
  loading?: boolean
}

export function HomePage({ page, settings, preview, loading }: HomePageProps) {
  const { title = 'Personal website' } = page ?? {}

  return (
    <>
      <HomePageHead page={page} settings={settings} />

      {preview && <PreviewBanner loading={loading} />}
      <HomeNavbar menuItems={settings?.menuItems} />

      <AnimeBackground />
      <ScrollUp />
    </>
  )
}
