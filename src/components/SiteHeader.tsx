'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

export function SiteHeader({
  panelId,
  expanded,
  onToggle,
  toggleRef,
  invert = false,
}: {
  panelId: string
  expanded: boolean
  onToggle: () => void
  toggleRef: React.RefObject<HTMLButtonElement | null>
  invert?: boolean
}) {
  const Icon = expanded ? XIcon : MenuIcon
  return (
    <Container>
      <div
        className={clsx(
          'studio-header flex items-center justify-between',
          invert && 'studio-header-invert',
        )}
      >
        <Link href="/" aria-label="Curve Shift, home">
          <img
            src={
              invert
                ? '/brand/curve-shift-reversed.svg'
                : '/brand/curve-shift.svg'
            }
            width="337"
            height="64"
            alt="Curve Shift"
            className="studio-wordmark"
          />
        </Link>
        <div className="flex items-center gap-x-8">
          <Button className="studio-feed" href="/feed.xml" invert={invert}>
            RSS feed
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded ? 'true' : 'false'}
            aria-controls={panelId}
            className={clsx(
              'studio-toggle group -m-2.5 rounded-full p-2.5 transition',
              invert ? 'hover:bg-white/10' : 'hover:bg-neutral-950/10',
            )}
            aria-label={expanded ? 'Close navigation' : 'Open navigation'}
          >
            <Icon
              className={clsx(
                'h-6 w-6',
                invert
                  ? 'fill-white group-hover:fill-neutral-200'
                  : 'fill-neutral-950 group-hover:fill-neutral-700',
              )}
            />
          </button>
        </div>
      </div>
    </Container>
  )
}
