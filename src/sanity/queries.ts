import { client, isSanityConfigured } from './client'
import { mockEntries, mockGuestEssays, mockNews } from '@/data/mockEntries'
import type { Entry, EntryListItem, GuestEssay, GuestEssayListItem, NewsItem } from '@/types'

// ─── Proyecciones GROQ ────────────────────────────────────────────────────────

const ENTRY_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  lead,
  publishedAt,
  "coverImage": coverImage.asset->url,
  "coverImages": coverImages[].asset->url,
  "posterImage": posterImage.asset->url,
  body,
  tags,
  readingTime,
  films[] {
    _key,
    title,
    director,
    year,
    country,
    filmDuration,
    rating,
    synopsis,
    "heroImage": heroImage.asset->url,
    "posterImage": posterImage.asset->url,
    starring,
    producers,
    images[] {
      _key,
      "image": image.asset->url,
      caption
    }
  },
  references[] {
    _key,
    label,
    source,
    url
  },
  youtubeId,
  audioUrl,
  spotifyUrl,
  appleUrl
}`

// Slim projection for list pages — skips body, media galleries, platform links.
// Payload reduction: ~95% smaller per entry vs ENTRY_PROJECTION.
// Word count derived from readingTime (stored by editors) × 200 wpm.
const ENTRY_LIST_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  lead,
  publishedAt,
  "coverImage": coverImage.asset->url,
  tags,
  readingTime,
  films[] {
    title,
    director,
    year,
    filmDuration,
    synopsis
  }
}`

// Slim projection for intermedio list — skips body and author avatar
const GUEST_ESSAY_LIST_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "coverImage": coverImage.asset->url,
  tags,
  topic,
  readingTime,
  author {
    name,
    bio
  }
}`

const GUEST_ESSAY_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  coverImage,
  body,
  author {
    name,
    bio,
    "avatar": avatar.asset->url,
    url
  },
  topic,
  tags
}`

// ─── Queries ──────────────────────────────────────────────────────────────────

export const ENTRIES_QUERY =
  `*[_type == "entry"] | order(publishedAt desc) ${ENTRY_PROJECTION}`

export const ENTRIES_LIST_QUERY =
  `*[_type == "entry"] | order(publishedAt desc) ${ENTRY_LIST_PROJECTION}`

export const ENTRY_BY_SLUG_QUERY =
  `*[_type == "entry" && slug.current == $slug][0] ${ENTRY_PROJECTION}`

export const ENTRY_SLUGS_QUERY =
  `*[_type == "entry"]{ "slug": slug.current }`

export const GUEST_ESSAYS_QUERY =
  `*[_type == "guestEssay"] | order(publishedAt desc) ${GUEST_ESSAY_PROJECTION}`

export const GUEST_ESSAYS_LIST_QUERY =
  `*[_type == "guestEssay"] | order(publishedAt desc) ${GUEST_ESSAY_LIST_PROJECTION}`

export const GUEST_ESSAY_BY_SLUG_QUERY =
  `*[_type == "guestEssay" && slug.current == $slug][0] ${GUEST_ESSAY_PROJECTION}`

// ─── Fetch helpers (server-side) ──────────────────────────────────────────────
// Cada función cae en mock si Sanity no está configurado.

export async function getAllEntries(): Promise<Entry[]> {
  if (!isSanityConfigured) return sortByDate(mockEntries)
  return client.fetch<Entry[]>(ENTRIES_QUERY, {}, { next: { revalidate: 60 } })
}

export async function getEntryList(): Promise<EntryListItem[]> {
  if (!isSanityConfigured) return sortByDate(mockEntries) as unknown as EntryListItem[]
  return client.fetch<EntryListItem[]>(ENTRIES_LIST_QUERY, {}, { next: { revalidate: 60 } })
}

export async function getEntryBySlug(slug: string): Promise<Entry | null> {
  if (!isSanityConfigured) {
    return mockEntries.find((e) => e.slug === slug) ?? null
  }
  return client.fetch<Entry | null>(
    ENTRY_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } }
  )
}

