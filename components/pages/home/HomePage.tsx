import { HomeNavbar } from 'components/global/HomeNavbar'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import * as React from 'react'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import HomePageHead from './HomePageHead'

const AnimeBackground = dynamic(
  () => import('components/shared/AnimeBackground'),
  { ssr: false, loading: () => <p>Loading...</p> }
)

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
      <AnimeBackground theme={theme} />{' '}
    </>
  )
}
