import type { Metadata } from 'next'
import { Crimson_Pro, Bebas_Neue, Anton } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import GrainOverlay from '@/components/GrainOverlay'
import ClientShell from '@/components/ClientShell'
import PageTransition from '@/components/PageTransition'
import LoadingTransition from '@/components/LoadingTransition'
import CinematicFlash from '@/components/CinematicFlash'

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// Bebas Neue: condensada, para noticias y metadatos.
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  weight: '400',
  display: 'swap',
})

// Anton: fallback local para el hero si Typekit no carga.
const anton = Anton({
  subsets: ['latin'],
  variable: '--font-anton',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mientrasloscreditospasan.com'
  ),
  title: {
    default: 'mientrasloscreditospasan',
    template: '%s — mientrasloscreditospasan',
  },
  description: 'El Cine se lee, se escucha y se ve. Crítica cinematográfica desde la butaca.',
  keywords: ['cine', 'crítica cinematográfica', 'películas', 'reseñas'],
  authors: [{ name: 'Redacción MLCP' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'mientrasloscreditospasan',
    title: 'mientrasloscreditospasan',
    description: 'El Cine se lee, se escucha y se ve. Crítica cinematográfica desde la butaca.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mlcpasan',
    creator: '@mlcpasan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" data-theme="contemporary" className={`${crimsonPro.variable} ${bebasNeue.variable} ${anton.variable} h-full`}>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-crimson), 'Georgia', serif" }}
      >
        <ThemeProvider>
          <LoadingTransition />
          <CinematicFlash />
          <GrainOverlay />
          <ClientShell />
          <PageTransition>
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
