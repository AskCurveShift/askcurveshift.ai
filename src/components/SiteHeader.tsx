'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Arrow, Brand } from '@/components/Elements'
const links = [
  { href: '/', label: 'Blog' },
  { href: '/about/', label: 'About' },
]
export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          href="/"
          aria-label="Curve Shift, home"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                (link.href === '/' &&
                  (pathname === '/' || pathname.startsWith('/blog'))) ||
                pathname.replace(/\/$/, '') === link.href.replace(/\/$/, '')
                  ? 'page'
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a href="/feed.xml" className="header-feed">
          RSS feed
          <Arrow diagonal />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <span
            className={open ? 'menu-glyph is-open' : 'menu-glyph'}
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav shell"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <Arrow />
            </Link>
          ))}
          <a href="/feed.xml">
            RSS feed
            <Arrow />
          </a>
        </nav>
      )}
    </header>
  )
}
