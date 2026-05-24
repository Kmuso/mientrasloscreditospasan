'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useProjectionStore } from '@/store/projectionStore'

gsap.registerPlugin(ScrollTrigger)

const mono  = "'Courier New', monospace"
const serif = "var(--font-crimson), Georgia, serif"

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHAPTERS = [
  { number: '01', title: 'EL PROYECTO'      },
  { number: '02', title: 'SISTEMA DE COLOR' },
  { number: '03', title: 'DECISIONES'       },
  { number: '04', title: 'TIPOGRAFÍA'       },
  { number: '05', title: 'FICHA TÉCNICA'    },
]

const TEMAS = [
  {
    nombre: 'Noir',
    era: 'Cine negro clásico — 1940–1960',
    bg: '#0D0D0F',
    text: '#E1E1E6',
    accent: '#F0F0F5',
    isDark: true,
    descripcion: 'El estado natural del sitio. Escala de grises absoluta aplicada mediante filtro CSS grayscale(100%) contrast(1.05) sobre el elemento html. Toda imagen de color se convierte en blanco y negro. Alta tensión, sin concesiones cromáticas. Es la postura editorial del proyecto: el sitio existe en la oscuridad de la sala.',
    vars: [
      ['--bg',        '#0D0D0F'],
      ['--bg-deep',   '#08080A'],
      ['--text',      '#E1E1E6'],
      ['--accent',    '#F0F0F5'],
      ['--projector', '#34D399'],
    ],
  },
  {
    nombre: 'Contemporary',
    era: 'Editorial moderno — presente',
    bg: '#F8F4F0',
    text: '#1A1B20',
    accent: '#D91E36',
    isDark: false,
    descripcion: 'Fondo crema cálido, tipografía casi negra, rojo editorial como único acento cromático. Inspirado en el diseño de revistas de autor europeas. Diurno, limpio, con criterio. El rojo D91E36 es el único color que el sitio permite en este modo. Sin filtro grayscale — las imágenes conservan su color original.',
    vars: [
      ['--bg',        '#F8F4F0'],
      ['--bg-deep',   '#0D0E12'],
      ['--text',      '#1A1B20'],
      ['--accent',    '#D91E36'],
      ['--projector', '#2DC682'],
    ],
  },
  {
    nombre: 'Technicolor',
    era: 'Hollywood dorado — 1950–1965',
    bg: '#F3E5AB',
    text: '#0A0D14',
    accent: '#D32F2F',
    isDark: false,
    descripcion: 'Ámbar cálido, tinta profunda, rojo ladrillo. El proceso Technicolor trispack de los años 50 traducido a variables CSS. Nostálgico sin ser kitsch. El teal 008B8B aparece como color de proyector y en bordes específicos como referencia al proceso de color original.',
    vars: [
      ['--bg',        '#F3E5AB'],
      ['--bg-deep',   '#0A0D14'],
      ['--text',      '#0A0D14'],
      ['--accent',    '#D32F2F'],
      ['--projector', '#008B8B'],
    ],
  },
]

