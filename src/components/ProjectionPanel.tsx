'use client'

import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useProjectionStore } from '@/store/projectionStore'

// ─── Types ───────────────────────────────────────────────────────────────────

type Theme = 'noir' | 'contemporary' | 'technicolor'

interface Props {
  open: boolean
  onClose: () => void
}

// ─── Theme definitions ────────────────────────────────────────────────────────

const THEMES: { id: Theme; label: string; dot: string }[] = [
  { id: 'noir',         label: 'NOIR',          dot: '#8FA38D' },
  { id: 'contemporary', label: 'CONTEMPORÁNEO', dot: '#E63946' },
  { id: 'technicolor',  label: 'TECHNICOLOR',   dot: '#FB9C1A' },
]

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── Animation variants ───────────────────────────────────────────────────────

/*
  Cinematic aperture: scale 0.88 + blur 4px → full size, sharp.
  Origin: bottom right — el panel emerge del ícono del proyector.
  Exit faster: usuario ya decidió cerrar.
*/
const panelVariants = {
  hidden: {
    scale: 0.88,
    opacity: 0,
    filter: 'blur(4px)',
  },
  visible: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    scale: 0.88,
    opacity: 0,
    filter: 'blur(3px)',
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    },
  },
}

const bodyVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.1 },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  },
}

// ─── Toggle switch ────────────────────────────────────────────────────────────

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 32,
        height: 16,
        background: active ? 'var(--accent)' : 'var(--border-on-deep)',
        border: '0.5px solid var(--border-on-deep)',
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 220ms cubic-bezier(0.23, 1, 0.32, 1)',
        padding: 0,
      }}
      aria-pressed={active}
    >
      <motion.span
        animate={{
          x: active ? 16 : 0,
          scale: active ? 1.15 : 1,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        style={{
          position: 'absolute',
          top: 2,
          left: 2,
          width: 10,
          height: 10,
          background: active ? 'var(--bg-deep)' : 'var(--text-muted-on-deep)',
          display: 'block',
        }}
      />
    </button>
  )
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'Courier New, monospace',
      fontSize: '9px',
      letterSpacing: '0.18em',
      color: 'var(--text-muted-on-deep)',
      marginBottom: 10,
    }}>
      {children}
    </p>
  )
}

function Divider() {
  return <div style={{ height: '0.5px', background: 'var(--border-on-deep)', margin: '16px 0' }} />
}

// ─── Panel ────────────────────────────────────────────────────────────────────

