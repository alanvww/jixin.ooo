import { Footer } from 'components/global/Footer'
import { Navbar } from 'components/global/Navbar'
import PreviewNavbar from 'components/global/PreviewNavbar'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import IntroTemplate from 'intro-template'
import Script from 'next/script'
import { SettingsPayload } from 'types'

const fallbackSettings: SettingsPayload = {
  menuItems: [],
  footer: [],
}

export interface LayoutProps {
  children: React.ReactNode
  settings: SettingsPayload | undefined
  preview?: boolean
  loading?: boolean
}

export default function Layout({
  children,
  settings = fallbackSettings,
  preview,
  loading,
}: LayoutProps) {
  return (
    <div className={`flex min-h-screen flex-col text-black`}>
      {preview && <PreviewBanner loading={loading} />}
      {preview ? (
        <PreviewNavbar settings={settings} />
      ) : (
        <Navbar menuItems={settings?.menuItems} />
      )}
      <canvas id="hydra-canvas" className={`fixed min-h-full min-w-full`} />
      <Script
        src="https://unpkg.com/hydra-synth"
        strategy="beforeInteractive"
      />{' '}
      <Script id="hydra">
        {`// create a new hydra-synth instance
  var hydra = new Hydra({canvas:document.getElementById('hydra-canvas'), detectAudio: false })
  voronoi(8, 1.58)
	.mult(osc(10, 0.109, () => Math.sin(time) * 5.452)
		.saturate(1.493)
		.kaleid(200))
	.modulate(o0, 0.732)
	.add(o0, 0.517)
	.scrollY(-0.01)
	.scale(0.99)
	.modulate(voronoi(1.141, 1.519), 0.012)
	.luma(0.252)
	.out();
  `}
      </Script>
      <Footer footer={settings?.footer} />
    </div>
  )
}
