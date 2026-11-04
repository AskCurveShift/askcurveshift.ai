import Link from 'next/link'
import { Arrow, Brand } from '@/components/Elements'
import { site } from '@/lib/site'
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div>
          <Link href="/" aria-label="Curve Shift, home">
            <Brand />
          </Link>
          <p>
            Notes on technology.
            <br />
            Perspectives on growth.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/">Blog</Link>
          <Link href="/about/">About</Link>
        </div>
        <a
          className="footer-social"
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Drew on LinkedIn
          <Arrow diagonal />
        </a>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Curve Shift</span>
        <span>An independent blog by Drew Russell.</span>
        <a href="/feed.xml">
          RSS
          <Arrow diagonal />
        </a>
      </div>
    </footer>
  )
}
