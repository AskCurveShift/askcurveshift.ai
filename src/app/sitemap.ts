import { type MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { loadArticles } from '@/lib/mdx'
export const dynamic = 'force-static'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await loadArticles()
  return [
    ...['/', '/about/'].map((path) => ({
      url: siteUrl + path,
    })),
    ...articles.map((article) => ({
      url: siteUrl + article.href,
      lastModified: article.date,
    })),
  ]
}
