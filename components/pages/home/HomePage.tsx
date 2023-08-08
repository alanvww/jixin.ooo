import { HomeNavbar } from 'components/global/HomeNavbar'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import AnimeBackground from 'components/shared/AnimeBackground'
import ScrollUp from 'components/shared/ScrollUp'
import { useTheme } from 'next-themes'
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
  const { theme, setTheme } = useTheme()

  return (
    <>
      <HomePageHead page={page} settings={settings} />

      {preview && <PreviewBanner loading={loading} />}
      <HomeNavbar menuItems={settings?.menuItems} />
      <React.Suspense fallback={<p>Loading...</p>}>
        <AnimeBackground theme={theme} />
      </React.Suspense>
      <ScrollUp />
    </>
  )
}
