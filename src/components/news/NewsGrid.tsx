'use client'

import { motion } from 'framer-motion'
import type { NewsItem } from '@/types'
import { useProjectionStore } from '@/store/projectionStore'
import NewsCard from './NewsCard'
import DateDisplay from './DateDisplay'

interface NewsGridProps {
  items: NewsItem[]
}

/*
  Layout editorial 3 columnas — inspirado en diseño Swiss/Bauhaus:

  [item 0: img 2×2] [item 1: text 1×2]
  [date deco 1×1]   [item 2: img 1×1] [item 3: img 1×1]
  [item 4: text 2×1]                  [item 5: img 1×1]

  Los spans son explícitos — sin grid-auto-flow para control total.

  animate skill:
  - whileInView stagger: 50ms entre celdas, viewport margin -80px
  - Entrada desde opacity:0 + y:24
  - Easing expo-out

  Responsive: 3 cols → 2 cols (≤1024px) → 1 col (≤640px)
*/

const CELL_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

const CONTAINER_VARIANTS = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

// ─── Fixed grid layout for up to 6 items + 2 decorative cells ────────────────
//
// Each slot: { type, col, row, variant? }
// type: 'news-0' .. 'news-5' | 'deco-date' | 'deco-cross'

type SlotType = `news-${number}` | 'deco-date' | 'deco-cross'

interface Slot {
  type: SlotType
  col: string   // CSS grid-column value
  row: string   // CSS grid-row value
  variant?: 'image' | 'text'
}

const SLOTS: Slot[] = [
  { type: 'news-0',     col: '1 / 3', row: '1 / 3', variant: 'image' },
  { type: 'news-1',     col: '3 / 4', row: '1 / 3', variant: 'text'  },
  { type: 'deco-date',  col: '1 / 2', row: '3 / 4'                   },
  { type: 'news-2',     col: '2 / 3', row: '3 / 4', variant: 'image' },
  { type: 'news-3',     col: '3 / 4', row: '3 / 4', variant: 'image' },
  { type: 'news-4',     col: '1 / 3', row: '4 / 5', variant: 'text'  },
  { type: 'deco-cross', col: '3 / 4', row: '4 / 5'                   },
  { type: 'news-5',     col: '1 / 2', row: '5 / 6', variant: 'image' },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function NewsGrid({ items }: NewsGridProps) {
  const staticMode = useProjectionStore((s) => s.staticMode)

  // Grab the latest date for the decorative cell
  const decoDate = items[2]?.publishedAt ?? items[0]?.publishedAt ?? new Date().toISOString()

  return (
    <>
      <style>{`
        .ng-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 2vw, 24px);
        }
        @media (max-width: 1024px) {
          .ng-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          /* On tablet reset all explicit placement — let it auto-flow */
          .ng-grid > * {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
        @media (max-width: 640px) {
          .ng-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section style={{ padding: 'clamp(48px, 6vw, 96px) clamp(20px, 5vw, 64px)' }}>
        <motion.div
          className="ng-grid"
          variants={CONTAINER_VARIANTS}
          initial={staticMode ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SLOTS.map((slot) => {
            const cellStyle: React.CSSProperties = {
              gridColumn: slot.col,
              gridRow: slot.row,
              minHeight: 'clamp(180px, 22vw, 320px)',
            }

            // ── Decorative cells ──────────────────────────────────────────
            if (slot.type === 'deco-date') {
              return (
                <motion.div key="deco-date" variants={CELL_VARIANTS} style={cellStyle}>
                  <DateDisplay dateStr={decoDate} />
                </motion.div>
              )
            }

            if (slot.type === 'deco-cross') {
              return (
                <motion.div
                  key="deco-cross"
                  variants={CELL_VARIANTS}
                  style={{
                    ...cellStyle,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '0.5px solid var(--border)',
                  }}
                >
                  <span style={{
                    fontFamily: 'Courier New, monospace',
                    fontSize: '2.5rem',
                    color: 'var(--border)',
                    userSelect: 'none',
                    lineHeight: 1,
                  }}>
                    +
                  </span>
                </motion.div>
              )
            }

            // ── News cells ────────────────────────────────────────────────
            const idx = parseInt(slot.type.replace('news-', ''), 10)
            const news = items[idx]

            if (!news) {
              // Empty placeholder if fewer items than slots
              return (
                <motion.div
                  key={slot.type}
                  variants={CELL_VARIANTS}
                  style={{
                    ...cellStyle,
                    background: 'rgba(255,255,255,0.02)',
                    border: '0.5px solid var(--border)',
                  }}
                />
              )
            }

            return (
              <motion.div key={news._id} variants={CELL_VARIANTS} style={cellStyle}>
                <NewsCard
                  news={news}
                  variant={slot.variant ?? 'image'}
                  style={{ height: '100%' }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </section>
    </>
  )
}