const DECISIONES = [
  {
    titulo: 'La pantalla como proyector',
    texto: 'El panel de Ajustes de Proyección — accesible desde el obturador en la barra inferior — fue diseñado para que el usuario sienta que está calibrando un proyector de cine antes de la función. No es un menú de configuración: es un ritual. El icono es un obturador de cámara. La palabra "ajustes" no aparece en ningún lugar de la interfaz.',
  },
  {
    titulo: 'Tipografía como tempo',
    texto: 'Crimson Pro no es solo la fuente del texto. Es el tempo del sitio. Sus proporciones serif anclan la lectura lenta, deliberada. El contraste con Courier New en los metadatos crea una tensión entre lo literario y lo técnico, como los créditos de una película. Bebas Neue aparece solo en el archivo, donde la densidad informativa lo requiere.',
  },
  {
    titulo: 'Brutalismo sin brutalidad',
    texto: 'Las cruces fotográficas en las esquinas de las tarjetas del archivo, los separadores de 0.5px, la ausencia total de box-shadow — todo apunta a un brutalismo minimalista que respeta al contenido. La profundidad se logra con tipografía y espaciado, no con efectos. El diseño encuadra, no grita.',
  },
  {
    titulo: 'Silencio como herramienta',
    texto: 'Los espacios en blanco son tan importantes como el contenido. El sistema de tokens --space-xs a --space-3xl impone generosidad: los párrafos respiran, los héroes respiran, cada entrada del archivo respira. El silencio visual obliga al ojo a descansar entre pensamientos y al texto a resonar.',
  },
  {
    titulo: 'Oscuridad como postura editorial',
    texto: 'El tema Noir no es solo estética: es una declaración. El sitio existe en la oscuridad de la sala, no en la luz de un dashboard. El filtro grayscale(100%) en el html convierte todo el sitio en escala de grises simultáneamente — portadas de películas a color conviven con films en blanco y negro al mismo valor lumínico.',
  },
  {
    titulo: 'Animación como montaje',
    texto: 'Las transiciones entre páginas usan CinematicFlash y LoadingTransition — un flash de película y un fundido a negro que imitan el corte entre escenas. Las duraciones mínimas de 0.4s y las curvas cubic-bezier(0.16, 1, 0.3, 1) hacen que nada sea snappy. El ritmo es parte del mensaje.',
  },
]

const TIPOGRAFIA = [
  {
    nombre:    'Crimson Pro',
    clase:     'Serif editorial',
    provider:  'Google Fonts via Next/font',
    variable:  '--font-crimson',
    pesos:     '300 · 400 · 600 · 700, normal e italic',
    uso:       'Cuerpo de texto, títulos, citas, subtítulos, UI de lectura',
    nota:      'El alma tipográfica del sitio. Sus itálicas son excepcionalmente elegantes — cada cursiva es una decisión deliberada. La diferencia entre peso 300 (cuerpo) y 400 (títulos) crea jerarquía sin cambiar tamaño. Georgia actúa como fallback en caso de fallo de carga.',
    muestra:   'La película empieza cuando termina.',
    esMono:    false,
  },
  {
    nombre:    'Bebas Neue',
    clase:     'Sans condensada display',
    provider:  'Google Fonts via Next/font',
    variable:  '--font-bebas',
    pesos:     '400 única',
    uso:       'Tarjetas del archivo, año de película, metadatos de ficha técnica',
    nota:      'Aparece exclusivamente en el archivo. Su condensación permite acumular texto técnico — año, director, duración — en poco espacio sin perder peso visual. Las ligaduras están desactivadas intencionalmente mediante font-variant-ligatures: none.',
    muestra:   'ARCHIVO CINEMATOGRÁFICO 2024',
    esMono:    false,
    esDisplay: true,
  },
  {
    nombre:    'Courier New',
    clase:     'Monoespaciada',
    provider:  'Sistema operativo (web-safe)',
    variable:  '— (sin variable CSS)',
    pesos:     '400',
    uso:       'Labels técnicos, metadatos, navegación micro, fichas, créditos',
    nota:      'La máquina de escribir como contrapunto al serif editorial. Crea tensión entre lo literario (Crimson) y lo mecánico (Courier). Se usa siempre en uppercase con tracking amplio. Reservada estrictamente para información factual y técnica. Esta ficha está escrita en ella.',
    muestra:   'COMENTARIOS DEL DIRECTOR — 2025',
    esMono:    true,
  },
]

