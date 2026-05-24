import type { Metadata } from 'next'
import BackstageContent from '@/components/BackstageContent'

export const metadata: Metadata = {
  title: 'Backstage — mientrasloscreditospasan',
  description: 'Detrás de cámaras: el proyecto, las decisiones de diseño y la tecnología que lo hace funcionar.',
}

export default function BackstagePage() {
  return <BackstageContent />
}
