import { ACCENT_OPTIONS } from '@/theme/theme'
import { useTheme } from '@/theme/ThemeProvider'

/** Selector de color de acento: un punto por opcion. */
export default function AccentSelector() {
  const { accent, setAccent } = useTheme()

  return (
    <div
      role="radiogroup"
      aria-label="Color de acento"
      className="flex items-center justify-around gap-1.5 rounded-lg bg-gray-100 px-2 py-1.5 dark:bg-ink-700"
    >
      {ACCENT_OPTIONS.map((option) => {
        const active = accent === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={option.label}
            title={option.label}
            onClick={() => setAccent(option.value)}
            style={{ backgroundColor: option.swatch }}
            className={[
              'h-3.5 w-3.5 rounded-full transition',
              active
                ? 'ring-2 ring-gray-400 ring-offset-2 ring-offset-gray-100 dark:ring-gray-300 dark:ring-offset-ink-700'
                : 'opacity-60 hover:opacity-100',
            ].join(' ')}
          />
        )
      })}
    </div>
  )
}
