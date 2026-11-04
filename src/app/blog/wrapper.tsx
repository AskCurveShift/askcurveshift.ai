import { RootLayout } from '@/components/RootLayout'
import { Eyebrow, FollowWriting, TextLink } from '@/components/Elements'
import { MDXComponents } from '@/components/MDXComponents'
import { type Article, loadArticles } from '@/lib/mdx'
import { formatDate } from '@/lib/formatDate'
export default async function BlogArticleWrapper({
  article,
  children,
}: {
  article: Article
  children: React.ReactNode
}) {
  const related = (await loadArticles())
    .filter((item) => item.title !== article.title)
    .slice(0, 2)
  return (
    <RootLayout>
      <article>
        <header className="shell page-intro article-header">
          <Eyebrow>{article.topic || 'Field notes'}</Eyebrow>
          <h1>{article.title}</h1>
          <p className="page-lead">{article.description}</p>
          <div className="article-byline">
            <span>Drew Russell · Curve Shift</span>
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
