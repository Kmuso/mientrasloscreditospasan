'use client'

import { memo, useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useProjectionStore } from '@/store/projectionStore'
import ReviewHero from './ReviewHero'
import PortableText from './PortableText'
import { getImageUrl } from '@/lib/sanity-image'
import type { Entry, FilmCard, Reference } from '@/types'

const mono  = "'Courier New', monospace"
const serif = "var(--font-crimson), Georgia, serif"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(s: number): string {
  const m   = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function formatDuration(min: number): string {
  return `${Math.floor(min / 60)}h ${String(min % 60).padStart(2, '0')}min`
}

function getFilms(entry: Entry): FilmCard[] {
  return entry.films || []
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconPlay() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
      <path d="M0 0 L10 6 L0 12 Z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
      <rect x="0" y="0" width="3.5" height="12" />
      <rect x="6.5" y="0" width="3.5" height="12" />
    </svg>
  )
}

function IconVolume({ muted }: { muted: boolean }) {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M1 4H4L7 1V11L4 8H1V4Z" />
      {!muted && <path d="M9 2.5C10.2 3.5 11 4.6 11 6C11 7.4 10.2 8.5 9 9.5" />}
      {!muted && <path d="M11.5 0.5C13.3 2 14 4 14 6C14 8 13.3 10 11.5 11.5" />}
    </svg>
  )
}

// ─── VideoSection ─────────────────────────────────────────────────────────────

