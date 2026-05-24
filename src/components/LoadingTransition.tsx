'use client'

/**
 * Cubre el "gap" de carga entre el click del usuario y cuando Next.js
 * desmonta/monta la nueva página. Aparece INSTANTÁNEAMENTE al hacer click
 * en cualquier link interno, evitando el flash/salto visual.
 */

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useProjectionStore } from '@/store/projectionStore'

// Emil: entering element → ease-out (starts fast, feels responsive)
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1]

export default function LoadingTransition() {
  const [isLoading, setIsLoading] = useState(false)
  const [frameCount, setFrameCount] = useState(0)
  const pathname   = usePathname()
  const staticMode = useProjectionStore((s) => s.staticMode)
  const theme      = useProjectionStore((s) => s.theme)

  // Interceptar clicks en links internos → mostrar overlay instantáneamente
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link   = target.closest('a')

      if (
        link &&
        link.href &&
        !link.target &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey
      ) {
        try {
          const url = new URL(link.href)
          if (
            url.origin === window.location.origin &&
            url.pathname !== window.location.pathname
          ) {
            setIsLoading(true)
            document.body.style.overflow = 'hidden'
          }
        } catch {
          // URL inválida — ignorar
        }
      }
    }

    document.addEventListener('click', handleLinkClick, true)
    return () => document.removeEventListener('click', handleLinkClick, true)
  }, [])

  // Cuando cambia el pathname la carga terminó → ocultar overlay
  useEffect(() => {
    setIsLoading(false)
    document.body.style.overflow = ''
  }, [pathname])

  // Contador de fotogramas cinematográfico (24fps) mientras carga
  useEffect(() => {
    if (!isLoading) { setFrameCount(0); return }
    const id = setInterval(() => setFrameCount((f) => (f + 1) % 100), 1000 / 24)
    return () => clearInterval(id)
  }, [isLoading])

  if (staticMode) return null

  // Paleta según el tema activo
  const bg = theme === 'noir'         ? '#0B0C10'
           : theme === 'contemporary' ? '#FAFAFA'
           : '#EDDB99'
  const fg = theme === 'noir'         ? 'rgba(197,198,199,0.7)'
           : theme === 'contemporary' ? 'rgba(19,21,26,0.5)'
           : 'rgba(51,9,23,0.55)'

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Emil: entering element → ease-out (not easeInOut)
          // 0.18s is fast enough to feel instant, slow enough to not flash
          transition={{ duration: 0.18, ease: EASE_OUT }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: bg,
            zIndex: 10000,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/*
            Contador de frames cinematográfico.
            Delay 0.3s: solo aparece si la carga toma más de 300ms.
            No molesta en cargas rápidas — el usuario nunca llega a verlo.
            y: 4→0 da al texto un micro-settle que se siente considered.
          */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: EASE_OUT }}
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: fg,
              userSelect: 'none',
            }}
          >
            {String(frameCount).padStart(2, '0')} / 24
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
