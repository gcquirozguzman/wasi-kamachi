import type { RecipeIngredient } from './types'

// ---------------------------------------------------------------------------
// Escalado por numero de personas.
// Las cantidades de la receta estan definidas POR PERSONA, asi que:
//   cantidadTotal = cantidadPorPersona * personas
// ---------------------------------------------------------------------------

export interface ScaledIngredient extends RecipeIngredient {
  /** Cantidad total para el numero de personas solicitado. */
  scaledQuantity: number
}

export function scaleIngredient(
  ingredient: RecipeIngredient,
  people: number,
): ScaledIngredient {
  return { ...ingredient, scaledQuantity: ingredient.quantity * people }
}

/** Escala una lista de ingredientes (por persona) al numero de personas dado. */
export function scaleLines(
  lines: RecipeIngredient[],
  people: number,
): ScaledIngredient[] {
  return lines.map((line) => scaleIngredient(line, people))
}
