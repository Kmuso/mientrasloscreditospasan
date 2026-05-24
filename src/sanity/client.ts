import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  // CDN en producción, directo en dev para ver cambios al instante
  useCdn: process.env.NODE_ENV === 'production',
  // Token solo en server — nunca lo expones al cliente
  token: process.env.SANITY_API_TOKEN,
})

export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your-project-id'
