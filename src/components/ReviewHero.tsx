'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '@/hooks/useIsMobile'
import { getImageUrl } from '@/lib/sanity-image'
import type { Entry, FilmCard } from '@/types'

gsap.registerPlugin(ScrollTrigger)

const BG_CYCLE_MS = 4500

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildBgImages(entry: Entry): { key: string; src: string }[] {
  const primary = getImageUrl(entry.coverImage, 'hero')

  if (entry.coverImages && entry.coverImages.length > 0) {
    return [
      { key: 'cover-0', src: primary },
      ...entry.coverImages.map((url, i) => ({ key: `cover-${i + 1}`, src: url })),
    ]
  }

  if (entry.films && entry.films.length > 1) {
    return entry.films.map((f: FilmCard) => ({
      key: f._key,
      src: f.heroImage ?? f.posterImage ?? primary,
    }))
  }

  return [{ key: 'cover-0', src: primary }]
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ReviewHero({ entry }: { entry: Entry }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const metaRef      = useRef<HTMLDivElement>(null)
  const isMobile     = useIsMobile()

  const bgImages = useMemo(() => buildBgImages(entry), [entry])

  const [currentIdx, setCurrentIdx] = useState(0)

  useEffect(() => {
    if (bgImages.length <= 1) return
    const id = setInterval(() => setCurrentIdx(i => (i + 1) % bgImages.length), BG_CYCLE_MS)
    return () => clearInterval(id)
  }, [bgImages.length])

  // Parallax on scroll
  useGSAP(() => {
    if (!containerRef.current) return
    const layers = containerRef.current.querySelectorAll<HTMLElement>('.rh-img-layer')
    if (!layers.length) return
    gsap.to(layers, {
      yPercent: -12, ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top', end: 'bottom top', scrub: 1.2,
      },
    })
  }, { scope: containerRef })

  // Meta entrance
  useGSAP(() => {
    if (!metaRef.current) return
    gsap.from(metaRef.current, { opacity: 0, y: 32, duration: 0.9, ease: 'power3.out', delay: 0.15 })
  }, { scope: metaRef })

  const currentBg = bgImages[currentIdx % bgImages.length]

  return (
    <div ref={containerRef}>
      <div style={{
        position: 'relative',
        height: '100dvh',
        minHeight: 400,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* ── Background images ───────────────────────────────────────── */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentBg.key}
            className="rh-img-layer"
            initial={{ opacity: 0, filter: 'brightness(1.5) contrast(1.1)' }}
            animate={{ opacity: 1, filter: 'brightness(1) contrast(1)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{ position: 'absolute', inset: '-15% 0', height: '130%' }}
          >
            <Image
              src={currentBg.src}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Flicker Overlay (Random) */}
        <motion.div 
          animate={{ opacity: [0, 0.05, 0, 0.08, 0.02, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
          style={{ position: 'absolute', inset: 0, background: '#fff', pointerEvents: 'none', zIndex: 5, mixBlendMode: 'overlay', willChange: 'opacity' }}
        />

        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
          zIndex: 6
        }} />

        {/* ── Meta ────────────────────────────────────────────────────── */}
        <div
          ref={metaRef}
          style={{
            position: 'relative', zIndex: 10,
            padding: isMobile ? '0 24px' : '0 64px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Essay title — with projector flicker entrance */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0, 1, 0.5, 1],
                y: 0 
              }}
              transition={{ 
                duration: 0.8,
                times: [0, 0.1, 0.2, 1],
                ease: "easeOut"
              }}
              style={{
                fontFamily: '"new-order", var(--font-anton), Anton, sans-serif',
                fontSize: 'clamp(3.2rem, 8.8vw, 8rem)',
                fontWeight: 900,
                lineHeight: 1,
                textTransform: 'uppercase',
                color: '#FFFFFF',
                letterSpacing: 'var(--tracking-tighter)',
                textWrap: 'balance',
                margin: '0 auto',
                maxWidth: '92%',
                wordWrap: 'break-word',
                textShadow: '0 0 20px rgba(0,0,0,0.5)',
              }}
            >
              {entry.title}
            </motion.h1>

            {/* Dots — bg cycle indicator */}
            {bgImages.length > 1 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 4, justifyContent: 'center' }}>
                {bgImages.map((img, i) => (
                  <button
                    key={img.key}
                    onClick={() => setCurrentIdx(i)}
                    aria-label={`Imagen ${i + 1}`}
                    style={{
                      width: i === currentIdx ? 20 : 6,
                      height: 2,
                      background: '#FFFFFF',
                      opacity: i === currentIdx ? 0.9 : 0.35,
                      border: 'none', padding: 0, cursor: 'pointer',
                      transition: 'width 400ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
