import AnimeService from '@/services/AnimeService'
import { Anime } from '@/types'
import { GetServerSidePropsContext } from 'next'

const address = process.env.SERVER_ADDRESS

if (!address) throw new Error('No server address env')

function generateSiteMap(anime: Anime[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>${address}/</loc>
      <lastmod>2023-09-04</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
   </url>
   <url>
      <loc>${address}/search</loc>
      <lastmod>2023-09-04</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>
   <url>
      <loc>${address}/list</loc>
      <lastmod>2023-09-04</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>
   ${anime
     .map((item) => {
       const date = new Date(item.updatedAt || item.createdAt)

       const year = date.getFullYear()
       const month = String(date.getMonth() + 1).padStart(2, '0')
       const day = String(date.getDate()).padStart(2, '0')

       const formattedDate = `${year}-${month}-${day}`

       return `<url>
      <loc>${address}/watch/${item.id}</loc>
      <lastmod>${formattedDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
   </url>`
     })
     .join('')}
</urlset> 
 `
}

function SiteMap() {}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const anime = await AnimeService.getAll()

  const sitemap = generateSiteMap(anime)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
