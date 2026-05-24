'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useProjectionStore } from '@/store/projectionStore'

export default function NavigationProgress() {
  const barRef     = useRef<HTMLDivElement>(null)
  const pathname   = usePathname()
  const staticMode = useProjectionStore((s) => s.staticMode)
  const firstRender = useRef(true)

  useGSAP(() => {
    if (staticMode || !barRef.current) return

    // Saltar la primera carga — solo animar en navegaciones
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    const bar = barRef.current

    gsap.killTweensOf(bar)

    gsap.timeline()
      .set(bar, { scaleX: 0, opacity: 1 })
      .to(bar, {
        scaleX: 1,
        duration: 0.55,
        ease: 'power2.out',
      })
      .to(bar, {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.in',
      })
  }, { dependencies: [pathname, staticMode] })

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '1px',
        background: 'var(--accent)',
        transformOrigin: 'left center',
        zIndex: 10000,
        opacity: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
