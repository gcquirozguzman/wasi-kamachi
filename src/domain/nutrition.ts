import type { Ingredient, NutritionFacts, RecipeIngredient } from './types'
import { UNITS } from './units'

// ---------------------------------------------------------------------------
// Calculo nutricional.
// Convierte la cantidad de cada ingrediente a gramos y suma su aporte segun
// la nutricion por 100 g del catalogo. Lo que no se pueda estimar se ignora.
// ---------------------------------------------------------------------------

export const EMPTY_NUTRITION: NutritionFacts = {
  kcal: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
}

export type IngredientLookup = (id: string) => Ingredient | undefined

/**
 * Estima los gramos de una linea de ingrediente.
 * - masa -> gramos directos (con factor de la unidad)
 * - volumen -> ml * densidad (si se conoce)
 * - unidades -> cantidad * gramos por unidad (si se conoce)
 * Devuelve null cuando no hay informacion suficiente.
 */
export function quantityToGrams(
  line: RecipeIngredient,
  ingredient: Ingredient | undefined,
): number | null {
  const info = UNITS[line.unit]
  if (!info) return null

  if (info.kind === 'mass' && info.toBase != null) {
    return line.quantity * info.toBase
  }

  if (info.kind === 'volume' && info.toBase != null) {
    const ml = line.quantity * info.toBase
    const density = ingredient?.densityGPerMl ?? 1 // asume densidad del agua si falta
    return ml * density
  }

  if (info.kind === 'count') {
    const gramsPerUnit = ingredient?.gramsPerUnit
    if (line.unit === 'u' && gramsPerUnit != null) {
      return line.quantity * gramsPerUnit
    }
    return null // pizca / al gusto / unidad sin peso conocido
  }

  return null
}

export function addNutrition(a: NutritionFacts, b: NutritionFacts): NutritionFacts {
  return {
    kcal: a.kcal + b.kcal,
    protein: a.protein + b.protein,
    fat: a.fat + b.fat,
    carbs: a.carbs + b.carbs,
  }
}

export function scaleNutrition(n: NutritionFacts, factor: number): NutritionFacts {
  return {
    kcal: n.kcal * factor,
    protein: n.protein * factor,
    fat: n.fat * factor,
    carbs: n.carbs * factor,
  }
}

/** Aporte nutricional de una sola linea de ingrediente. */
export function lineNutrition(
  line: RecipeIngredient,
  lookup: IngredientLookup,
): NutritionFacts {
  const ingredient = lookup(line.ingredientId)
  if (!ingredient?.nutritionPer100g) return EMPTY_NUTRITION
  const grams = quantityToGrams(line, ingredient)
  if (grams == null) return EMPTY_NUTRITION
  return scaleNutrition(ingredient.nutritionPer100g, grams / 100)
}

/**
 * Nutricion de una lista de ingredientes en las cantidades dadas.
 * Como las cantidades de una receta son POR PERSONA, llamar a esta funcion
 * con los ingredientes de la receta devuelve la nutricion POR PORCION.
 */
export function totalNutrition(
  lines: RecipeIngredient[],
  lookup: IngredientLookup,
): NutritionFacts {
  return lines.reduce<NutritionFacts>(
    (acc, line) => addNutrition(acc, lineNutrition(line, lookup)),
    EMPTY_NUTRITION,
  )
}
