import type { NutritionFacts } from '@/domain/types'

interface Props {
  /** Nutricion de 1 porcion (1 persona). */
  perServing: NutritionFacts
  /** Nutricion total para el numero de personas. */
  total: NutritionFacts
  people: number
}

const STATS: { key: keyof NutritionFacts; label: string; unit: string }[] = [
  { key: 'kcal', label: 'Energia', unit: 'kcal' },
  { key: 'protein', label: 'Proteina', unit: 'g' },
  { key: 'fat', label: 'Grasa', unit: 'g' },
  { key: 'carbs', label: 'Carbohidratos', unit: 'g' },
]

export default function NutritionPanel({ perServing, total, people }: Props) {
  return (
    <section
      aria-label="Nutricion"
      className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.06] dark:border-white/[0.07] dark:bg-white/[0.07] sm:grid-cols-4"
      title="Valores referenciales. Se recalculan al editar las cantidades."
    >
      {STATS.map((stat) => (
        <div key={stat.key} className="bg-white px-4 py-3 dark:bg-ink-900">
          <p className="text-[0.6875rem] text-gray-400 dark:text-gray-500">
            {stat.label} <span className="text-gray-300 dark:text-gray-600">/ porcion</span>
          </p>
          <p
            className={[
              'mt-0.5 text-xl font-semibold tabular-nums tracking-tight',
              stat.key === 'kcal'
                ? 'text-brand-600 dark:text-brand-300'
                : 'text-gray-900 dark:text-gray-50',
            ].join(' ')}
          >
            {Math.round(perServing[stat.key])}
            <span className="ml-0.5 text-xs font-normal text-gray-400">{stat.unit}</span>
          </p>
          {people > 1 && (
            <p className="text-[0.6875rem] tabular-nums text-gray-400 dark:text-gray-500">
              {Math.round(total[stat.key])} {stat.unit} para {people}
            </p>
          )}
        </div>
      ))}
    </section>
  )
}
