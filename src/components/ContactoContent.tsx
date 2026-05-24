'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const mono  = "'Courier New', monospace"
const serif = "var(--font-crimson), Georgia, serif"

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIPOS = [
  {
    codigo: '01',
    titulo: 'CRÍTICA Y OPINIÓN',
    texto:
      'Discrepancias con nuestras lecturas, correcciones factuales, perspectivas que no habíamos contemplado. El diálogo sobre cine es parte del proyecto.',
  },
  {
    codigo: '02',
    titulo: 'COLABORACIONES — INTERMEDIO',
    texto:
      'Intermedio acepta ensayos de colaboradores externos sobre teatro, música, ópera y artes plásticas. Incluye propuesta de tema, fragmento de muestra y una breve presentación del autor.',
  },
  {
    codigo: '03',
    titulo: 'PRENSA Y DISTRIBUCIÓN',
    texto:
      'Screeners, notas de prensa, invitaciones para estrenos. Indicar película, fecha de estreno y ventana de exhibición.',
  },
  {
    codigo: '04',
    titulo: 'OTROS',
    texto:
      'Cualquier otro asunto. Respondemos a todo lo que llegue, aunque no siempre con rapidez.',
  },
]

const GUIDELINES = [
  'Los ensayos para Intermedio deben tener entre 600 y 2.000 palabras.',
  'Lengua: español. No publicamos traducciones ni textos generados por IA.',
  'El tema debe haber sido representado o exhibido en los últimos doce meses.',
  'Los autores conservan los derechos. Cedemos el derecho de primera publicación.',
  'Tiempo de respuesta habitual: entre 2 y 4 semanas.',
]

const CONTACT_EMAIL = 'sala@mientrasloscreditospasan.com'
const CONTACT_PHONE = '+51 906 786 005'
const CONTACT_PHONE_HREF = 'tel:+51906786005'

const FAQ = [
  {
    q: '¿Cómo se seleccionan las películas que se reseñan?',
    a: 'No hay un criterio único. Combinamos estrenos actuales, reediciones y clásicos que consideramos necesarios en el momento. La selección responde al criterio editorial del equipo, no a acuerdos con distribuidoras ni a algoritmos de popularidad.',
  },
  {
    q: '¿Aceptan reseñas de películas antiguas, no solo estrenos?',
    a: 'Sí, y con gusto. Algunos de nuestros textos más importantes hablan de películas de los años 40 o 60. El cine no tiene fecha de caducidad y tampoco la tienen las lecturas que se hacen sobre él.',
  },
  {
    q: '¿Puedo proponer una película para que la reseñen?',
    a: 'Puedes escribirnos con propuestas. No garantizamos cubrir todo lo que llega, pero todas las sugerencias son leídas y muchas acaban influyendo en nuestra programación editorial.',
  },
  {
    q: '¿Qué diferencia hay entre Archivo e Intermedio?',
    a: 'Archivo recoge todas las entradas de crítica cinematográfica — el cuerpo central del proyecto. Intermedio es la sección de otras artes: teatro, música, ópera, artes plásticas. Intermedio está abierto a colaboradores externos; Archivo no.',
  },
  {
    q: '¿Con qué frecuencia publican nuevas entradas?',
    a: 'Sin fecha fija. Publicamos cuando tenemos algo que vale la pena publicar. Preferimos la irregularidad honesta a la periodicidad artificial.',
  },
  {
    q: '¿Tienen política editorial sobre spoilers?',
    a: 'Sí: avisamos al inicio del texto cuando el análisis requiere revelar giros argumentales. Creemos que el valor de una crítica está en la lectura que propone, no en el secretismo sobre la trama.',
  },
  {
    q: '¿Aceptan publicidad o acuerdos de patrocinio?',
    a: 'No. El proyecto no acepta publicidad, patrocinios ni contenido pagado en ninguna forma. Eso incluye screeners con condición de cobertura positiva garantizada.',
  },
  {
    q: '¿Cómo puedo citar o reproducir sus textos?',
    a: 'Los textos son de sus autores. Para citas breves en contexto académico o periodístico, basta con atribuir correctamente. Para reproducciones más amplias, escribidnos para coordinar. No autorizamos reproducciones íntegras sin permiso.',
  },
  {
    q: '¿El sitio funciona sin JavaScript?',
    a: 'Las páginas cargan con Server Components de Next.js — el contenido es accesible sin JS. Las animaciones y transiciones requieren JavaScript para funcionar, pero nunca bloquean el acceso al texto.',
  },
  {
    q: '¿Dónde puedo seguir el proyecto en redes sociales?',
    a: 'En Instagram, X (Twitter) y YouTube. Los enlaces están en el footer de esta página. Instagram es la red donde publicamos con más frecuencia; YouTube está reservado para proyectos audiovisuales futuros.',
  },
]

// ─── Helper components ────────────────────────────────────────────────────────

function ScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    const el = ref.current
    gsap.set(el, { opacity: 0, y: 24 })
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter:    () => gsap.to(el, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay }),
      onLeaveBack: () => gsap.set(el, { opacity: 0, y: 24 }),
    })
  }, { scope: ref })

  return <div ref={ref}>{children}</div>
}

function FaqAccordion({ items }: { items: typeof FAQ }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="ct-faq-item">
          <button
            className="ct-faq-trigger"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="ct-faq-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="ct-faq-question">{item.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="ct-faq-icon"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p className="ct-faq-answer">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContactoContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { amount: 0.4, once: true })

  const revealHero: Variants = {
    hidden:  { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <main style={{ minHeight: '100dvh', paddingBottom: 'var(--space-3xl)' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: 'clamp(80px, 14vw, 160px) clamp(24px, 6vw, 60px) clamp(64px, 10vw, 120px)',
        }}
      >
        {/* Film-reel strip */}
        <motion.div
          custom={0}
          initial="hidden"
          animate={isHeroInView ? 'visible' : 'hidden'}
          variants={revealHero}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'clamp(40px, 7vw, 80px)' }}
        >
          <span style={{
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: 0.35,
          }}>
            MLCP — CORRESPONDENCIA
          </span>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
          <span style={{
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: '0.2em',
            opacity: 0.2,
          }}>
            2025
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate={isHeroInView ? 'visible' : 'hidden'}
          variants={revealHero}
          style={{
            fontFamily: serif,
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            margin: '0 0 clamp(28px, 5vw, 48px)',
            color: 'var(--text)',
          }}
        >
          Con&shy;tac&shy;to
        </motion.h1>

        {/* Divider */}
        <motion.div
          custom={2}
          initial="hidden"
          animate={isHeroInView ? 'visible' : 'hidden'}
          variants={revealHero}
          style={{ width: 40, height: '0.5px', background: 'var(--border)', marginBottom: 'clamp(24px, 4vw, 36px)' }}
        />

        {/* Intro */}
        <motion.p
          custom={3}
          initial="hidden"
          animate={isHeroInView ? 'visible' : 'hidden'}
          variants={revealHero}
          style={{
            fontFamily: serif,
            fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
            fontStyle: 'italic',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '52ch',
            margin: 0,
          }}
        >
          Escribimos sobre cine porque creemos que vale la pena escribir sobre cine.
          Si tienes algo que decir al respecto — o sobre cualquier otra cosa — aquí estamos.
        </motion.p>
      </div>

      {/* ── Email centerpiece ─────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '0 clamp(24px, 6vw, 60px)',
        marginBottom: 'clamp(72px, 12vw, 120px)',
      }}>
        <ScrollReveal>
          <div style={{
            borderTop: '0.5px solid var(--border)',
            borderBottom: '0.5px solid var(--border)',
            padding: 'clamp(32px, 6vw, 56px) 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            <span style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              opacity: 0.3,
            }}>
              DIRECCIÓN DE CORRESPONDENCIA
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="ct-email-link"
              style={{
                fontFamily: serif,
                fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
                fontWeight: 300,
                color: 'var(--text)',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                display: 'inline-block',
                transition: 'opacity 220ms ease',
                outline: 'none',
              }}
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={CONTACT_PHONE_HREF}
              className="ct-phone-link"
              style={{
                fontFamily: mono,
                fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
                letterSpacing: '0.12em',
                color: 'var(--text)',
                textDecoration: 'none',
                opacity: 0.5,
                display: 'inline-block',
                transition: 'opacity 220ms ease',
                outline: 'none',
              }}
            >
              {CONTACT_PHONE}
            </a>
            <p style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: '0.2em',
              opacity: 0.28,
              margin: 0,
              textTransform: 'uppercase',
            }}>
              Respuesta en 2–4 semanas · Todos los mensajes son leídos
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Tipos de correspondencia ──────────────────────────────────────── */}
      <div style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '0 clamp(24px, 6vw, 60px)',
        marginBottom: 'clamp(72px, 12vw, 120px)',
      }}>
        <ScrollReveal>
          <p style={{
            fontFamily: mono,
            fontSize: 9,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            opacity: 0.3,
            marginBottom: 'clamp(28px, 5vw, 40px)',
          }}>
            TIPOS DE CORRESPONDENCIA
          </p>
        </ScrollReveal>

        <div className="ct-tipos-grid">
          {TIPOS.map((tipo, i) => (
            <ScrollReveal key={tipo.codigo} delay={i * 0.07}>
              <div className="ct-tipo-item">
                <span className="ct-tipo-codigo">{tipo.codigo}</span>
                <div>
                  <p className="ct-tipo-titulo">{tipo.titulo}</p>
                  <p className="ct-tipo-texto">{tipo.texto}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ── Guías para Intermedio ─────────────────────────────────────────── */}
      <div style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '0 clamp(24px, 6vw, 60px)',
        marginBottom: 'clamp(72px, 12vw, 120px)',
      }}>
        <ScrollReveal>
          <div style={{
            background: 'var(--bg-deep)',
            padding: 'clamp(32px, 6vw, 52px)',
          }}>
            <p style={{
              fontFamily: mono,
              fontSize: 9,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--text-muted-on-deep, var(--text-muted))',
              opacity: 0.5,
              marginBottom: 24,
            }}>
              NORMAS PARA COLABORACIONES — INTERMEDIO
            </p>

            <ol style={{
              margin: 0,
              paddingLeft: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              {GUIDELINES.map((line, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 20,
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{
                    fontFamily: mono,
                    fontSize: 8,
                    letterSpacing: '0.2em',
                    color: 'var(--text-on-deep, var(--text))',
                    opacity: 0.25,
                    flexShrink: 0,
                    width: 20,
                    paddingTop: 2,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontFamily: serif,
                    fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                    lineHeight: 1.65,
                    color: 'var(--text-on-deep, var(--text))',
                    opacity: 0.75,
                  }}>
                    {line}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </div>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '0 clamp(24px, 6vw, 60px)',
        marginBottom: 'clamp(72px, 12vw, 120px)',
      }}>
        <ScrollReveal>
          <p style={{
            fontFamily: mono,
            fontSize: 9,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            opacity: 0.3,
            marginBottom: 'clamp(28px, 5vw, 40px)',
          }}>
            PREGUNTAS FRECUENTES
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <FaqAccordion items={FAQ} />
        </ScrollReveal>
      </div>

      {/* ── Cierre tipográfico ────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '0 clamp(24px, 6vw, 60px)',
      }}>
        <ScrollReveal>
          <p style={{
            fontFamily: serif,
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.7,
            opacity: 0.3,
            maxWidth: '48ch',
          }}>
            "El cine es un espejo que nos muestra lo que podríamos ser,
            no lo que somos."
          </p>
        </ScrollReveal>
      </div>

      {/* ── Styles ───────────────────────────────────────────────────────── */}
      <style jsx>{`
        :global(.ct-email-link:hover),
        :global(.ct-phone-link:hover) {
          opacity: 0.55 !important;
        }
        :global(.ct-email-link:focus-visible),
        :global(.ct-phone-link:focus-visible) {
          outline: 1px solid var(--text);
          outline-offset: 6px;
        }

        :global(.ct-tipos-grid) {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        :global(.ct-tipo-item) {
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 20px;
          padding: 24px 0;
          border-bottom: 0.5px solid var(--border);
          align-items: start;
        }
        :global(.ct-tipo-item):first-child {
          border-top: 0.5px solid var(--border);
        }

        :global(.ct-tipo-codigo) {
          font-family: ${mono};
          font-size: 9px;
          letter-spacing: 0.2em;
          opacity: 0.25;
          padding-top: 4px;
        }

        :global(.ct-tipo-titulo) {
          font-family: ${mono};
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          opacity: 0.55;
          margin: 0 0 10px;
        }

        :global(.ct-tipo-texto) {
          font-family: ${serif};
          font-size: clamp(1rem, 1.8vw, 1.1rem);
          line-height: 1.7;
          color: var(--text-muted);
          margin: 0;
        }

        @media (max-width: 600px) {
          :global(.ct-tipo-item) {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          :global(.ct-tipo-codigo) {
            display: none;
          }
        }

        /* FAQ */
        :global(.ct-faq-item) {
          border-bottom: 0.5px solid var(--border);
        }
        :global(.ct-faq-item:first-child) {
          border-top: 0.5px solid var(--border);
        }

        :global(.ct-faq-trigger) {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          display: grid;
          grid-template-columns: 36px 1fr 24px;
          gap: 20px;
          align-items: center;
          padding: 22px 0;
          text-align: left;
          color: var(--text);
          outline: none;
        }
        :global(.ct-faq-trigger:focus-visible) {
          outline: 1px solid var(--text);
          outline-offset: 4px;
        }

        :global(.ct-faq-index) {
          font-family: ${mono};
          font-size: 9px;
          letter-spacing: 0.2em;
          opacity: 0.25;
        }

        :global(.ct-faq-question) {
          font-family: ${serif};
          font-size: clamp(1rem, 1.9vw, 1.15rem);
          line-height: 1.4;
          font-weight: 400;
        }

        :global(.ct-faq-icon) {
          font-family: ${mono};
          font-size: 18px;
          line-height: 1;
          opacity: 0.4;
          display: inline-block;
          transform-origin: center;
        }

        :global(.ct-faq-answer) {
          font-family: ${serif};
          font-size: clamp(0.95rem, 1.7vw, 1.05rem);
          line-height: 1.75;
          color: var(--text-muted);
          margin: 0;
          padding: 0 0 24px 56px;
        }

        @media (max-width: 600px) {
          :global(.ct-faq-trigger) {
            grid-template-columns: 1fr 24px;
            gap: 12px;
          }
          :global(.ct-faq-index) {
            display: none;
          }
          :global(.ct-faq-answer) {
            padding-left: 0;
          }
        }
      `}</style>
    </main>
  )
}
