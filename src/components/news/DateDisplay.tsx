'use client'

import { motion } from 'framer-motion'

interface DateDisplayProps {
  dateStr: string  // ISO string
}

const MONTHS_ES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']

/*
  delight: fecha decorativa ghosted — sutil, no bloquea.
  animate: fade in desde scale 0.88 con easing expo-out.
*/
export default function DateDisplay({ dateStr }: DateDisplayProps) {
  const d    = new Date(dateStr)
  const day  = d.getDate()
  const mon  = MONTHS_ES[d.getMonth()]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: 160,
        gap: 4,
        userSelect: 'none',
        pointerEvents: 'none',
        opacity: 0.12,  // ghosted — delight through restraint
      }}
    >
      <span style={{
        fontFamily: 'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
        fontSize: 'clamp(3.5rem, 7vw, 6rem)',
        lineHeight: 1,
        letterSpacing: '0.02em',
        color: 'var(--text)',
      }}>
        {day}
      </span>
      <span style={{
        fontFamily: 'Courier New, monospace',
        fontSize: '11px',
        letterSpacing: '0.28em',
        color: 'var(--text)',
      }}>
        {mon}
      </span>
    </motion.div>
  )
}
