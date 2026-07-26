/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
  typescript: {
    // Production builds abort if there are type errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Production builds abort if there are lint errors
    ignoreDuringBuilds: false,
  },
}

export default config
