'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useProjectionStore } from '@/store/projectionStore'
import PortableText from '@/components/PortableText'
import type { NewsItem } from '@/types'

gsap.registerPlugin(ScrollTrigger)

const mono  = "'Courier New', monospace"
const serif = "var(--font-crimson), Georgia, serif"

const MONTHS_ES = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre',
]

function formatDateLong(iso: string) {
  const d = new Date(iso)
  return `${d.getDate()} de ${MONTHS_ES[d.getMonth()]} de ${d.getFullYear()}`
}

export default function NoticiaArticle({ news }: { news: NewsItem }) {
  const staticMode = useProjectionStore((s) => s.staticMode)
  const metaRef    = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const articleRef  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!metaRef.current || staticMode) return
    gsap.from(metaRef.current, { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', delay: 0.15 })
  }, { scope: metaRef })

  useGSAP(() => {
    if (!progressRef.current || !articleRef.current || staticMode) return
    ScrollTrigger.create({
      trigger: articleRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${self.progress})`
        }
      },
    })
  })

  const imgSrc = typeof news.coverImage === 'string' ? news.coverImage : null

  return (
    <main ref={articleRef} style={{ minHeight: '100dvh', paddingBottom: 120 }}>

      {/* ── Reading progress ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '1.5px', zIndex: 100,
        background: 'var(--border)',
        pointerEvents: 'none',
      }}>
        <div
          ref={progressRef}
          style={{
            position: 'absolute', inset: 0,
            background: 'var(--accent)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
            transition: 'transform 80ms linear',
            opacity: 0.7,
          }}
        />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        height: 'clamp(420px, 68dvh, 720px)',
        overflow: 'hidden',
        background: 'var(--bg-deep)',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={news.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.5 }}
          />
        )}

        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.08) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Scanlines — film texture */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {/* Overlaid meta */}
        <div
          ref={metaRef}
          style={{
            position: 'relative', zIndex: 10,
            padding: 'clamp(32px, 6vw, 80px)',
            width: '100%',
          }}
        >
          <Link
            href="/noticias"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: mono, fontSize: '8px', letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
              marginBottom: 20, textTransform: 'uppercase',
              transition: 'color 180ms ease',
              /* tap target padding */
              padding: '10px 0',
            }}
            className="na-back-link-hero"
          >
            ← Noticias
          </Link>

          <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            {news.category && (
              <span style={{
                fontFamily: mono, fontSize: '7.5px', letterSpacing: '0.18em',
                color: 'var(--accent)',
                background: 'color-mix(in oklch, var(--accent) 12%, transparent)',
                border: '0.5px solid color-mix(in oklch, var(--accent) 28%, transparent)',
                padding: '4px 9px',
                textTransform: 'uppercase',
              }}>
                {news.category}
              </span>
            )}
            <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.42)' }}>
              {formatDateLong(news.publishedAt)}
            </span>
            {news.readingTime && (
              <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)' }}>
                {news.readingTime} min lectura
              </span>
            )}
          </div>

          <h1
            className="na-hero-title"
            style={{
              fontFamily: serif,
              fontSize: 'clamp(1.8rem, 5vw, 4.5rem)',
              fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.02em',
              color: '#fff', maxWidth: '22ch',
              textShadow: '0 2px 24px rgba(0,0,0,0.45)',
              margin: 0,
            }}
          >
            {news.title}
          </h1>
        </div>
      </div>

      {/* ── Article body ─────────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: '65ch',
        margin: '0 auto',
        padding: 'clamp(48px, 7vw, 88px) clamp(20px, 5vw, 0px)',
      }}>

        {/* Source attribution */}
        {news.source && (
          <div style={{
            marginBottom: 40, paddingBottom: 32,
            borderBottom: '0.5px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontFamily: mono, fontSize: '7px', letterSpacing: '0.2em', color: 'var(--text-muted)', opacity: 0.4, textTransform: 'uppercase' }}>
              Fuente
            </span>
            <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.1em', color: 'var(--text-muted)', opacity: 0.65 }}>
              {news.sourceUrl ? (
                <a
                  href={news.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  {news.source} ↗
                </a>
              ) : (
                news.source
              )}
            </span>
          </div>
        )}

        {/* Excerpt */}
        <p style={{
          fontFamily: serif,
          fontSize: 'clamp(1.12rem, 2vw, 1.32rem)',
          fontStyle: 'italic',
          lineHeight: 1.7,
          color: 'var(--text-muted)',
          marginBottom: 52,
          opacity: 0.85,
        }}>
          {news.excerpt}
        </p>

        {/* Body */}
        {news.body ? (
          <PortableText value={news.body} />
        ) : (
          <p style={{
            fontFamily: mono, fontSize: '9px', letterSpacing: '0.16em',
            color: 'var(--text-muted)', opacity: 0.38,
          }}>
            CONTENIDO COMPLETO PRÓXIMAMENTE
          </p>
        )}

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div style={{
            marginTop: 64, paddingTop: 32,
            borderTop: '0.5px solid var(--border)',
            display: 'flex', flexWrap: 'wrap', gap: 8,
          }}>
            {news.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: mono, fontSize: '7.5px', letterSpacing: '0.14em',
                  color: 'var(--text-muted)',
                  border: '0.5px solid var(--border)',
                  padding: '4px 9px', textTransform: 'uppercase',
                  opacity: 0.65,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer back link */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '0.5px solid var(--border)' }}>
          <Link
            href="/noticias"
            style={{
              fontFamily: mono, fontSize: '9px', letterSpacing: '0.18em',
              color: 'var(--text-muted)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 0',
            }}
            className="na-back-link"
          >
            ← VOLVER A NOTICIAS
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (hover: hover) and (pointer: fine) {
          :global(.na-back-link:hover)      { color: var(--text) !important; }
          :global(.na-back-link-hero:hover) { color: rgba(255,255,255,0.7) !important; }
        }
        :global(.na-back-link)      { transition: color 180ms ease; }
        :global(.na-back-link-hero) { transition: color 180ms ease; }

        /* Mobile */
        @media (max-width: 768px) {
          :global(.na-hero-title) {
            font-size: clamp(1.6rem, 7vw, 2.5rem) !important;
          }
        }
      `}</style>
    </main>
  )
}
