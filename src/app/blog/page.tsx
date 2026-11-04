import { type Metadata } from 'next'
import { BlogIndex } from '@/components/BlogIndex'
// Keep existing /blog/ links working; the homepage is the primary blog index.
export const metadata: Metadata = { alternates: { canonical: '/' } }
export default function Blog() {
  return <BlogIndex />
}
