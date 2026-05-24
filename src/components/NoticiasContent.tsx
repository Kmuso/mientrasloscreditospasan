'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { useProjectionStore } from '@/store/projectionStore'
import Footer from '@/components/Footer'
import type { NewsItem } from '@/types'

gsap.registerPlugin(ScrollTrigger)

const mono  = "'Courier New', monospace"
const serif = "var(--font-crimson), Georgia, serif"

const MONTHS_SHORT = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']

function groupByYear(items: NewsItem[]): { year: number; items: NewsItem[] }[] {
  const map = new Map<number, NewsItem[]>()
  for (const item of items) {
    const year = new Date(item.publishedAt).getFullYear()
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(item)
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, items }))
}

// ─── Year section ─────────────────────────────────────────────────────────────

function YearSection({
  year, items, globalOffset,
}: {
  year: number
  items: NewsItem[]
  globalOffset: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const rows = gsap.utils.toArray<HTMLElement>('.nc-row', containerRef.current)
    gsap.set(rows, { opacity: 0, y: 10 })
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(rows, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.055 })
      },
    })
  }, { scope: containerRef })

  return (
    <div className="nc-year-section" style={{ display: 'flex', borderBottom: '0.5px solid var(--border-on-deep)' }}>

      {/* Sticky year panel */}
      <div className="nc-year-panel">
        <span className="nc-year-num">{year}</span>
        <span className="nc-year-count">
          {items.length} {items.length === 1 ? 'apunte' : 'apuntes'}
        </span>
      </div>

      {/* Article rows */}
      <div
        ref={containerRef}
        style={{ flex: 1 }}
        onMouseLeave={() => setHoveredId(null)}
      >
        {items.map((item, i) => {
          const d = new Date(item.publishedAt)
          const isDimmed = hoveredId !== null && hoveredId !== item._id
          const imgSrc = typeof item.coverImage === 'string' ? item.coverImage : null

          return (
            <Link
              key={item._id}
              href={`/noticias/${item.slug}`}
              className="nc-row nc-row-inner"
              onMouseEnter={() => setHoveredId(item._id)}
              style={{ opacity: isDimmed ? 0.14 : 1 }}
            >
              {/* Number */}
              <span className="nc-num">
                {String(globalOffset + i + 1).padStart(2, '0')}
              </span>

              {/* Category pill */}
              <span className="nc-cat">{item.category}</span>

              {/* Title + excerpt + date */}
              <div className="nc-title-block">
                <div className="nc-title-row">
                  <p className="nc-title">{item.title}</p>
                  <span className="nc-arrow" aria-hidden>→</span>
                </div>
                {item.excerpt && <p className="nc-excerpt">{item.excerpt}</p>}
                <span className="nc-date">
                  {String(d.getDate()).padStart(2, '0')}.{MONTHS_SHORT[d.getMonth()]}
                </span>
              </div>

              {/* Thumbnail */}
              <div className="nc-thumb">
                {imgSrc ? (
                  <div className="nc-thumb-inner">
                    <Image
                      src={imgSrc}
                      alt=""
                      fill
                      sizes="286px"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="nc-thumb-warm" />
                    <div className="nc-thumb-scanlines" />
                  </div>
                ) : (
                  <div className="nc-thumb-inner nc-thumb-empty">
                    <span style={{ fontFamily: mono, fontSize: '7px', letterSpacing: '0.2em', opacity: 0.18 }}>
                      SIN IMG
                    </span>
                    <div className="nc-thumb-scanlines" />
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function NoticiasContent({ news }: { news: NewsItem[] }) {
  const staticMode = useProjectionStore((s) => s.staticMode)
  const pad = 'clamp(28px, 6vw, 80px)'

  const groups = groupByYear(news)
  const uniqueCategories = new Set(news.map(n => n.category).filter(Boolean)).size
  const years = news.map(n => new Date(n.publishedAt).getFullYear())
  const yearMin = years.length ? Math.min(...years) : null
  const yearMax = years.length ? Math.max(...years) : null
  const yearRange = yearMin !== null && yearMax !== null
    ? yearMin === yearMax ? `${yearMin}` : `${yearMin}—${yearMax}`
    : '—'
  const latestItem = news[0] ?? null

  let offset = 0
  const groupsWithOffset = groups.map(g => {
    const result = { ...g, offset }
    offset += g.items.length
    return result
  })

  const stats: [string, string][] = [
    ['Volumen',     `${news.length} artículos`],
    ['Categorías',  `${uniqueCategories} secciones`],
    ['Período',     yearRange],
    ['Actualizado', latestItem
      ? new Date(latestItem.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
      : '—'],
  ]

  return (
    <main style={{ background: 'var(--bg-deep)', color: 'var(--text-on-deep)', minHeight: '100dvh' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <motion.section
        className="nc-hero-section"
        initial={staticMode ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: `clamp(80px, 14vh, 160px) ${pad}`,
          borderBottom: '0.5px solid var(--border-on-deep)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Vertical rule */}
        <div className="nc-hero-rule" style={{
          position: 'absolute', top: 0, left: `calc(${pad} + 220px)`,
          width: '0.5px', height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, var(--border-on-deep) 30%, var(--border-on-deep) 70%, transparent 100%)',
          opacity: 0.2, pointerEvents: 'none',
        }} />

        <motion.p
          initial={staticMode ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: mono, fontSize: '9px', letterSpacing: '0.25em',
            color: 'var(--text-muted-on-deep)', marginBottom: 32, textTransform: 'uppercase',
          }}
        >
          Actualidad Cinematográfica — Despacho Editorial
        </motion.p>

        <motion.h1
          initial={staticMode ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: serif,
            fontSize: 'clamp(4.5rem, 11vw, 10rem)',
            fontWeight: 300, lineHeight: 0.92, letterSpacing: '-0.03em',
            marginBottom: 44, color: 'var(--text-on-deep)',
          }}
        >
          Noticias.
        </motion.h1>

        <motion.p
          initial={staticMode ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: serif, fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
            fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65,
            color: 'var(--text-muted-on-deep)', maxWidth: '52ch', marginBottom: 14,
          }}
        >
          "Lo que ocurre en el cine —<br />lo que importa en la pantalla."
        </motion.p>

        <motion.p
          initial={staticMode ? false : { opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.15em', color: 'var(--text-muted-on-deep)' }}
        >
          — Mientras los Créditos Pasan
        </motion.p>

        {/* Stats — bottom right, staggered */}
        <div className="nc-hero-stats" style={{
          position: 'absolute',
          bottom: 'clamp(40px, 8vh, 80px)',
          right: pad,
          display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end',
        }}>
          {stats.map(([label, value], i) => (
            <motion.div
              key={label}
              initial={staticMode ? false : { opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.55 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}
            >
              <span style={{ fontFamily: mono, fontSize: '7px', letterSpacing: '0.18em', color: 'var(--text-muted-on-deep)', opacity: 0.35, textTransform: 'uppercase' }}>
                {label}
              </span>
              <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.08em', color: 'var(--text-muted-on-deep)', opacity: 0.65 }}>
                {value}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Year groups ──────────────────────────────────────────────────────── */}
      {groupsWithOffset.map(({ year, items, offset: off }) => (
        <YearSection key={year} year={year} items={items} globalOffset={off} />
      ))}

      {news.length === 0 && (
        <div style={{ padding: `clamp(80px, 15vh, 160px) ${pad}`, textAlign: 'center' }}>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--text-muted-on-deep)', opacity: 0.5 }}>
            Sin apuntes por ahora. El archivo aguarda.
          </p>
        </div>
      )}

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <Footer />

      {/* ── Styles ───────────────────────────────────────────────────────────── */}
      <style jsx>{`
        /* Year panel */
        :global(.nc-year-panel) {
          width: 200px;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 clamp(16px, 2vw, 28px);
          border-right: 0.5px solid var(--border-on-deep);
        }
        :global(.nc-year-num) {
          font-family: 'Courier New', monospace;
          font-size: clamp(4rem, 8vw, 6.5rem);
          font-weight: 400;
          color: var(--text-on-deep);
          opacity: 0.07;
          line-height: 1;
          display: block;
          letter-spacing: -0.02em;
        }
        :global(.nc-year-count) {
          font-family: 'Courier New', monospace;
          font-size: 8px;
          letter-spacing: 0.22em;
          color: var(--accent);
          text-transform: uppercase;
          margin-top: 10px;
          display: block;
          opacity: 0.8;
        }

        /* Row */
        :global(.nc-row-inner) {
          display: grid;
          grid-template-areas: "num cat title thumb";
          grid-template-columns: 28px 104px 1fr 286px;
          gap: clamp(16px, 2.8vw, 36px);
          align-items: center;
          padding: clamp(26px, 4vh, 44px) clamp(28px, 6vw, 80px);
          border-top: 0.5px solid var(--border-on-deep);
          text-decoration: none;
          color: inherit;
          transition: opacity 350ms cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        :global(.nc-num) {
          grid-area: num;
          font-family: 'Courier New', monospace;
          font-size: 8px;
          color: var(--text-muted-on-deep);
          opacity: 0.35;
          letter-spacing: 0.06em;
        }

        /* Category as subtle pill */
        :global(.nc-cat) {
          grid-area: cat;
          font-family: 'Courier New', monospace;
          font-size: 7.5px;
          letter-spacing: 0.16em;
          color: var(--accent);
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          align-self: center;
          background: color-mix(in oklch, var(--accent) 7%, transparent);
          border: 0.5px solid color-mix(in oklch, var(--accent) 20%, transparent);
          padding: 4px 9px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
          transition: background 300ms ease, border-color 300ms ease;
        }
        @media (hover: hover) and (pointer: fine) {
          :global(.nc-row-inner:hover .nc-cat) {
            background: color-mix(in oklch, var(--accent) 13%, transparent);
            border-color: color-mix(in oklch, var(--accent) 30%, transparent);
          }
        }

        :global(.nc-title-block) {
          grid-area: title;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }
        :global(.nc-title-row) {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        :global(.nc-title) {
          font-family: var(--font-crimson), Georgia, serif;
          font-size: clamp(1.05rem, 1.8vw, 1.4rem);
          font-weight: 400;
          line-height: 1.2;
          color: var(--text-on-deep);
          margin: 0;
          min-width: 0;
        }
        /* Sliding arrow delight */
        :global(.nc-arrow) {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: var(--accent);
          opacity: 0;
          transform: translateX(-10px);
          transition: opacity 280ms cubic-bezier(0.23, 1, 0.32, 1),
                      transform 280ms cubic-bezier(0.23, 1, 0.32, 1);
          flex-shrink: 0;
          display: inline-block;
        }
        @media (hover: hover) and (pointer: fine) {
          :global(.nc-row-inner:hover .nc-arrow) {
            opacity: 0.7;
            transform: translateX(0);
          }
        }

        :global(.nc-excerpt) {
          font-family: var(--font-crimson), Georgia, serif;
          font-style: italic;
          font-size: clamp(0.88rem, 1.25vw, 1.02rem);
          line-height: 1.55;
          color: var(--text-muted-on-deep);
          opacity: 0.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        :global(.nc-date) {
          font-family: 'Courier New', monospace;
          font-size: 8px;
          letter-spacing: 0.1em;
          color: var(--text-muted-on-deep);
          opacity: 0.42;
          margin-top: 2px;
        }

        /* Thumbnail */
        :global(.nc-thumb) {
          grid-area: thumb;
          position: relative;
          width: 286px;
          height: 172px;
          overflow: hidden;
          flex-shrink: 0;
          background: rgba(255,255,255,0.025);
        }
        :global(.nc-thumb-inner) {
          position: absolute;
          inset: 0;
          transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        :global(.nc-thumb-empty) {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Warm amber color grade — cinematic hover */
        :global(.nc-thumb-warm) {
          position: absolute;
          inset: 0;
          background: oklch(62% 0.13 52 / 0);
          mix-blend-mode: color;
          transition: background 600ms cubic-bezier(0.23, 1, 0.32, 1);
          pointer-events: none;
          z-index: 2;
        }

        /* Scanline overlay — always visible, subtle film texture */
        :global(.nc-thumb-scanlines) {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 0, 0, 0.055) 3px,
            rgba(0, 0, 0, 0.055) 4px
          );
          pointer-events: none;
          z-index: 3;
        }

        @media (hover: hover) and (pointer: fine) {
          :global(.nc-row-inner:hover .nc-thumb-inner) {
            transform: scale(1.06);
          }
          :global(.nc-row-inner:hover .nc-thumb-warm) {
            background: oklch(62% 0.13 52 / 0.28);
          }
        }

        /* Touch active feedback */
        :global(.nc-row-inner:active) {
          background: rgba(255,255,255,0.02);
        }

        /* Tablet (769–1024px) — tighten thumb, keep 4-col grid */
        @media (min-width: 769px) and (max-width: 1024px) {
          :global(.nc-row-inner) {
            grid-template-columns: 28px 90px 1fr 210px !important;
            padding: clamp(20px, 3vh, 32px) clamp(24px, 4vw, 48px) !important;
            gap: clamp(12px, 2vw, 24px) !important;
          }
          :global(.nc-thumb) {
            width: 210px !important;
            height: 126px !important;
          }
          :global(.nc-year-panel) {
            width: 160px !important;
          }
          :global(.nc-year-num) {
            font-size: clamp(3rem, 6vw, 5rem) !important;
          }
        }

        /* Mobile (<768px) */
        @media (max-width: 768px) {
          :global(.nc-hero-rule)    { display: none !important; }
          :global(.nc-hero-stats)   { display: none !important; }
          :global(.nc-year-section) { flex-direction: column !important; }
          :global(.nc-hero-section) {
            justify-content: flex-start !important;
            padding-top: clamp(100px, 18vh, 160px) !important;
          }
          :global(.nc-year-panel) {
            width: 100% !important;
            height: auto !important;
            position: relative !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 16px !important;
            padding: 14px clamp(20px, 5vw, 40px) !important;
            border-right: none !important;
            border-bottom: 0.5px solid var(--border-on-deep) !important;
          }
          :global(.nc-year-num) {
            font-size: 2.5rem !important;
            opacity: 0.1 !important;
          }
          :global(.nc-year-count) {
            margin-top: 0 !important;
          }
          :global(.nc-row-inner) {
            grid-template-areas: "cat thumb" "title thumb" !important;
            grid-template-columns: 1fr 120px !important;
            grid-template-rows: auto auto !important;
            gap: 5px 14px !important;
            padding: 14px clamp(20px, 5vw, 40px) !important;
            align-items: start !important;
          }
          :global(.nc-num)     { display: none !important; }
          :global(.nc-arrow)   { display: none !important; }
          :global(.nc-excerpt) { display: none !important; }
          :global(.nc-title)   { font-size: 0.95rem !important; line-height: 1.25 !important; }
          :global(.nc-thumb)   { width: 120px !important; height: 120px !important; grid-row: 1 / 3 !important; }
        }

        /* Landscape mobile */
        @media (max-width: 768px) and (orientation: landscape) {
          :global(.nc-row-inner) {
            padding: 10px clamp(20px, 5vw, 40px) !important;
          }
          :global(.nc-thumb) {
            width: 110px !important;
            height: 66px !important;
            grid-row: 1 / 3 !important;
          }
        }
      `}</style>
    </main>
  )
}
