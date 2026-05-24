import IntermedioView from '@/components/IntermedioView'
import { getGuestEssayList } from '@/sanity/queries'
import { getImageUrl } from '@/lib/sanity-image'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Intermedio — mientrasloscreditospasan',
  description: 'Ensayos de invitados sobre teatro, música, ópera y otras artes.',
}

export default async function IntermedioPage() {
  const essays = await getGuestEssayList()

  const items = essays.map(e => ({
    _id: e._id,
    href: `/intermedio/${e.slug}`,
    title: e.title,
    imageUrl: getImageUrl(e.coverImage, 'wide') || undefined,
    tags: [e.topic, ...(e.tags ?? [])].filter(Boolean).slice(0, 2),
    author: e.author.name,
    publishedAt: e.publishedAt,
    lead: e.author.bio || undefined,
  }))

  return (
    <main>
      <IntermedioView items={items} />
    </main>
  )
}