const STACK = [
  { category: 'FRAMEWORK',   value: 'Next.js 16 (App Router)',    note: 'Server Components, RSC streaming, ISR revalidate 60s' },
  { category: 'LENGUAJE',    value: 'TypeScript 5',               note: 'Tipado estricto — sin any implícitos en el codebase' },
  { category: 'ESTILOS',     value: 'Tailwind CSS v4',            note: 'Variables CSS nativas para el sistema de temas, sin runtime JS' },
  { category: 'CMS',         value: 'Sanity v3',                  note: 'Headless CMS con GROQ queries, Studio embebido en /studio' },
  { category: 'ANIMACIÓN',   value: 'Framer Motion 12',           note: 'Transiciones de página, parallax de scroll, entradas de componentes' },
  { category: 'ANIMACIÓN',   value: 'GSAP 3 + ScrollTrigger',     note: 'Efectos de scroll complejos, stagger cinematográfico' },
  { category: 'ESTADO',      value: 'Zustand',                    note: 'Store global: tema activo, modo proyección, modo estático' },
  { category: 'IMÁGENES',    value: '@sanity/image-url',          note: 'Transformaciones on-demand en CDN: resize, crop, formato' },
  { category: 'FUENTES',     value: 'Google Fonts + Typekit',     note: 'Next/font para Crimson Pro, Bebas Neue, Anton — sin FOUT' },
  { category: 'DEPLOY',      value: 'Vercel',                     note: 'Edge network, preview deploys por rama, CI automático en cada push' },
  { category: 'REPOSITORIO', value: 'Git + GitHub',               note: 'Rama principal protegida, workflow limpio por feature branch' },
]

// ─── Componentes helper ───────────────────────────────────────────────────────

function ChapterPanel({ number, title }: { number: string; title: string }) {
  return (
    <div className="bs-panel">
      <span className="bs-panel-number">{number}</span>
      <span className="bs-panel-label">{title}</span>
    </div>
  )
}

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    const el = ref.current
    gsap.set(el, { opacity: 0, y: 28 })
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay }),
    })
  }, { scope: ref })

  return <div ref={ref}>{children}</div>
}

