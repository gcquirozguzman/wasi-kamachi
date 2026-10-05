import { useState } from 'react'
import type { Ingredient, RecipeIngredient, Unit } from '@/domain/types'
import { UNITS, formatQuantity, unitLabel } from '@/domain/units'
import { scaleLines } from '@/domain/scaling'

interface Props {
  /** Lineas en cantidad POR PERSONA. */
  lines: RecipeIngredient[]
  people: number
  ingredients: Ingredient[]
  onChange: (lines: RecipeIngredient[]) => void
}

const UNIT_OPTIONS = Object.values(UNITS)

/** Columnas: nombre | cantidad | unidad | total | quitar. En movil el nombre ocupa su propia fila. */
const ROW =
  'grid grid-cols-[4.5rem_minmax(0,1fr)_5rem_1.5rem] items-center gap-x-2 gap-y-1 px-3 sm:grid-cols-[minmax(0,1fr)_4.5rem_7rem_5.5rem_1.5rem]'

const FIELD =
  'rounded-md border border-transparent bg-transparent px-1.5 py-1 text-sm text-gray-700 transition hover:border-black/10 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:text-gray-200 dark:hover:border-white/10 dark:[color-scheme:dark]'

export default function IngredientEditor({ lines, people, ingredients, onChange }: Props) {
  const [pickId, setPickId] = useState('')
  const byId = (id: string) => ingredients.find((i) => i.id === id)

  function updateLine(index: number, patch: Partial<RecipeIngredient>) {
    const next = lines.map((l, i) => (i === index ? { ...l, ...patch } : l))
    onChange(next)
  }

  function removeLine(index: number) {
    onChange(lines.filter((_, i) => i !== index))
  }

  function addIngredient() {
    if (!pickId) return
    const ing = byId(pickId)
    if (!ing) return
    onChange([
      ...lines,
      { ingredientId: ing.id, quantity: 1, unit: ing.defaultUnit },
    ])
    setPickId('')
  }

  // El escalado por personas es regla de dominio: se calcula en scaling.ts,
  // no multiplicando a mano en la vista.
  const scaled = scaleLines(lines, people)

  const available = ingredients.filter(
    (ing) => !lines.some((l) => l.ingredientId === ing.id),
  )

  return (
    <div className="overflow-hidden rounded-xl border border-black/[0.06] dark:border-white/[0.07]">
      <div className={`${ROW} border-b border-black/[0.06] py-2 text-[0.6875rem] text-gray-400 dark:border-white/[0.07] dark:text-gray-500`}>
        <span className="col-span-3 sm:col-span-1">Ingrediente</span>
        <span className="col-span-2 hidden sm:block">Por persona</span>
        <span className="hidden text-right sm:block">Total ({people})</span>
        <span />
      </div>

      <ul className="divide-y divide-black/[0.04] dark:divide-white/[0.05]">
        {scaled.map((line, index) => {
          const ing = byId(line.ingredientId)
          return (
            <li
              key={`${line.ingredientId}-${index}`}
              className={`${ROW} group py-1.5 hover:bg-gray-50/70 dark:hover:bg-white/[0.02]`}
            >
              <div className="col-span-4 flex min-w-0 items-center gap-2 sm:col-span-1">
                <span className="text-base">{ing?.emoji ?? '🍽️'}</span>
                <span className="truncate text-sm text-gray-800 dark:text-gray-100">
                  {ing?.name ?? line.ingredientId}
                </span>
              </div>
              <input
                type="number"
                min={0}
                step="any"
                value={line.quantity}
                aria-label={`Cantidad de ${ing?.name ?? 'ingrediente'} por persona`}
                onChange={(e) =>
                  updateLine(index, {
                    quantity: Math.max(0, Number(e.target.value) || 0),
                  })
                }
                className={`${FIELD} w-full tabular-nums`}
              />
              <select
                value={line.unit}
                aria-label="Unidad"
                onChange={(e) => updateLine(index, { unit: e.target.value as Unit })}
                className={`${FIELD} w-full`}
              >
                {UNIT_OPTIONS.map((u) => (
                  <option key={u.unit} value={u.unit}>
                    {u.name}
                  </option>
                ))}
              </select>
              <span className="text-right text-sm font-medium tabular-nums text-gray-900 dark:text-gray-50">
                {formatQuantity(line.scaledQuantity)}
                <span className="ml-0.5 text-xs font-normal text-gray-400">{unitLabel(line.unit)}</span>
              </span>
              <button
                type="button"
                onClick={() => removeLine(index)}
                className="flex h-6 w-6 items-center justify-center rounded text-xs text-gray-300 transition hover:bg-red-50 hover:text-red-500 group-hover:text-gray-400 dark:text-gray-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                aria-label={`Quitar ${ing?.name ?? 'ingrediente'}`}
                title="Quitar"
              >
                ✕
              </button>
            </li>
          )
        })}
      </ul>

      {available.length > 0 && (
        <div className="flex items-center gap-2 border-t border-black/[0.06] px-3 py-2 dark:border-white/[0.07]">
          <select
            value={pickId}
            onChange={(e) => setPickId(e.target.value)}
            className={`${FIELD} flex-1 text-gray-500 dark:text-gray-400`}
          >
            <option value="">+ Agregar ingrediente…</option>
            {available.map((ing) => (
              <option key={ing.id} value={ing.id}>
                {ing.emoji} {ing.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addIngredient}
            disabled={!pickId}
            className="rounded-md bg-gray-900 px-3 py-1 text-[0.8125rem] font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Agregar
          </button>
        </div>
      )}
    </div>
  )
}
