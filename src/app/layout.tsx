import { type Metadata } from 'next'
import { site, siteUrl } from '@/lib/site'
import '@/styles/tailwind.css'
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s — Curve Shift',
    default: 'Curve Shift — Cybersecurity, AI & Growth',
  },
  description: site.description,
  icons: {
    icon: [
      { url: '/icon.svg?v=3', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: { index: Boolean(site.domain), follow: Boolean(site.domain) },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'Curve Shift — Field notes for the next stage.',
    description: site.description,
    images: [{ url: '/social-preview.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curve Shift — Cybersecurity, AI & Growth',
    description: site.description,
    images: ['/social-preview.png'],
  },
  alternates: { types: { 'application/rss+xml': '/feed.xml' } },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
