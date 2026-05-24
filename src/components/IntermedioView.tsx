'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import HeroLogo from '@/components/HeroLogo'

export interface IntermedioItem {
  _id: string
  href: string
  title: string
  imageUrl?: string | null
  tags: string[]
  author: string
  publishedAt: string
  lead?: string
}

interface Props {
  items: IntermedioItem[]
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
  { text: 'La vida no es lo que uno vivió, sino lo que recuerda y cómo lo recuerda.', source: 'El coronel no tiene quien le escriba — 1999' },
  { text: 'Hay cosas que se pueden ver solo cuando oscurece.', source: 'Raise the Red Lantern — 1991' },
  { text: 'No existes hasta que alguien te mira.', source: 'Caché — 2005' },
  { text: 'El pasado no es un lugar al que puedas regresar, solo al que puedas volver a soñar.', source: 'Yi Yi — 2000' },
  { text: 'Somos lo que hacemos con el tiempo que nos queda.', source: 'Werckmeister Harmonies — 2000' },
  { text: 'La soledad no es estar solo. Es estar con alguien que no te ve.', source: 'Certified Copy — 2010' },
  { text: 'Un plano dura lo que tarda en volverse verdad.', source: 'Jeanne Dielman — 1975' },
  { text: 'La luz que entra por la ventana siempre llega de otro tiempo.', source: 'Stalker — 1979' },
  { text: 'Recordar es una forma de morir muy lentamente.', source: 'Hiroshima Mon Amour — 1959' },
  { text: 'La muerte es solo el principio del olvido.', source: 'The Wailing — 2016' },
]

export default function IntermedioView({ items }: Props) {
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
    const targets = document.querySelectorAll<HTMLElement>('.imd-card, .imd-entries-header')
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
    console.log('%c▓▒░ mientrasloscreditospasan ░▒▓', 'font-size:14px;color:#D91E36;font-family:Courier New,monospace;')
    console.log('%c"Un plano dura lo que tarda en volverse verdad."', 'font-style:italic;color:#888;font-family:Courier New,monospace;')
    console.log('%c— Explorador de código detectado. Bienvenido.', 'color:#555;font-size:11px;font-family:Courier New,monospace;')
  }, [])

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
      <section className="imd-hero">

        {/* Background */}
        <div className={`imd-hero-bg${!featured?.imageUrl ? ' imd-hero-bg--fallback' : ''}`} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
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

        <div className="imd-hero-grain" />
        <div className="imd-hero-lines" />
        <div className="imd-hero-vignette" />
        <div className="imd-hero-fade" />

        {/* Logo */}
        <HeroLogo className="imd-hero-logo" />

        {/* Title block */}
        <div className="imd-hero-title-block">
          <span className="imd-hero-eyebrow">Otras artes — invitados</span>
          <div className="imd-hero-title">Inter&shy;medio</div>
          <div className="imd-hero-rule" />
          <div className="imd-hero-subtitle">
            Teatro · Música · Ópera · Artes plásticas<br />
            desde la mirada de colaboradores invitados
          </div>
        </div>

        {/* Featured panel */}
        {featured && (
          <Link href={featured.href} className="imd-hero-featured">
            <div className="imd-hf-title">{featured.title}</div>
            {featured.lead && (
              <div className="imd-hf-body">{featured.lead}</div>
            )}
            <div className="imd-hf-footer">
              {featured.tags.slice(0, 2).map(t => (
                <span key={t} className="imd-hf-tag">{t}</span>
              ))}
              <span className="imd-hf-date">
                {new Date(featured.publishedAt).toLocaleDateString('es', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </Link>
        )}


      </section>

      {/* ── ENTRIES ───────────────────────────────────────────────────────── */}
      <section className="imd-entries">
        <div className="imd-entries-header">
          <span className="imd-entries-title">Comienza la Función</span>
        </div>
        <div className="imd-grid">
          {rest.length === 0 ? (
            <div className="imd-empty">
              <p className="imd-empty-text">
                {items.length === 0
                  ? 'Aún no hay ensayos publicados en esta sección.'
                  : 'No hay más ensayos publicados por el momento.'}
              </p>
            </div>
          ) : (
            rest.map((item, i) => {
              const bg = BG_POOL[i % BG_POOL.length]
              const dateStr = new Date(item.publishedAt).toLocaleDateString('es', { month: 'short', year: 'numeric' })
              return (
                <Link key={item._id} href={item.href} className="imd-card">
                  <div
                    className="imd-card-photo"
                    style={item.imageUrl ? undefined : { position: 'absolute', inset: 0, background: bg }}
                  >
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 44vw, 50vw"
                        style={{
                          objectFit: 'cover',
                          filter: 'brightness(0.58) grayscale(0.22)',
                        }}
                      />
                    )}
                  </div>
                  <div className="imd-card-grain" />
                  <div className="imd-card-panel">
                    <div>
                      <span className="imd-card-num">{String(i + 1).padStart(2, '0')}</span>
                      {item.tags.length > 0 && (
                        <div className="imd-card-tags">
                          {item.tags.slice(0, 2).map(t => (
                            <span key={t} className="imd-card-tag">{t}</span>
                          ))}
                        </div>
                      )}
                      <div className="imd-card-title">{item.title}</div>
                      {item.lead && (
                        <div className="imd-card-body">{item.lead}</div>
                      )}
                    </div>
                    <div className="imd-card-footer">
                      <span className="imd-card-date">{dateStr}</span>
                    </div>
                  </div>
                  <div className="imd-card-over">
                    <span className="imd-card-author">— {item.author}</span>
                  </div>
                  <div className="imd-corner imd-cc-tr" />
                  <div className="imd-corner imd-cc-br" />
                </Link>
              )
            })
          )}
        </div>
      </section>

      {/* ── BOTTOM BAR ────────────────────────────────────────────────────── */}
      <div className="imd-bottom">
        <div className="imd-bottom-left" onClick={skipQuote} role="button" title="Siguiente cita">
          <div className="imd-quote-wrap">
            <div className={`imd-quote-text${quoteFade ? ' imd-fade' : ''}`}>
              &ldquo;{QUOTES[quoteIdx].text}&rdquo;
            </div>
            <div className={`imd-quote-src${quoteFade ? ' imd-fade' : ''}`}>
              {QUOTES[quoteIdx].source}
            </div>
          </div>
        </div>
        <div className="imd-bottom-right">
          <div className="imd-timer">
            <div className="imd-timer-dot" />
            <span className="imd-timer-label">en sesión</span>
            <span className="imd-timer-val">{timer}</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
