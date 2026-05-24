'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function HomeNewsletter() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { amount: 0.3, once: false })
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'submitting') return
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Error al suscribirse')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Sin conexión. Intenta de nuevo.')
      setStatus('error')
    }
  }

  return (
    <section
      ref={containerRef}
      data-snap
      style={{
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-deep, #060608)',
      }}
      className="newsletter-section"
    >
      <div style={{
        width: '100%',
        maxWidth: 600,
        padding: 'clamp(32px, 6vw, 64px) clamp(24px, 6vw, 48px)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
      }}
      className="newsletter-content"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="mono newsletter-label"
          style={{
            marginBottom: 'var(--space-xl)',
          }}
        >
          Correspondencia
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={isInView ? { opacity: 0.9, filter: 'blur(0px)' } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="newsletter-title"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            color: '#fff',
            margin: '0 0 var(--space-md)',
          }}
        >
          Quédate en sala
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.45 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="newsletter-description"
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            fontStyle: 'italic',
            lineHeight: 'var(--leading-snug)',
            color: '#fff',
            marginBottom: 'var(--space-3xl)',
            maxWidth: '40ch',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Reseñas, noticias y ensayos — directo a tu bandeja, sin algoritmos de por medio.
        </motion.p>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: 'var(--space-lg)',
              border: '0.5px solid rgba(255,255,255,0.2)',
              fontFamily: 'var(--font-crimson), Georgia, serif',
              fontStyle: 'italic',
              color: '#fff',
            }}
          >
            Gracias por acompañarnos. Nos vemos en los créditos.
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              width: '100%',
              maxWidth: 400,
              margin: '0 auto',
            }}
            className="newsletter-form"
          >
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                style={{
                  fontFamily: 'var(--font-crimson), Georgia, serif',
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  padding: 'var(--space-2xs) 0',
                  outline: 'none',
                  textAlign: 'center',
                  width: '100%',
                  transition: 'border-color 400ms ease',
                }}
                className="newsletter-input"
              />
              <div className="input-highlight" />
            </div>

            {status === 'error' && (
              <p style={{
                fontFamily: 'Courier New, monospace',
                fontSize: 10,
                color: 'rgba(255,100,100,0.8)',
                letterSpacing: '0.08em',
                margin: 0,
              }}>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mono newsletter-button"
              style={{
                fontSize: 10,
                color: status === 'submitting' ? 'rgba(255,255,255,0.3)' : '#fff',
                background: 'transparent',
                border: '0.5px solid rgba(255,255,255,0.2)',
                padding: 'var(--space-md) var(--space-xl)',
                cursor: status === 'submitting' ? 'wait' : 'pointer',
                transition: 'background 300ms cubic-bezier(0.16,1,0.3,1), border-color 300ms cubic-bezier(0.16,1,0.3,1), transform 160ms ease-out',
                marginTop: 'var(--space-sm)',
                outline: 'none',
              }}
            >
              {status === 'submitting' ? 'Procesando...' : '[ Suscribirme ]'}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .newsletter-input:focus {
          border-bottom-color: rgba(255,255,255,0.5);
        }

        .newsletter-input:focus + .input-highlight {
          transform: scaleX(1);
        }

        .input-highlight {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: #fff;
          transform: scaleX(0);
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: left;
        }

        .newsletter-button:hover:not(:disabled) {
          background: rgba(255,255,255,0.05);
          border-color: #fff;
        }

        .newsletter-button:active:not(:disabled) {
          transform: scale(0.97);
        }

        .newsletter-button:focus-visible {
          background: rgba(255,255,255,0.1);
          border-color: #fff;
          outline: 1px solid #fff;
          outline-offset: 4px;
        }

        @media (max-width: 640px) {
          .newsletter-content {
            padding: 40px 24px !important;
          }
          .newsletter-description {
            margin-bottom: var(--space-xl) !important;
          }
          .newsletter-button {
            padding: var(--space-md) var(--space-lg) !important;
          }
        }
      `}</style>
    </section>
  )
}
