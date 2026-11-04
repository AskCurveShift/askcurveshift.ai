import { type Article } from '@/lib/mdx'

// Rendered to PNG by next/og; keep styles within Satori's flexbox subset.
export function ArticleSocialCard({ article }: { article: Article }) {
  const titleSize =
    article.title.length > 130 ? 46 : article.title.length > 85 ? 56 : 68
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#fafafa',
        color: '#171717',
        padding: '48px 64px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg
          width="56"
          height="56"
          viewBox="0 0 64 64"
          fill="none"
          stroke="#171717"
          strokeWidth="7"
          strokeLinecap="round"
        >
          <path d="M7 40h9c17 0 15-29 32-29h9" />
          <path d="M7 55h9c27 0 24-29 41-29" />
        </svg>
        <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-1px' }}>
          Curve Shift
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '28px 0',
        }}
      >
        <div style={{ fontSize: 22, color: '#666', marginBottom: 18 }}>
          {article.topic}
        </div>
        <div
          style={{
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            overflowWrap: 'anywhere',
          }}
        >
          {article.title}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #d4d4d4',
          paddingTop: 24,
          fontSize: 22,
          color: '#525252',
        }}
      >
        <span>By Drew Russell</span>
        <span>{article.date.slice(0, 4)}</span>
      </div>
    </div>
  )
}
