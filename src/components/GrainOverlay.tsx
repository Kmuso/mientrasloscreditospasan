'use client'

import { useEffect, useRef } from 'react'
import { useProjectionStore } from '@/store/projectionStore'

const BASE_OPACITY: Record<string, number> = {
  noir: 0.22,
  contemporary: 0.10,
  technicolor: 0.15,
}

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const theme = useProjectionStore((s) => s.theme)
  const grain = useProjectionStore((s) => s.grain)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId: number
    let frameCount = 0
    let resizeTimer: ReturnType<typeof setTimeout> | null = null

    const resize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }, 150)
    }
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    window.addEventListener('resize', resize)

    const draw = () => {
      frameId = requestAnimationFrame(draw)
      frameCount++
      if (frameCount % 3 !== 0) return

      const { width, height } = canvas
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data

      const baseOpacity = BASE_OPACITY[theme] ?? 0.15
      const extraOpacity = (grain / 100) * 0.35
      const totalOpacity = baseOpacity + extraOpacity

      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = (totalOpacity * 255) | 0
      }

      ctx.putImageData(imageData, 0, 0)
    }

    draw()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      if (resizeTimer) clearTimeout(resizeTimer)
    }
  }, [theme, grain])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9998,
        pointerEvents: 'none',
        mixBlendMode: 'soft-light',
      }}
    />
  )
}
