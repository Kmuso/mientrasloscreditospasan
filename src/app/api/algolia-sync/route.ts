import { NextResponse } from 'next/server'
import { algoliasearch } from 'algoliasearch'
import { getEntryList, getGuestEssayList, getAllNews } from '@/sanity/queries'

const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? 'mlcp_content'

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)

  if (searchParams.get('secret') !== process.env.SYNC_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const appId    = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const adminKey = process.env.ALGOLIA_ADMIN_KEY

  if (!appId || !adminKey) {
    return NextResponse.json({ error: 'Algolia not configured' }, { status: 503 })
  }

  const client = algoliasearch(appId, adminKey)

  const [entries, essays, news] = await Promise.all([
    getEntryList(),
    getGuestEssayList(),
    getAllNews(),
  ])

  const records = [
    ...entries.map(e => ({
      objectID:    e._id,
      title:       e.title,
      slug:        e.slug,
      section:     'archivo' as const,
      year:        new Date(e.publishedAt).getFullYear(),
      lead:        e.lead ?? '',
      publishedAt: e.publishedAt,
    })),
    ...essays.map(e => ({
      objectID:    e._id,
      title:       e.title,
      slug:        e.slug,
      section:     'intermedio' as const,
      year:        new Date(e.publishedAt).getFullYear(),
      lead:        e.author?.bio ?? '',
      publishedAt: e.publishedAt,
    })),
    ...news.map(n => ({
      objectID:    n._id,
      title:       n.title,
      slug:        n.slug,
      section:     'noticias' as const,
      year:        new Date(n.publishedAt).getFullYear(),
      lead:        n.excerpt ?? '',
      publishedAt: n.publishedAt,
    })),
  ]

  await client.saveObjects({ indexName: INDEX_NAME, objects: records })

  return NextResponse.json({ ok: true, indexed: records.length })
}
