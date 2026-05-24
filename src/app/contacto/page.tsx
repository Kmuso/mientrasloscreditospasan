import type { Metadata } from 'next'
import ContactoContent from '@/components/ContactoContent'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contacto — mientrasloscreditospasan',
  description: 'Correspondencia, colaboraciones para Intermedio, prensa y cualquier otro asunto.',
}

export default function ContactoPage() {
  return (
    <>
      <ContactoContent />
      <Footer />
    </>
  )
}
