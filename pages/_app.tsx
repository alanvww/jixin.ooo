import 'styles/index.css'

import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { IBM_Plex_Mono, Nunito_Sans, PT_Serif } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { lazy } from 'react'

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

const sans = Nunito_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
})

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})

const PreviewProvider = lazy(() => import('components/preview/PreviewProvider'))

export default function App({ Component, pageProps }: AppProps) {
  const { preview, token } = pageProps
  return (
    <ThemeProvider attribute="class">
      <style jsx global>
        {`
          :root {
            --font-mono: ${mono.style.fontFamily};
            --font-sans: ${sans.style.fontFamily};
            --font-serif: ${serif.style.fontFamily};
          }
        `}
      </style>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        innerStyle={{
          backgroundColor: 'var(--cursor-color)',
        }}
        outerStyle={{
          border: '3px solid var(--cursor-color)s',
        }}
      />
      {preview ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
      <Analytics />
    </ThemeProvider>
  )
}
