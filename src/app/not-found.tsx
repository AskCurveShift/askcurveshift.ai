import Link from 'next/link'
import { RootLayout } from '@/components/RootLayout'
import { Arrow, Eyebrow } from '@/components/Elements'
export default function NotFound() {
  return (
    <RootLayout>
      <section className="shell page-intro not-found">
        <Eyebrow>404 / A different direction</Eyebrow>
        <h1>
          This page took
          <br />
          <span>a different path.</span>
        </h1>
        <p className="page-lead">
          Head back to the blog for the latest writing.
        </p>
        <Link className="button button-dark" href="/">
          Back to the blog
          <Arrow />
        </Link>
      </section>
    </RootLayout>
  )
}
