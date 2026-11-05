'use client'

import clsx from 'clsx'
import { useReducedMotion } from 'framer-motion'
import { SiteHeader } from '@/components/SiteHeader'
import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'

export function RootLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="studio-layout">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="h-2" aria-hidden="true" />
      <div
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="studio-page-frame relative flex flex-auto overflow-hidden bg-white pt-14"
      >
        <div
          className={clsx(
            'studio-content relative isolate flex w-full flex-col',
            className,
          )}
        >
          <GridPattern
            className="pointer-events-none absolute inset-x-0 -top-5 -z-10 h-[1000px] w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-50 stroke-neutral-950/5"
            yOffset={-96}
            interactive={!shouldReduceMotion}
          />
          <header className="relative z-20">
            <SiteHeader />
          </header>
          <main id="main-content" className="w-full flex-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
