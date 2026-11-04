import { type MetadataRoute } from 'next'
import { site, siteUrl } from '@/lib/site'
export const dynamic = 'force-static'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(site.domain ? { allow: '/' } : { disallow: '/' }),
    },
    sitemap: siteUrl + '/sitemap.xml',
  }
}
