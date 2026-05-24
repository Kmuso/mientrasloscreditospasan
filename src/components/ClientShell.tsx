'use client'

import { useEffect, useState } from 'react'
import BottomNav from './BottomNav'
import ProjectionPanel from './ProjectionPanel'
import NavigationProgress from './NavigationProgress'
import FilmFlash from './FilmFlash'
import TransitionOverlay from './TransitionOverlay'
import SearchModal from './SearchModal'
import SplashScreen from './SplashScreen'
import { useProjectionStore } from '@/store/projectionStore'

export default function ClientShell() {
  const [panelOpen, setPanelOpen]   = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const immersive       = useProjectionStore((s) => s.immersive)
  const toggleImmersive = useProjectionStore((s) => s.toggleImmersive)

  // Sync immersive ↔ Fullscreen API
  useEffect(() => {
    if (immersive) {
      document.documentElement.requestFullscreen?.().catch(() => {})
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {})
    }
  }, [immersive])

  // Sync store when user exits fullscreen via Escape / browser UI
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement && immersive) {
        toggleImmersive()
      }
    }
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [immersive, toggleImmersive])

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(s => !s)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <SplashScreen />
      <NavigationProgress />
      <FilmFlash />
      <TransitionOverlay />
      <BottomNav
        onToggleProjection={() => setPanelOpen(p => !p)}
        onCloseProjection={() => setPanelOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <ProjectionPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
