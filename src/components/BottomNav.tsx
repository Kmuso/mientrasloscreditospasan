'use client'

import { useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// ─── Route label mapping ─────────────────────────────────────────────────────

const ROUTE_LABELS: Record<string, string> = {
  '/': 'INICIO',
  '/archivo': 'ARCHIVO',
  '/intermedio': 'INTERMEDIO',
  '/backstage': 'BACKSTAGE',
  '/noticias': 'NOTICIAS',
}

function getRouteLabel(pathname: string): string {
  if (ROUTE_LABELS[pathname]) return ROUTE_LABELS[pathname]
  if (pathname.startsWith('/review/')) return 'RESEÑA'
  if (pathname.startsWith('/intermedio/')) return 'INTERMEDIO'
  return pathname.split('/').filter(Boolean).pop()?.toUpperCase() ?? 'INICIO'
}

// ─── Grid structure ──────────────────────────────────────────────────────────

type NavCell = {
  label: string
  href?: string
  action?: 'search'                    // para celdas de acción (no link)
  accent?: boolean
  external?: boolean
  icon?: string                        // ruta /public para iconos de redes sociales
  IconComponent?: React.ComponentType  // SVG inline para celdas de navegación
}

const GRID_ROWS: (NavCell | null)[][] = [
  [
    { label: 'ARCHIVO',   href: '/archivo'                                                  },
    null,
    { label: 'NOTICIAS',  href: '/noticias', accent: true                                  },
  ],
  [
    { label: 'INTERMEDIO', href: '/intermedio',           accent: true                   },
    { label: 'INSTAGRAM',  href: 'https://instagram.com', external: true,
      icon: '/icons/instagram-logo.svg'                                                   },
    null,
  ],
  [
    { label: 'BACKSTAGE',  href: '/backstage'                                             },
    { label: 'X / TWITTER', href: 'https://x.com',        external: true,
      icon: '/icons/noun-twitter-6755467.svg'                                             },
    { label: 'YOUTUBE',    href: 'https://youtube.com',   external: true,
      icon: '/icons/noun-youtube-8058258.svg'                                             },
  ],
]

// ─── Icons ───────────────────────────────────────────────────────────────────

// Periódico — icono para la celda NOTICIAS. Stroke-based (Lucide style).
function NewspaperIcon() {
  return (
    <svg
      width="18" height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  )
}

// Proyector — reemplaza el obturador. Paths del SVG en /public/icons/Projector.svg.
// Sin fill explícito → hereda currentColor del botón (var(--accent)).
function ProjectorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 1200 1200" fill="currentColor">
      <path d="m930 660v-120h-720v360h212.5l-110.83 262.15 55.246 23.375 120.73-285.53h44.879v300h60v-300h51.66l129.13 286.18 54.73-24.672-118.01-261.5h219.96v-120l180 90v-300z"/>
      <path d="m870 480c132.54 0 240-107.52 240-240 0-132.6-107.46-240-240-240s-240 107.4-240 240c0 132.48 107.46 240 240 240zm1.0547-97.738c-7.7383 23.676-33.047 36.562-56.723 28.883-23.676-7.6797-36.562-33.109-28.824-56.723 7.6211-23.617 33.047-36.562 56.605-28.883 23.664 7.6875 36.562 33.059 28.941 56.723zm144.49-36.504c-14.531 20.102-42.77 24.551-62.809 9.8984-20.16-14.594-24.613-42.719-9.9609-62.809s42.77-24.613 62.809-9.9609c20.16 14.594 24.613 42.723 9.9609 62.871zm-62.809-221.59c20.039-14.594 48.277-10.141 62.809 9.9609 14.652 20.125 10.199 48.277-9.9609 62.867-20.039 14.594-48.168 10.141-62.809-9.9609-14.648-20.039-10.199-48.191 9.9609-62.867zm-52.738 115.84c0 16.523-13.477 30-30 30-16.645 0-30-13.477-30-30 0-16.645 13.355-30 30-30 16.523 0 30 13.355 30 30zm-85.668-171.24c23.676-7.7031 48.984 5.2422 56.723 28.859 7.6211 23.699-5.2695 49.043-28.945 56.723-23.555 7.6797-48.984-5.2188-56.723-28.883-7.6172-23.629 5.2812-49.02 28.945-56.699zm-79.332 126.18c24.84 0 45 20.16 45 45.059 0 24.781-20.16 44.941-45 44.941s-45-20.16-45-44.941c0-24.898 20.16-45.059 45-45.059z"/>
      <path d="m570.02 240c0-132.6-107.46-240-240.02-240-132.54 0-240 107.4-240 240 0 132.48 107.46 240 240 240 132.56 0 240.02-107.52 240.02-240zm-94.453 105.76c-14.531 20.102-42.77 24.551-62.809 9.8984-20.125-14.594-24.613-42.719-9.9609-62.809 14.652-20.09 42.77-24.613 62.809-9.9609 20.164 14.594 24.613 42.723 9.9609 62.871zm-62.805-221.59c20.039-14.594 48.277-10.141 62.809 9.9609 14.652 20.125 10.199 48.277-9.9609 62.867-20.039 14.594-48.168 10.141-62.809-9.9609-14.652-20.039-10.164-48.191 9.9609-62.867zm-52.766 115.84c0 16.523-13.414 30-30 30s-30-13.477-30-30c0-16.645 13.414-30 30-30s30 13.355 30 30zm-165 44.941c-24.84 0-45-20.16-45-44.941 0-24.898 20.16-45.059 45-45.059s45 20.16 45 45.059c0 24.781-20.16 44.941-45 44.941zm79.391-216.18c23.617-7.7031 48.961 5.2422 56.664 28.859 7.6797 23.699-5.2422 49.043-28.883 56.723-23.617 7.6797-49.008-5.2188-56.723-28.883-7.6211-23.629 5.2422-49.02 28.941-56.699zm0 342.39c-23.699-7.6797-36.562-33.109-28.883-56.723 7.6445-23.617 33.047-36.562 56.664-28.883 23.641 7.6797 36.562 33.047 28.945 56.723-7.7656 23.664-33.109 36.551-56.727 28.883z"/>
    </svg>
  )
}

