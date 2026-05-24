'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function SplashScreen() {
  const [show, setShow]  = useState(false)
  const canvasRef        = useRef<HTMLCanvasElement>(null)
  const prefersReduced   = useReducedMotion()
  const pathname         = usePathname()

  const [timecode] = useState(() => {
    if (typeof window === 'undefined') return '00:00:00:00'
    const now = new Date()
    const p = (n: number) => String(n).padStart(2, '0')
    return `${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}:${p(Math.floor(Math.random() * 24))}`
  })

  useEffect(() => {
    if (pathname === '/') setShow(true)
  }, [pathname])

  // Dismiss: fast for reduced-motion, normal otherwise
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => setShow(false), prefersReduced ? 900 : 2650)
    return () => clearTimeout(t)
  }, [show, prefersReduced])

  // Grain canvas
  useEffect(() => {
    if (!show) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    let frameId: number
    let tick = 0

    const draw = () => {
      frameId = requestAnimationFrame(draw)
      tick++
      if (tick % 3 !== 0) return
      const { width, height } = canvas
      const img  = ctx.createImageData(width, height)
      const data = img.data
      for (let i = 0; i < data.length; i += 4) {
        const v   = (Math.random() * 255) | 0
        data[i]   = v
        data[i+1] = v
        data[i+2] = v
        data[i+3] = 50
      }
      ctx.putImageData(img, 0, 0)
    }

    draw()
    return () => cancelAnimationFrame(frameId)
  }, [show])

  return (
    <>
      <style>{`
        /* — Background fade — */
        @keyframes splash-bg-out {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        .splash-bg {
          animation: splash-bg-out 0.7s cubic-bezier(0.4, 0, 1, 1) 1.85s both;
        }

        /* — Handheld camera shake on video — slow sweeping cycles — */
        @keyframes cam-shake {
          0%   { transform: translate(0,      0)    rotate(0deg);     }
          22%  { transform: translate(-14px,  8px)  rotate(-0.40deg); }
          45%  { transform: translate(11px,  -7px)  rotate(0.35deg);  }
          68%  { transform: translate(-9px,  13px)  rotate(-0.30deg); }
          100% { transform: translate(0,      0)    rotate(0deg);     }
        }
        .splash-video-wrap {
          position: absolute;
          inset: -24px;
          overflow: hidden;
          will-change: transform;
          animation: cam-shake 0.48s ease-in-out 0s 4;
        }
        .splash-video-wrap video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.55;
        }

        /* — Scan lines — */
        .splash-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 2px,
            rgba(255,255,255,0.022) 2px,
            rgba(255,255,255,0.022) 4px
          );
          pointer-events: none;
        }

        /* — Viewfinder corners — */
        @keyframes reticle-in {
          0%   { opacity: 0; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1);   }
        }
        @keyframes reticle-out {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        .splash-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: rgba(255,255,255,0.50);
          border-style: solid;
          pointer-events: none;
          will-change: transform, opacity;
          animation:
            reticle-in  0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.32s both,
            reticle-out 0.4s  ease-in                        1.68s both;
        }
        .splash-corner--tl { top: clamp(24px,4vw,40px);    left:  clamp(24px,4vw,40px);   border-width: 1.5px 0 0 1.5px; }
        .splash-corner--tr { top: clamp(24px,4vw,40px);    right: clamp(24px,4vw,40px);   border-width: 1.5px 1.5px 0 0; }
        .splash-corner--bl { bottom: clamp(24px,4vw,40px); left:  clamp(24px,4vw,40px);   border-width: 0 0 1.5px 1.5px; }
        .splash-corner--br { bottom: clamp(24px,4vw,40px); right: clamp(24px,4vw,40px);   border-width: 0 1.5px 1.5px 0; }

        /* Center crosshair — inset:0 so 50% = exact viewport center.
           Uses opacity-only fade (no scale) because scaling an inset:0
           element would scale the entire viewport, not just the lines. */
        @keyframes crosshair-in {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        .splash-crosshair {
          position: absolute;
          inset: 0;
          pointer-events: none;
          animation:
            crosshair-in 0.4s ease-out 0.32s both,
            reticle-out  0.4s ease-in  1.68s both;
        }
        /* horizontal arm — 90px each side of center, 72px gap */
        .splash-crosshair::before {
          content: '';
          position: absolute;
          top: 50%;
          left:  calc(50% - 90px);
          right: calc(50% - 90px);
          height: 1px;
          transform: translateY(-0.5px);
          background: linear-gradient(to right,
            rgba(255,255,255,0.50) 0%,               rgba(255,255,255,0.50) calc(50% - 36px),
            transparent             calc(50% - 36px), transparent             calc(50% + 36px),
            rgba(255,255,255,0.50) calc(50% + 36px), rgba(255,255,255,0.50) 100%
          );
        }
        /* vertical arm — 90px each side of center, 72px gap */
        .splash-crosshair::after {
          content: '';
          position: absolute;
          left: 50%;
          top:    calc(50% - 90px);
          bottom: calc(50% - 90px);
          width: 1px;
          transform: translateX(-0.5px);
          background: linear-gradient(to bottom,
            rgba(255,255,255,0.50) 0%,               rgba(255,255,255,0.50) calc(50% - 36px),
            transparent             calc(50% - 36px), transparent             calc(50% + 36px),
            rgba(255,255,255,0.50) calc(50% + 36px), rgba(255,255,255,0.50) 100%
          );
        }

        /* — Timecode — */
        @keyframes timecode-flicker {
          0%, 78%, 100% { opacity: 0.45; }
          83%           { opacity: 0.08; }
        }
        .splash-timecode {
          position: absolute;
          bottom: clamp(20px,3vw,32px);
          left:   clamp(20px,3vw,32px);
          font-family: 'Courier New', monospace;
          font-size: 9px;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.5);
          pointer-events: none;
          user-select: none;
          animation:
            crosshair-in     0.35s ease-out                    0.48s both,
            timecode-flicker 0.18s linear                      0.9s  5,
            reticle-out      0.4s  ease-in                     1.68s both;
        }

        /* — Mobile: reduced shake amplitude — */
        @media (max-width: 767px) {
          @keyframes cam-shake {
            0%   { transform: translate(0,    0)    rotate(0deg);     }
            22%  { transform: translate(-6px, 3px)  rotate(-0.18deg); }
            45%  { transform: translate(5px, -3px)  rotate(0.15deg);  }
            68%  { transform: translate(-4px, 5px)  rotate(-0.12deg); }
            100% { transform: translate(0,    0)    rotate(0deg);     }
          }
          .splash-video-wrap { inset: -14px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-bg         { animation: none !important; }
          .splash-video-wrap { animation: none !important; }
          .splash-corner     { animation: none !important; opacity: 0; }
          .splash-crosshair  { animation: none !important; opacity: 0; }
          .splash-timecode   { animation: none !important; opacity: 0; }
        }
      `}</style>

      <AnimatePresence>
        {show && (
          <motion.div
            key="splash"
            className="splash-bg"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}
            aria-hidden="true"
            onClick={() => setShow(false)}
            style={{
              position:       'fixed',
              inset:          0,
              zIndex:         99999,
              background:     '#050507',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              overflow:       'hidden',
              touchAction:    'none',
              cursor:         'default',
            }}
          >
            {/* Video background — shakes, everything else stays still */}
            <div className="splash-video-wrap">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video autoPlay muted loop playsInline>
                <source src="/Video/Intro pagina.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Dark scrim for legibility */}
            <div style={{
              position:      'absolute',
              inset:         0,
              background:    'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Grain */}
            <canvas
              ref={canvasRef}
              style={{
                position:      'absolute',
                inset:         0,
                width:         '100%',
                height:        '100%',
                pointerEvents: 'none',
                mixBlendMode:  'soft-light',
              }}
            />

            {/* Scan lines */}
            <div className="splash-scanlines" />

            {/* Viewfinder corners */}
            <div className="splash-corner splash-corner--tl" />
            <div className="splash-corner splash-corner--tr" />
            <div className="splash-corner splash-corner--bl" />
            <div className="splash-corner splash-corner--br" />

            {/* Center crosshair */}
            <div className="splash-crosshair" />

            {/* Timecode */}
            <div className="splash-timecode">{timecode}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
