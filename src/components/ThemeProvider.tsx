'use client'

import { useEffect, useRef } from 'react'
import { useProjectionStore } from '@/store/projectionStore'

function applyTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme)
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useProjectionStore((s) => s.theme)
  const mounted = useRef(false)

  // Primera hidratación: leer localStorage antes del primer render del store
  // para evitar flash al cargar la página
  useEffect(() => {
    if (!mounted.current) {
      try {
        const raw = localStorage.getItem('mlcp-projection')
        if (raw) {
          const parsed = JSON.parse(raw)
          const savedTheme = parsed?.state?.theme
          if (savedTheme) applyTheme(savedTheme)
        }
      } catch {
        // localStorage no disponible o JSON inválido — ignorar
      }
      mounted.current = true
    }
  }, [])

  // Sincronizar cada vez que el store cambie el tema
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return <>{children}</>
}
