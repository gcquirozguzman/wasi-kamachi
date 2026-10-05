import { UNITS } from '@/domain/units'
import type { UnitInfo } from '@/domain/types'

const UNIT_LIST = Object.values(UNITS)

// Grupos en el orden en que se muestran, con la unidad base de cada uno.
const GROUPS: { kind: UnitInfo['kind']; title: string; emoji: string; base: string }[] = [
  { kind: 'mass', title: 'Masa', emoji: '⚖️', base: 'g' },
  { kind: 'volume', title: 'Volumen', emoji: '🥛', base: 'ml' },
  { kind: 'count', title: 'Conteo', emoji: '🔢', base: '' },
]

function equivalence(info: UnitInfo, base: string): string {
  if (info.toBase === null) return 'Sin conversión'
  if (info.toBase === 1) return 'Unidad base'
  return `= ${info.toBase.toLocaleString('es-PE')} ${base}`
}

export default function UnitsSettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
        Medidas
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Medidas disponibles al agregar un ingrediente.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {GROUPS.map((group) => {
          const units = UNIT_LIST.filter((u) => u.kind === group.kind)
          return (
            <section
              key={group.kind}
              className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.07] dark:bg-ink-800"
            >
              <header className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-50">
                  <span>{group.emoji}</span>
                  {group.title}
                </h2>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs tabular-nums text-gray-500 dark:bg-ink-600 dark:text-gray-400">
                  {units.length}
                </span>
              </header>

              <ul className="space-y-2">
                {units.map((info) => (
                  <li
                    key={info.unit}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2 dark:bg-ink-700"
                  >
                    <span className="flex h-9 min-w-[2.75rem] items-center justify-center rounded-md bg-brand-50 px-2 text-sm font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                      {info.label}
                    </span>
                    <span className="flex-1 text-sm capitalize text-gray-800 dark:text-gray-100">
                      {info.name}
                    </span>
                    <span className="text-xs tabular-nums text-gray-400 dark:text-gray-500">
                      {equivalence(info, group.base)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
