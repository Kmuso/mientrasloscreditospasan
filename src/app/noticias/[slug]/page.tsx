import { notFound } from 'next/navigation'
import { getNewsBySlug, getAllNewsSlugs } from '@/sanity/queries'
import { getImageUrl } from '@/lib/sanity-image'
import NoticiaArticle from '@/components/NoticiaArticle'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs()
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const news = await getNewsBySlug(slug)
  if (!news) return { title: 'Noticia no encontrada' }

  return {
    title: `${news.title} — mientrasloscreditospasan`,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: news.coverImage
        ? [{ url: typeof news.coverImage === 'string' ? news.coverImage : getImageUrl(news.coverImage, 'wide') }]
        : [],
    },
  }
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params
  const news = await getNewsBySlug(slug)
  if (!news) notFound()

  return <NoticiaArticle news={news} />
}
