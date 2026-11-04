import { loadArticles } from '@/lib/mdx'
import { site, siteUrl } from '@/lib/site'
export const dynamic = 'force-static'
function xml(value: string) {
  return value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[char]!,
  )
}
export async function GET() {
  const articles = await loadArticles()
  const items = articles
    .map(
      (article) =>
        '<item><title>' +
        xml(article.title) +
        '</title><link>' +
        siteUrl +
        article.href +
        '</link><guid isPermaLink="true">' +
        siteUrl +
        article.href +
        '</guid><description>' +
        xml(article.description) +
        '</description><pubDate>' +
        new Date(article.date + 'T12:00:00Z').toUTCString() +
        '</pubDate><category>' +
        xml(article.topic) +
        '</category></item>',
    )
    .join('')
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Curve Shift — Blog</title><link>' +
      siteUrl +
      '/</link><description>' +
      xml(site.description) +
      '</description><language>en-us</language><atom:link href="' +
      siteUrl +
      '/feed.xml" rel="self" type="application/rss+xml" />' +
      items +
      '</channel></rss>',
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  )
}
