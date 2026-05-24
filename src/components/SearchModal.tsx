'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  algoliaSearchClient,
  ALGOLIA_INDEX,
  type SearchHit,
  type SearchSection,
} from '@/lib/algolia-client'

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionTab = 'todo' | SearchSection

const SECTION_LABELS: Record<SectionTab, string> = {
  todo:       'Todo',
  archivo:    'Archivo',
  noticias:   'Noticias',
  intermedio: 'Intermedio',
}

const SECTION_TABS: SectionTab[] = ['todo', 'archivo', 'noticias', 'intermedio']

// Custom easing — confident, decisive
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ─── URL builder ─────────────────────────────────────────────────────────────

function hitUrl(hit: SearchHit): string {
  if (hit.section === 'archivo')    return `/review/${hit.slug}`
  if (hit.section === 'noticias')   return `/noticias/${hit.slug}`
  return `/intermedio/${hit.slug}`
}

// ─── Highlight renderer ───────────────────────────────────────────────────────

function Highlighted({ value }: { value?: string }) {
  if (!value) return null
  return (
    <span
      dangerouslySetInnerHTML={{ __html: value }}
      style={{ display: 'inline' }}
    />
  )
}

// ─── Result variants — film-frame stagger ─────────────────────────────────────

const resultListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
  exit: {
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
}

