import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import Layout from 'components/shared/Layout'
// import dynamic from 'next/dynamic'
import { useRef } from 'react'
/*
const Gradient = dynamic(() =>
  import('shadergradient').then((mod) => mod.Gradient)
)

const GradientCanvas = dynamic(() =>
  import('shadergradient').then((mod) => mod.GradientCanvas)
) */
import type { PagePayload, SettingsPayload } from 'types'

import PageHead from './PageHead'

export interface PageProps {
  page: PagePayload
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
}

export function Page({
  page,
  settings,
  homePageTitle,
  preview,
  loading,
}: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title } = page || {}
  const ref = useRef(undefined)

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div>
          <div className="mb-14">
            {/* Header */}
            <Header title={title} description={overview} />

            {/* Body */}
            {body && (
              <CustomPortableText
                paragraphClasses="max-w-3xl text-gray-600 text-xl"
                value={body}
              />
            )}

            {/* Workaround: scroll to top on route change */}
          </div>
          <div className="absolute left-0 w-screen border-t" />
        </div>
      </Layout>
    </>
  )
}
