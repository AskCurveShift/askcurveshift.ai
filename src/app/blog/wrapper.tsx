import { RootLayout } from '@/components/RootLayout'
import Link from 'next/link'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { MDXComponents } from '@/components/MDXComponents'
import { type Article, loadArticles } from '@/lib/mdx'
import { formatDate } from '@/lib/formatDate'
import { articleSocialImage } from '@/lib/article-social'
import { site, siteUrl } from '@/lib/site'
export default async function BlogArticleWrapper({
  article,
  children,
}: {
  article: Article
  children: React.ReactNode
}) {
  const articles = await loadArticles()
  const published = articles.find((item) => item.title === article.title)
  const articleUrl = published && new URL(published.href, siteUrl).href
  const related = articles
    .filter((item) => item.title !== article.title)
    .slice(0, 2)
  return (
    <RootLayout>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        {published && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: article.title,
                description: article.description,
                datePublished: `${article.date}T12:00:00Z`,
                mainEntityOfPage: articleUrl,
                url: articleUrl,
                image: new URL(
                  articleSocialImage(article, published.href),
                  siteUrl,
                ).href,
                author: {
                  '@type': 'Person',
                  name: 'Drew Russell',
                  url: new URL('/about/', siteUrl).href,
                  sameAs: site.linkedin,
                },
                publisher: {
                  '@type': 'Organization',
                  name: site.name,
                  url: siteUrl,
                },
              }).replace(/</g, '\\u003c'),
            }}
          />
        )}
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl">
              {article.title}
            </h1>
            <time
              dateTime={article.date}
              className="order-first text-sm text-neutral-950"
            >
              {formatDate(article.date)}
            </time>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              by{' '}
              <Link href="/about/" rel="author">
                {article.author?.name || 'Drew Russell'}
              </Link>
              , {article.author?.role || 'Curve Shift'}
            </p>
            <p className="mt-4 text-sm text-neutral-600">
              {article.topic}
              {article.readingTime && <> · {article.readingTime} min read</>}
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-neutral-600">
              {article.description}
            </p>
          </header>
        </FadeIn>
        <FadeIn>
          <MDXComponents.wrapper className="mt-24 sm:mt-32 lg:mt-40">
            {children}
          </MDXComponents.wrapper>
        </FadeIn>
      </Container>
      {related.length > 0 && (
        <Container as="section" className="mt-24 sm:mt-32 lg:mt-40">
          <h2 className="font-display text-2xl font-semibold text-neutral-950">
            More articles
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
            {related.map((item) => (
              <FadeIn key={item.href}>
                <Border className="pt-16">
                  <h3 className="font-display text-2xl font-semibold text-neutral-950">
                    <Link href={item.href}>{item.title}</Link>
                  </h3>
                  <p className="mt-6 text-base text-neutral-600">
                    {item.description}
                  </p>
                  <Button href={item.href} className="mt-8">
                    Read more
                  </Button>
                </Border>
              </FadeIn>
            ))}
          </div>
        </Container>
      )}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <Button href="/">All posts</Button>
      </Container>
    </RootLayout>
  )
}
