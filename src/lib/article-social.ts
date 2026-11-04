import { createHash } from 'node:crypto'
import { type Metadata } from 'next'
import { type Article } from '@/lib/mdx'
import { site, siteUrl } from '@/lib/site'

export const socialImageSize = { width: 1200, height: 630 }

// Bump the version when changing the card design to refresh cached image URLs.
const cardVersion = '1'

export function articleSocialImage(article: Article, href: string) {
  const slug = href.split('/').filter(Boolean).at(-1)!
  const revision = createHash('sha256')
    .update(
      JSON.stringify([cardVersion, article.title, article.topic, article.date]),
    )
    .digest('hex')
    .slice(0, 12)
  return `/social/${slug}-${revision}.png`
}

export function createArticleMetadata(
  article: Article,
  href: string,
  extra: Metadata = {},
): Metadata {
  const url = new URL(href, siteUrl).href
  const image = {
    url: new URL(articleSocialImage(article, href), siteUrl).href,
    ...socialImageSize,
    type: 'image/png',
    alt: `${article.title} — ${site.name}, by Drew Russell`,
  }
  return {
    ...extra,
    title: article.title,
    description: article.description,
    alternates: { ...extra.alternates, canonical: url },
    openGraph: {
      type: 'article',
      siteName: site.name,
      title: article.title,
      description: article.description,
      url,
      publishedTime: `${article.date}T12:00:00Z`,
      authors: [site.linkedin],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [image],
    },
  }
}