export default function ProjectionPanel({ open, onClose }: Props) {
  const { theme, grain, immersive,
          setTheme, setGrain, toggleImmersive } =
    useProjectionStore()

  const headerRef  = useRef<HTMLDivElement>(null)
  const scanRef    = useRef<HTMLDivElement>(null)
  const flashRef   = useRef<HTMLDivElement>(null)
  const panelRef   = useRef<HTMLElement>(null)

  // Scan line sweep — runs once every time the panel opens
  useGSAP(() => {
    if (!open || !scanRef.current) return
    gsap.fromTo(
      scanRef.current,
      { top: '-2px', opacity: 0.9 },
      {
        top: '105%',
        opacity: 0,
        duration: 0.65,
        ease: 'power1.in',
        delay: 0.1,
      }
    )
  }, { dependencies: [open], scope: panelRef })

  // Theme change: flash overlay + header pulse
  useGSAP(() => {
    if (!headerRef.current || !flashRef.current) return

    // Header text pulse
    gsap.fromTo(
      headerRef.current,
      { opacity: 0.3 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )

    // Cinematic flash — panel briefly brightens on theme switch
    gsap.fromTo(
      flashRef.current,
      { opacity: 0.18 },
      { opacity: 0, duration: 0.55, ease: 'power2.out' }
    )
  }, { dependencies: [theme], scope: panelRef })

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .pp-theme-btn:hover {
            background: rgba(255,255,255,0.04) !important;
            color: var(--text-on-deep) !important;
          }
          .pp-close-btn:hover {
            opacity: 0.7;
          }
        }

        .pp-theme-btn {
          transition: background 180ms cubic-bezier(0.23, 1, 0.32, 1),
                      color 180ms cubic-bezier(0.23, 1, 0.32, 1),
                      border-color 180ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .pp-theme-btn:active {
          transform: scale(0.97);
          opacity: 0.75;
          transition-duration: 80ms;
        }

        .pp-close-btn {
          transition: opacity 150ms cubic-bezier(0.23, 1, 0.32, 1),
                      transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .pp-close-btn:active {
          transform: scale(0.85) rotate(90deg);
          transition-duration: 80ms;
        }

        .grain-slider {
          appearance: none; -webkit-appearance: none;
          width: 100%; height: 1px;
          background: var(--border-on-deep); outline: none; cursor: pointer;
        }
        .grain-slider::-webkit-slider-thumb {
          appearance: none; -webkit-appearance: none;
          width: 10px; height: 10px;
          background: var(--accent);
          cursor: pointer;
          transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .grain-slider::-webkit-slider-thumb:hover {
          transform: scale(1.35);
        }
        .grain-slider::-moz-range-thumb {
          width: 10px; height: 10px;
          background: var(--accent);
          border: none; cursor: pointer; border-radius: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .pp-theme-btn,
          .pp-close-btn {
            transition: none !important;
          }
          .pp-theme-btn:active,
          .pp-close-btn:active {
            transform: none !important;
          }
        }
      `}</style>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9996,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              background: 'rgba(0,0,0,0.30)',
              cursor: 'pointer',
            }}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            ref={panelRef}
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              bottom: 80,
              right: 'calc(50vw - min(150px, 45vw))',
              transformOrigin: 'bottom right',
              width: 'min(240px, 90vw)',
              maxHeight: 'calc(100dvh - 100px)',
              background: 'var(--bg-deep)',
              borderTop: '1.5px solid var(--accent)',
              borderLeft: '0.5px solid var(--border-on-deep)',
              borderRight: '0.5px solid var(--border-on-deep)',
              borderBottom: '0.5px solid var(--border-on-deep)',
              zIndex: 9997,
              display: 'flex',
              flexDirection: 'column',
              // overflow hidden so scan line + flash are clipped to panel bounds
              overflow: 'hidden',
            }}
          >
            {/*
              Scan line — GSAP sweeps it top→bottom on open.
              Pointer-events none: never interferes with interactions.
            */}
            <div
              ref={scanRef}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '-2px',
                height: '2px',
                background: 'var(--accent)',
                opacity: 0,
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />

            {/* Theme change flash overlay */}
            <div
              ref={flashRef}
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--accent)',
                opacity: 0,
                zIndex: 9,
                pointerEvents: 'none',
              }}
            />

            {/* ── Header ── */}
            <div
              ref={headerRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px 12px',
                borderBottom: '0.5px solid var(--border-on-deep)',
                flexShrink: 0,
              }}
            >
              <span style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: 'var(--text-on-deep)',
              }}>
                SALA DE PROYECCIÓN
              </span>

              {/* Close button — ✕ rotates 90° on :active */}
              <button
                onClick={onClose}
                className="pp-close-btn"
                aria-label="Cerrar sala de proyección"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted-on-deep)',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '12px',
                  lineHeight: 1,
                  padding: '2px 4px',
                  opacity: 0.6,
                }}
              >
                ✕
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <motion.div
              variants={bodyVariants}
              style={{ padding: '16px', flex: 1, overflowY: 'auto' }}
            >

              {/* TEMA */}
              <motion.div variants={sectionVariants}>
                <SectionLabel>TEMA</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {THEMES.map(({ id, label, dot }) => {
                    const isActive = theme === id
                    return (
                      <button
                        key={id}
                        onClick={() => setTheme(id)}
                        className="pp-theme-btn"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          background: 'none',
                          border: `0.5px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                          padding: '7px 8px',
                          cursor: 'pointer',
                          color: isActive ? 'var(--text-on-deep)' : 'var(--text-muted-on-deep)',
                          textAlign: 'left',
                          width: '100%',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Sliding active bar */}
                        {isActive && (
                          <motion.span
                            layoutId="pp-active-bar"
                            style={{
                              position: 'absolute',
                              left: 0, top: 0, bottom: 0,
                              width: '2px',
                              background: 'var(--accent)',
                              pointerEvents: 'none',
                            }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}

                        {/* Dot — spring bounce on select */}
                        <motion.span
                          key={`dot-${id}-${isActive ? 'on' : 'off'}`}
                          initial={{ scale: isActive ? 0.4 : 1 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                          style={{
                            width: 8,
                            height: 8,
                            background: isActive ? 'var(--accent)' : dot,
                            flexShrink: 0,
                            display: 'block',
                            transition: 'background 280ms cubic-bezier(0.23, 1, 0.32, 1)',
                          }}
                        />

                        <span style={{
                          fontFamily: 'Courier New, monospace',
                          fontSize: '10px',
                          letterSpacing: '0.12em',
                        }}>
                          {label}
                        </span>

                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                            style={{
                              marginLeft: 'auto',
                              fontFamily: 'Courier New, monospace',
                              fontSize: '9px',
                              color: 'var(--accent)',
                              letterSpacing: '0.1em',
                            }}
                          >
                            ACTIVO
                          </motion.span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </motion.div>

              <Divider />

              {/* GRANO */}
              <motion.div variants={sectionVariants}>
                {/* Grain value: AnimatePresence ticks the number up/down */}
                <SectionLabel>
                  GRANO —{' '}
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={grain}
                      initial={{ opacity: 0, y: -5, filter: 'blur(2px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 5, filter: 'blur(2px)' }}
                      transition={{ duration: 0.12, ease: EASE_OUT_EXPO }}
                      style={{ display: 'inline-block', minWidth: '2ch' }}
                    >
                      {grain}
                    </motion.span>
                  </AnimatePresence>
                </SectionLabel>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={grain}
                  onChange={(e) => setGrain(Number(e.target.value))}
                  className="grain-slider"
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 8,
                  fontFamily: 'Courier New, monospace',
                  fontSize: '9px',
                  color: 'var(--text-muted-on-deep)',
                  letterSpacing: '0.1em',
                }}>
                  <span>LIMPIO</span>
                  <span>SUCIO</span>
                </div>
              </motion.div>

              <Divider />

              {/* MODOS */}
              <motion.div variants={sectionVariants}>
                <SectionLabel>MODOS</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'INMERSIVO', desc: 'Oculta navegación', active: immersive, onToggle: toggleImmersive },
                  ].map(({ label, desc, active, onToggle }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{
                          fontFamily: 'Courier New, monospace',
                          fontSize: '10px',
                          letterSpacing: '0.12em',
                          color: active ? 'var(--text-on-deep)' : 'var(--text-muted-on-deep)',
                          marginBottom: 2,
                          transition: 'color 200ms cubic-bezier(0.23, 1, 0.32, 1)',
                        }}>
                          {label}
                        </p>
                        <p style={{
                          fontFamily: 'Courier New, monospace',
                          fontSize: '9px',
                          color: 'var(--text-muted-on-deep)',
                          letterSpacing: '0.06em',
                          opacity: 0.7,
                        }}>
                          {desc}
                        </p>
                      </div>
                      <Toggle active={active} onToggle={onToggle} />
                    </div>
                  ))}
                </div>
              </motion.div>

            </motion.div>

            {/* ── Footer ── */}
            <motion.div
              variants={sectionVariants}
              style={{
                padding: '10px 16px',
                borderTop: '0.5px solid var(--border-on-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'Courier New, monospace',
                fontSize: '9px',
                letterSpacing: '0.1em',
                flexShrink: 0,
              }}
            >
              <span style={{ color: 'var(--text-muted-on-deep)', opacity: 0.5 }}>
                MLCP · v1
              </span>
              <motion.span
                key={theme}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                style={{ color: 'var(--accent)', letterSpacing: '0.14em' }}
              >
                {theme.toUpperCase()}
              </motion.span>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
