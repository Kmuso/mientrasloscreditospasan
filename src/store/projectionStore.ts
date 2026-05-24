import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'noir' | 'contemporary' | 'technicolor'
export type TransitionStyle = 'wipe' | 'fade' | 'iris' | 'none'

interface ProjectionState {
  theme: Theme
  grain: number
  immersive: boolean
  scriptMode: boolean
  staticMode: boolean
  transitionStyle: TransitionStyle
  setTheme: (theme: Theme) => void
  setGrain: (grain: number) => void
  toggleImmersive: () => void
  toggleScriptMode: () => void
  toggleStaticMode: () => void
  setTransitionStyle: (style: TransitionStyle) => void
}

export const useProjectionStore = create<ProjectionState>()(
  persist(
    (set) => ({
      theme: 'contemporary',
      grain: 35,
      immersive: false,
      scriptMode: false,
      staticMode: false,
      transitionStyle: 'wipe',
      setTheme: (theme) => set({ theme }),
      setGrain: (grain) => set({ grain: Math.min(100, Math.max(0, grain)) }),
      toggleImmersive: () => set((s) => ({ immersive: !s.immersive })),
      toggleScriptMode: () => set((s) => ({ scriptMode: !s.scriptMode })),
      toggleStaticMode: () => set((s) => ({ staticMode: !s.staticMode })),
      setTransitionStyle: (style) => set({ transitionStyle: style }),
    }),
    { name: 'mlcp-projection' }
  )
)
