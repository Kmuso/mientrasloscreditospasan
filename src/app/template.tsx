'use client'

/**
 * Next.js re-instancia template.tsx en cada navegación (a diferencia de layout.tsx
 * que persiste). Eso lo convierte en el lugar correcto para las animaciones de entrada.
 */

import { motion } from 'framer-motion'
import { useProjectionStore } from '@/store/projectionStore'

export default function Template({ children }: { children: React.ReactNode }) {
  const staticMode = useProjectionStore((s) => s.staticMode)

  if (staticMode) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'brightness(0.92)' }}
      animate={{ opacity: 1, filter: 'brightness(1)' }}
      transition={{
        duration: 1.3,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.4,
      }}
    >
      {children}
    </motion.div>
  )
}
