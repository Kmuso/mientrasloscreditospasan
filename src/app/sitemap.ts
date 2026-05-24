import type { MetadataRoute } from 'next'
import { getEntryList, getGuestEssayList } from '@/sanity/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mientrasloscreditospasan.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [entries, essays] = await Promise.all([
    getEntryList(),
    getGuestEssayList(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/archivo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/intermedio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const reviewRoutes: MetadataRoute.Sitemap = entries.map((entry) => ({
    url: `${BASE_URL}/review/${entry.slug}`,
    lastModified: new Date(entry.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const essayRoutes: MetadataRoute.Sitemap = essays.map((essay) => ({
    url: `${BASE_URL}/intermedio/${essay.slug}`,
    lastModified: new Date(essay.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticRoutes, ...reviewRoutes, ...essayRoutes]
}
