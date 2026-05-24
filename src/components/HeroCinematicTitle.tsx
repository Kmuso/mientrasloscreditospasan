'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useProjectionStore } from '@/store/projectionStore'
import HeroPhrases from './HeroPhrases'

export default function HeroCinematicTitle() {
  const staticMode = useProjectionStore((s) => s.staticMode)
  const theme      = useProjectionStore((s) => s.theme)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (staticMode) return
    const onScroll = () => { if (window.scrollY > 60) setScrolled(true) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [staticMode])

  const logoFilter = theme === 'technicolor'
    ? 'invert(1) sepia(0.7) saturate(2.2) hue-rotate(5deg) brightness(0.92)'
    : 'invert(1)'

  const enter = (delay = 0) => staticMode
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay } }

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* Background Video */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6, // Sutil para mantener legibilidad
          }}
        >
          <source src="/Video/Intro pagina.mp4" type="video/mp4" />
        </video>
        {/* Scrim overlay for contrast */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }} />
      </div>

      {/* Top-center logo with cinematic sweep */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          position: 'absolute',
          top: 'clamp(0px, calc(8vw - 55px), 5px)',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 10,
          overflow: 'hidden'
        }}
        className="hero-logo-container"
      >
        <div style={{ position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/Logo.svg"
            alt="mientrasloscreditospasan"
            style={{
              width: 'clamp(80px, 12vw, 130px)',
              height: 'auto',
              display: 'block',
              filter: logoFilter,
              transition: 'filter 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </motion.div>

      {/* Main centered phrases block */}
      <motion.div
        {...enter(0.3)}
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-md)',
          zIndex: 10,
          width: '100%',
          padding: '0 clamp(24px, 8vw, 80px)',
        }}
        className="hero-content"
      >
        <HeroPhrases />
      </motion.div>

      {/* Thin bottom divider line */}
      <motion.div
        {...(staticMode ? {} : { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay: 0.8 } })}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '0.5px',
          background: 'var(--border)',
          transformOrigin: 'left center',
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        {...(staticMode ? {} : {
          initial:    { opacity: 0 },
          animate:    { opacity: scrolled ? 0 : 1 },
          transition: { duration: scrolled ? 0.4 : 0.6, delay: scrolled ? 0 : 1.2 },
        })}
        style={{
          position: 'absolute',
          bottom: 'clamp(64px, calc(4vw + 40px), 80px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <motion.span
          style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
          }}
        >
          scroll
        </motion.span>
        <motion.div
          animate={staticMode ? undefined : { y: [0, 8, 0] }}
          transition={staticMode ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 32,
            background: 'rgba(255,255,255,0.6)',
          }}
        />
      </motion.div>
    </section>
  )
}
