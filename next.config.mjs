import rehypeShiki from '@leafac/rehype-shiki'
import nextMDX from '@next/mdx'
import { Parser } from 'acorn'
import jsx from 'acorn-jsx'
import escapeStringRegexp from 'escape-string-regexp'
import * as path from 'path'
import { recmaImportImages } from 'recma-import-images'
import remarkGfm from 'remark-gfm'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import shiki from 'shiki'
import { unifiedConditional } from 'unified-conditional'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  webpack(config, { isServer }) {
    // Preserve the RSC layer for MDX with metadata on patched Next.js releases.
    // https://github.com/vercel/next.js/issues/91735
    if (isServer) {
      for (const rule of config.module.rules) {
        if (
          rule?.test instanceof RegExp &&
          rule.test.test('page.mdx') &&
          Array.isArray(rule.use)
        ) {
          rule.use = rule.use.map((entry) =>
            entry?.loader?.includes('next-swc-loader') &&
            entry.options?.bundleLayer == null
              ? { ...entry, options: { ...entry.options, bundleLayer: 'rsc' } }
              : entry,
          )
        }
      }
    }
    return config
  },
}

function remarkMDXLayout(source, metaName) {
  let parser = Parser.extend(jsx())
  let parseOptions = { ecmaVersion: 'latest', sourceType: 'module' }

  return (tree, file) => {
    if (metaName === 'article') {
      const slug = path.basename(path.dirname(file.path))
      const href = `/blog/${slug}/`
      let foundMetadata = false
      for (const node of tree.children) {
        if (node.type !== 'mdxjsEsm') continue
        for (const statement of node.data?.estree?.body ?? []) {
          if (statement.type !== 'ExportNamedDeclaration') continue
          for (const declaration of statement.declaration?.declarations ?? []) {
            if (declaration.id.name !== 'metadata') continue
            const call = parser.parse(
              `const metadata = _articleMetadata(article, ${JSON.stringify(href)})`,
              parseOptions,
            ).body[0].declarations[0].init
            if (declaration.init) call.arguments.push(declaration.init)
            declaration.init = call
            foundMetadata = true
          }
        }
      }
      const additions = [
        "import { createArticleMetadata as _articleMetadata } from '@/lib/article-social'",
        ...(!foundMetadata
          ? [
              `export const metadata = _articleMetadata(article, ${JSON.stringify(href)})`,
            ]
          : []),
      ]
      for (const value of additions) {
        tree.children.push({
          type: 'mdxjsEsm',
          value,
          data: { estree: parser.parse(value, parseOptions) },
        })
      }
    }
    let imp = `import _Layout from '${source}'`
    let exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      },
    )
  }
}

export default async function config() {
  let highlighter = await shiki.getHighlighter({
    theme: 'css-variables',
  })

  let withMDX = nextMDX({
    extension: /\.mdx$/,
    options: {
      recmaPlugins: [recmaImportImages],
      rehypePlugins: [
        [rehypeShiki, { highlighter }],
        rehypeUnwrapImages,
        [
          remarkRehypeWrap,
          {
            node: { type: 'mdxJsxFlowElement', name: 'Typography' },
            start: ':root > :not(mdxJsxFlowElement)',
            end: ':root > mdxJsxFlowElement',
          },
        ],
      ],
      remarkPlugins: [
        remarkGfm,
        [
          unifiedConditional,
          [
            new RegExp(`^${escapeStringRegexp(path.resolve('src/app/blog'))}`),
            [[remarkMDXLayout, '@/app/blog/wrapper', 'article']],
          ],
          [
            new RegExp(`^${escapeStringRegexp(path.resolve('src/app/work'))}`),
            [[remarkMDXLayout, '@/app/work/wrapper', 'caseStudy']],
          ],
        ],
      ],
    },
  })

  return withMDX(nextConfig)
}
