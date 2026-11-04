import { SiteHeader } from '@/components/SiteHeader'
import { Footer } from '@/components/Footer'
export function RootLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const content = (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
  return (
    <div className={className ? `personal-site ${className}` : 'personal-site'}>
      {content}
    </div>
  )
}
