import { ImageResponse } from 'next/og'
import { ArticleSocialCard } from '@/components/ArticleSocialCard'
import { articleSocialImage, socialImageSize } from '@/lib/article-social'
import { type Article, loadArticles } from '@/lib/mdx'

export const dynamic = 'force-static'
export const dynamicParams = false

async function cards() {
  const articles = await loadArticles()

  return articles.map((article) => ({
    article,
    image: articleSocialImage(article, article.href).split('/').at(-1)!,
  }))
}

export async function generateStaticParams() {
  // A reserved generic card keeps the static route valid before the first post.
  return [
    { image: 'curve-shift.png' },
    ...(await cards()).map(({ image }) => ({ image })),
  ]
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ image: string }> },
) {
  const { image } = await params
  let article: Article | undefined
  if (image === 'curve-shift.png') {
    article = {
      title: 'Field notes for the next stage.',
      description: '',
      topic: 'Cyber security. AI. Growth.',
      date: '',
    }
  } else {
    article = (await cards()).find((card) => card.image === image)?.article
  }
  if (!article) return new Response('Not found', { status: 404 })
  return new ImageResponse(
    <ArticleSocialCard article={article} />,
    socialImageSize,
  )
}
