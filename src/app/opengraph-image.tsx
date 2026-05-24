import { ImageResponse } from 'next/og'

export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
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
          height: 2, background: '#C5C6C7',
        }} />

        {/* Brand */}
        <div style={{
          fontSize: 11,
          color: 'rgba(197,198,199,0.45)',
          letterSpacing: '0.22em',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          marginBottom: 'auto',
        }}>
          MIENTRASLOSCREDITOSPASAN
        </div>

        {/* Título principal */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginBottom: 'auto',
        }}>
          <div style={{
            fontSize: 72,
            color: '#C5C6C7',
            fontFamily: 'serif',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Crítica
          </div>
          <div style={{
            fontSize: 72,
            color: '#C5C6C7',
            fontFamily: 'serif',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            opacity: 0.45,
          }}>
            cinematográfica
          </div>
        </div>

        {/* Pie */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingTop: 32,
          borderTop: '0.5px solid rgba(197,198,199,0.12)',
        }}>
          <div style={{
            fontSize: 12,
            color: 'rgba(197,198,199,0.4)',
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
          }}>
            ARCHIVO · INTERMEDIO · CONTACTO
          </div>
          <div style={{
            fontSize: 12,
            color: 'rgba(197,198,199,0.4)',
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
          }}>
            mientrasloscreditospasan.com
          </div>
        </div>
      </div>
    ),
    size,
  )
}
