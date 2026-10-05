interface Props {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

const BTN =
  'flex h-7 w-7 items-center justify-center rounded-md text-base text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-white/[0.06]'

export default function PeopleSelector({ value, onChange, min = 1, max = 20 }: Props) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-black/[0.08] py-0.5 pl-3 pr-0.5 dark:border-white/10">
      <span className="text-[0.8125rem] text-gray-500 dark:text-gray-400">Personas</span>
      <div className="flex items-center">
        <button type="button" onClick={dec} disabled={value <= min} className={BTN} aria-label="Quitar persona">
          −
        </button>
        <span className="w-6 text-center text-sm font-semibold tabular-nums text-gray-900 dark:text-gray-50">
          {value}
        </span>
        <button type="button" onClick={inc} disabled={value >= max} className={BTN} aria-label="Agregar persona">
          +
        </button>
      </div>
    </div>
  )
}
