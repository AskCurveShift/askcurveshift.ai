import { RootLayout } from '@/components/RootLayout'
import { Eyebrow, FollowWriting, TextLink } from '@/components/Elements'
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
      <article>
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
                image: new URL(articleSocialImage(article, published.href), siteUrl).href,
                author: {
                  '@type': 'Person',
                  name: 'Drew Russell',
                  url: new URL('/about/', siteUrl).href,
                  sameAs: site.linkedin,
                },
                publisher: { '@type': 'Organization', name: site.name, url: siteUrl },
              }).replace(/</g, '\\u003c'),
            }}
          />
        )}
        <header className="shell page-intro article-header">
          <Eyebrow>{article.topic || 'Field notes'}</Eyebrow>
          <h1>{article.title}</h1>
          <p className="page-lead">{article.description}</p>
          <div className="article-byline">
            <span><a href="/about/" rel="author">Drew Russell</a> · Curve Shift</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.readingTime && <span>{article.readingTime} min read</span>}
          </div>
        </header>
        <div className="shell article-body">
          <MDXComponents.wrapper>{children}</MDXComponents.wrapper>
        </div>
      </article>
      {related.length > 0 && (
        <section className="shell section">
          <Eyebrow>Keep reading</Eyebrow>
          <div className="published-grid">
            {related.map((item) => (
              <article className="published-card" key={item.href}>
                <h3>{item.title}</h3>
                <TextLink href={item.href}>Read the post</TextLink>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="shell article-follow">
        <TextLink href="/">All posts</TextLink>
        <FollowWriting />
      </section>
    </RootLayout>
  )
}
