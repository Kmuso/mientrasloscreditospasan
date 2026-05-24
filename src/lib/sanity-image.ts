import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'
import type { ImageUrlBuilder } from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function urlForImage(source: any): ImageUrlBuilder {
  return builder.image(source)
}

export type ImagePreset = 'hero' | 'card' | 'thumbnail' | 'portrait' | 'wide'

export const imagePresets: Record<ImagePreset, (source: any) => string> = {
  hero:      (s) => urlForImage(s).width(1920).height(1080).quality(85).fit('crop').auto('format').url(),
  card:      (s) => urlForImage(s).width(800).height(600).quality(85).fit('crop').auto('format').url(),
  thumbnail: (s) => urlForImage(s).width(400).height(300).quality(80).fit('crop').auto('format').url(),
  portrait:  (s) => urlForImage(s).width(600).height(900).quality(85).fit('crop').auto('format').url(),
  wide:      (s) => urlForImage(s).width(1600).height(900).quality(85).fit('crop').auto('format').url(),
}

/**
 * Devuelve la URL optimizada para cualquier fuente:
 * - Si es string (mock data / URL directa), la devuelve tal cual.
 * - Si es referencia de Sanity, aplica el preset de optimización.
 */
export function getImageUrl(source: any, preset: ImagePreset): string {
  if (!source) return ''
  if (typeof source === 'string') return source
  return imagePresets[preset](source)
}
