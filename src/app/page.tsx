import HeroCinematicTitle from '@/components/HeroCinematicTitle'
import Footer from '@/components/Footer'
import HomeSection from '@/components/HomeSection'
import HomeNewsletter from '@/components/HomeNewsletter'
import IntermedioContent from '@/components/IntermedioContent'
import { HomeBarTop, HomeBarBottom } from '@/components/HomeBars'
import { getAllEntries, getAllNews, getAllGuestEssays } from '@/sanity/queries'
import { getImageUrl } from '@/lib/sanity-image'
import Link from 'next/link'

export const revalidate = 60

export default async function Page() {
  const [entries, news, essays] = await Promise.all([
    getAllEntries(),
    getAllNews(),
    getAllGuestEssays(),
  ])

  const featuredEntry = entries[0] ?? null
  const featuredNews  = news[0]    ?? null
  const featuredEssay = essays[0]  ?? null

  const entryImgUrl = featuredEntry ? getImageUrl(featuredEntry.coverImage, 'wide') : null
  const newsImgUrl  = featuredNews
    ? (typeof featuredNews.coverImage === 'string'
        ? featuredNews.coverImage
        : getImageUrl(featuredNews.coverImage, 'wide'))
    : null

  return (
    <>
      {/* ── Capa 2: hero + secciones ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        {/* Hero — sticky dentro de la capa 2 */}
        <div data-snap style={{ position: 'sticky', top: 0, height: '100dvh' }}>
          <HeroCinematicTitle />
        </div>

      <main>
        {/* ── BARRA SUPERIOR ───────────────────────────────────────────────── */}
        <HomeBarTop />

        {/* ── 2. ARCHIVOS ──────────────────────────────────────────────────── */}
        <HomeSection
          label="Cine y Ensayo"
          title="Archivos"
          description="Crónicas del tiempo cinematográfico. Reseñas, ensayos y apuntes sobre lo que perdura en pantalla."
          imageUrl={entryImgUrl}
          linkHref="/archivo"
          linkLabel="Explorar archivo"
          priority
        />

        {/* ── 3. NOTICIAS ──────────────────────────────────────────────────── */}
        <HomeSection
          label="Actualidad"
          title="Noticias"
          description="Lo que ocurre en el cine — lo que importa en la pantalla. Noticias del mundo cinematográfico y festivales."
          imageUrl={newsImgUrl}
          linkHref="/noticias"
          linkLabel="Ver noticias"
          align="right"
        />

        {/* ── 4. INTERMEDIO ────────────────────────────────────────────────── */}
        <section data-snap style={{
          minHeight: '100dvh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg)',
          padding: '120px 0'
        }}>
          <IntermedioContent featuredEssay={featuredEssay} />
        </section>

        {/* ── 5. NEWSLETTER ────────────────────────────────────────────────── */}
        <HomeNewsletter />

        {/* ── BARRA INFERIOR ───────────────────────────────────────────────── */}
        <HomeBarBottom />

      </main>

      </div>{/* fin capa 2 */}

      {/* ── Footer — emerge desde abajo al scrollear ── */}
      <div style={{ position: 'sticky', bottom: 0, zIndex: 1 }}>
        <Footer />
      </div>

      <style>{`
        .home-bar-noise {
          --bar-bg: #000;
        }
        [data-theme="contemporary"] .home-bar-noise {
          --bar-bg: var(--accent);
        }
        [data-theme="technicolor"] .home-bar-noise {
          --bar-bg: var(--bg-deep);
        }
        .home-bar-noise::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 300px 300px;
          opacity: 0.15;
          mix-blend-mode: overlay;
        }
      `}</style>
    </>
  )
}
