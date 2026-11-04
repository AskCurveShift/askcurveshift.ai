import Link from 'next/link'
import { RootLayout } from '@/components/RootLayout'
import { Eyebrow, FollowWriting, TextLink } from '@/components/Elements'
import { loadArticles } from '@/lib/mdx'
import { formatDate } from '@/lib/formatDate'

export async function BlogIndex() {
  const articles = await loadArticles()

  return (
    <RootLayout>
      <header className="shell page-intro blog-intro">
        <Eyebrow>Curve Shift · A blog by Drew Russell</Eyebrow>
        <h1>
          Field notes for
          <br />
          <span>the next stage.</span>
        </h1>
        <p className="page-lead">
          An independent perspective on cybersecurity, AI, technical sales, and
          the decisions that shape how startups grow.
        </p>
        <div className="topic-strip" aria-label="Writing topics">
          <span>Cybersecurity</span>
          <span>AI</span>
          <span>Technical sales</span>
          <span>GTM & growth</span>
        </div>
      </header>
      <section className="shell blog-index" aria-label="Blog posts">
        {articles.length ? (
          <>
            <Eyebrow>Latest writing</Eyebrow>
            <div className="article-list" aria-label="Latest blog posts">
              {articles.map((article) => (
                <article key={article.href}>
                  <div>
                    <span className="micro">{article.topic}</span>
                    <time dateTime={article.date}>
                      {formatDate(article.date)}
                    </time>
                    {article.readingTime && (
                      <span className="article-reading-time">
                        {article.readingTime} min read
                      </span>
                    )}
                  </div>
                  <div>
                    <h2>
                      <Link href={article.href}>{article.title}</Link>
                    </h2>
                    <p>{article.description}</p>
                    <TextLink href={article.href}>Read the post</TextLink>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="blog-empty">
            <Eyebrow>On the writing desk</Eyebrow>
            <h2>The first posts are on the way.</h2>
            <p>
              New essays and field notes will appear here as they’re published.
              There’s nothing in the archive just yet.
            </p>
            <TextLink href="/about/">About the author</TextLink>
          </div>
        )}
        <FollowWriting />
      </section>
    </RootLayout>
  )
}
