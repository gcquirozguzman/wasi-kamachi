import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyAccent,
  applyTheme,
  readStoredAccent,
  readStoredTheme,
  resolveTheme,
  storeAccent,
  storeTheme,
  systemTheme,
  watchSystemTheme,
  type Accent,
  type ResolvedTheme,
  type ThemeChoice,
} from './theme'

interface ThemeContextValue {
  /** Lo que eligio el usuario (puede ser 'system'). */
  choice: ThemeChoice
  /** El tema que se esta pintando ahora mismo. */
  resolved: ResolvedTheme
  setTheme: (choice: ThemeChoice) => void
  /** Color de acento de la interfaz. */
  accent: Accent
  setAccent: (accent: Accent) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<ThemeChoice>(readStoredTheme)
  const [system, setSystem] = useState<ResolvedTheme>(systemTheme)
  const [accent, setAccentState] = useState<Accent>(readStoredAccent)

  const resolved = resolveTheme(choice, system)

  // Mantiene la clase `dark` del <html> sincronizada con el tema resuelto.
  useEffect(() => {
    applyTheme(resolved, accent)
  }, [resolved, accent])

  useEffect(() => {
    applyAccent(accent)
  }, [accent])

  // Si el usuario sigue al sistema, reacciona cuando el SO cambia de tema.
  useEffect(() => watchSystemTheme(setSystem), [])

  const setTheme = useCallback((next: ThemeChoice) => {
    setChoice(next)
    storeTheme(next)
  }, [])

  const setAccent = useCallback((next: Accent) => {
    setAccentState(next)
    storeAccent(next)
  }, [])

  const value = useMemo(
    () => ({ choice, resolved, setTheme, accent, setAccent }),
    [choice, resolved, setTheme, accent, setAccent],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return context
}
