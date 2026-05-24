import ArchivoView from '@/components/ArchivoView'
import { getEntryList } from '@/sanity/queries'
import { getImageUrl } from '@/lib/sanity-image'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Archivo — mientrasloscreditospasan',
  description: 'Todas las reseñas y ensayos publicados.',
}

export default async function ArchivoPage() {
  const entries = await getEntryList()

  // Sort newest first
  const sorted = [...entries].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const items = sorted.map(e => ({
    _id: e._id,
    href: `/review/${e.slug}`,
    title: e.title,
    tags: e.tags ?? [],
    lead: e.lead,
    imageUrl: getImageUrl(e.coverImage, 'wide') || undefined,
    label: e.films?.[0]?.director,
    publishedAt: e.publishedAt,
  }))

  return (
    <main>
      <ArchivoView items={items} />
    </main>
  )
}
