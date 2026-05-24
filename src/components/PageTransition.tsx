'use client'

/**
 * Animación de entrada de la nueva página.
 * key={pathname} reinicia la animación en cada cambio de ruta.
 * Solo aplica la entrada — las salidas no son posibles en App Router.
 * El delay de 0.3s sincroniza con el fade de LoadingTransition.
 */

import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useProjectionStore } from '@/store/projectionStore'

// Emil: entering elements use ease-out — immediate response, then settles
// [0.19, 1, 0.22, 1] has more punch than the built-in ease-in-out
const ENTER_EASE: [number, number, number, number] = [0.19, 1, 0.22, 1]

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname        = usePathname()
  const staticMode      = useProjectionStore((s) => s.staticMode)
  const transitionStyle = useProjectionStore((s) => s.transitionStyle)
  const prefersReduced  = useReducedMotion()

  if (staticMode || transitionStyle === 'none') {
    return <>{children}</>
  }

  return (
    <motion.div
      key={pathname}
      // Subtle y:6 gives the page a sense of "settling into place"
      // With reduced-motion: opacity only, no movement
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={
        prefersReduced
          ? { duration: 0.2 }
          : {
              duration: 0.65,
              ease: ENTER_EASE,
              delay: 0.3, // arranca cuando el fade de LoadingTransition termina
            }
      }
      style={{ width: '100%', minHeight: '100dvh' }}
    >
      {children}
    </motion.div>
  )
}
