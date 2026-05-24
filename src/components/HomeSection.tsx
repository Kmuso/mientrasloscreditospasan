'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface HomeSectionProps {
  label: string
  title: string
  description: string
  linkHref: string
  linkLabel: string
  imageUrl?: string | null
  imageAlt?: string
  align?: 'left' | 'right'
  priority?: boolean
}

export default function HomeSection({
  label,
  title,
  description,
  linkHref,
  linkLabel,
  imageUrl,
  imageAlt,
  align = 'left',
  priority = false
}: HomeSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.3, once: true })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const opacityScrim = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.8, 0.4])

  const isRight = align === 'right'

  return (
    <section
      ref={containerRef}
      data-snap
      style={{
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: isRight ? 'flex-end' : 'flex-start',
        background: '#000',
      }}
      className="home-section-container"
    >
      {/* Background Image with Parallax */}
      {imageUrl && (
        <motion.div
          style={{
            position: 'absolute',
            inset: '-10%',
            y: yParallax,
            zIndex: 0,
          }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority={priority}
          />
        </motion.div>
      )}

      {/* Cinematic Scrim */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: isRight
            ? 'linear-gradient(to top left, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)'
            : 'linear-gradient(to top right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
          opacity: opacityScrim,
        }}
        className="section-scrim"
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          padding: 'var(--space-2xl) clamp(24px, 6vw, 100px)',
          width: '100%',
          maxWidth: 900,
          textAlign: isRight ? 'right' : 'left',
        }}
        className="home-section-content"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mono home-section-label"
          style={{
            marginBottom: 'var(--space-md)',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          {label}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="home-section-title"
          style={{
            fontSize: 'clamp(3.5rem, 11vw, 8.5rem)',
            color: '#fff',
            margin: '0 0 var(--space-md)',
          }}
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="home-section-description"
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.25rem)',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 'var(--space-xl)',
            maxWidth: '55ch',
            marginLeft: isRight ? 'auto' : '0',
            lineHeight: 'var(--leading-snug)',
          }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href={linkHref}
            style={{
              fontFamily: 'var(--font-crimson), Georgia, serif',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#fff',
              textDecoration: 'none',
              letterSpacing: 'var(--tracking-wide)',
              display: 'inline-block',
              position: 'relative',
              paddingBottom: 4,
              outline: 'none',
            }}
            className="home-section-link"
          >
            [{linkLabel}]
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        :global(.home-section-link::after) {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0.5px;
          background: rgba(255,255,255,0.5);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        :global(.home-section-link:hover::after) {
          transform: scaleX(1);
        }
        :global(.home-section-link:focus-visible) {
          outline: 1px solid rgba(255,255,255,0.8);
          outline-offset: 6px;
          border-radius: 1px;
        }

        @media (max-width: 768px) {
          .home-section-container {
            justify-content: center !important;
            align-items: center !important;
          }
          .home-section-content {
            text-align: center !important;
            padding: var(--space-xl) 24px !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .home-section-description {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .section-scrim {
            background: radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.95) 100%) !important;
          }
          .home-section-title {
            line-height: 1 !important;
            margin-bottom: var(--space-sm) !important;
          }
        }
      `}</style>
    </section>
  )
}
