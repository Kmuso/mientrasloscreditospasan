'use client'

import { useState, useEffect } from 'react'

/**
 * Usa matchMedia — sin polling, sin resize listener.
 * Devuelve false en SSR para que el servidor renderice layout desktop
 * (correcto para OG images y crawlers) y actualiza en hidratación.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}