function BnSearchIcon() {
  return (
    <svg
      width="16" height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" />
      <path d="M9 21V12h6v9" />
    </svg>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]
  return (
    <div style={{ width: 13, height: 9, position: 'relative', flexShrink: 0 }}>
      <motion.span
        animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease }}
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '1.2px',
          background: 'currentColor', transformOrigin: 'center', display: 'block' }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        style={{ position: 'absolute', left: 0, top: '50%', marginTop: '-0.6px',
          width: '100%', height: '1.2px', background: 'currentColor', display: 'block' }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease }}
        style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: '1.2px',
          background: 'currentColor', transformOrigin: 'center', display: 'block' }}
      />
    </div>
  )
}

// ─── Animation variants ───────────────────────────────────────────────────────

const gridContainerVariants = {
  hidden: {},
  visible: {
    // 35ms stagger: 9 cells × 35ms = 315ms total — snappy enough, not slow
    transition: { staggerChildren: 0.035, when: 'beforeChildren' as const },
  },
  exit: {
    // Exit faster than enter (asymmetric: user dismissed, respond immediately)
    transition: { staggerChildren: 0.022, staggerDirection: -1 as const, when: 'afterChildren' as const },
  },
}

const cellVariants = {
  // Scale from 0.92, not 0 — nothing in the real world appears from nothing
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0, y: 5, scale: 0.96,
    // Exit faster: user already decided, system responds quickly
    transition: { duration: 0.14, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  },
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BottomNav({
  onToggleProjection,
  onCloseProjection,
  onOpenSearch,
}: {
  onToggleProjection?: () => void
  onCloseProjection?: () => void
  onOpenSearch?: () => void
}) {
  const [menuOpen, setMenuOpen]             = useState(false)
  const [projectorSpinning, setProjectorSpinning] = useState(false)
  const pathname    = usePathname()
  const pillRef        = useRef<HTMLDivElement>(null)
  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => { if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current) }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const routeLabel = getRouteLabel(pathname)

  useGSAP(() => {
    if (!pillRef.current) return
    gsap.to(pillRef.current, {
      borderColor: menuOpen ? 'var(--accent)' : 'var(--border-on-deep)',
      duration: menuOpen ? 0.3 : 0.2,
      ease: menuOpen ? 'power2.out' : 'power2.in',
    })
  }, { dependencies: [menuOpen], scope: pillRef })

  return (
    <>
      {/*
        CSS en lugar de onMouseEnter/Leave para hover y active states.
        Emil:
        - CSS transitions son interruptibles y corren off-thread
        - @media (hover: hover) evita falsas activaciones en touch
        - :active da feedback inmediato — la UI debe "escuchar" al usuario
        - Especificar propiedades exactas, nunca transition: all
        - easing custom da más punch que los built-in
      */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          /* Celdas de navegación: hover sutil en fondo */
          .bn-cell-link:not(.accent):hover {
            background: var(--border-on-deep);
          }
          /* Celda accent (INTERMEDIO): leve opacidad para no romper el color */
          .bn-cell-link.accent:hover {
            opacity: 0.82;
          }
          /* Botón obturador: leve oscurecimiento del fondo */
          .bn-shutter:hover {
            filter: brightness(0.85);
          }
          /* Botón MENÚ: feedback leve */
          .bn-menu:hover {
            opacity: 0.7;
          }
          /* Social icons: slight lift on cell hover */
          .bn-cell-link:hover .bn-social-icon {
            transform: scale(1.14) translateY(-2px);
          }
        }

        /* Transición base de las celdas — easing custom, propiedad exacta */
        .bn-cell-link {
          transition: background 180ms cubic-bezier(0.23, 1, 0.32, 1),
                      opacity 150ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* Active states: scale confirma que la UI escucha al usuario */
        .bn-cell-link:active {
          transform: scale(0.96);
          opacity: 0.75;
          transition-duration: 100ms;
        }

        .bn-shutter {
          transition: opacity 150ms cubic-bezier(0.23, 1, 0.32, 1),
                      transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .bn-shutter:active {
          transform: scale(0.88);
          opacity: 0.5;
          transition-duration: 80ms;
        }

        .bn-menu {
          transition: opacity 150ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .bn-menu:active {
          opacity: 0.5;
          transition-duration: 80ms;
        }

        /* Projector spin — acción principal del blog de cine */
        @keyframes bn-projector-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .bn-shutter-spinning svg {
          animation: bn-projector-spin 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Social icon lift transition */
        .bn-social-icon {
          transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* Landscape short screens: shrink cells so grid doesn't overflow */
        @media (max-height: 500px) {
          .bn-cell-link {
            font-size: 7px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bn-cell-link,
          .bn-shutter,
          .bn-menu,
          .bn-social-icon {
            transition: none !important;
          }
          .bn-cell-link:active,
          .bn-shutter:active,
          .bn-menu:active {
            transform: none !important;
          }
          .bn-shutter-spinning svg {
            animation: none !important;
          }
        }
      `}</style>

      {/* ── Blur backdrop ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="blur-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9990,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              background: 'rgba(0,0,0,0.22)',
              cursor: 'pointer',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Nav wrapper ────────────────────────────────────────────────────── */}
      {/* motion.nav handles entrance; x:'-50%' replaces transform:translateX(-50%) */}
      <motion.nav
        aria-label="Navegación principal"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          zIndex: 9999,
          width: 'min(368px, 93vw)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          x: '-50%',
        }}
      >

        {/* ── Menu grid ──────────────────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="menu-grid"
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2.5px',
                marginBottom: '2.5px',
                // Landscape: cap height so grid never overflows above viewport
                maxHeight: 'calc(100svh - 62px)',
                overflowY: 'auto',
              }}
            >
              {GRID_ROWS.map((row, rowIdx) =>
                row.map((cell, colIdx) => {
                  if (cell === null) {
                    return (
                      <div
                        key={`empty-${rowIdx}-${colIdx}`}
                        style={{
                          aspectRatio: '1',
                          pointerEvents: 'none',
                          // Tinte mínimo — da textura al grid sin distraer
                          background: 'rgba(255,255,255,0.025)',
                          border: '0.5px solid var(--border-on-deep)',
                        }}
                      />
                    )
                  }

                  // className="accent" permite targetear con CSS :not(.accent)
                  const linkClass = `bn-cell-link${cell.accent ? ' accent' : ''}`

                  return (
                    <motion.div
                      key={cell.label}
                      variants={cellVariants}
                      style={{
                        aspectRatio: '1',
                        border: '0.5px solid var(--border-on-deep)',
                        background: cell.accent ? 'var(--accent)' : 'var(--bg-deep)',
                        overflow: 'hidden',
                        // Origin-aware: cells emerge from the pill edge, not from center of nothing
                        transformOrigin: 'bottom center',
                      }}
                    >
                      {cell.action === 'search' ? (
                        <button
                          onClick={() => { setMenuOpen(false); if (onOpenSearch) onOpenSearch() }}
                          className={linkClass}
                          aria-label="Buscar"
                          style={{ ...getCellLinkStyle(false), background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 5,
                            pointerEvents: 'none',
                          }}>
                            <BnSearchIcon />
                            <span style={{ fontSize: '7px', letterSpacing: '0.16em' }}>
                              {cell.label}
                            </span>
                          </div>
                        </button>
                      ) : cell.external ? (
                        <a
                          href={cell.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMenuOpen(false)}
                          className={linkClass}
                          aria-label={cell.label}
                          style={getCellLinkStyle(!!cell.accent)}
                        >
                          {cell.icon ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={cell.icon}
                              alt={cell.label}
                              className="bn-social-icon"
                              style={{ width: 26, height: 26, filter: 'brightness(0) invert(1)', display: 'block' }}
                            />
                          ) : cell.label}
                        </a>
                      ) : (
                        <Link
                          href={cell.href!}
                          onClick={() => setMenuOpen(false)}
                          className={linkClass}
                          style={getCellLinkStyle(!!cell.accent)}
                        >
                          {cell.IconComponent ? (
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: 5,
                              pointerEvents: 'none',
                            }}>
                              <cell.IconComponent />
                              <span style={{ fontSize: '7px', letterSpacing: '0.16em' }}>
                                {cell.label}
                              </span>
                            </div>
                          ) : cell.label}
                        </Link>
                      )}
                    </motion.div>
                  )
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Píldora ─────────────────────────────────────────────────────── */}
        <div
          ref={pillRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 52,
            background: 'var(--bg-deep)',
            border: '0.5px solid var(--border-on-deep)',
            overflow: 'hidden',
          }}
        >
          {/* Sección actual — clip-path wipe al cambiar de ruta */}
          <div style={{
            flex: 1,
            paddingLeft: 13,
            fontFamily: monoFont,
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: 'var(--text-on-deep)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={routeLabel}
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                style={{ display: 'inline-block' }}
              >
                {routeLabel}
              </motion.span>
            </AnimatePresence>
          </div>

          <div style={dividerStyle} />

          {/* MENÚ + hamburger */}
          <button
            onClick={() => {
              const nextState = !menuOpen
              setMenuOpen(nextState)
              if (nextState && onCloseProjection) onCloseProjection()
            }}
            className="bn-menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '0 18px',
              height: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-on-deep)',
              fontFamily: monoFont,
              flexShrink: 0,
            }}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span style={{ letterSpacing: '0.12em', fontSize: '11px' }}>MENÚ</span>
            <HamburgerIcon open={menuOpen} />
          </button>

          <div style={dividerStyle} />

          {/* Inicio */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="bn-menu"
            aria-label="Ir al inicio"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: '100%',
              color: 'var(--text-on-deep)',
              flexShrink: 0,
            }}
          >
            <HomeIcon />
          </Link>

          <div style={dividerStyle} />

          {/* Buscar */}
          <button
            onClick={() => { setMenuOpen(false); if (onOpenSearch) onOpenSearch() }}
            className="bn-menu"
            aria-label="Buscar"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-on-deep)',
              flexShrink: 0,
            }}
          >
            <BnSearchIcon />
          </button>

          <div style={dividerStyle} />

          {/* Obturador — color: var(--accent) lo distingue como la acción cinematográfica
              principal. En noir es casi blanco (sin cambio visible), en contemporary
              es rojo, en technicolor es siena. El único punto de color intencional de la barra. */}
          <button
            onClick={() => {
              if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current)
              setProjectorSpinning(true)
              spinTimeoutRef.current = setTimeout(() => setProjectorSpinning(false), 700)
              setMenuOpen(false)
              if (onToggleProjection) onToggleProjection()
            }}
            className={`bn-shutter${projectorSpinning ? ' bn-shutter-spinning' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 49,
              height: '100%',
              background: 'var(--accent)',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--accent-icon)',
              flexShrink: 0,
            }}
            aria-label="Abrir sala de proyección"
          >
            <ProjectorIcon />
          </button>
        </div>
      </motion.nav>
    </>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const monoFont = 'Courier New, monospace'

function getCellLinkStyle(isAccent: boolean): React.CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontFamily: monoFont,
    fontSize: '9px',
    letterSpacing: '0.14em',
    // Accent cells sit on var(--accent); use var(--bg) for contrast.
    // Non-accent cells sit on var(--bg-deep); use var(--text-on-deep).
    color: isAccent ? 'var(--bg)' : 'var(--text-on-deep)',
    textDecoration: 'none',
    // Transition movida al <style> block — aquí solo el background base
    background: 'transparent',
    userSelect: 'none' as const,
  }
}

const dividerStyle: React.CSSProperties = {
  width: '0.5px',
  height: 23,
  background: 'var(--border-on-deep)',
  flexShrink: 0,
}
