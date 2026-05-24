'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useProjectionStore } from '@/store/projectionStore'
import { useIsMobile } from '@/hooks/useIsMobile'
import { getImageUrl } from '@/lib/sanity-image'
import PortableText from './PortableText'
import type { GuestEssay } from '@/types'

gsap.registerPlugin(ScrollTrigger)

// ─── Hero ────────────────────────────────────────────────────────────────────

function GuestEssayHero({ essay }: { essay: GuestEssay }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useGSAP(() => {
    if (!imageRef.current || !containerRef.current) return
    gsap.to(imageRef.current, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    })
  }, { scope: containerRef })

  useGSAP(() => {
    if (!metaRef.current) return
    gsap.from(metaRef.current, { opacity: 0, y: 28, duration: 0.9, ease: 'power3.out', delay: 0.15 })
  }, { scope: metaRef })

  return (
    <div ref={containerRef}>
      {/* Imagen */}
      <div style={{
        position: 'relative',
        height: isMobile ? '45vh' : '65vh',
        minHeight: isMobile ? 240 : 380,
        overflow: 'hidden',
      }}>
        <div ref={imageRef} style={{ position: 'absolute', inset: '-15% 0', height: '130%' }}>
          <Image src={getImageUrl(essay.coverImage, 'hero')} alt={essay.title} fill priority sizes="100vw"
            style={{ objectFit: 'cover' }} />
        </div>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, var(--bg) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        {/* Badge de tema sobre la imagen */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? 20 : 32,
          left: isMobile ? 20 : 48,
          fontFamily: 'Courier New, monospace',
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: 'var(--bg-deep)',
          background: 'var(--accent)',
          padding: '5px 12px',
          textTransform: 'uppercase',
        }}>
          {essay.topic}
        </div>
      </div>

      {/* Metadatos */}
      <div ref={metaRef} style={{
        padding: isMobile ? '28px 20px 0' : '48px 48px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '9px',
          letterSpacing: '0.18em',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span>INTERMEDIO</span>
          <span style={{ color: 'var(--border)' }}>·</span>
          <span>{new Date(essay.publishedAt).toLocaleDateString('es-ES', {
            year: 'numeric', month: 'long', day: 'numeric'
          }).toUpperCase()}</span>
        </div>

        <h1 style={{
          fontFamily: "var(--font-crimson), Georgia, serif",
          fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          maxWidth: '22ch',
        }}>
          {essay.title}
        </h1>

        {/* Autor en el hero */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {essay.author.avatar && (
            <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0, overflow: 'hidden' }}>
              <Image src={essay.author.avatar} alt={essay.author.name} fill sizes="36px"
                style={{ objectFit: 'cover' }} />
            </div>
          )}
          <div>
            <p style={{
              fontFamily: "var(--font-crimson), Georgia, serif",
              fontSize: '1rem',
              color: 'var(--text)',
              lineHeight: 1.2,
            }}>
              {essay.author.name}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 4 }}>
          {(essay.tags ?? []).map((tag) => (
            <span key={tag} style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '8px',
              letterSpacing: '0.14em',
              color: 'var(--text-muted)',
              border: '0.5px solid var(--border)',
              padding: '3px 8px',
              textTransform: 'uppercase',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Author bio card ──────────────────────────────────────────────────────────

function AuthorCard({ author }: { author: GuestEssay['author'] }) {
  return (
    <div style={{
      marginTop: 72,
      padding: '32px',
      border: '0.5px solid var(--border)',
      display: 'flex',
      gap: 24,
      alignItems: 'flex-start',
    }}>
      {author.avatar && (
        <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0, overflow: 'hidden' }}>
          <Image src={author.avatar} alt={author.name} fill sizes="56px"
            style={{ objectFit: 'cover' }} />
        </div>
      )}
      <div style={{ flex: 1 }}>
        <p style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '8px',
          letterSpacing: '0.18em',
          color: 'var(--text-muted)',
          marginBottom: 8,
        }}>
          SOBRE LA AUTORA / EL AUTOR
        </p>
        <p style={{
          fontFamily: "var(--font-crimson), Georgia, serif",
          fontSize: '1.1rem',
          fontWeight: 600,
          color: 'var(--text)',
          marginBottom: 8,
        }}>
          {author.name}
        </p>
        {author.bio && (
          <p style={{
            fontFamily: "var(--font-crimson), Georgia, serif",
            fontSize: '1rem',
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            marginBottom: author.url ? 14 : 0,
          }}>
            {author.bio}
          </p>
        )}
        {author.url && (
          <a href={author.url} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '9px',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            borderBottom: '0.5px solid var(--border)',
            paddingBottom: 2,
            transition: 'color 0.2s, border-color 0.2s',
          }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.color = 'var(--accent)'
              el.style.borderColor = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.color = 'var(--text-muted)'
              el.style.borderColor = 'var(--border)'
            }}
          >
            SITIO WEB ↗
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Main article ─────────────────────────────────────────────────────────────

