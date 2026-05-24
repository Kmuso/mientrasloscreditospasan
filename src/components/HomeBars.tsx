'use client'

import { motion } from 'framer-motion'

export function HomeBarTop() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="home-bar-noise home-bar-top"
      style={{
        height: '50vh',
        background: 'var(--bar-bg, #000)',
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: 1200, padding: '0 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }} className="home-bar-content">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ width: '100%', height: '0.5px', background: 'rgba(255,255,255,0.2)', transformOrigin: 'center' }}
        />
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontFamily: 'Courier New, monospace',
            fontSize: 10,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Comienza la proyección
        </motion.span>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .home-bar-top {
            height: 30vh !important;
          }
          .home-bar-content {
            padding: 0 24px !important;
          }
        }
      `}</style>
    </motion.div>
  )
}

export function HomeBarBottom() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="home-bar-noise home-bar-bottom"
      style={{
        height: '40vh',
        background: 'var(--bar-bg, #000)',
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ width: '100%', maxWidth: 1200, padding: '0 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, opacity: 0.3 }} className="home-bar-content">
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 1.5 }}
          style={{
            fontFamily: 'Courier New, monospace',
            fontSize: 9,
            textTransform: 'uppercase',
            color: '#fff',
          }}
        >
          Fin de la cinta
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ width: '60px', height: '0.5px', background: 'rgba(255,255,255,0.8)' }}
        />
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .home-bar-bottom {
            height: 25vh !important;
          }
          .home-bar-content {
            padding: 0 24px !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
