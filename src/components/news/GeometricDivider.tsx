'use client'

import { motion } from 'framer-motion'

interface GeometricDividerProps {
  variant?: 'single' | 'double'
  className?: string
}

/*
  animate skill: whileInView + clip-path grow from center.
  Emil: especificar propiedad exacta — width, no shorthand.
  Exit más rápido que entrada (no aplica aquí — once: true).
*/
export default function GeometricDivider({ variant = 'single', className }: GeometricDividerProps) {
  if (variant === 'double') {
    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 80, height: 2, background: 'var(--accent)', transformOrigin: 'left' }}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          style={{ width: 48, height: 1, background: 'var(--accent)', transformOrigin: 'left', opacity: 0.5 }}
        />
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: 56, height: 1.5, background: 'var(--accent)', transformOrigin: 'left' }}
    />
  )
}
