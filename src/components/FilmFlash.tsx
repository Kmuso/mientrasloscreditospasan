'use client'

/**
 * Overlay de flash cinematográfico al iniciar una navegación.
 * Escucha clicks en cualquier <a> interno y dispara un parpadeo
 * breve antes de que la nueva página empiece a entrar.
 * Simula el splice entre dos rollos de película.
 */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useProjectionStore } from '@/store/projectionStore'

export default function FilmFlash() {
  const overlayRef  = useRef<HTMLDivElement>(null)
  const pathname    = usePathname()
  const staticMode  = useProjectionStore((s) => s.staticMode)
  const firstRender = useRef(true)

  // Flash en cada cambio de ruta
  useGSAP(() => {
    if (staticMode || !overlayRef.current) return

    if (firstRender.current) {
      firstRender.current = false
      return
    }

    const overlay = overlayRef.current
    gsap.killTweensOf(overlay)

    gsap.timeline()
      .set(overlay, { opacity: 0.18 })
      .to(overlay, {
        opacity: 0,
        // Emil: 0.35s más ajustado que 0.45s — el flash debe ser perceptible,
        // no una espera. power3.out tiene caída más rápida que power2.out.
        duration: 0.35,
        ease: 'power3.out',
      })
  }, { dependencies: [pathname, staticMode] })

  // Flash extra al hacer click en un link interno — sincronizado con LoadingTransition
  useEffect(() => {
    if (staticMode) return

    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('a')
      if (!target || !overlayRef.current) return

      const href = target.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('mailto')) return

      // Delay coordinado: no competir con el fade de LoadingTransition (300ms)
      setTimeout(() => {
        if (!overlayRef.current) return
        gsap.killTweensOf(overlayRef.current)
        gsap.timeline()
          .set(overlayRef.current, { opacity: 0.08 })
          .to(overlayRef.current, {
            opacity: 0,
            // Ligeramente más rápido que el flash de ruta — es un refuerzo del click
            duration: 0.4,
            ease: 'power3.out',
          })
      }, 350)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [staticMode])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#fff',
        zIndex: 9995,
        pointerEvents: 'none',
        opacity: 0,
        mixBlendMode: 'overlay',
      }}
    />
  )
}
