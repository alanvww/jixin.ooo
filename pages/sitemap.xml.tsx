import groq from 'groq'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'

export default function SiteMap() {
  return <div>loading</div>
}

export async function getServerSideProps({ res }) {
  const client = getClient({ token: readToken })

  const baseUrl = `https://jixin.ooo/projects`
  const query = groq`{
      "projects": *[_type == 'project']{slug},
    }`
  const urls = await client.fetch(query)
  const projects = urls.projects.map((page) => {
    const slug = page.slug.current === '/' ? '/' : `/${page.slug.current}`
    return `
      <loc>${baseUrl}${slug}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    `
  })

  const locations = [...projects]
  const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${locations
          .map((location) => {
            return `<url>
                      ${location}
                    </url>
                  `
          })
          .join('')}
    </urlset>
    `
  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap())
  res.end()
  return {
    props: {},
  }
}
