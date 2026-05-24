'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import HeroLogo from '@/components/HeroLogo'

export interface ArchivoItem {
  _id: string
  href: string
  title: string
  imageUrl?: string | null
  tags?: string[]
  lead?: string
  label?: string
  publishedAt: string
}

interface Props {
  items: ArchivoItem[]
}

const BG_POOL = [
  'linear-gradient(155deg,#06090f 0%,#0d1629 45%,#04060c 100%)',
  'linear-gradient(150deg,#0d0505 0%,#1a0808 50%,#0a0404 100%)',
  'linear-gradient(200deg,#080810 0%,#0e0e20 55%,#060608 100%)',
  'linear-gradient(180deg,#111 0%,#1d1d1d 100%)',
  'linear-gradient(160deg,#0c0a04 0%,#1a1404 55%,#0a0a06 100%)',
  'linear-gradient(135deg,#0a0a0a 0%,#181818 50%,#0e0c0a 100%)',
  'linear-gradient(150deg,#140a06 0%,#1e1008 45%,#0a0808 100%)',
  'linear-gradient(200deg,#0d0d0d 0%,#1a0a0a 60%,#0c0c0c 100%)',
]

const QUOTES = [
  { text: 'Una película no termina. Se suspende.', source: 'Robert Bresson' },
  { text: 'Hay cosas que se pueden ver solo cuando oscurece.', source: 'Raise the Red Lantern — 1991' },
  { text: 'Un plano dura lo que tarda en volverse verdad.', source: 'Jeanne Dielman — 1975' },
  { text: 'La luz que entra por la ventana siempre llega de otro tiempo.', source: 'Stalker — 1979' },
  { text: 'No existes hasta que alguien te mira.', source: 'Caché — 2005' },
  { text: 'El pasado no es un lugar al que puedas regresar, solo al que puedas volver a soñar.', source: 'Yi Yi — 2000' },
  { text: 'La soledad no es estar solo. Es estar con alguien que no te ve.', source: 'Certified Copy — 2010' },
  { text: 'Recordar es una forma de morir muy lentamente.', source: 'Hiroshima Mon Amour — 1959' },
  { text: 'La muerte es solo el principio del olvido.', source: 'The Wailing — 2016' },
  { text: 'Somos lo que hacemos con el tiempo que nos queda.', source: 'Werckmeister Harmonies — 2000' },
]

