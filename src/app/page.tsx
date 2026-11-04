import { type Metadata } from 'next'
import { BlogIndex } from '@/components/BlogIndex'
export const metadata: Metadata = { alternates: { canonical: '/' } }
export default function Home() {
  return <BlogIndex />
}
