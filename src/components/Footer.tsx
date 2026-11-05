import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { site } from '@/lib/site'

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <nav aria-label="Footer navigation">
            <ul role="list" className="grid grid-cols-2 gap-8">
              <li>
                <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
                  Explore
                </h2>
                <ul role="list" className="mt-4 text-sm text-neutral-700">
                  <li className="mt-4">
                    <Link
                      href="/"
                      className="transition hover:text-neutral-950"
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="mt-4">
                    <Link
                      href="/about/"
                      className="transition hover:text-neutral-950"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
                  Connect
                </h2>
                <ul role="list" className="mt-4 text-sm text-neutral-700">
                  <li className="mt-4">
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-neutral-950"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li className="mt-4">
                    <a
                      href="/feed.xml"
                      className="transition hover:text-neutral-950"
                    >
                      RSS feed
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div className="flex lg:justify-end">
            <div className="max-w-sm">
              <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
                Follow the writing
              </h2>
              <p className="mt-4 text-sm text-neutral-700">
                Get new posts in your preferred reader through the RSS feed.
              </p>
              <Button href="/feed.xml" className="mt-6">
                RSS feed
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Curve Shift, home">
            <img
              src="/brand/curve-shift.svg"
              width="337"
              height="64"
              alt="Curve Shift"
              className="h-8 w-auto"
            />
          </Link>
          <p className="text-sm text-neutral-700">
            © {site.name} {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
