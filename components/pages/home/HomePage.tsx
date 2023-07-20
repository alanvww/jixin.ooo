import { Canvas, useFrame } from '@react-three/fiber'
import { Navbar } from 'components/global/Navbar'
import PreviewNavbar from 'components/global/PreviewNavbar'
import { ProjectListItem } from 'components/pages/home/ProjectListItem'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import Script from 'next/script'
import * as React from 'react'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import HomePageHead from './HomePageHead'

import { HydraBackground } from 'components/shared/HydraBackground'

export interface HomePageProps {
  settings: SettingsPayload
  page: HomePagePayload
  preview?: boolean
  loading?: boolean
}

export function HomePage({ page, settings, preview, loading }: HomePageProps) {
  const { overview, showcaseProjects, title = 'Personal website' } = page ?? {}

  return (
    <>
      <HomePageHead page={page} settings={settings} />

      {preview && <PreviewBanner loading={loading} />}
      {preview ? (
        <PreviewNavbar settings={settings} />
      ) : (
        <Navbar menuItems={settings?.menuItems} />
      )}

      <HydraBackground />
    </>
  )
}
