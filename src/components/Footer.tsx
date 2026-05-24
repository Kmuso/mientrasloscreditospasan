'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const NAV_LINKS = [
  { label: 'ARCHIVO',    href: '/archivo'     },
  { label: 'INTERMEDIO', href: '/intermedio'  },
  { label: 'NOTICIAS',   href: '/noticias'    },
  { label: 'BACKSTAGE',  href: '/backstage'   },
  { label: 'CONTACTO',   href: '/contacto'    },
]

const SOCIAL_LINKS = [
  { label: 'INSTAGRAM',   ariaLabel: 'Instagram',   href: 'https://instagram.com' },
  { label: 'X / TWITTER', ariaLabel: 'X (Twitter)', href: 'https://x.com'         },
  { label: 'YOUTUBE',     ariaLabel: 'YouTube',     href: 'https://youtube.com'   },
]

const SITE_NAME        = 'mientrasloscreditospasan'
const SUBTITLE         = 'El Cine se lee, se escucha y se ve.'
const RING_INSCRIPTION = 'Ash nazg durbatulûk, ash nazg gimbatul, ash nazg thrakatulûk agh burzum-ishi krimpatul.'
const MATRIX_GREEN     = '#34D399'
const FIRE_GOLD        = '#FF4D00'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView  = useInView(footerRef, { amount: 0.1, once: false })

  const [matrixActive, setMatrixActive] = useState(false)
  const [matrixTitle,  setMatrixTitle]  = useState(SITE_NAME)
  const matrixIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [ringActive, setRingActive]     = useState(false)

  function scramble(str: string) {
    return str.split('').map((char) =>
      char === ' ' ? ' ' : (Math.random() > 0.5 ? '1' : '0')
    ).join('')
  }

  function startMatrix() {
    if (matrixActive) return
    setMatrixActive(true)
    matrixIntervalRef.current = setInterval(() => setMatrixTitle(scramble(SITE_NAME)), 80)
  }

  function stopMatrix() {
    setMatrixActive(false)
    if (matrixIntervalRef.current) { clearInterval(matrixIntervalRef.current); matrixIntervalRef.current = null }
    setMatrixTitle(SITE_NAME)
  }

  return (
    <motion.footer
      ref={footerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2 }}
      style={{
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        background: 'var(--bg-deep)',
        borderTop: '0.5px solid var(--border-on-deep)',
        padding: 'var(--space-3xl) clamp(24px, 5vw, 80px)',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* ── Background Decoration ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 'var(--space-2xl)',
        width: '1px',
        height: '100%',
        background: 'linear-gradient(to bottom, var(--border-on-deep) 0%, transparent 100%)',
        opacity: 0.1,
        pointerEvents: 'none',
      }} />

      <div className="footer-grid">

        {/* ── Col 1: Identity ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', minWidth: 0 }}>
          <Link href="/" style={{ textDecoration: 'none', width: 'fit-content' }} className="footer-site-link">
            <motion.p
              onMouseEnter={startMatrix}
              onMouseLeave={stopMatrix}
              style={{
                fontFamily: 'var(--font-crimson), Georgia, serif',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                color: matrixActive ? MATRIX_GREEN : 'var(--text-on-deep)',
                margin: 0,
                transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                textShadow: matrixActive ? `0 0 15px ${MATRIX_GREEN}aa` : 'none',
                letterSpacing: matrixActive ? '0.05em' : 'normal',
              }}
            >
              {matrixTitle}
            </motion.p>
          </Link>

          <div
            onMouseEnter={() => setRingActive(true)}
            onMouseLeave={() => setRingActive(false)}
            style={{ position: 'relative', cursor: 'default' }}
          >
            <motion.p
              animate={{ color: ringActive ? FIRE_GOLD : 'var(--text-muted-on-deep)', opacity: ringActive ? 0 : 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-crimson), Georgia, serif',
                fontSize: '1rem',
                fontStyle: 'italic',
                maxWidth: '30ch',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {SUBTITLE}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: ringActive ? 1 : 0, color: FIRE_GOLD }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                fontFamily: 'var(--font-crimson), Georgia, serif',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                margin: 0,
                lineHeight: 1.4,
                textShadow: `0 0 8px ${FIRE_GOLD}88, 0 0 20px ${FIRE_GOLD}44`,
                pointerEvents: 'none',
              }}
            >
              {RING_INSCRIPTION}
            </motion.p>
          </div>
        </div>

        {/* ── Col 2: Navigation ── */}
        <div style={{ display: 'flex', gap: 'var(--space-xl)', minWidth: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', minWidth: 0 }}>
            <p className="mono" style={{ fontSize: 9, color: 'var(--text-muted-on-deep)', margin: '0 0 var(--space-sm)' }}>Sala</p>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className="footer-link">{label}</Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', minWidth: 0 }}>
            <p className="mono" style={{ fontSize: 9, color: 'var(--text-muted-on-deep)', margin: '0 0 var(--space-sm)' }}>Redes</p>
            {SOCIAL_LINKS.map(({ label, ariaLabel, href }) => (
              <a key={label} href={href} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer" className="footer-link">
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Col 3: Closing Quote ── */}
        <div className="footer-cierre" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', minWidth: 0 }}>
          <p className="mono" style={{ fontSize: 9, color: 'var(--text-muted-on-deep)', margin: '0 0 var(--space-sm)' }}>Cierre</p>
          <p style={{
            fontFamily: 'var(--font-crimson)',
            fontStyle: 'italic',
            fontSize: '0.9rem',
            color: 'var(--text-muted-on-deep)',
            maxWidth: '24ch',
            margin: 0,
            lineHeight: 1.6,
          }}>
            No te levantes todavía, la luz se queda.
          </p>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div style={{
        marginTop: 'var(--space-3xl)',
        paddingTop: 'var(--space-md)',
        borderTop: '0.5px solid var(--border-on-deep)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--space-sm)',
      }}>
        <p className="mono" style={{ fontSize: 8, opacity: 0.8, color: 'var(--text-on-deep)', margin: 0 }}>
          © {new Date().getFullYear()} MIENTRASLOSCREDITOSPASAN
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          {['NEXT.JS', 'SANITY', 'FRAMER'].map(tech => (
            <span key={tech} className="mono" style={{ fontSize: 8, opacity: 0.7, color: 'var(--text-on-deep)' }}>{tech}</span>
          ))}
        </div>
      </div>

      <style jsx>{`

        /* ── Grid — desktop 3 cols asimétrico ── */
        .footer-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1fr);
          gap: var(--space-xl);
          position: relative;
          z-index: 2;
        }

        /* ── Tablet ≤ 900px — 2 cols, quote abajo full-width ── */
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
            gap: var(--space-lg);
          }
          .footer-cierre {
            grid-column: 1 / -1;
            flex-direction: row;
            align-items: flex-start;
            gap: var(--space-xl);
            border-top: 0.5px solid var(--border-on-deep);
            padding-top: var(--space-lg);
          }
          .footer-cierre p.mono {
            display: none;
          }
          .footer-cierre p:last-child {
            max-width: 40ch;
          }
        }

        /* ── Mobile ≤ 640px — 1 col apilado ── */
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }
          .footer-cierre {
            grid-column: auto;
            flex-direction: column;
            border-top: 0.5px solid var(--border-on-deep);
            padding-top: var(--space-lg);
          }
          .footer-cierre p.mono {
            display: block;
          }
          .footer-cierre p:last-child {
            max-width: 28ch;
          }
        }

        /* ── Link styles — :global() para Next.js <Link> ── */
        :global(.footer-link) {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--text-muted-on-deep);
          text-decoration: none;
          display: block;
          opacity: 0.5;
          position: relative;
          width: fit-content;
          white-space: nowrap;
          transition: color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        :global(.footer-link::after) {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 0.5px;
          background: var(--text-on-deep);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        :global(.footer-link:hover) {
          color: var(--text-on-deep);
          opacity: 1;
        }
        :global(.footer-link:hover::after) {
          transform: scaleX(1);
        }
        :global(.footer-link:focus-visible) {
          outline: 1px solid var(--text-on-deep);
          outline-offset: 3px;
          opacity: 1;
          color: var(--text-on-deep);
          border-radius: 1px;
        }
        :global(.footer-site-link:focus-visible) {
          outline: 1px solid var(--text-on-deep);
          outline-offset: 4px;
          border-radius: 1px;
        }
      `}</style>
    </motion.footer>
  )
}
