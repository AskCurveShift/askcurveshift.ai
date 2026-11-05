'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'
import { Container } from '@/components/Container'
import { SiteHeader } from '@/components/SiteHeader'
import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { site } from '@/lib/site'

function NavigationRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="even:mt-px sm:bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  )
}

function NavigationItem({
  href,
  children,
  current,
}: {
  href: string
  current?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={current ? 'page' : undefined}
      className="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  )
}

function Navigation({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Main navigation"
      className="studio-navigation mt-px font-display text-5xl font-medium tracking-tight text-white"
    >
      <NavigationRow>
        <NavigationItem
          href="/"
          current={pathname === '/' || pathname.startsWith('/blog')}
        >
          Blog
        </NavigationItem>
        <NavigationItem href="/about/" current={pathname.startsWith('/about')}>
          About
        </NavigationItem>
      </NavigationRow>
    </nav>
  )
}

function RootLayoutInner({
  children,
  className,
  pathname,
}: {
  children: React.ReactNode
  className?: string
  pathname: string
}) {
  let panelId = useId()
  let [expanded, setExpanded] = useState(false)
  let [isTransitioning, setIsTransitioning] = useState(false)
  let openRef = useRef<React.ElementRef<'button'>>(null)
  let closeRef = useRef<React.ElementRef<'button'>>(null)
  let shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.target instanceof Element && event.target.closest('a')) {
        setIsTransitioning(false)
        setExpanded(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && expanded) {
        setIsTransitioning(true)
        setExpanded(false)
      }
    }
    window.addEventListener('click', onClick)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [expanded])

  useEffect(() => {
    if (isTransitioning) {
      const target = expanded ? closeRef : openRef
      target.current?.focus({ preventScroll: true })
    }
  }, [expanded, isTransitioning])

  return (
    <MotionConfig
      transition={
        shouldReduceMotion || !isTransitioning ? { duration: 0 } : undefined
      }
    >
      <div className="studio-layout">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header>
          <div
            className="absolute top-2 right-0 left-0 z-40 pt-14"
            aria-hidden={expanded ? 'true' : undefined}
            inert={expanded ? true : undefined}
          >
            <SiteHeader
              panelId={panelId}
              toggleRef={openRef}
              expanded={expanded}
              onToggle={() => {
                setIsTransitioning(true)
                setExpanded((expanded) => !expanded)
              }}
            />
          </div>

          <motion.div
            layout
            id={panelId}
            data-studio-navigation=""
            style={{ height: expanded ? 'auto' : '0.5rem' }}
            className="relative z-50 overflow-hidden bg-neutral-950 pt-2"
            aria-hidden={expanded ? undefined : 'true'}
            inert={expanded ? undefined : true}
          >
            <motion.div layout className="bg-neutral-800">
              <div className="bg-neutral-950 pt-14 pb-16">
                <SiteHeader
                  invert
                  panelId={panelId}
                  toggleRef={closeRef}
                  expanded={expanded}
                  onToggle={() => {
                    setIsTransitioning(true)
                    setExpanded((expanded) => !expanded)
                  }}
                />
              </div>
              <Navigation pathname={pathname} />
              <div className="studio-menu-footer relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
                <Container>
                  <div className="grid grid-cols-1 gap-y-10 pt-10 pb-16 sm:grid-cols-2 sm:pt-16">
                    <div>
                      <h2>Curve Shift</h2>
                      <p className="mt-6">
                        An independent blog by Drew Russell.
                      </p>
                    </div>
                    <div className="sm:pl-16">
                      <h2>Follow the writing</h2>
                      <div className="mt-6 flex gap-8">
                        <a
                          href={site.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </a>
                        <a href="/feed.xml">RSS feed</a>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </motion.div>
          </motion.div>
        </header>

        <motion.div
          layout
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="studio-page-frame relative flex flex-auto overflow-hidden bg-white pt-14"
        >
          <motion.div
            layout
            className={clsx(
              'studio-content relative isolate flex w-full flex-col pt-9',
              className,
            )}
          >
            <GridPattern
              className="pointer-events-none absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-50 stroke-neutral-950/5"
              yOffset={-96}
              interactive={!shouldReduceMotion}
            />
            <main id="main-content" className="w-full flex-auto">
              {children}
            </main>

            <Footer />
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  )
}

export function RootLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()
  return (
    <RootLayoutInner key={pathname} pathname={pathname} className={className}>
      {children}
    </RootLayoutInner>
  )
}