export async function getAllEntryStaticParams(): Promise<{ slug: string }[]> {
  if (!isSanityConfigured) {
    return mockEntries.map((e) => ({ slug: e.slug }))
  }
  return client.fetch<{ slug: string }[]>(ENTRY_SLUGS_QUERY)
}

export async function getSimilarEntries(slug: string, tags: string[], limit = 4): Promise<Entry[]> {
  if (!isSanityConfigured) {
    const withTags = mockEntries.filter(e => e.slug !== slug && e.tags.some(t => tags.includes(t)))
    if (withTags.length >= 2) return withTags.slice(0, limit)
    return mockEntries.filter(e => e.slug !== slug).slice(0, limit)
  }

  // Intenta encontrar por tags, si no hay suficientes, trae las más recientes
  const query = `*[_type == "entry" && slug.current != $slug] | order(publishedAt desc) {
    ...,
    "relevance": count(tags[@ in $tags])
  } | order(relevance desc, publishedAt desc) [0...$limit] ${ENTRY_PROJECTION}`

  return client.fetch<Entry[]>(query, { slug, tags, limit })
}

export async function getAllGuestEssays(): Promise<GuestEssay[]> {
  if (!isSanityConfigured) return sortByDate(mockGuestEssays)
  return client.fetch<GuestEssay[]>(GUEST_ESSAYS_QUERY, {}, { next: { revalidate: 60 } })
}

export async function getGuestEssayList(): Promise<GuestEssayListItem[]> {
  if (!isSanityConfigured) return sortByDate(mockGuestEssays) as unknown as GuestEssayListItem[]
  return client.fetch<GuestEssayListItem[]>(GUEST_ESSAYS_LIST_QUERY, {}, { next: { revalidate: 60 } })
}

export async function getGuestEssayBySlug(slug: string): Promise<GuestEssay | null> {
  if (!isSanityConfigured) {
    return mockGuestEssays.find((e) => e.slug === slug) ?? null
  }
  return client.fetch<GuestEssay | null>(
    GUEST_ESSAY_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } }
  )
}

export async function getAllGuestEssayStaticParams(): Promise<{ slug: string }[]> {
  if (!isSanityConfigured) {
    return mockGuestEssays.map((e) => ({ slug: e.slug }))
  }
  return client.fetch<{ slug: string }[]>(
    `*[_type == "guestEssay"]{ "slug": slug.current }`
  )
}

// ─── News ─────────────────────────────────────────────────────────────────────

const NEWS_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  "coverImage": coverImage.asset->url,
  featured,
  source,
  sourceUrl,
  readingTime,
  tags,
  body
}`

export const NEWS_QUERY =
  `*[_type == "newsItem"] | order(publishedAt desc) ${NEWS_PROJECTION}`

export const NEWS_BY_SLUG_QUERY =
  `*[_type == "newsItem" && slug.current == $slug][0] ${NEWS_PROJECTION}`

export async function getAllNews(): Promise<NewsItem[]> {
  if (!isSanityConfigured) return mockNews
  return client.fetch<NewsItem[]>(NEWS_QUERY, {}, { next: { revalidate: 60 } })
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  if (!isSanityConfigured) return mockNews.find((n) => n.slug === slug) ?? null
  return client.fetch<NewsItem | null>(NEWS_BY_SLUG_QUERY, { slug }, { next: { revalidate: 60 } })
}

export async function getAllNewsSlugs(): Promise<{ slug: string }[]> {
  if (!isSanityConfigured) return mockNews.map((n) => ({ slug: n.slug }))
  return client.fetch<{ slug: string }[]>(`*[_type == "newsItem"]{ "slug": slug.current }`)
}

// ─── Utilidad ─────────────────────────────────────────────────────────────────

function sortByDate<T extends { publishedAt: string }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}
