// ---------------------------------------------------------------------------
// Logica de tema, en TS puro (sin React), igual que la capa de dominio.
// El usuario elige entre claro, oscuro o seguir al sistema; la eleccion se
// persiste en localStorage y se aplica poniendo la clase `dark` en <html>.
// ---------------------------------------------------------------------------

/** Lo que el usuario ELIGE. */
export type ThemeChoice = 'light' | 'dark' | 'system'

/** El tema que finalmente se PINTA (nunca 'system'). */
export type ResolvedTheme = 'light' | 'dark'

/** Deben coincidir con el script anti-parpadeo de index.html. */
export const THEME_STORAGE_KEY = 'wasi-kamachi:theme'
export const ACCENT_STORAGE_KEY = 'wasi-kamachi:accent'

export const THEME_OPTIONS: { value: ThemeChoice; label: string; emoji: string }[] = [
  { value: 'light', label: 'Claro', emoji: '☀️' },
  { value: 'dark', label: 'Oscuro', emoji: '🌙' },
  { value: 'system', label: 'Sistema', emoji: '💻' },
]

/** Color de acento de la interfaz. Las escalas viven en index.css. */
export type Accent = 'indigo' | 'albahaca' | 'turquesa' | 'frambuesa'

export const DEFAULT_ACCENT: Accent = 'indigo'

export const ACCENT_OPTIONS: { value: Accent; label: string; swatch: string }[] = [
  { value: 'indigo', label: 'Indigo', swatch: '#6366f1' },
  { value: 'albahaca', label: 'Albahaca', swatch: '#22c55e' },
  { value: 'turquesa', label: 'Turquesa', swatch: '#14b8a6' },
  { value: 'frambuesa', label: 'Frambuesa', swatch: '#f43f5e' },
]

const DARK_QUERY = '(prefers-color-scheme: dark)'

/** Fondo de pagina en oscuro; en claro la barra toma el acento. */
const DARK_THEME_COLOR = '#0e0e10'

export function isThemeChoice(value: unknown): value is ThemeChoice {
  return value === 'light' || value === 'dark' || value === 'system'
}

export function isAccent(value: unknown): value is Accent {
  return ACCENT_OPTIONS.some((option) => option.value === value)
}

/** Lee la preferencia guardada. Si no hay o es invalida, sigue al sistema. */
export function readStoredTheme(): ThemeChoice {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeChoice(raw) ? raw : 'system'
  } catch {
    return 'system' // modo privado / storage bloqueado
  }
}

export function storeTheme(choice: ThemeChoice): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, choice)
  } catch {
    // Sin persistencia el tema sigue funcionando durante la sesion.
  }
}

export function readStoredAccent(): Accent {
  try {
    const raw = localStorage.getItem(ACCENT_STORAGE_KEY)
    return isAccent(raw) ? raw : DEFAULT_ACCENT
  } catch {
    return DEFAULT_ACCENT
  }
}

export function storeAccent(accent: Accent): void {
  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, accent)
  } catch {
    // Idem: sin persistencia el acento vale durante la sesion.
  }
}

/** Preferencia actual del sistema operativo. */
export function systemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

export function resolveTheme(choice: ThemeChoice, system: ResolvedTheme): ResolvedTheme {
  return choice === 'system' ? system : choice
}

/** Aplica el tema al documento: clase `dark`, color-scheme y theme-color. */
export function applyTheme(resolved: ResolvedTheme, accent: Accent): void {
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved

  const swatch =
    ACCENT_OPTIONS.find((option) => option.value === accent)?.swatch ?? '#6366f1'
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', resolved === 'dark' ? DARK_THEME_COLOR : swatch)
}

/** Aplica el acento: cambia la escala brand-* que resuelve Tailwind. */
export function applyAccent(accent: Accent): void {
  document.documentElement.dataset.accent = accent
}

/** Escucha cambios del tema del sistema. Devuelve la funcion para desuscribir. */
export function watchSystemTheme(onChange: (theme: ResolvedTheme) => void): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}
  const media = window.matchMedia(DARK_QUERY)
  const handler = (event: MediaQueryListEvent) =>
    onChange(event.matches ? 'dark' : 'light')
  media.addEventListener('change', handler)
  return () => media.removeEventListener('change', handler)
}
