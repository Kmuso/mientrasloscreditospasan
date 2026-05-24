import { notFound } from 'next/navigation'
import {
  getGuestEssayBySlug,
  getAllGuestEssayStaticParams,
} from '@/sanity/queries'
import GuestEssayArticle from '@/components/GuestEssayArticle'
import { getImageUrl } from '@/lib/sanity-image'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const essay = await getGuestEssayBySlug(slug)
  if (!essay) return { title: 'Ensayo no encontrado' }

  return {
    title: `${essay.title} — mientrasloscreditospasan`,
    description: `${essay.topic} · ${essay.author.name}`,
    openGraph: {
      title: essay.title,
      description: `${essay.topic} · ${essay.author.name}`,
      images: essay.coverImage ? [{ url: getImageUrl(essay.coverImage, 'wide') }] : [],
    },
  }
}

export async function generateStaticParams() {
  return getAllGuestEssayStaticParams()
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params
  const essay = await getGuestEssayBySlug(slug)

  if (!essay) notFound()

  return <GuestEssayArticle essay={essay} />
}
