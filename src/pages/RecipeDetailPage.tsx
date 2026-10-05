import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { RecipeIngredient } from '@/domain/types'
import { useRecipe, useIngredientLookup } from '@/data/useRepository'
import { repository } from '@/data/repository'
import { totalNutrition, scaleNutrition, EMPTY_NUTRITION } from '@/domain/nutrition'
import PeopleSelector from '@/components/PeopleSelector'
import IngredientEditor from '@/components/IngredientEditor'
import NutritionPanel from '@/components/NutritionPanel'

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: recipe, loading, error } = useRecipe(id)
  const { ingredients, lookup } = useIngredientLookup()

  // Arrancamos siempre en 1 persona, como pidio el usuario.
  const [people, setPeople] = useState<number>(1)
  // Ingredientes en cantidad POR PERSONA, editables.
  const [lines, setLines] = useState<RecipeIngredient[]>([])
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  useEffect(() => {
    if (recipe) {
      setLines(recipe.ingredients)
      setPeople(1)
      setSavedAt(null)
    }
  }, [recipe])

  const perServing = useMemo(
    () => (recipe ? totalNutrition(lines, lookup) : EMPTY_NUTRITION),
    [recipe, lines, lookup],
  )
  const total = useMemo(() => scaleNutrition(perServing, people), [perServing, people])

  const dirty = useMemo(
    () =>
      recipe ? JSON.stringify(lines) !== JSON.stringify(recipe.ingredients) : false,
    [recipe, lines],
  )

  async function handleSave() {
    if (!recipe) return
    setSaving(true)
    await repository.updateRecipe({ ...recipe, ingredients: lines })
    setSaving(false)
    setSavedAt(Date.now())
  }

  function handleReset() {
    if (recipe) setLines(recipe.ingredients)
  }

  if (loading) {
    return <div className="h-64 animate-pulse rounded-xl bg-gray-100 dark:bg-ink-800" />
  }

  if (error || !recipe) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
        No se encontro la comida. {error}
        <div className="mt-3">
          <Link to="/" className="font-medium text-brand-700 dark:text-brand-300 underline">
            Volver a mis comidas
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/"
            aria-label="Volver a comidas"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/[0.06] dark:hover:text-gray-100"
          >
            ←
          </Link>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-2xl dark:bg-brand-500/15">
            {recipe.emoji ?? '🍽️'}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
              {recipe.name}
            </h1>
            {recipe.description && (
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">{recipe.description}</p>
            )}
          </div>
        </div>
        <PeopleSelector value={people} onChange={setPeople} />
      </header>

      <NutritionPanel perServing={perServing} total={total} people={people} />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <section>
          <div className="mb-2 flex h-7 items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">Ingredientes</h2>
            {dirty ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-md px-2.5 py-1 text-[0.8125rem] text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/[0.06]"
                >
                  Deshacer
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-md bg-brand-600 px-3 py-1 text-[0.8125rem] font-medium text-white transition hover:bg-brand-700 disabled:opacity-50"
                >
                  {saving ? 'Guardando…' : 'Guardar'}
                </button>
              </div>
            ) : savedAt ? (
              <span className="text-xs text-green-600 dark:text-green-400">✓ Guardado</span>
            ) : null}
          </div>

          <IngredientEditor
            lines={lines}
            people={people}
            ingredients={ingredients}
            onChange={setLines}
          />
        </section>

        <section>
          <h2 className="mb-2 flex h-7 items-center text-sm font-semibold text-gray-900 dark:text-gray-50">
            Preparacion
          </h2>
          <ol className="flex flex-col">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 py-1.5">
                <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/10 text-[0.6875rem] font-medium tabular-nums text-gray-500 dark:border-white/15 dark:text-gray-400">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
