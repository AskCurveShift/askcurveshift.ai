# Curve Shift

An independent blog by Drew Russell on cybersecurity, AI, technical sales, and startup growth. Built with Next.js, Tailwind CSS, and MDX from the owner's licensed Tailwind Plus Studio template.

## Development

- Install dependencies: `npm ci` (Node.js 22).
- Start the local site: `npm run dev`.
- Check TypeScript: `npm run typecheck`.
- Build the production site: `npm run build`.

The build exports static HTML, CSS, JavaScript, metadata, and social images to `out/`. It requires no application server.

## Deployment

The production site is https://askcurveshift.ai. Netlify's existing GitHub integration publishes pushes to `main` in `AskCurveShift/askcurveshift.ai`.

`netlify.toml` sets Node.js 22, runs `npm run build`, and publishes `out/`. The Next.js server adapter is skipped because this project uses `output: 'export'`. Existing security headers are retained.

`src/lib/site.ts` holds the production domain, site description, and LinkedIn profile. The public domain enables indexing and supplies canonical URLs, sitemap entries, RSS links, and social metadata.

The existing Steady homepage and privacy policy are retained in `public/steady/`, at `/steady/` and `/steady/privacy.html`.

## Navigation and layout

The site uses the original licensed Studio header, expanding dark navigation panel, and rounded page canvas on the homepage, About, and articles. The menu contains Blog and About; RSS replaces the template's Contact us button. Spotlight informs the About page content layout and recommendation, rather than the shared navigation. Navigation supports Escape, focus return, and inert collapsed content.

## Articles

The homepage and `/blog/` list published articles from `src/app/blog/<slug>/page.mdx`. Use `content/article-template.mdx` for the title, description, date, topic, reading time, and article content. The shared layout and build provide article metadata and social images.

The first article, “A new way to modify AI could give threat actors an edge,” was published November 4, 2026 at `/blog/open-weight-models/`. Unpublished drafts, research, private briefs, and development preview routes stay in the separate local authoring project and are excluded from this public repository. Complete that project's editorial and publication checks before adding a finished article here.

No analytics, newsletter, or contact-form backend is configured.

## License

The site uses the owner's commercial Tailwind Plus license: https://tailwindcss.com/plus/license. Template-derived source and assets retain their original licensing restrictions; public repository access does not grant redistribution rights.
