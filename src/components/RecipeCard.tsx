import { Link } from 'react-router-dom'
import type { Ingredient, Recipe } from '@/domain/types'
import { totalNutrition } from '@/domain/nutrition'

interface Props {
  recipe: Recipe
  lookup: (id: string) => Ingredient | undefined
}

export default function RecipeCard({ recipe, lookup }: Props) {
  // Las cantidades son por persona => esto ya es la nutricion por porcion.
  const perServing = totalNutrition(recipe.ingredients, lookup)

  const macros = [
    { label: 'Proteína', value: perServing.protein },
    { label: 'Grasa', value: perServing.fat },
    { label: 'Carbos', value: perServing.carbs },
  ]

  return (
    <Link
      to={`/recetas/${recipe.id}`}
      className="group flex flex-col rounded-xl border border-black/[0.06] bg-white p-4 transition hover:border-black/15 hover:shadow-sm dark:border-white/[0.07] dark:bg-ink-800 dark:hover:border-white/15"
    >
      <header className="flex items-start gap-3">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-3xl dark:bg-brand-500/15">
          {recipe.emoji ?? '🍽️'}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-gray-900 group-hover:text-brand-700 dark:text-gray-50 dark:group-hover:text-brand-300">
            {recipe.name}
          </h3>
          <p className="mt-1 flex flex-wrap gap-x-3 text-xs tabular-nums text-gray-400 dark:text-gray-500">
            {recipe.prepMinutes != null && <span>⏱️ {recipe.prepMinutes} min</span>}
            <span>🧺 {recipe.ingredients.length} ingredientes</span>
          </p>
        </div>
      </header>

      {recipe.description && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {recipe.description}
        </p>
      )}

      <div className="mt-4 grid grid-cols-4 gap-2">
        <div className="rounded-lg bg-brand-50 px-2 py-2 text-center dark:bg-brand-500/15">
          <p className="text-sm font-semibold tabular-nums text-brand-700 dark:text-brand-300">
            {Math.round(perServing.kcal)}
          </p>
          <p className="text-[0.6875rem] text-brand-600/80 dark:text-brand-300/70">kcal</p>
        </div>
        {macros.map((m) => (
          <div key={m.label} className="rounded-lg bg-gray-50 px-2 py-2 text-center dark:bg-ink-700">
            <p className="text-sm font-semibold tabular-nums text-gray-800 dark:text-gray-100">
              {Math.round(m.value)} g
            </p>
            <p className="text-[0.6875rem] text-gray-400 dark:text-gray-500">{m.label}</p>
          </div>
        ))}
      </div>

      {recipe.tags && recipe.tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-500 dark:bg-ink-600 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
