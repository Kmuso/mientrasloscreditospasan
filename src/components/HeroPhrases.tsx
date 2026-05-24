'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useProjectionStore } from '@/store/projectionStore'

const PHRASES = [
  'No te levantes todavía.',
  'La película empieza cuando termina.',
  'El eco permanece.',
  'Habita el silencio.',
  'Y la luz se queda.',
]

const DISPLAY_MS = 4000
const EXIT_MS    = 550

const phraseVariants = {
  enter: {
    y: 16,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
    transition: {
      y:       { duration: 0.9,  ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      opacity: { duration: 0.55, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
    },
  },
  exit: {
    y: -10,
    opacity: 0,
    transition: {
      y:       { duration: EXIT_MS / 1000, ease: [0.4, 0, 0.8, 0.6] as [number, number, number, number] },
      opacity: { duration: (EXIT_MS / 1000) * 0.65, ease: 'easeIn' as const },
    },
  },
}

const sharedStyle = {
  fontFamily: "var(--font-crimson), Georgia, serif",
  fontSize: 'clamp(2rem, 5vw, 4rem)',
  fontWeight: 300 as const,
  lineHeight: 1.15,
  letterSpacing: '-0.01em',
  color: '#fff',
  textAlign: 'center' as const,
  margin: 0,
  userSelect: 'none' as const,
}

export default function HeroPhrases() {
  const staticMode        = useProjectionStore((s) => s.staticMode)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (staticMode) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length)
    }, DISPLAY_MS + EXIT_MS)
    return () => clearInterval(id)
  }, [staticMode])

  if (staticMode) {
    return <p style={sharedStyle}>{PHRASES[0]}</p>
  }

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'clamp(3rem, 7vw, 6rem)',
        width: '100%',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          variants={phraseVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={sharedStyle}
        >
          {PHRASES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
