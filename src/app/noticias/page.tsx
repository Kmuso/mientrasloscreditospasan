import type { Metadata } from 'next'
import NoticiasContent from '@/components/NoticiasContent'
import { getAllNews } from '@/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Noticias — mientrasloscreditospasan',
  description: 'Actualidad cinematográfica: festivales, estrenos, entrevistas e industria.',
}

export default async function NoticiasPage() {
  const news = await getAllNews()
  return <NoticiasContent news={news} />
}
