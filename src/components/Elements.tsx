import Link from 'next/link'

export function Arrow({
  diagonal = false,
  ...props
}: React.SVGProps<SVGSVGElement> & { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function Brand() {
  return (
    <span className="brand">
      <img
        src="/brand/curve-shift.svg"
        width="337"
        height="64"
        alt="Curve Shift"
      />
    </span>
  )
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span aria-hidden="true" />
      {children}
    </p>
  )
}
export function TextLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className="text-link">
      {children}
      <Arrow />
    </Link>
  )
}
export function FollowWriting() {
  return (
    <div className="rss-note">
      <span className="micro">Follow the writing</span>
      <p>
        Get new posts in your preferred reader through the{' '}
        <a href="/feed.xml">
          RSS feed <span aria-hidden="true">↗</span>
        </a>
        .
      </p>
    </div>
  )
}
