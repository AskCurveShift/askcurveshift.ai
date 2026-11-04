import { type Metadata } from 'next'
import Link from 'next/link'
import { RootLayout } from '@/components/RootLayout'
import { Arrow } from '@/components/Elements'
import { site } from '@/lib/site'
export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Drew Russell, Senior Manager, Identity at Rubrik and the writer behind Curve Shift. More than 15 years in technology, with a focus on identity security and incident response.',
  alternates: { canonical: '/about/' },
}
export default function About() {
  return (
    <RootLayout className="personal-about">
      <div className="shell spotlight-about-grid">
        <header className="spotlight-about-intro">
          <p className="spotlight-about-label">Drew Russell · Curve Shift</p>
          <h1>I work in security and write about what comes next.</h1>
          <p className="spotlight-about-lead">
            I’m Senior Manager, Identity at Rubrik, where I help organizations
            secure their identity providers and prepare for real-world incident
            response.
          </p>
        </header>
        <aside className="spotlight-about-aside">
          <figure
            className="spotlight-about-quote"
            aria-label="Professional recommendation"
          >
            <p className="spotlight-quote-label">On working with Drew</p>
            <span className="spotlight-quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote>
              We have been super lucky to have you. A renaissance man: can sell,
              can code, and give product managers a run for their money.
            </blockquote>
            <figcaption>
              Co-founder of a publicly traded cybersecurity company and an AI
              startup
            </figcaption>
          </figure>
          <ul className="spotlight-about-links" aria-label="Follow Drew’s work">
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM19.02 18.75h-2.94V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.8V9.2h2.82v1.3h.04c.39-.74 1.35-1.53 2.78-1.53 2.98 0 3.58 1.96 3.58 4.51v5.27Z" />
                </svg>
                Connect on LinkedIn
                <Arrow diagonal />
              </a>
            </li>
            <li>
              <a href="/feed.xml">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
                  <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
                </svg>
                Follow the writing via RSS
                <Arrow diagonal />
              </a>
            </li>
          </ul>
        </aside>
        <section
          className="spotlight-about-story"
          aria-label="Background and writing"
        >
          <p>
            I’ve spent more than 15 years in the industry, including nearly a
            decade at Rubrik. During that time, I’ve helped bring new products
            and capabilities to market, including Rubrik’s expansion into
            Identity.
          </p>
          <p>
            My work connects the details of security architecture with the
            practical decisions organizations face when responding to a breach.
            I’m interested in how new technology changes those decisions and
            what it takes to make it useful.
          </p>
          <h2>Why I write</h2>
          <p>
            Curve Shift is where I explore cyber security, AI, and how new
            technology changes the work of securing organizations. I write
            about what those changes mean in practice.
          </p>
          <p>
            Alongside that, I explore technical sales and startup growth: how
            people understand a product, put it to work, and bring it to a wider
            market. My experience in the field shapes the questions I ask here.
          </p>
          <Link href="/" className="spotlight-writing-link">
            Explore the writing
            <Arrow />
          </Link>
        </section>
      </div>
    </RootLayout>
  )
}
