'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CinematicFlash() {
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Trigger a subtle flash occasionally or on specific milestones
      if (Math.random() > 0.99) {
        setFlash(true)
        setTimeout(() => setFlash(false), 100)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#fff',
            zIndex: 9999,
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </AnimatePresence>
  )
}