export default function GuestEssayArticle({ essay }: { essay: GuestEssay }) {
  const scriptMode = useProjectionStore((s) => s.scriptMode)
  const immersive = useProjectionStore((s) => s.immersive)
  const staticMode = useProjectionStore((s) => s.staticMode)
  const isMobile = useIsMobile()

  const bodyFont = scriptMode
    ? 'Courier New, monospace'
    : "var(--font-crimson), Georgia, serif"

  const motionProps = staticMode
    ? {}
    : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: 0.2,
      },
    }

  return (
    <article style={{ minHeight: '100dvh', paddingBottom: 140 }}>
      {!immersive && <GuestEssayHero essay={essay} />}

      <motion.div
        {...motionProps}
        style={{
          maxWidth: scriptMode ? '70ch' : '672px',
          margin: '0 auto',
          padding: immersive
            ? (isMobile ? '100px 20px 0' : '120px 24px 0')
            : (isMobile ? '48px 20px 0' : '64px 24px 0'),
          fontFamily: bodyFont,
        }}
      >
        {/* Cabecera en modo inmersivo */}
        {immersive && (
          <div style={{ marginBottom: 56, paddingBottom: 40, borderBottom: '0.5px solid var(--border)' }}>
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '8px',
              letterSpacing: '0.18em',
              color: 'var(--text-muted)',
              marginBottom: 8,
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}>
              <span style={{
                background: 'var(--accent)',
                color: 'var(--bg-deep)',
                padding: '3px 8px',
              }}>
                {essay.topic?.toUpperCase()}
              </span>
              <span>INTERMEDIO</span>
            </div>
            <h1 style={{
              fontFamily: bodyFont,
              fontSize: scriptMode ? '1.4rem' : 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: scriptMode ? 700 : 300,
              lineHeight: 1.1,
              color: 'var(--text)',
              letterSpacing: scriptMode ? '0.05em' : '-0.02em',
              textTransform: scriptMode ? 'uppercase' : 'none',
            }}>
              {essay.title}
            </h1>
          </div>
        )}

        {/* Indicador modo guión */}
        {scriptMode && (
          <div style={{
            marginBottom: 40,
            fontFamily: 'Courier New, monospace',
            fontSize: '8px',
            letterSpacing: '0.2em',
            color: 'var(--accent)',
            borderBottom: '0.5px solid var(--border)',
            paddingBottom: 16,
          }}>
            MODO GUIÓN — INTERMEDIO · {essay.author.name?.toUpperCase()}
          </div>
        )}

        {/* Cuerpo */}
        <PortableText value={essay.body} scriptMode={scriptMode} />

        {/* Bio del autor */}
        <AuthorCard author={essay.author} />

        {/* Footer */}
        <div style={{
          marginTop: 56,
          paddingTop: 32,
          borderTop: '0.5px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(essay.tags ?? []).map((tag) => (
              <span key={tag} style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '8px',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                border: '0.5px solid var(--border)',
                padding: '3px 8px',
                textTransform: 'uppercase',
              }}>
                {tag}
              </span>
            ))}
          </div>
          <Link href="/intermedio" style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '9px',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)' }}
          >
            ← VOLVER A INTERMEDIO
          </Link>
        </div>
      </motion.div>
    </article>
  )
}
