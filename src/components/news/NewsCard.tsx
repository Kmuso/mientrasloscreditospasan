'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { NewsItem } from '@/types'
import { getImageUrl } from '@/lib/sanity-image'
import GeometricDivider from './GeometricDivider'

interface NewsCardProps {
  news: NewsItem
  variant: 'image' | 'text'
  /** Passed from parent stagger — do NOT add entrance animation here */
  style?: React.CSSProperties
}

const MONO = 'Courier New, monospace'

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('es', { day: '2-digit', month: 'short' }).toUpperCase()
}

/*
  animate skill:
  - Hover: CSS transition, not JS — off-thread, interruptible (Emil)
  - Image scale on hover via CSS transform
  - @media (hover: hover) guard — no false activations on touch
  delight skill:
  - Image overlay fades in on hover — reveals depth
  - Title color shift on hover (CSS transition)
  - CTA arrow nudges on hover
*/

export default function NewsCard({ news, variant, style }: NewsCardProps) {
  const imgSrc = getImageUrl(news.coverImage, variant === 'image' ? 'card' : 'thumbnail')

  if (variant === 'image') {
    return (
      <>
        <style>{`
          @media (hover: hover) and (pointer: fine) {
            .nc-img-wrap img { transition: transform 500ms cubic-bezier(0.25, 1, 0.5, 1); }
            .nc-img-wrap:hover img { transform: scale(1.04); }
            .nc-img-overlay { transition: opacity 400ms cubic-bezier(0.25, 1, 0.5, 1); opacity: 0; }
            .nc-img-wrap:hover .nc-img-overlay { opacity: 1; }
            .nc-title-img { transition: color 200ms cubic-bezier(0.23, 1, 0.32, 1); }
            .nc-img-wrap:hover .nc-title-img { color: var(--accent); }
          }
        `}</style>
        <Link href={`/noticias/${news.slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none', ...style }}>
          <div className="nc-img-wrap" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12 }}>
            {/* Image */}
            <div style={{ position: 'relative', flex: 1, minHeight: 180, overflow: 'hidden' }}>
              {imgSrc ? (
                <Image
                  src={imgSrc}
                  alt={news.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'var(--border)' }} />
              )}
              {/* Overlay — depth on hover (delight) */}
              <div
                className="nc-img-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, var(--bg-deep) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Meta */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{
                fontFamily: MONO, fontSize: '9px', letterSpacing: '0.18em',
                color: 'var(--accent)',
              }}>
                {news.category}
              </span>
              <span style={{
                fontFamily: MONO, fontSize: '9px', letterSpacing: '0.12em',
                color: 'var(--text-muted)',
              }}>
                {formatDate(news.publishedAt)}
              </span>
            </div>

            {/* Title */}
            <h3 className="nc-title-img" style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              color: 'var(--text-heading)',
              margin: 0,
            }}>
              {news.title}
            </h3>

            <GeometricDivider />
          </div>
        </Link>
      </>
    )
  }

  // text variant — dark surface, large title
  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .nc-text-wrap { transition: border-color 220ms cubic-bezier(0.23, 1, 0.32, 1); }
          .nc-text-wrap:hover { border-color: var(--accent) !important; }
          .nc-cta-arrow { transition: transform 220ms cubic-bezier(0.23, 1, 0.32, 1); display: inline-block; }
          .nc-text-wrap:hover .nc-cta-arrow { transform: translateX(4px); }
        }
      `}</style>
      <Link href={`/noticias/${news.slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none', ...style }}>
        <div
          className="nc-text-wrap"
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            height: '100%', padding: 'clamp(20px, 3vw, 32px)',
            background: 'var(--bg-deep)',
            border: '0.5px solid var(--border-on-deep)',
          }}
        >
          <div>
            <div style={{
              fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em',
              color: 'var(--accent)', marginBottom: 16,
            }}>
              {news.category}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: '0.02em',
              color: 'var(--text-on-deep)',
              margin: '0 0 16px',
            }}>
              {news.title}
            </h3>

            <GeometricDivider variant="double" />

            <p style={{
              fontFamily: 'var(--font-crimson), Georgia, serif',
              fontSize: '1rem',
              lineHeight: 1.55,
              color: 'var(--text-muted-on-deep)',
              marginTop: 16,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {news.excerpt}
            </p>
          </div>

          <div style={{
            fontFamily: MONO, fontSize: '9px', letterSpacing: '0.18em',
            color: 'var(--text-muted-on-deep)', marginTop: 24,
          }}>
            {formatDate(news.publishedAt)}
            <span className="nc-cta-arrow" style={{ marginLeft: 8 }}>→</span>
          </div>
        </div>
      </Link>
    </>
  )
}
