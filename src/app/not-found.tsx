import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'

export default function NotFound() {
  return (
    <RootLayout>
      <PageIntro
        eyebrow="404 / A different direction"
        title="This page took a different path."
      >
        <p>Head back to the blog for the latest writing.</p>
      </PageIntro>
      <Container className="mt-10">
        <Button href="/">Back to the blog</Button>
      </Container>
    </RootLayout>
  )
}
