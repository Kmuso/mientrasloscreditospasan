import { liteClient } from 'algoliasearch/lite'

export const ALGOLIA_INDEX = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? 'mlcp_content'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ''
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? ''

export const algoliaSearchClient =
  appId && searchKey ? liteClient(appId, searchKey) : null

export type SearchSection = 'archivo' | 'noticias' | 'intermedio'

export type SearchHit = {
  objectID: string
  title: string
  slug: string
  section: SearchSection
  year: number
  lead: string
  _highlightResult?: {
    title?: { value: string }
    lead?: { value: string }
  }
}