function VideoSection({ youtubeId, staticMode }: { youtubeId: string; staticMode: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div>
      <style jsx>{`
        @media (hover: hover) and (pointer: fine) {
          .ra-video-btn:hover { 
            border-color: #FFB300 !important; 
            color: #FFB300 !important;
            background: rgba(255, 179, 0, 0.05) !important;
          }
          .ra-close-btn:hover { color: #fff !important; }
        }
        .ra-video-btn { 
          transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1), background-color 200ms ease, color 200ms ease, border-color 200ms ease; 
        }
        .ra-video-btn:active { 
          transform: scale(0.975); 
          opacity: 0.9;
        }
      `}</style>
      <button
        onClick={() => setOpen(true)}
        className="ra-video-btn"
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          fontFamily: mono, fontSize: '10px', letterSpacing: '0.14em',
          color: 'var(--text)', background: 'none',
          border: '0.5px solid var(--border)',
          padding: '12px 20px', cursor: 'pointer', height: 48,
          outline: 'none'
        }}
        aria-label="Proyectar video-ensayo"
      >
        <IconPlay />
        PROYECTAR VIDEO-ENSAYO
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="video-backdrop"
              initial={staticMode ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={staticMode ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.98)', zIndex: 999998 }}
            />
            <motion.div
              key="video-modal"
              initial={staticMode ? {} : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={staticMode ? {} : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'fixed', inset: 0, zIndex: 999999, display: 'flex', flexDirection: 'column', pointerEvents: 'auto' }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px' }}>
                <button
                  onClick={() => setOpen(false)}
                  className="ra-close-btn"
                  style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px' }}
                  aria-label="Cerrar video"
                >
                  ESC / CERRAR ✕
                </button>
              </div>
              <div
                style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 15%' }}
                onClick={() => setOpen(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                    title="Video Review"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── AudioPlayer ──────────────────────────────────────────────────────────────

function AudioPlayer({ audioUrl, staticMode }: { audioUrl: string; staticMode: boolean }) {
  const audioRef                          = useRef<HTMLAudioElement>(null)
  const [expanded,    setExpanded]        = useState(false)
  const [playing,     setPlaying]         = useState(false)
  const [currentTime, setCurrentTime]     = useState(0)
  const [duration,    setDuration]        = useState(0)
  const [volume,      setVolume]          = useState(0.8)
  const [muted,       setMuted]           = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime  = () => setCurrentTime(audio.currentTime)
    const onMeta  = () => setDuration(audio.duration)
    const onEnded = () => { setPlaying(false); setCurrentTime(0) }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (!expanded) setExpanded(true)
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play(); setPlaying(true) }
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current
    if (audio) audio.currentTime = Number(e.target.value)
  }

  function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value) / 100
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
    setMuted(v === 0)
  }

  function toggleMute() {
    const audio = audioRef.current
    if (!audio) return
    const next = !muted
    setMuted(next)
    audio.muted = next
  }

  const expandVariants = staticMode ? {} : {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit:    { height: 0, opacity: 0 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }

  return (
    <div style={{ width: '100%', maxWidth: 320 }}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <div style={{ border: '0.5px solid var(--border)', padding: '4px 16px 4px 4px', height: 48, display: 'flex', alignItems: 'center', gap: 16 }}>
        <style jsx>{`
          @media (hover: hover) and (pointer: fine) {
            .ra-play-btn:not(.playing):hover { 
              border-color: #FFB300 !important; 
              color: #FFB300 !important; 
            }
          }
          .ra-play-btn { 
            transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1), background-color 200ms ease, color 200ms ease, border-color 200ms ease; 
          }
          .ra-play-btn:active { transform: scale(0.97); }
          @keyframes ra-wave { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
        `}</style>
        <button
          onClick={togglePlay}
          className={`ra-play-btn${playing ? ' playing' : ''}`}
          style={{
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: playing ? 'var(--accent)' : 'none',
            border: '0.5px solid var(--border)', cursor: 'pointer',
            color: playing ? 'var(--bg-deep)' : 'var(--text)', flexShrink: 0,
            outline: 'none'
          }}
          aria-label={playing ? 'Pausar audiocrítica' : 'Reproducir audiocrítica'}
        >
          {playing ? <IconPause /> : <IconPlay />}
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div>
            <p style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.14em', color: playing ? 'var(--text)' : 'var(--text-muted)', transition: 'color 0.3s' }}>
              {playing ? 'REPRODUCIENDO' : 'AUDIOCRÍTICA'}
            </p>
            {duration > 0 && (
              <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: 2 }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            )}
          </div>
          {playing && (
            <div className="ra-waveform" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div {...expandVariants} style={{ overflow: 'hidden' }}>
            <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <style>{`
                  .audio-range { appearance: none; -webkit-appearance: none; height: 1px; background: var(--border); outline: none; cursor: pointer; flex: 1; }
                  .audio-range::-webkit-slider-thumb { appearance: none; -webkit-appearance: none; width: 8px; height: 8px; background: var(--text); cursor: pointer; }
                  .audio-range::-moz-range-thumb { width: 8px; height: 8px; background: var(--text); border: none; cursor: pointer; border-radius: 0; }
                  .volume-range { appearance: none; -webkit-appearance: none; height: 1px; background: var(--border); outline: none; cursor: pointer; width: 80px; }
                  .volume-range::-webkit-slider-thumb { appearance: none; -webkit-appearance: none; width: 8px; height: 8px; background: var(--text-muted); cursor: pointer; }
                  .volume-range::-moz-range-thumb { width: 8px; height: 8px; background: var(--text-muted); border: none; cursor: pointer; border-radius: 0; }
                `}</style>
                <span style={{ fontFamily: mono, fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.08em', width: 32, textAlign: 'right', flexShrink: 0 }}>
                  {formatTime(currentTime)}
                </span>
                <input type="range" className="audio-range" min={0} max={duration || 0} step={0.1} value={currentTime} onChange={seek} aria-label="Progreso de reproducción" />
                <span style={{ fontFamily: mono, fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.08em', width: 32, flexShrink: 0 }}>
                  {formatTime(duration)}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={toggleMute} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, display: 'flex', alignItems: 'center' }} aria-label={muted ? 'Activar sonido' : 'Silenciar'}>
                  <IconVolume muted={muted} />
                </button>
                <input type="range" className="volume-range" min={0} max={100} value={muted ? 0 : Math.round(volume * 100)} onChange={changeVolume} aria-label="Volumen" />
                <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                  {muted ? '0' : Math.round(volume * 100)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── MusicLinks ───────────────────────────────────────────────────────────────

function toSpotifyEmbed(url: string): string {
  return url.replace('open.spotify.com/', 'open.spotify.com/embed/')
}

function MusicLinks({ spotifyUrl, appleUrl }: { spotifyUrl?: string; appleUrl?: string }) {
  if (!spotifyUrl && !appleUrl) return null
  return (
    <div style={{ marginTop: 56, borderTop: '0.5px solid var(--border)', paddingTop: 48 }}>
      <p style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 20 }}>MÚSICA</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {spotifyUrl && (
          <iframe src={toSpotifyEmbed(spotifyUrl)} width="100%" height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy" style={{ border: 'none' }} title="Spotify" />
        )}
        {appleUrl && (
          <>
            <style>{`
              @media (hover: hover) and (pointer: fine) { .ra-apple-link:hover { color: var(--text) !important; border-color: var(--text) !important; } }
              .ra-apple-link { transition: color 180ms cubic-bezier(0.23,1,0.32,1), border-color 180ms cubic-bezier(0.23,1,0.32,1); }
              .ra-apple-link:active { opacity: 0.65; transition-duration: 80ms; }
            `}</style>
            <a href={appleUrl} target="_blank" rel="noopener noreferrer" className="ra-apple-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: mono, fontSize: '10px', letterSpacing: '0.12em', color: 'var(--text-muted)', textDecoration: 'none', border: '0.5px solid var(--border)', padding: '10px 16px', width: 'fit-content' }}>
              ESCUCHAR EN APPLE MUSIC ↗
            </a>
          </>
        )}
      </div>
    </div>
  )
}

// ─── FilmCardItem ─────────────────────────────────────────────────────────────

const FilmCardItem = memo(function FilmCardItem({ film, index }: { film: FilmCard; index: number }) {
  const duration  = film.filmDuration ? formatDuration(film.filmDuration) : null
  const posterUrl = typeof film.posterImage === 'string' ? film.posterImage : undefined

  return (
    <div className="ra-film-card">
      <div style={{ position: 'relative', aspectRatio: '2/3', background: 'var(--bg-deep)', overflow: 'hidden' }}>
        <div className="ra-poster-inner">
          {posterUrl ? (
            <Image src={posterUrl} alt={film.title} fill style={{ objectFit: 'cover' }} />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: mono, fontSize: 8, letterSpacing: '0.3em', opacity: 0.18 }}>SIN PÓSTER</span>
            </div>
          )}
        </div>
      </div>

      <div className="ra-film-card-meta">
        <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.2em', opacity: 0.22, display: 'block', marginBottom: 12 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <p style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.35, margin: '0 0 8px', color: 'var(--text)' }}>
          {film.title}
        </p>
        <p style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.06em', opacity: 0.45, margin: '0 0 4px' }}>
          dir. {film.director}
        </p>
        <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.07em', opacity: 0.32, margin: '0 0 12px' }}>
          {film.year}{film.country ? ` · ${film.country}` : ''}{duration ? ` · ${duration}` : ''}
        </p>
        {film.rating && (
          <span style={{ display: 'inline-block', border: '0.5px solid var(--border)', padding: '1px 5px', fontFamily: mono, fontSize: '8px', opacity: 0.4, marginBottom: 16 }}>
            {film.rating}
          </span>
        )}
        {film.synopsis && (
          <p style={{
            fontFamily: serif, fontStyle: 'italic',
            fontSize: 'clamp(0.9rem, 1.6vw, 1rem)', lineHeight: 1.7,
            color: 'var(--text-muted)',
            display: '-webkit-box', WebkitLineClamp: 6,
            WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
            margin: '0 0 12px',
          }}>
            {film.synopsis}
          </p>
        )}
        {film.starring && film.starring.length > 0 && (
          <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.07em', opacity: 0.3, margin: 0 }}>
            {film.starring.slice(0, 3).join(' · ')}
          </p>
        )}
      </div>
    </div>
  )
})

// ─── FilmMetadata — collapsible ───────────────────────────────────────────────

const slideVariants = {
  enter:  (dir: number) => ({ x: dir * 15, opacity: 0, filter: 'blur(2px)', scale: 0.99 }),
  center: { x: 0, opacity: 1, filter: 'blur(0px)', scale: 1 },
  exit:   (dir: number) => ({ x: dir * -15, opacity: 0, filter: 'blur(2px)', scale: 0.99 }),
}

function FilmMetadata({ films, defaultOpen }: { films: FilmCard[]; defaultOpen: boolean }) {
  const count               = films.length
  const [open, setOpen]     = useState(defaultOpen)
  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState(1)

  if (count === 0) return null

  function go(next: number) { setDir(next > active ? 1 : -1); setActive(next) }
  function prev() { go(active === 0 ? count - 1 : active - 1) }
  function next() { go(active === count - 1 ? 0 : active + 1) }

  return (
    <div style={{ paddingTop: 'var(--space-xl)', borderTop: '0.5px solid var(--border)' }}>
      {/* Toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="ra-meta-toggle"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: 'var(--space-md) 0', color: 'var(--text)', textAlign: 'left',
          outline: 'none'
        }}
        aria-expanded={open}
      >
        <span style={{ 
          fontFamily: mono, 
          fontSize: '9px', 
          letterSpacing: '0.32em', 
          textTransform: 'uppercase', 
          opacity: 0.45,
          transition: 'color 0.3s ease'
        }}>
          {count === 1 ? 'FILMOGRAFÍA ANALIZADA' : `${count} PELÍCULAS ANALIZADAS`}
        </span>
        <span style={{
          fontFamily: mono, fontSize: '9px', opacity: 0.35,
          display: 'inline-block',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          ↓
        </span>
      </button>

      {/* grid-template-rows collapse */}
      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: 'grid-template-rows 450ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div style={{ paddingBottom: 64 }}>
            {count > 1 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4, marginBottom: 32 }}>
                <button onClick={prev} className="ra-slide-btn" aria-label="Película anterior"
                  style={{ fontFamily: mono, fontSize: '11px', background: 'none', border: '0.5px solid var(--border)', color: 'var(--text-muted)', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ←
                </button>
                <button onClick={next} className="ra-slide-btn" aria-label="Película siguiente"
                  style={{ fontFamily: mono, fontSize: '11px', background: 'none', border: '0.5px solid var(--border)', color: 'var(--text-muted)', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  →
                </button>
              </div>
            )}

            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={films[active]._key}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <FilmCardItem film={films[active]} index={active} />
                </motion.div>
              </AnimatePresence>
            </div>

            {count > 1 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 28, justifyContent: 'center' }}>
                {films.map((f, i) => (
                  <button
                    key={f._key}
                    onClick={() => go(i)}
                    aria-label={`Ir a ${f.title}`}
                    style={{
                      width: i === active ? 20 : 6, height: 2,
                      background: 'var(--text)', opacity: i === active ? 0.8 : 0.22,
                      border: 'none', padding: 0, cursor: 'pointer',
                      transition: 'width 400ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ReferencesSection ────────────────────────────────────────────────────────

function ReferencesSection({ references }: { references: Reference[] }) {
  if (!references.length) return null
  return (
    <div style={{ maxWidth: '65ch', margin: '0 auto', paddingTop: 'var(--space-xl)', borderTop: '0.5px solid var(--border)' }}>
      <p style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', opacity: 0.45, margin: '0 0 var(--space-lg)' }}>
        BIBLIOGRAFÍA Y FUENTES
      </p>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {references.map((ref, i) => (
          <li key={ref._key} style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
            <span style={{ fontFamily: mono, fontSize: '8px', color: 'var(--text-muted)', opacity: 0.55, flexShrink: 0, width: 24 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <span style={{ fontFamily: serif, fontSize: '1rem', lineHeight: 1.65, color: 'var(--text)' }}>
                {ref.label}
              </span>
              {ref.source && (
                <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.1em', opacity: 0.38, display: 'block', marginTop: 3 }}>
                  {ref.source}
                </span>
              )}
              {ref.url && (
                <a href={ref.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.1em', opacity: 0.38, display: 'block', marginTop: 2, color: 'inherit', textDecoration: 'underline' }}>
                  ↗ fuente
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ─── SimilarEssays ────────────────────────────────────────────────────────────

function SimilarEssays({ entries }: { entries: Entry[] }) {
  if (!entries || entries.length === 0) return null
  
  return (
    <div style={{ paddingTop: 'var(--space-3xl)', borderTop: '1px solid var(--text)', width: '100%', marginTop: 'var(--space-2xl)' }}>
      <style jsx>{`
        .ra-similar-container:hover .ra-similar-card:not(:hover) {
          opacity: 0.4;
          filter: grayscale(1) blur(2px);
        }
        .ra-similar-card {
          transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-xl)' }}>
        <p style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.6, margin: 0 }}>
          DIÁLOGOS DESDE EL ARCHIVO
        </p>
        <span className="tabular" style={{ fontFamily: mono, fontSize: '9px', opacity: 0.3 }}>
          REC_{entries.length.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="ra-similar-container ra-similar-grid">
        {entries.map((e, i) => {
          const imgUrl = typeof e.coverImage === 'string' ? e.coverImage : getImageUrl(e.coverImage, 'wide')
          const mainFilm = e.films && e.films.length > 0 ? e.films[0] : null
          
          return (
            <Link key={e._id} href={`/review/${e.slug}`} className="ra-similar-card">
              <div style={{ position: 'relative', aspectRatio: '16/8', background: 'var(--bg-deep)', marginBottom: 'var(--space-md)', overflow: 'hidden' }}>
                {/* Sequence Number Overlay */}
                <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, fontFamily: mono, fontSize: '8px', color: '#fff', opacity: 0.8 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                
                <div className="ra-similar-img-inner" style={{ position: 'absolute', inset: 0 }}>
                  {imgUrl && <Image src={imgUrl} alt={e.title} fill style={{ objectFit: 'cover' }} />}
                </div>
                
                {/* Cinematic Border */}
                <div style={{ position: 'absolute', inset: 0, border: '0.5px solid rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
              </div>
              
              <div style={{ paddingLeft: 'var(--space-xs)' }}>
                <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.15em', color: '#FFB300', marginBottom: 8, textTransform: 'uppercase' }}>
                  {mainFilm ? `${mainFilm.title} · ${mainFilm.year}` : 'ARCHIVO'}
                </p>
                <p style={{ 
                  fontFamily: serif, 
                  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', 
                  lineHeight: 1.3, 
                  color: 'var(--text-heading)',
                  textWrap: 'balance'
                }}>
                  {e.title}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function getFirstSentence(body: any): string {
  if (!body || !Array.isArray(body)) return ''
  const firstBlock = body.find(b => b._type === 'block' && b.children)
  if (!firstBlock) return ''
  const text = firstBlock.children.map((c: any) => c.text).join('')
  const match = text.match(/.*?[.!?](?=\s|$)/)
  return match ? match[0] : text
}

// ─── Main article ─────────────────────────────────────────────────────────────

interface ReviewArticleProps {
  entry: Entry
  similarEntries?: Entry[]
}

export default function ReviewArticle({ entry, similarEntries = [] }: ReviewArticleProps) {
  const scriptMode = useProjectionStore((s) => s.scriptMode)
  const immersive  = useProjectionStore((s) => s.immersive)
  const staticMode = useProjectionStore((s) => s.staticMode)

  const bodyFont = scriptMode ? mono : serif

  const motionProps = staticMode ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 },
  }

  const articleRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ['start start', 'end end'] })
  const readProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })

  const films      = getFilms(entry)
  const references = entry.references ?? []
  const lead       = entry.lead || getFirstSentence(entry.body)

  return (
    <article ref={articleRef} style={{ 
      minHeight: '100dvh', 
      paddingBottom: 120,
      width: '100%',
      overflowX: 'hidden'
    }}>

      {/* Reading progress bar with film roll effect */}
      {!staticMode && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '6px', zIndex: 200, pointerEvents: 'none', willChange: 'transform' }}>
          <motion.div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
            background: 'var(--accent)', transformOrigin: '0% 50%',
            scaleX: readProgress,
          }} />
          {/* Film perforations look — Colorized to Amber */}
          <div style={{
            position: 'absolute', top: 0, left: '0', right: '0', height: '100%',
            backgroundImage: 'linear-gradient(to right, transparent 0px, transparent 15px, #FFB300 15px, #FFB300 18px)',
            backgroundSize: '18px 100%',
            opacity: 0.4
          }} />
        </div>
      )}

      {/* Hero */}
      {!immersive && <div style={{ width: '100%' }}><ReviewHero entry={entry} /></div>}

      {/* Content Container */}
      <motion.div
        {...motionProps}
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 var(--space-md)',
          fontFamily: bodyFont,
          boxSizing: 'border-box'
        }}
      >

        {/* ── Normal: essay threshold ────────────────────────────────── */}
        {!immersive && !scriptMode && (
          <section style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100ch',
            margin: '0 auto',
            paddingTop: 'var(--space-3xl)',
            paddingBottom: 'var(--space-2xl)',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {/* Technical Metadata Stamp */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-2xs)',
              marginBottom: 'var(--space-2xl)',
            }}>
              <p className="mono" style={{ margin: 0, fontSize: 'clamp(9px, 2vw, 10px)', color: '#FFB300', opacity: 0.8 }}>
                {new Date(entry.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              {entry.readingTime && (
                <p className="mono" style={{ margin: 0, fontSize: 'clamp(8px, 1.8vw, 9px)', color: 'var(--text-muted)', opacity: 0.6 }}>
                  DURACIÓN DE LECTURA — {entry.readingTime} MIN
                </p>
              )}
            </div>

            {/* Literary Lead Opening — with color accent line */}
            {lead && (
              <motion.blockquote 
                whileHover={{ x: [0, -1, 1, -0.5, 0], transition: { duration: 0.2, repeat: Infinity } }}
                style={{
                  margin: '0 0 var(--space-3xl)',
                  maxWidth: 'min(85ch, 90vw)',
                  padding: 'var(--space-md) 0 0',
                  border: 'none',
                  cursor: 'default',
                  position: 'relative'
                }}
              >
                {/* Accent line gradient */}
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  width: '40px', height: '1px',
                  background: 'linear-gradient(90deg, transparent, #FFB300, transparent)'
                }} />
                <p style={{
                  fontFamily: serif,
                  fontSize: 'clamp(1.4rem, 5vw, 2.5rem)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--text-heading)',
                  letterSpacing: 'var(--tracking-tight)',
                  textWrap: 'balance',
                  margin: 0,
                  position: 'relative'
                }}>
                  “{lead}”
                </p>
              </motion.blockquote>
            )}

            {/* Media Actions */}
            {(entry.youtubeId || entry.audioUrl) && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--space-md)',
                flexWrap: 'wrap',
                marginTop: 'var(--space-sm)',
                paddingTop: 'var(--space-xl)',
                borderTop: '0.5px solid var(--border)',
                width: '100%',
                maxWidth: 'min(30ch, 85vw)',
              }}>
                {entry.youtubeId && <VideoSection youtubeId={entry.youtubeId} staticMode={staticMode} />}
                {entry.audioUrl  && <AudioPlayer  audioUrl={entry.audioUrl}   staticMode={staticMode} />}
              </div>
            )}
          </section>
        )}

        {/* ── Immersive: simple header ───────────────────────────────── */}
        {immersive && (
          <div style={{
            paddingTop: 'clamp(80px, 10vw, 120px)',
            marginBottom: 56, paddingBottom: 40,
            borderBottom: '0.5px solid var(--border)',
          }}>
            <p style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: 16 }}>
              {entry.film?.toUpperCase()} · {entry.year} · DIR. {entry.director?.toUpperCase()}
            </p>
            <h1 style={{
              fontFamily: bodyFont,
              fontSize: scriptMode ? '1.4rem' : 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: scriptMode ? 700 : 300,
              lineHeight: 1.1,
              color: 'var(--text-heading)',
              letterSpacing: scriptMode ? '0.05em' : '-0.02em',
              textTransform: scriptMode ? 'uppercase' : 'none',
            }}>
              {entry.title}
            </h1>
          </div>
        )}

        {/* ── Script mode indicator ──────────────────────────────────── */}
        {scriptMode && (
          <div style={{
            paddingTop: immersive ? 0 : 'clamp(40px, 6vw, 64px)',
            marginBottom: 40, fontFamily: mono, fontSize: '8px',
            letterSpacing: '0.2em', color: 'var(--accent)',
            borderBottom: '0.5px solid var(--border)', paddingBottom: 16,
          }}>
            VISTA DE GUIÓN TÉCNICO — {entry.film?.toUpperCase()} ({entry.year})
          </div>
        )}

        {/* ── Body ──────────────────────────────────────────────────── */}
        <div className="ra-body" style={{ 
          width: '100%',
          maxWidth: scriptMode ? '70ch' : '65ch', 
          margin: '0 auto',
          paddingBottom: 'var(--space-3xl)',
          boxSizing: 'border-box'
        }}>
          <PortableText value={entry.body} scriptMode={scriptMode} />

          {/* END OF FILM marker — Colorized to Crimson */}
          <motion.div 
            initial={{ opacity: 0, scaleY: 0.98 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ 
              marginTop: 'var(--space-3xl)', 
              textAlign: 'center', 
              fontFamily: mono, 
              fontSize: '9px', 
              letterSpacing: '0.5em', 
              color: '#D32F2F',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              transformOrigin: 'top'
            }}
          >
            <div style={{ width: 0.5, height: 120, background: 'linear-gradient(to bottom, var(--border), transparent)', opacity: 0.5 }} />
            <span style={{ opacity: 0.8, fontWeight: 500 }}>FIN (END OF FILM)</span>
            <div style={{ width: 40, height: 0.5, background: '#D32F2F', opacity: 0.4 }} />
          </motion.div>
        </div>

        {/* ── Music links — within reading column ───────────────────── */}
        {!immersive && !scriptMode && (
          <div style={{ width: '100%', maxWidth: 'min(65ch, 100%)', margin: '0 auto var(--space-3xl)', boxSizing: 'border-box' }}>
            <MusicLinks spotifyUrl={entry.spotifyUrl} appleUrl={entry.appleUrl} />
          </div>
        )}

        {/* ── Film metadata — collapsible, after body ────────────────── */}
        {!immersive && !scriptMode && (
          <div style={{ width: '100%', maxWidth: 'min(65ch, 100%)', margin: '0 auto var(--space-3xl)', boxSizing: 'border-box' }}>
            <FilmMetadata films={films} defaultOpen={films.length === 1} />
          </div>
        )}

        {/* ── References ────────────────────────────────────────────── */}
        {!immersive && !scriptMode && (
          <div style={{ width: '100%', maxWidth: 'min(65ch, 100%)', margin: '0 auto var(--space-3xl)', boxSizing: 'border-box' }}>
            <ReferencesSection references={references} />
          </div>
        )}

        {/* ── Similar essays ────────────────────────────────────────── */}
        {!immersive && !scriptMode && (
          <div style={{ width: '100%', maxWidth: 'min(100ch, 100%)', margin: '0 auto', boxSizing: 'border-box' }}>
            <SimilarEssays entries={similarEntries} />
          </div>
        )}

        {/* ── Tags + date ───────────────────────────────────────────── */}
        <div style={{
          width: '100%',
          maxWidth: 'min(100ch, 100%)',
          margin: 'var(--space-3xl) auto 0',
          paddingTop: 'var(--space-xl)',
          borderTop: '0.5px solid var(--border)',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: 'var(--space-md)',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(entry.tags ?? []).map((tag) => (
              <span key={tag} className="ra-tag" style={{
                fontFamily: mono, fontSize: '8px', letterSpacing: '0.12em',
                color: 'var(--text-muted)', border: '0.5px solid var(--border)',
                padding: '3px 8px', textTransform: 'uppercase',
              }}>
                {tag}
              </span>
            ))}
          </div>
          <time
            dateTime={entry.publishedAt}
            style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.12em', color: 'var(--text-muted)' }}
          >
            {new Date(entry.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </div>

      </motion.div>

      {/* ── Styles ────────────────────────────────────────────────────── */}
      <style jsx>{`
        /* Film card */
        :global(.ra-film-card) {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: clamp(20px, 3vw, 36px);
          max-width: 640px;
          margin: 0 auto;
          align-items: start;
        }
        :global(.ra-film-card-meta) { padding-top: 4px; }

        @media (max-width: 500px) {
          :global(.ra-film-card) { grid-template-columns: 120px 1fr; gap: 16px; }
        }
        @media (max-width: 360px) {
          :global(.ra-film-card) { grid-template-columns: 1fr; }
          :global(.ra-film-card > div:first-child) { max-width: 160px; margin: 0 auto; }
        }

        /* Similar essays grid */
        :global(.ra-similar-grid) {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
          gap: 24px;
        }
        :global(.ra-similar-card) { text-decoration: none; color: inherit; display: block; }
        :global(.ra-similar-card:focus-visible) { outline: 1px solid var(--text); outline-offset: 4px; }

        /* Ken Burns — poster */
        :global(.ra-poster-inner) {
          position: absolute; inset: 0;
          transition: transform 700ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          :global(.ra-film-card:hover .ra-poster-inner) { transform: scale(1.04); }
        }

        /* Ken Burns — similar essays */
        :global(.ra-similar-img-inner) {
          position: absolute; inset: 0;
          transition: transform 700ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          :global(.ra-similar-card:hover .ra-similar-img-inner) { transform: scale(1.05); }
        }

        /* Drop cap */
        :global(.ra-body p:first-of-type::first-letter) {
          font-size: 4.2em;
          line-height: 0.82;
          float: left;
          margin-right: 0.08em;
          margin-top: 0.06em;
          font-family: var(--font-crimson), Georgia, serif;
          font-weight: 600;
          color: var(--text);
        }

        /* Film metadata toggle hover */
        @media (hover: hover) and (pointer: fine) {
          :global(.ra-meta-toggle:hover span:first-child) { opacity: 0.7 !important; }
        }
        :global(.ra-meta-toggle:active) { opacity: 0.6; }

        /* Slide nav buttons */
        @media (hover: hover) and (pointer: fine) {
          :global(.ra-slide-btn:hover) { border-color: var(--accent) !important; color: var(--accent) !important; }
        }
        :global(.ra-slide-btn) { transition: border-color 180ms ease, color 180ms ease; }
        :global(.ra-slide-btn:active) { opacity: 0.55; transition-duration: 80ms; }

        /* Tag hover */
        @media (hover: hover) and (pointer: fine) {
          :global(.ra-tag) { transition: border-color 180ms ease, color 180ms ease; cursor: default; }
          :global(.ra-tag:hover) { border-color: var(--accent) !important; color: var(--accent) !important; }
        }

        /* Waveform bars */
        :global(.ra-waveform) { display: flex; align-items: center; gap: 2px; height: 14px; }
        :global(.ra-waveform span) {
          display: inline-block; width: 2px; background: var(--accent);
          border-radius: 1px; animation: ra-wave 0.9s ease-in-out infinite;
        }
        :global(.ra-waveform span:nth-child(1)) { height: 4px;  animation-delay: 0s;    }
        :global(.ra-waveform span:nth-child(2)) { height: 10px; animation-delay: 0.12s; }
        :global(.ra-waveform span:nth-child(3)) { height: 14px; animation-delay: 0.24s; }
        :global(.ra-waveform span:nth-child(4)) { height: 10px; animation-delay: 0.36s; }
        :global(.ra-waveform span:nth-child(5)) { height: 4px;  animation-delay: 0.48s; }
      `}</style>
    </article>
  )
}