const resultItemVariants = {
  hidden: { opacity: 0, y: 7, filter: 'blur(2px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.32, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0, y: -4,
    transition: { duration: 0.14, ease: [0.4, 0, 1, 1] as [number,number,number,number] },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SearchModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery]           = useState('')
  const [section, setSection]       = useState<SectionTab>('todo')
  const [results, setResults]       = useState<SearchHit[]>([])
  const [loading, setLoading]       = useState(false)
  const [activeIdx, setActiveIdx]   = useState(0)
  const [inputFocused, setInputFocused] = useState(false)
  const inputRef                    = useRef<HTMLInputElement>(null)
  const listRef                     = useRef<HTMLUListElement>(null)
  const debounceRef                 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router                      = useRouter()

  // Focus + reset on open
  useEffect(() => {
    if (!open) return
    setQuery('')
    setResults([])
    setActiveIdx(0)
    const t = setTimeout(() => inputRef.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [open])

  // Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Prevent body scroll
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  // Algolia search
  const doSearch = useCallback(async (q: string, sec: SectionTab) => {
    if (!q.trim()) { setResults([]); setLoading(false); return }
    if (!algoliaSearchClient) { setLoading(false); return }

    setLoading(true)
    try {
      const filters = sec !== 'todo' ? `section:${sec}` : ''
      const res = await algoliaSearchClient.search<SearchHit>({
        requests: [{
          indexName: ALGOLIA_INDEX,
          query: q,
          hitsPerPage: 8,
          filters: filters || undefined,
          attributesToHighlight: ['title', 'lead'],
          highlightPreTag: '<mark>',
          highlightPostTag: '</mark>',
        }],
      })
      setResults((res.results[0] as any).hits ?? [])
      setActiveIdx(0)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleQueryChange = (q: string) => {
    setQuery(q)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => doSearch(q, section), 300)
  }

  const handleSectionChange = (s: SectionTab) => {
    setSection(s)
    if (query.trim()) doSearch(query, s)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => {
        const next = Math.min(i + 1, results.length - 1)
        scrollResultIntoView(next)
        return next
      })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => {
        const next = Math.max(i - 1, 0)
        scrollResultIntoView(next)
        return next
      })
    } else if (e.key === 'Enter' && results[activeIdx]) {
      navigate(results[activeIdx])
    }
  }

  const scrollResultIntoView = (idx: number) => {
    const el = listRef.current?.children[idx] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }

  const navigate = (hit: SearchHit) => {
    onClose()
    router.push(hitUrl(hit))
  }

  const isConfigured = !!algoliaSearchClient
  const isEmpty = !loading && results.length === 0 && query.trim().length > 0
  const showHint = !loading && results.length === 0 && !query.trim()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ───────────────────────────────────────────────────── */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              background: 'rgba(0,0,0,0.78)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
            aria-hidden="true"
          />

          {/* ── Modal ──────────────────────────────────────────────────────── */}
          {/*
            Cinematic focus-pull entrance: scale 0.96 + blur 4px → sharp + full size.
            Exit faster than entrance (~60%) — user already decided, respond immediately.
          */}
          <motion.div
            key="search-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Buscar contenido"
            data-search-modal=""
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.97, filter: 'blur(2px)', transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              zIndex: 10001,
              width: 'min(640px, 92vw)',
              maxHeight: 'min(560px, 85dvh)',
              background: 'var(--bg-deep)',
              border: '0.5px solid var(--border-on-deep)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* ── Input row ─────────────────────────────────────────────── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              borderBottom: '0.5px solid var(--border-on-deep)',
              gap: 12,
              flexShrink: 0,
              position: 'relative',
            }}>
              {/* Icon pulses faintly when focused */}
              <motion.div
                animate={{ opacity: inputFocused ? 1 : 0.45 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{ flexShrink: 0, display: 'flex' }}
              >
                <SearchIcon />
              </motion.div>

              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={e => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="Buscar reseñas, ensayos, noticias..."
                autoComplete="off"
                spellCheck={false}
                style={{
                  flex: 1,
                  height: 60,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-crimson), Georgia, serif',
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  color: 'var(--text-on-deep)',
                  caretColor: 'var(--accent)',
                }}
              />

              {/* Clear button — AnimatePresence so it fades in/out */}
              <AnimatePresence>
                {query && (
                  <motion.button
                    key="clear-btn"
                    initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.7, rotate: 45 }}
                    transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                    onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted-on-deep)',
                      padding: 4,
                      lineHeight: 1,
                      flexShrink: 0,
                      display: 'flex',
                    }}
                    aria-label="Limpiar búsqueda"
                  >
                    <ClearIcon />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Focus underline — wipes in from left like film leader */}
              <motion.div
                aria-hidden="true"
                animate={{
                  scaleX: inputFocused ? 1 : 0,
                  opacity: inputFocused ? 0.6 : 0,
                }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 20,
                  right: 20,
                  height: '1px',
                  background: 'var(--accent)',
                  transformOrigin: 'left center',
                }}
              />
            </div>

            {/* ── Section tabs — layoutId sliding indicator ──────────────── */}
            <div style={{
              display: 'flex',
              padding: '0 10px',
              borderBottom: '0.5px solid var(--border-on-deep)',
              flexShrink: 0,
            }}>
              {SECTION_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => handleSectionChange(tab)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Courier New, monospace',
                    fontSize: 9,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: section === tab ? 'var(--accent)' : 'var(--text-muted-on-deep)',
                    padding: '10px 10px 9px',
                    position: 'relative',
                    transition: 'color 220ms ease',
                    marginBottom: -1,
                  }}
                >
                  {SECTION_LABELS[tab]}
                  {/* Sliding indicator via layoutId — FM animates it between tabs */}
                  {section === tab && (
                    <motion.div
                      layoutId="search-tab-indicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: 'var(--accent)',
                      }}
                      transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* ── Results / states ──────────────────────────────────────── */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <AnimatePresence mode="wait">

                {/* Loading skeletons */}
                {loading && (
                  <motion.div
                    key="skeletons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ padding: '8px 0' }}
                  >
                    {[0, 1, 2].map(i => <SkeletonRow key={i} />)}
                  </motion.div>
                )}

                {/* No results */}
                {isEmpty && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      minHeight: 120,
                      fontFamily: 'var(--font-crimson), Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: '1.05rem',
                      color: 'var(--text-muted-on-deep)',
                      textAlign: 'center',
                      padding: '0 32px',
                    }}
                  >
                    Ningún resultado para «{query}»
                  </motion.div>
                )}

                {/* Hint (empty query) */}
                {showHint && (
                  <motion.div
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      minHeight: 120,
                      fontFamily: 'Courier New, monospace',
                      fontSize: 9,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted-on-deep)',
                    }}
                  >
                    {isConfigured ? 'Escribe para buscar' : 'Búsqueda no configurada aún'}
                  </motion.div>
                )}

                {/* Results list — film-frame stagger */}
                {!loading && results.length > 0 && (
                  <motion.ul
                    key={`results-${section}-${query}`}
                    ref={listRef}
                    role="listbox"
                    aria-label="Resultados de búsqueda"
                    variants={resultListVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                      margin: 0,
                      padding: '6px 0',
                      listStyle: 'none',
                      overflowY: 'auto',
                      maxHeight: '100%',
                    }}
                  >
                    {results.map((hit, i) => (
                      <motion.li
                        key={hit.objectID}
                        variants={resultItemVariants}
                        role="option"
                        aria-selected={i === activeIdx}
                        onMouseEnter={() => setActiveIdx(i)}
                        onClick={() => navigate(hit)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '11px 20px',
                          cursor: 'pointer',
                          background: i === activeIdx
                            ? 'rgba(255,255,255,0.05)'
                            : 'transparent',
                          transition: 'background 120ms ease',
                          gap: 12,
                          position: 'relative',
                        }}
                      >
                        {/* Active accent bar — slides in from left */}
                        <AnimatePresence>
                          {i === activeIdx && (
                            <motion.div
                              key="active-bar"
                              layoutId="result-active-bar"
                              initial={{ scaleY: 0, opacity: 0 }}
                              animate={{ scaleY: 1, opacity: 1 }}
                              exit={{ scaleY: 0, opacity: 0 }}
                              transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                              style={{
                                position: 'absolute',
                                left: 0,
                                top: '20%',
                                bottom: '20%',
                                width: 1,
                                background: 'var(--accent)',
                                transformOrigin: 'center',
                              }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Title + lead */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontFamily: 'var(--font-crimson), Georgia, serif',
                            fontSize: '1rem',
                            color: 'var(--text-on-deep)',
                            lineHeight: 1.3,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>
                            <Highlighted value={hit._highlightResult?.title?.value ?? hit.title} />
                          </div>
                          {hit.lead && (
                            <div style={{
                              fontFamily: 'var(--font-crimson), Georgia, serif',
                              fontStyle: 'italic',
                              fontSize: '0.8rem',
                              color: 'var(--text-muted-on-deep)',
                              lineHeight: 1.3,
                              marginTop: 2,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                              <Highlighted value={hit._highlightResult?.lead?.value ?? hit.lead} />
                            </div>
                          )}
                        </div>

                        {/* Section + year badge */}
                        <div style={{
                          fontFamily: 'Courier New, monospace',
                          fontSize: 8,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--text-muted-on-deep)',
                          flexShrink: 0,
                          textAlign: 'right',
                          lineHeight: 1.5,
                        }}>
                          <div>{SECTION_LABELS[hit.section]}</div>
                          <div style={{ opacity: 0.6 }}>{hit.year}</div>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* ── Keyboard hint bar ─────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 16,
                padding: '8px 20px',
                borderTop: '0.5px solid var(--border-on-deep)',
                flexShrink: 0,
              }}
            >
              {([
                ['↑↓', 'navegar'],
                ['↩', 'abrir'],
                ['esc', 'cerrar'],
              ] as [string, string][]).map(([key, label]) => (
                <span
                  key={key}
                  style={{
                    fontFamily: 'Courier New, monospace',
                    fontSize: 8,
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted-on-deep)',
                    opacity: 0.45,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <kbd style={{
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    background: 'rgba(255,255,255,0.07)',
                    border: '0.5px solid var(--border-on-deep)',
                    padding: '1px 4px',
                    letterSpacing: 0,
                  }}>
                    {key}
                  </kbd>
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg
      width="17" height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--text-muted-on-deep)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg
      width="14" height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '11px 20px',
      gap: 12,
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{
          height: 14,
          width: '55%',
          background: 'rgba(255,255,255,0.07)',
          animation: 'search-pulse 1.4s ease-in-out infinite',
        }} />
        <div style={{
          height: 10,
          width: '35%',
          background: 'rgba(255,255,255,0.04)',
          animation: 'search-pulse 1.4s ease-in-out 0.2s infinite',
        }} />
      </div>
      <div style={{
        height: 10,
        width: 50,
        background: 'rgba(255,255,255,0.04)',
        animation: 'search-pulse 1.4s ease-in-out 0.1s infinite',
      }} />
      <style>{`
        @keyframes search-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.08; }
        }
      `}</style>
    </div>
  )
}
