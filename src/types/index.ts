export type Theme = 'noir' | 'contemporary' | 'technicolor'

export interface FilmImage {
  _key: string
  image: string
  caption?: string
}

export interface FilmCard {
  _key: string
  title: string
  director: string
  year: number
  heroImage?: string      // wide image — used for cycling hero background
  posterImage?: string    // portrait poster — used in film card
  synopsis?: string
  starring?: string[]
  producers?: string[]
  rating?: string
  filmDuration?: number
  country?: string
  images?: FilmImage[]    // gallery of film stills
}

export interface Reference {
  _key: string
  label: string
  source?: string
  url?: string
}

export interface Entry {
  _id: string
  title: string
  slug: string
  lead?: string
  publishedAt: string
  coverImage: any          // string (mock) | SanityImageSource (CMS)
  coverImages?: string[]   // additional wide images — cycle as hero backgrounds
  // Legacy single-film fields (kept for backwards compat + hero metadata)
  film: string
  director: string
  year: number
  posterImage?: string
  synopsis?: string
  starring?: string[]
  producers?: string[]
  rating?: string
  filmDuration?: number
  // Multi-film support
  films?: FilmCard[]
  references?: Reference[]
  body: any                // Portable Text
  tags: string[]
  readingTime: number
  youtubeId?: string
  audioUrl?: string
  spotifyUrl?: string
  appleUrl?: string
}

export interface NewsItem {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  publishedAt: string
  coverImage: any
  body?: any
  featured?: boolean
  source?: string
  sourceUrl?: string
  readingTime?: number
  tags?: string[]
}

// Slim type for guest essay list views — omits body, author avatar
export interface GuestEssayListItem {
  _id: string
  title: string
  slug: string
  publishedAt: string
  coverImage: any
  tags: string[]
  topic: string
  readingTime?: number
  author: {
    name: string
    bio: string
  }
}

// Slim type for list views — omits body, media galleries, references, platform links
export interface EntryListItem {
  _id: string
  title: string
  slug: string
  lead?: string
  publishedAt: string
  coverImage: any
  tags: string[]
  readingTime: number
  films?: Array<{
    title: string
    director: string
    year: number
    filmDuration?: number
    synopsis?: string
  }>
}

export interface GuestEssay {
  _id: string
  title: string
  slug: string
  publishedAt: string
  coverImage: any          // string (mock) | SanityImageSource (CMS)
  body: any
  author: {
    name: string
    bio: string
    avatar: string
    url?: string
  }
  topic: string            // teatro, música, ópera, etc.
  tags: string[]
}