function CreditsRoll({ items }: { items: typeof STACK }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const lines = gsap.utils.toArray<HTMLElement>('.bs-credit-line', containerRef.current)

    gsap.set(lines, { opacity: 0, y: 14 })

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 72%',
      once: true,
      onEnter: () => {
        gsap.to(lines, {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.09,
        })
      },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} style={{ width: '100%', maxWidth: 640 }}>
      {items.map((item, i) => (
        <div key={i} className="bs-credit-line" style={{
          display: 'grid',
          gridTemplateColumns: '130px 1fr',
          gap: 28,
          padding: '14px 0',
          borderTop: '0.5px solid rgba(255,255,255,0.07)',
          alignItems: 'baseline',
        }}>
          <span style={{
            fontFamily: mono, fontSize: '8px', letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' as const,
          }}>
            {item.category}
          </span>
          <div>
            <span style={{ fontFamily: serif, fontSize: '1rem', color: 'rgba(255,255,255,0.82)', display: 'block', marginBottom: 3 }}>
              {item.value}
            </span>
            <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.07em', color: 'rgba(255,255,255,0.28)', display: 'block' }}>
              ↳ {item.note}
            </span>
          </div>
        </div>
      ))}
      <div className="bs-credit-line" style={{ padding: '32px 0 0', textAlign: 'center' }}>
        <span style={{ fontFamily: serif, fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.25)', display: 'block' }}>
          — Fin de la ficha técnica —
        </span>
        <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)', display: 'block', marginTop: 12 }}>
          MIENTRASLOSCREDITOSPASAN · 2025
        </span>
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function BackstageContent() {
  const staticMode = useProjectionStore((s) => s.staticMode)
  const pad = 'clamp(28px, 6vw, 80px)'

  return (
    <main style={{ background: 'var(--bg-deep)', color: 'var(--text-on-deep)', minHeight: '100dvh' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <motion.section
        initial={staticMode ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: `clamp(80px, 14vh, 160px) ${pad} clamp(56px, 10vh, 100px)`,
          borderBottom: '0.5px solid var(--border-on-deep)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Vertical rule */}
        <div style={{
          position: 'absolute', top: 0, left: `calc(${pad} + 200px)`,
          width: '0.5px', height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, var(--border-on-deep) 30%, var(--border-on-deep) 70%, transparent 100%)',
          opacity: 0.2, pointerEvents: 'none',
        }} />

        <p style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.25em', color: 'var(--text-muted-on-deep)', marginBottom: 32, textTransform: 'uppercase' }}>
          Comentarios del Director — Edición Especial
        </p>

        <h1 style={{
          fontFamily: serif, fontSize: 'clamp(4.5rem, 11vw, 10rem)',
          fontWeight: 300, lineHeight: 0.92, letterSpacing: '-0.03em',
          marginBottom: 44, color: 'var(--text-on-deep)',
        }}>
          Backstage.
        </h1>

        <p style={{
          fontFamily: serif, fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
          fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65,
          color: 'var(--text-muted-on-deep)', maxWidth: '52ch', marginBottom: 14,
        }}>
          "Todo gran film tiene dos versiones: la que el público ve,
          y la que el director vivió para hacerla posible."
        </p>
        <p style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.15em', color: 'var(--text-muted-on-deep)', opacity: 0.45 }}>
          — Mientras los Créditos Pasan, 2025
        </p>

        {/* Chapter index — bottom right */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(40px, 8vh, 80px)',
          right: pad,
          display: 'flex', flexDirection: 'column', gap: 7, alignItems: 'flex-end',
        }}>
          {CHAPTERS.map((ch) => (
            <span key={ch.number} style={{
              fontFamily: mono, fontSize: '8px', letterSpacing: '0.16em',
              color: 'var(--text-muted-on-deep)', opacity: 0.4,
            }}>
              {ch.number} — {ch.title}
            </span>
          ))}
        </div>
      </motion.section>

      {/* ── CAP 01 — EL PROYECTO ──────────────────────────────────────────────── */}
      <section className="bs-chapter" style={{ borderBottom: '0.5px solid var(--border-on-deep)' }}>
        <ChapterPanel number="01" title="El Proyecto" />
        <div className="bs-content" style={{ flex: 1, padding: `clamp(56px, 10vh, 100px) ${pad}` }}>

          <ScrollReveal>
            <h2 style={{
              fontFamily: serif, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em',
              marginBottom: 'clamp(36px, 6vw, 64px)', color: 'var(--text-on-deep)',
            }}>
              Un ensayo sobre el cine<br />que se convirtió en uno.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bs-prose-grid" style={{ marginBottom: 'clamp(40px, 7vw, 72px)' }}>
              <p style={{ fontFamily: serif, fontSize: '1.15rem', fontWeight: 300, lineHeight: 1.78, color: 'var(--text-muted-on-deep)' }}>
                <em>Mientras los créditos pasan</em> nació de una pregunta simple: ¿qué pasa en ese tiempo extraño en que los créditos ruedan y la sala no se ha vaciado aún? En esos segundos de suspensión, el cine habita en su forma más pura — sin audiencia todavía, sin comentario todavía. Este sitio existe en ese margen.
              </p>
              <p style={{ fontFamily: serif, fontSize: '1.15rem', fontWeight: 300, lineHeight: 1.78, color: 'var(--text-muted-on-deep)' }}>
                No es un blog. No es una revista. Es una butaca en el ciberespacio donde el cine se lee, se escucha y se ve. Cada reseña es un ensayo. Cada ensayo es un encuadre. El formato cambia, pero la pregunta es siempre la misma: ¿qué vimos realmente?
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="bs-prose-grid">
              <div>
                <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: 14, textTransform: 'uppercase' }}>Lo que es</p>
                <p style={{ fontFamily: serif, fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.72, color: 'var(--text-muted-on-deep)' }}>
                  Crítica cinematográfica de largo aliento. Ensayo de ideas. Intermedio con otras artes. Un espacio para lectores que se quedan cuando los demás se van.
                </p>
              </div>
              <div>
                <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.2em', color: 'var(--text-muted-on-deep)', marginBottom: 14, textTransform: 'uppercase', opacity: 0.6 }}>Lo que no es</p>
                <p style={{ fontFamily: serif, fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.72, color: 'var(--text-muted-on-deep)', opacity: 0.6 }}>
                  No es Letterboxd. No es RogerEbert.com. No tiene listas de consumo rápido, notificaciones de taquilla, ni reseñas escritas en 48 horas.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ── CAP 02 — SISTEMA DE COLOR ─────────────────────────────────────────── */}
      <section style={{ borderBottom: '0.5px solid var(--border-on-deep)' }}>

        {/* Chapter header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 24,
          padding: `clamp(28px, 5vh, 48px) ${pad}`,
          borderBottom: '0.5px solid var(--border-on-deep)',
        }}>
          <span style={{
            fontFamily: mono, fontSize: 'clamp(3.5rem, 7vw, 6rem)',
            fontWeight: 400, color: 'var(--text-on-deep)', opacity: 0.06,
            lineHeight: 1, letterSpacing: '-0.02em', flexShrink: 0,
          }}>02</span>
          <div>
            <span style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase' as const, display: 'block', marginBottom: 6 }}>Sistema de Color</span>
            <h2 style={{
              fontFamily: serif, fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
              fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em',
              color: 'var(--text-on-deep)', margin: 0,
            }}>
              Tres eras del cine. Tres paletas.
            </h2>
          </div>
        </div>

        {/* Theme strips */}
        {TEMAS.map((tema, i) => (
          <div key={tema.nombre} style={{
            background: tema.bg,
            display: 'flex', alignItems: 'stretch',
            borderBottom: i < TEMAS.length - 1 ? `0.5px solid ${tema.isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}` : 'none',
            minHeight: '55vh',
          }}>
            {/* Left: swatches + vars */}
            <div style={{
              width: 'clamp(200px, 28vw, 320px)', flexShrink: 0,
              borderRight: `0.5px solid ${tema.isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: 'clamp(32px, 5vw, 56px) clamp(20px, 3vw, 40px)',
              gap: 24,
            }}>
              {/* Swatch row */}
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { color: tema.bg, label: 'BG' },
                  { color: tema.text, label: 'TEXT' },
                  { color: tema.accent, label: 'ACCENT' },
                ].map(({ color, label }) => (
                  <div key={label}>
                    <div style={{
                      width: 40, height: 40, background: color,
                      border: `0.5px solid ${tema.isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
                      marginBottom: 6,
                    }} />
                    <span style={{ fontFamily: mono, fontSize: '7px', letterSpacing: '0.08em', color: tema.text, opacity: 0.4, display: 'block' }}>{label}</span>
                    <span style={{ fontFamily: mono, fontSize: '7px', letterSpacing: '0.04em', color: tema.text, opacity: 0.3, display: 'block' }}>{color}</span>
                  </div>
                ))}
              </div>

              {/* CSS variables */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {tema.vars.map(([varName, value]) => (
                  <div key={varName} style={{ display: 'flex', gap: 6, alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: mono, fontSize: '7px', color: tema.text, opacity: 0.3 }}>{varName}:</span>
                    <span style={{ fontFamily: mono, fontSize: '7px', color: tema.accent, opacity: tema.isDark ? 0.75 : 0.65 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: name + description */}
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 72px)',
            }}>
              <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.2em', color: tema.text, opacity: 0.4, marginBottom: 14, textTransform: 'uppercase' as const }}>
                {tema.era}
              </p>
              <h3 style={{
                fontFamily: serif, fontSize: 'clamp(2.8rem, 7vw, 6rem)',
                fontWeight: 300, lineHeight: 0.92, letterSpacing: '-0.02em',
                color: tema.text, marginBottom: 28, fontStyle: 'italic',
              }}>
                {tema.nombre}
              </h3>
              <p style={{
                fontFamily: serif, fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
                fontWeight: 300, lineHeight: 1.72, color: tema.text, opacity: 0.65, maxWidth: '52ch',
              }}>
                {tema.descripcion}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ── CAP 03 — DECISIONES DE DISEÑO ────────────────────────────────────── */}
      <section className="bs-chapter" style={{ borderBottom: '0.5px solid var(--border-on-deep)' }}>
        <ChapterPanel number="03" title="Decisiones" />
        <div className="bs-content" style={{ flex: 1, padding: `clamp(56px, 10vh, 100px) ${pad}` }}>

          <ScrollReveal>
            <h2 style={{
              fontFamily: serif, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em',
              marginBottom: 'clamp(40px, 7vw, 72px)', color: 'var(--text-on-deep)',
            }}>
              Las decisiones que no se ven.
            </h2>
          </ScrollReveal>

          {DECISIONES.map((d, i) => (
            <ScrollReveal key={i} delay={Math.min(i * 0.04, 0.2)}>
              <div className="bs-decision-row" style={{
                display: 'grid', gridTemplateColumns: '1fr 2fr',
                gap: 'clamp(20px, 5vw, 64px)',
                padding: 'clamp(28px, 4vw, 44px) 0',
                borderTop: '0.5px solid var(--border-on-deep)',
              }}>
                <div>
                  <p style={{ fontFamily: mono, fontSize: '9px', letterSpacing: '0.12em', color: 'var(--text-muted-on-deep)', marginBottom: 12, opacity: 0.45 }}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 style={{ fontFamily: serif, fontSize: 'clamp(1.1rem, 2vw, 1.55rem)', fontWeight: 300, lineHeight: 1.15, color: 'var(--text-on-deep)' }}>
                    {d.titulo}
                  </h3>
                </div>
                <p style={{ fontFamily: serif, fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', fontWeight: 300, lineHeight: 1.78, color: 'var(--text-muted-on-deep)', alignSelf: 'center' }}>
                  {d.texto}
                </p>
              </div>
            </ScrollReveal>
          ))}

        </div>
      </section>

      {/* ── CAP 04 — TIPOGRAFÍA ──────────────────────────────────────────────── */}
      <section className="bs-chapter" style={{ borderBottom: '0.5px solid var(--border-on-deep)' }}>
        <ChapterPanel number="04" title="Tipografía" />
        <div className="bs-content" style={{ flex: 1, padding: `clamp(56px, 10vh, 100px) ${pad}` }}>

          <ScrollReveal>
            <h2 style={{
              fontFamily: serif, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em',
              marginBottom: 'clamp(40px, 7vw, 72px)', color: 'var(--text-on-deep)',
            }}>
              Tres fuentes. Un sistema.
            </h2>
          </ScrollReveal>

          {TIPOGRAFIA.map((tf, i) => (
            <ScrollReveal key={i} delay={i * 0.07}>
              <div style={{ padding: 'clamp(32px, 5vw, 56px) 0', borderTop: '0.5px solid var(--border-on-deep)' }}>

                {/* Muestra tipográfica */}
                <p style={{
                  fontFamily: tf.esMono ? mono : serif,
                  fontSize: tf.esMono
                    ? 'clamp(0.85rem, 1.5vw, 1.1rem)'
                    : tf.esDisplay
                      ? 'clamp(2rem, 5vw, 4rem)'
                      : 'clamp(1.8rem, 4vw, 3.2rem)',
                  fontWeight: 300,
                  fontStyle: tf.esMono || tf.esDisplay ? 'normal' : 'italic',
                  color: 'var(--text-on-deep)',
                  lineHeight: 1.15,
                  margin: '0 0 28px',
                  letterSpacing: tf.esMono ? '0.22em' : tf.esDisplay ? '0.04em' : '-0.01em',
                  opacity: 0.9,
                }}>
                  {tf.muestra}
                </p>

                {/* Metadata */}
                <div className="bs-typo-grid">
                  <div>
                    <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.16em', color: 'var(--accent)', marginBottom: 10, textTransform: 'uppercase' }}>{tf.nombre}</p>
                    <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.1em', color: 'var(--text-muted-on-deep)', marginBottom: 5 }}>{tf.clase}</p>
                    <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.08em', color: 'var(--text-muted-on-deep)', opacity: 0.5, marginBottom: 5 }}>{tf.provider}</p>
                    <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.08em', color: 'var(--text-muted-on-deep)', opacity: 0.35, marginBottom: 5 }}>{tf.variable}</p>
                    <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.06em', color: 'var(--text-muted-on-deep)', opacity: 0.3 }}>{tf.pesos}</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.1em', color: 'var(--text-muted-on-deep)', marginBottom: 12, opacity: 0.6, textTransform: 'uppercase' as const }}>
                      Uso: {tf.uso}
                    </p>
                    <p style={{ fontFamily: serif, fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--text-muted-on-deep)' }}>
                      {tf.nota}
                    </p>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}

        </div>
      </section>

      {/* ── CAP 05 — FICHA TÉCNICA (CRÉDITOS) ────────────────────────────────── */}
      <section style={{
        minHeight: '100dvh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `clamp(80px, 12vh, 120px) ${pad}`,
      }}>
        <div style={{ marginBottom: 'clamp(48px, 8vh, 80px)', textAlign: 'center' }}>
          <p style={{ fontFamily: mono, fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', marginBottom: 14 }}>
            05 — FICHA TÉCNICA
          </p>
          <h2 style={{
            fontFamily: serif, fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 300, letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.82)', fontStyle: 'italic', margin: 0,
          }}>
            El equipo detrás del equipo.
          </h2>
        </div>

        <CreditsRoll items={STACK} />
      </section>

      {/* ── STYLES ─────────────────────────────────────────────────────────────── */}
      <style jsx>{`

        /* ── Chapter layout: panel + content ── */
        :global(.bs-chapter) {
          display: flex;
        }

        :global(.bs-panel) {
          width: 200px;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 clamp(16px, 2vw, 28px);
          border-right: 0.5px solid var(--border-on-deep);
        }

        :global(.bs-panel-number) {
          font-family: 'Courier New', monospace;
          font-size: clamp(5rem, 10vw, 8rem);
          font-weight: 400;
          color: var(--text-on-deep);
          opacity: 0.055;
          line-height: 1;
          display: block;
          letter-spacing: -0.02em;
        }

        :global(.bs-panel-label) {
          font-family: 'Courier New', monospace;
          font-size: 8px;
          letter-spacing: 0.22em;
          color: var(--accent);
          text-transform: uppercase;
          margin-top: 10px;
          display: block;
        }

        /* ── Prose grids ── */
        .bs-prose-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 5vw, 56px);
        }

        .bs-typo-grid {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: clamp(16px, 4vw, 48px);
          align-items: start;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          :global(.bs-chapter) {
            flex-direction: column !important;
          }
          :global(.bs-panel) {
            width: 100% !important;
            height: auto !important;
            position: relative !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 16px !important;
            padding: 18px clamp(20px, 5vw, 40px) !important;
            border-right: none !important;
            border-bottom: 0.5px solid var(--border-on-deep) !important;
          }
          :global(.bs-panel-number) {
            font-size: 3.5rem !important;
            opacity: 0.1 !important;
          }
          .bs-content {
            padding-left: clamp(20px, 5vw, 40px) !important;
            padding-right: clamp(20px, 5vw, 40px) !important;
          }
          .bs-prose-grid {
            grid-template-columns: 1fr !important;
          }
          .bs-decision-row {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          .bs-typo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </main>
  )
}
