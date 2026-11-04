import 'server-only'
import { type ImageProps } from 'next/image'
import glob from 'fast-glob'
export type MDXEntry<T> = T & { href: string; metadata: T }
export interface Article {
  date: string
  title: string
  description: string
  topic: string
  readingTime?: number
  author?: {
    name: string
    role: string
    image?: Omit<ImageProps, 'alt'> & { alt?: string }
  }
}
export async function loadArticles(): Promise<Array<MDXEntry<Article>>> {
  const filenames = await glob('*/page.mdx', { cwd: 'src/app/blog' })
  const articles = await Promise.all(
    filenames.map(async (filename) => {
      const article = (await import('../app/blog/' + filename))
        .article as Article
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(article.date) ||
        !article.title ||
        !article.description ||
        !article.topic
      ) {
        throw new Error('Article metadata is incomplete: ' + filename)
      }
      return {
        ...article,
        metadata: article,
        href: '/blog/' + filename.replace('/page.mdx', '') + '/',
      }
    }),
  )
  return articles.sort((a, b) => b.date.localeCompare(a.date))
}
