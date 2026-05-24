/**
 * Wrapper de @portabletext/react con los estilos del blog.
 * Acepta `scriptMode` para cambiar la tipografía al modo guión.
 */

import {
  PortableText as SanityPortableText,
  type PortableTextComponents,
} from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import { isSanityConfigured } from '@/sanity/client'

interface Props {
  value: any[]
  scriptMode?: boolean
}

function makeComponents(scriptMode: boolean): PortableTextComponents {
  const bodyFont = scriptMode
    ? 'Courier New, monospace'
    : "var(--font-crimson), Georgia, serif"

  const paraStyle: React.CSSProperties = {
    fontFamily: bodyFont,
    fontSize: scriptMode ? '0.9rem' : '1.2rem',
    lineHeight: scriptMode ? 1.9 : 1.85,
    color: 'var(--text)',
    marginBottom: scriptMode ? '1.2em' : '1.6em',
    letterSpacing: scriptMode ? '0.03em' : 'normal',
    maxWidth: scriptMode ? '60ch' : 'none',
    marginLeft: scriptMode ? 'auto' : undefined,
    marginRight: scriptMode ? 'auto' : undefined,
    // Activar ligaduras opcionales y números old-style en Crimson Pro (modo lectura)
    fontFeatureSettings: scriptMode ? 'normal' : '"liga" 1, "onum" 1, "kern" 1',
  }

  return {
    block: {
      normal: ({ children }) => <p style={paraStyle}>{children}</p>,

      h2: ({ children }) => (
        <h2 style={{
          fontFamily: bodyFont,
          fontSize: scriptMode ? '1rem' : '1.8rem',
          fontWeight: scriptMode ? 700 : 400,
          letterSpacing: scriptMode ? '0.05em' : '-0.01em',
          color: 'var(--text)',
          marginTop: '2.5em',
          marginBottom: '1em',
          textTransform: scriptMode ? 'uppercase' : 'none',
        }}>
          {children}
        </h2>
      ),

      h3: ({ children }) => (
        <h3 style={{
          fontFamily: bodyFont,
          fontSize: scriptMode ? '0.95rem' : '1.35rem',
          fontStyle: scriptMode ? 'normal' : 'italic',
          fontWeight: 400,
          color: 'var(--text)',
          marginTop: '2em',
          marginBottom: '0.75em',
          letterSpacing: scriptMode ? '0.05em' : 'normal',
          textTransform: scriptMode ? 'uppercase' : 'none',
        }}>
          {children}
        </h3>
      ),

      blockquote: ({ children }) => (
        <blockquote style={{
          fontFamily: bodyFont,
          fontSize: scriptMode ? '0.9rem' : '1.3rem',
          fontStyle: scriptMode ? 'normal' : 'italic',
          color: 'var(--text-muted)',
          // 0.5px es el lenguaje de borde del sitio — consistente y dentro del límite
          borderLeft: '0.5px solid var(--accent)',
          paddingLeft: scriptMode ? '1.5em' : '2em',
          margin: '2.5em 0',
          lineHeight: 1.7,
          letterSpacing: scriptMode ? '0.04em' : 'normal',
          opacity: 0.9,
        }}>
          {children}
        </blockquote>
      ),
    },

    marks: {
      strong: ({ children }) => (
        <strong style={{ fontWeight: 600 }}>{children}</strong>
      ),
      em: ({ children }) => (
        <em style={{ fontStyle: 'italic' }}>{children}</em>
      ),
    },

    types: {
      image: ({ value }) => {
        // Si Sanity está configurado, construimos la URL con el builder
        // Si no, usamos el campo url directamente (mock data)
        const src = isSanityConfigured
          ? urlFor(value).width(900).auto('format').url()
          : value?.asset?.url ?? ''

        if (!src) return null

        return (
          <figure style={{ margin: '2.5em 0' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
              <Image
                src={src}
                alt={value.caption ?? ''}
                fill
                sizes="(max-width: 672px) 100vw, 672px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            {value.caption && (
              <figcaption style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '8px',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                marginTop: '0.75em',
                textAlign: 'center',
              }}>
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
  }
}

export default function PortableText({ value, scriptMode = false }: Props) {
  if (!value || value.length === 0) return null
  return <SanityPortableText value={value} components={makeComponents(scriptMode)} />
}
