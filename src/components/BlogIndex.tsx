import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { loadArticles } from '@/lib/mdx'
import { formatDate } from '@/lib/formatDate'

export async function BlogIndex() {
  const articles = await loadArticles()

  return (
    <RootLayout>
      <PageIntro
        eyebrow="Curve Shift · A blog by Drew Russell"
        title="Field notes for the next stage."
      >
        <p>
          An independent perspective on cybersecurity, AI, technical sales, and
          the decisions that shape how businesses grow.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <section className="space-y-24 lg:space-y-32" aria-label="Blog posts">
          {articles.map((article) => (
            <FadeIn key={article.href}>
              <article>
                <Border className="pt-16">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">
                        <Link href={article.href}>{article.title}</Link>
                      </h2>
                      <dl className="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 lg:px-4">
                        <dt className="sr-only">Published</dt>
                        <dd className="absolute top-0 left-0 text-sm text-neutral-950 lg:static">
                          <time dateTime={article.date}>
                            {formatDate(article.date)}
                          </time>
                        </dd>
                        <dt className="sr-only">Author</dt>
                        <dd className="mt-6 flex gap-x-4">
                          {article.author?.image && (
                            <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                              <Image
                                alt=""
                                {...article.author.image}
                                className="h-12 w-12 object-cover grayscale"
                              />
                            </div>
                          )}
                          <div className="text-sm text-neutral-950">
                            <Link
                              href="/about/"
                              rel="author"
                              className="font-semibold"
                            >
                              {article.author?.name || 'Drew Russell'}
                            </Link>
                            <div>{article.author?.role || 'Curve Shift'}</div>
                          </div>
                        </dd>
                        <dt className="sr-only">Topic and reading time</dt>
                        <dd className="mt-6 text-sm text-neutral-600">
                          {article.topic}
                          {article.readingTime && (
                            <> · {article.readingTime} min read</>
                          )}
                        </dd>
                      </dl>
                      <p className="mt-6 max-w-2xl text-base text-neutral-600">
                        {article.description}
                      </p>
                      <Button
                        href={article.href}
                        aria-label={`Read more: ${article.title}`}
                        className="mt-8"
                      >
                        Read more
                      </Button>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          ))}
          {articles.length === 0 && (
            <FadeIn>
              <Border className="pt-16">
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  The first posts are on the way.
                </h2>
                <p className="mt-6 max-w-2xl text-base text-neutral-600">
                  New essays and field notes will appear here as they’re
                  published.
                </p>
                <Button href="/about/" className="mt-8">
                  About the author
                </Button>
              </Border>
            </FadeIn>
          )}
        </section>
      </Container>
    </RootLayout>
  )
}