export default function ArchivoView({ items }: Props) {
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [quoteFade, setQuoteFade] = useState(false)
  const [timer, setTimer] = useState('00:00:00')

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteFade(true)
      setTimeout(() => {
        setQuoteIdx(i => (i + 1) % QUOTES.length)
        setQuoteFade(false)
      }, 600)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.arv-card, .arv-entries-header')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-visible', 'true')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '-20px 0px' }
    )
    targets.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    console.log('%c▓▒░ Archivo ░▒▓', 'font-size:13px;color:#C8111B;font-family:Courier New,monospace;')
    console.log('%c"Una película no termina. Se suspende."', 'font-style:italic;color:#888;font-family:Courier New,monospace;')
    console.log(`%c— ${items.length} entradas en el archivo.`, 'color:#555;font-size:11px;font-family:Courier New,monospace;')
  }, [items.length])

  useEffect(() => {
    const KEY = 'mlcp_session_start'
    if (!sessionStorage.getItem(KEY)) sessionStorage.setItem(KEY, String(Date.now()))
    const t0 = parseInt(sessionStorage.getItem(KEY)!)
    const tick = () => {
      const s = Math.floor((Date.now() - t0) / 1000)
      const h = Math.floor(s / 3600)
      const m = Math.floor((s % 3600) / 60)
      const ss = s % 60
      setTimer(
        String(h).padStart(2, '0') + ':' +
        String(m).padStart(2, '0') + ':' +
        String(ss).padStart(2, '0')
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const skipQuote = () => {
    setQuoteFade(true)
    setTimeout(() => {
      setQuoteIdx(i => (i + 1) % QUOTES.length)
      setQuoteFade(false)
    }, 300)
  }

  const featured = items[0]
  const rest = items.slice(1)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="arv-hero" style={{ position: 'relative' }}>

        <div className={`arv-hero-bg${!featured?.imageUrl ? ' arv-hero-bg--fallback' : ''}`} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {featured?.imageUrl && (
            <Image
              src={featured.imageUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center 20%',
                filter: 'brightness(0.52) grayscale(0.18)',
                transform: 'scale(1.03)',
              }}
            />
          )}
        </div>

        <div className="arv-hero-grain" />
        <div className="arv-hero-lines" />
        <div className="arv-hero-vignette" />
        <div className="arv-hero-fade" />

        <HeroLogo className="arv-hero-logo" />

        <div className="arv-hero-title-block">
          <span className="arv-hero-eyebrow">Reseñas y ensayos cinematográficos</span>
          <div className="arv-hero-title">Archivo</div>
          <div className="arv-hero-rule" />
          <div className="arv-hero-subtitle">
            Crítica · Análisis · Ensayo<br />
            {items.length} entradas publicadas
          </div>
        </div>

        {featured && (
          <Link href={featured.href} className="arv-hero-featured">
            <div className="arv-hf-title">{featured.title}</div>
            {featured.lead && (
              <div className="arv-hf-body">{featured.lead}</div>
            )}
            <div className="arv-hf-footer">
              {(featured.tags ?? []).slice(0, 2).map(t => (
                <span key={t} className="arv-hf-tag">{t}</span>
              ))}
              <span className="arv-hf-date">
                {new Date(featured.publishedAt).toLocaleDateString('es', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </Link>
        )}

      </section>

      {/* ── ENTRIES ───────────────────────────────────────────────────────── */}
      <section className="arv-entries">
        <div className="arv-entries-header">
          <span className="arv-entries-title">Comienza la Función</span>
        </div>
        <div className="arv-grid">
          {rest.length === 0 ? (
            <div className="arv-empty">
              <p className="arv-empty-text">
                {items.length === 0
                  ? 'Aún no hay entradas publicadas.'
                  : 'No hay más entradas por el momento.'}
              </p>
            </div>
          ) : (
            rest.map((item, i) => {
              const bg = BG_POOL[i % BG_POOL.length]
              const dateStr = new Date(item.publishedAt).toLocaleDateString('es', { month: 'short', year: 'numeric' })
              return (
                <Link key={item._id} href={item.href} className="arv-card">
                  <div
                    className="arv-card-photo"
                    style={item.imageUrl ? undefined : { background: bg }}
                  >
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt=""
                        fill
                        sizes="(max-width: 480px) 100vw, (max-width: 767px) 44vw, 62vw"
                        className="arv-card-img"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <div className="arv-card-grain" />
                  <div className="arv-card-panel">
                    <div>
                      <span className="arv-card-num">{String(i + 1).padStart(2, '0')}</span>
                      {(item.tags ?? []).length > 0 && (
                        <div className="arv-card-tags">
                          {(item.tags ?? []).slice(0, 2).map(t => (
                            <span key={t} className="arv-card-tag">{t}</span>
                          ))}
                        </div>
                      )}
                      <div className="arv-card-title">{item.title}</div>
                      {item.lead && (
                        <div className="arv-card-body">{item.lead}</div>
                      )}
                    </div>
                    <div className="arv-card-footer">
                      <span className="arv-card-date">{dateStr}</span>
                    </div>
                  </div>
                  <div className="arv-card-over">
                    {item.label && (
                      <span className="arv-card-author">— {item.label}</span>
                    )}
                  </div>
                  <div className="arv-corner arv-cc-tr" />
                  <div className="arv-corner arv-cc-br" />
                </Link>
              )
            })
          )}
        </div>
      </section>

      {/* ── BOTTOM BAR ────────────────────────────────────────────────────── */}
      <div className="arv-bottom">
        <div className="arv-bottom-left" onClick={skipQuote} role="button" title="Siguiente cita">
          <div className="arv-quote-wrap">
            <div className={`arv-quote-text${quoteFade ? ' arv-fade' : ''}`}>
              &ldquo;{QUOTES[quoteIdx].text}&rdquo;
            </div>
            <div className={`arv-quote-src${quoteFade ? ' arv-fade' : ''}`}>
              {QUOTES[quoteIdx].source}
            </div>
          </div>
        </div>
        <div className="arv-bottom-right">
          <div className="arv-timer">
            <div className="arv-timer-dot" />
            <span className="arv-timer-label">en sesión</span>
            <span className="arv-timer-val">{timer}</span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
