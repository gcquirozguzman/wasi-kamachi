import { useRecipes, useIngredientLookup } from '@/data/useRepository'
import RecipeCard from '@/components/RecipeCard'

const GRID = 'grid gap-4 md:grid-cols-2 xl:grid-cols-3'

export default function RecipeListPage() {
  const { data: recipes, loading, error } = useRecipes()
  const { lookup } = useIngredientLookup()

  return (
    <div>
      <header className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
            Comidas
          </h1>
          {recipes && (
            <span className="text-sm tabular-nums text-gray-400 dark:text-gray-500">
              {recipes.length}
            </span>
          )}
        </div>
        <button
          type="button"
          disabled
          title="Disponible en la siguiente fase"
          className="rounded-md bg-gray-900 px-3 py-1.5 text-[0.8125rem] font-medium text-white disabled:opacity-40 dark:bg-white dark:text-gray-900"
        >
          + Nueva comida
        </button>
      </header>

      {loading && <SkeletonGrid />}

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
          Ocurrio un error al cargar las comidas: {error}
        </p>
      )}

      {recipes && (
        <div className={GRID}>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} lookup={lookup} />
          ))}
        </div>
      )}
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className={GRID}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-[15rem] animate-pulse rounded-xl bg-gray-100 dark:bg-ink-800"
        />
      ))}
    </div>
  )
}
