import { notFound } from 'next/navigation'
import {
  getEntryBySlug,
  getAllEntryStaticParams,
  getSimilarEntries,
} from '@/sanity/queries'
import ReviewArticle from '@/components/ReviewArticle'
import Footer from '@/components/Footer'
import { getImageUrl } from '@/lib/sanity-image'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = await getEntryBySlug(slug)
  if (!entry) return { title: 'Reseña no encontrada' }

  return {
    title: `${entry.title} — mientrasloscreditospasan`,
    description: `${entry.film} (${entry.year}), dir. ${entry.director}. Lectura: ${entry.readingTime} min.`,
    openGraph: {
      title: entry.title,
      description: `${entry.film} · ${entry.director} · ${entry.year}`,
      images: entry.coverImage ? [{ url: getImageUrl(entry.coverImage, 'wide') }] : [],
    },
  }
}

export async function generateStaticParams() {
  return getAllEntryStaticParams()
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params
  const entry = await getEntryBySlug(slug)

  if (!entry) notFound()

  const similar = await getSimilarEntries(slug, entry.tags ?? [])

  return (
    <>
      <ReviewArticle entry={entry} similarEntries={similar} />
      <Footer />
    </>
  )
}
