import { THEME_OPTIONS } from '@/theme/theme'
import { useTheme } from '@/theme/ThemeProvider'

interface Props {
  /**
   * 'icons': fila de emojis, para espacios estrechos (barra superior en movil).
   * 'list':  lista vertical con etiqueta, para el pie del sidebar (240px).
   */
  variant?: 'icons' | 'list'
}

/** Selector de tema: claro / oscuro / sistema. */
export default function ThemeSelector({ variant = 'icons' }: Props) {
  const { choice, setTheme } = useTheme()
  const list = variant === 'list'

  return (
    <div
      role="radiogroup"
      aria-label="Tema de la aplicacion"
      className={[
        'rounded-lg bg-gray-100 p-0.5 dark:bg-ink-700',
        list ? 'flex flex-col gap-0.5' : 'flex items-center gap-0.5',
      ].join(' ')}
    >
      {THEME_OPTIONS.map((option) => {
        const active = choice === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={option.label}
            title={option.label}
            onClick={() => setTheme(option.value)}
            className={[
              'flex min-w-0 items-center gap-2 rounded-md px-2 py-1 text-xs font-medium transition',
              list ? 'w-full text-left' : 'flex-1 justify-center',
              active
                ? 'bg-white text-brand-700 shadow-sm dark:bg-ink-600 dark:text-brand-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
            ].join(' ')}
          >
            <span aria-hidden>{option.emoji}</span>
            {list && <span className="truncate">{option.label}</span>}
          </button>
        )
      })}
    </div>
  )
}
