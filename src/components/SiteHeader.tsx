'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

const links = [
  { href: '/', label: 'Blog' },
  { href: '/about/', label: 'About' },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <Container>
      <div className="studio-header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          aria-label="Curve Shift, home"
          className="self-start sm:self-auto"
        >
          <img
            src="/brand/curve-shift.svg"
            width="337"
            height="64"
            alt="Curve Shift"
            className="studio-wordmark"
          />
        </Link>
        <nav
          aria-label="Main navigation"
          className="studio-header-nav flex items-center gap-6 self-end sm:self-auto"
        >
          {links.map(({ href, label }) => {
            const current =
              href === '/'
                ? pathname === '/' ||
                  pathname === '/blog' ||
                  pathname.startsWith('/blog/')
                : pathname === '/about' || pathname.startsWith('/about/')
            return (
              <Link
                key={href}
                href={href}
                aria-current={current ? 'page' : undefined}
                className="studio-nav-link text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
              >
                {label}
              </Link>
            )
          })}
          <Button className="studio-feed" href="/feed.xml">
            RSS feed
          </Button>
        </nav>
      </div>
    </Container>
  )
}
