import { ImageResponse } from 'next/og'
import { getGuestEssayBySlug } from '@/sanity/queries'

export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params
  const essay = await getGuestEssayBySlug(slug)

  if (!essay) {
    return new ImageResponse(
      <div style={{ background: '#0B0C10', width: '100%', height: '100%', display: 'flex' }} />,
      size,
    )
  }

  const title = essay.title.length > 72
    ? essay.title.slice(0, 69) + '…'
    : essay.title

  const fontSize = title.length > 48 ? 52 : title.length > 32 ? 62 : 72

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0C10',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 80px',
          position: 'relative',
        }}
      >
        {/* Línea accent superior */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2, background: '#F0F2F5',
        }} />

        {/* Brand + sección */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{
            fontSize: 11,
            color: 'rgba(197,198,199,0.45)',
            letterSpacing: '0.22em',
            fontFamily: 'monospace',
          }}>
            MIENTRASLOSCREDITOSPASAN
          </div>
          <div style={{
            fontSize: 10,
            color: '#0B0C10',
            background: '#C5C6C7',
            letterSpacing: '0.18em',
            fontFamily: 'monospace',
            padding: '4px 12px',
          }}>
            INTERMEDIO
          </div>
        </div>

        {/* Título del ensayo */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}>
          <div style={{
            fontSize,
            color: '#C5C6C7',
            fontFamily: 'serif',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: 1000,
          }}>
            {title}
          </div>
        </div>

        {/* Metadatos del ensayo */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTop: '0.5px solid rgba(197,198,199,0.12)',
          paddingTop: 28,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              fontSize: 13,
              color: 'rgba(197,198,199,0.45)',
              fontFamily: 'monospace',
              letterSpacing: '0.14em',
            }}>
              {essay.topic.toUpperCase()}
            </div>
            <div style={{
              fontSize: 11,
              color: 'rgba(197,198,199,0.3)',
              fontFamily: 'monospace',
              letterSpacing: '0.12em',
            }}>
              {essay.author.name.toUpperCase()}
            </div>
          </div>

          {/* Tags */}
          <div style={{
            fontSize: 11,
            color: 'rgba(197,198,199,0.3)',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
          }}>
            {essay.tags.slice(0, 3).map((t: string) => t.toUpperCase()).join(' · ')}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
