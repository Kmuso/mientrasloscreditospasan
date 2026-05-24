'use client'

/**
 * Sanity Studio embebido en /studio
 * Solo accesible en desarrollo o con autenticación (configurable en sanity.config.ts)
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
