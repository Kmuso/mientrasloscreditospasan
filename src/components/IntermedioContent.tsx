'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

interface IntermedioContentProps {
  featuredEssay: any
}

export default function IntermedioContent({ featuredEssay }: IntermedioContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.3, once: false })

  const reveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    })
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 clamp(24px, 6vw, 80px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(60px, 10vw, 120px)',
        alignItems: 'start',
      }}
      className="home-intermedio-grid"
    >
      {/* Left — label + title */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="intermedio-left"
      >
        <motion.p
          custom={0}
          variants={reveal}
          className="mono intermedio-label"
          style={{
            marginBottom: 'var(--space-lg)',
          }}
        >
          Otras artes
        </motion.p>
        <motion.h2
          custom={1}
          variants={reveal}
          className="intermedio-title"
          style={{
            fontSize: 'clamp(4rem, 8vw, 7.5rem)',
            margin: '0 0 var(--space-lg)',
          }}
        >
          Inter&shy;medio
        </motion.h2>
        <motion.div
          custom={2}
          variants={reveal}
          className="intermedio-divider"
          style={{ width: 40, height: 1, background: 'var(--border)', marginBottom: 'var(--space-lg)' }}
        />
        <motion.p
          custom={3}
          variants={reveal}
          className="intermedio-description"
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            marginBottom: 'var(--space-2xl)',
            maxWidth: '44ch',
            fontStyle: 'italic',
            color: 'var(--text-muted)',
          }}
        >
          Teatro, música, ópera y artes plásticas desde la mirada de colaboradores invitados.
          El arte que no es cine también necesita quien lo mire de frente.
        </motion.p>
        <motion.div custom={4} variants={reveal}>
          <Link href="/intermedio" style={{
            fontFamily: 'Courier New, monospace',
            fontSize: 11,
            letterSpacing: 'var(--tracking-wide)',
            color: 'var(--text)',
            textDecoration: 'none',
            padding: '12px 24px',
            border: '0.5px solid var(--border)',
            display: 'inline-block',
            transition: 'background 300ms cubic-bezier(0.16,1,0.3,1), color 300ms cubic-bezier(0.16,1,0.3,1), transform 160ms ease-out',
            outline: 'none',
          }}
            className="intermedio-btn"
          >
            [ Leer ensayos ]
          </Link>
        </motion.div>
      </motion.div>

      {/* Right — featured essay pull-quote */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: 'clamp(0px, 8vw, 100px)',
          position: 'relative'
        }}
        className="intermedio-right"
      >
        <motion.div
          animate={isInView ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          style={{
            position: 'absolute',
            top: -40,
            left: -20,
            fontFamily: 'var(--font-crimson), serif',
            fontSize: 120,
            color: 'var(--border)',
            lineHeight: 1,
            pointerEvents: 'none'
          }}
          className="intermedio-quote-icon"
        >
          "
        </motion.div>

        <div style={{
          paddingLeft: 'var(--space-md)',
          borderLeft: '1px solid var(--accent)',
        }}
          className="intermedio-quote-container"
        >
          {featuredEssay ? (
            <>
              <p style={{
                fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                fontStyle: 'italic',
                lineHeight: 'var(--leading-snug)',
                marginBottom: 'var(--space-lg)',
                maxWidth: '35ch',
              }}
                className="intermedio-quote-text"
              >
                {featuredEssay.author?.bio ?? featuredEssay.title}
              </p>
              <p className="mono intermedio-quote-author" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: 20, height: 1, background: 'var(--border)', display: 'inline-block', transformOrigin: 'left', flexShrink: 0 }}
                />
                {featuredEssay.author?.name} — {featuredEssay.topic}
              </p>
            </>
          ) : (
            <p style={{
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              fontStyle: 'italic',
              lineHeight: 'var(--leading-snug)',
              color: 'var(--text-muted)',
            }}
              className="intermedio-quote-text"
            >
              "El arte que no es cine también necesita quien lo mire de frente."
            </p>
          )}
        </div>
      </motion.div>

      <style jsx>{`
        @media (max-width: 600px) {
          .home-intermedio-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
            padding: 80px 24px !important;
            text-align: center !important;
          }
          .intermedio-left {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .intermedio-description {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .intermedio-divider {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .intermedio-right {
            margin-top: 0 !important;
          }
          .intermedio-quote-container {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid var(--accent);
            padding-top: var(--space-md);
          }
          .intermedio-quote-icon {
            display: none !important;
          }
          .intermedio-quote-text {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .intermedio-quote-author {
            justify-content: center !important;
          }
        }
        .intermedio-btn:hover {
          background: var(--text);
          color: var(--bg);
        }
        .intermedio-btn:active {
          transform: scale(0.97);
        }
        .intermedio-btn:focus-visible {
          outline: 1px solid var(--text);
          outline-offset: 4px;
        }
      `}</style>
    </div>
  )
}
