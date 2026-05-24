'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { NewsItem } from '@/types'
import { getImageUrl } from '@/lib/sanity-image'
import { useProjectionStore } from '@/store/projectionStore'
import GeometricDivider from './GeometricDivider'

interface NewsHeroProps {
  news: NewsItem
}

const MONO = 'Courier New, monospace'

/*
  animate skill:
  - Page load choreography: stagger 80ms entre elementos, 500-800ms duración
  - Parallax con useScroll/useTransform — GPU-accelerated (solo transform)
  - Easing expo-out [0.16, 1, 0.3, 1] — confident, decisive

  delight skill:
  - Cruces (+) en esquinas: fade in con offset de tiempo — descubrir al cargar
  - Imagen: scale sutil en hover (CSS, no JS)
  - CTA button: hover lift + border color shift

  Emil:
  - CSS transitions para hover — interruptibles, off-thread
  - @media (hover: hover) para no activar en touch
  - Especificar propiedades exactas
*/

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
}

// Corner cross marks — delight through restraint
function CornerCross({ pos, delay }: { pos: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 0.25, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute', ...pos,
        fontFamily: MONO, fontSize: '1.2rem',
        color: 'var(--text-muted)',
        pointerEvents: 'none', userSelect: 'none',
        lineHeight: 1,
      }}
    >
      +
    </motion.div>
  )
}

// Inline chevron — no lucide dependency
function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

const MONTHS_ES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']

function formatHeroDate(iso: string) {
  const d = new Date(iso)
  return `${String(d.getDate()).padStart(2,'0')} ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`
}

export default function NewsHero({ news }: NewsHeroProps) {
  const containerRef  = useRef<HTMLElement>(null)
  const imageWrapRef  = useRef<HTMLDivElement>(null)
  const staticMode    = useProjectionStore((s) => s.staticMode)
  const prefersReduced = useReducedMotion()

  // Parallax — useScroll targets the image wrapper
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ['start end', 'end start'],
  })
  // -8% to +8% parallax range — subtle, cinematic
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const imgSrc = getImageUrl(news.coverImage, 'hero')

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .nh-img-inner { transition: transform 600ms cubic-bezier(0.25, 1, 0.5, 1); }
          .nh-img-wrap:hover .nh-img-inner { transform: scale(1.03); }
          .nh-cta {
            transition: background 220ms cubic-bezier(0.23, 1, 0.32, 1),
                        color 220ms cubic-bezier(0.23, 1, 0.32, 1),
                        border-color 220ms cubic-bezier(0.23, 1, 0.32, 1),
                        transform 220ms cubic-bezier(0.23, 1, 0.32, 1);
          }
          .nh-cta:hover {
            background: var(--accent) !important;
            color: var(--bg) !important;
            border-color: var(--accent) !important;
          }
          .nh-cta:active { transform: scale(0.97); transition-duration: 80ms; }
        }
      `}</style>

      <motion.article
        ref={containerRef}
        variants={containerVariants}
        initial={staticMode || prefersReduced ? false : 'hidden'}
        animate="show"
        style={{
          position: 'relative',
          padding: 'clamp(48px, 7vw, 100px) clamp(20px, 5vw, 64px)',
          borderBottom: '0.5px solid var(--border)',
        }}
      >
        {/* Corner crosses — delight */}
        <CornerCross pos={{ top: 20, left: 20 }}   delay={0.3} />
        <CornerCross pos={{ top: 20, right: 20 }}  delay={0.4} />
        <CornerCross pos={{ bottom: 20, left: 20 }} delay={0.5} />
        <CornerCross pos={{ bottom: 20, right: 20 }} delay={0.6} />

        {/* Image with parallax */}
        <motion.div
          variants={itemVariants}
          ref={imageWrapRef}
          className="nh-img-wrap"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(240px, 38vw, 520px)',
            overflow: 'hidden',
            marginBottom: 'clamp(32px, 5vw, 64px)',
          }}
        >
          <motion.div
            className="nh-img-inner"
            style={{
              position: 'absolute', inset: 0,
              // Parallax y only applied when motion is allowed
              y: (!staticMode && !prefersReduced) ? parallaxY : 0,
            }}
          >
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={news.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 768px) 100vw, 90vw"
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'var(--border)' }} />
            )}
          </motion.div>
        </motion.div>

        {/* Meta bar */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex', gap: 24, alignItems: 'center',
            paddingBottom: 14,
            borderBottom: '0.5px solid var(--border)',
            marginBottom: 24,
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', color: 'var(--accent)' }}>
            {news.category}
          </span>
          <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
            {formatHeroDate(news.publishedAt)}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: '0.02em',
            color: 'var(--text-heading)',
            marginBottom: 28,
          }}
        >
          {news.title}
        </motion.h1>

        {/* Divider */}
        <motion.div variants={itemVariants}>
          <GeometricDivider variant="double" />
        </motion.div>

        {/* Excerpt */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-crimson), Georgia, serif',
            fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            maxWidth: '72ch',
            marginTop: 20,
            marginBottom: 32,
          }}
        >
          {news.excerpt}
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants}>
          <Link href={`/noticias/${news.slug}`} style={{ textDecoration: 'none' }}>
            <button
              className="nh-cta"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '11px 22px',
                background: 'transparent',
                border: '0.5px solid var(--accent)',
                color: 'var(--accent)',
                fontFamily: MONO, fontSize: '9px', letterSpacing: '0.18em',
                cursor: 'pointer',
              }}
            >
              LEER MÁS
              <ArrowRight />
            </button>
          </Link>
        </motion.div>
      </motion.article>
    </>
  )
}
