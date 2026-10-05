// ---------------------------------------------------------------------------
// Capa de dominio: tipos del nucleo del negocio.
// No depende de React ni de la fuente de datos (mock o Supabase). Es TS puro.
// ---------------------------------------------------------------------------

/** Categoria de unidad para saber como escalar y como convertir a gramos. */
export type UnitKind = 'mass' | 'volume' | 'count'

/**
 * Unidades soportadas. Solo medidas EXACTAS y sumables, para poder
 * generar una lista de compras precisa. Sin "al gusto", "pizca", etc.
 */
export type Unit =
  // masa
  | 'g' // gramos
  | 'kg' // kilogramos
  // volumen
  | 'ml' // mililitros
  | 'l' // litros
  | 'cdta' // cucharadita (5 ml)
  | 'cda' // cucharada (15 ml)
  | 'taza' // taza (240 ml)
  // conteo
  | 'u' // unidades (ej: 2 huevos)

export interface UnitInfo {
  unit: Unit
  /** Simbolo corto, para mostrar cantidades: "150 g". */
  label: string
  /** Nombre legible, para listas y selectores: "gramo". */
  name: string
  kind: UnitKind
  /** Factor para convertir a la unidad base (g o ml). null = no convertible. */
  toBase: number | null
}

/** Aporte nutricional por cada 100 g (o 100 ml) del ingrediente. */
export interface NutritionFacts {
  /** Energia en kilocalorias */
  kcal: number
  /** gramos de proteina */
  protein: number
  /** gramos de grasa */
  fat: number
  /** gramos de carbohidratos */
  carbs: number
}

/** Ingrediente del catalogo (reutilizable entre recetas). */
export interface Ingredient {
  id: string
  name: string
  emoji?: string
  /** Unidad por defecto al agregarlo a una receta. */
  defaultUnit: Unit
  /** Densidad g/ml, para convertir volumen a masa al calcular nutricion. */
  densityGPerMl?: number
  /** Peso aproximado de 1 unidad en gramos (para ingredientes contables). */
  gramsPerUnit?: number
  /** Nutricion por 100 g. Opcional: si falta, no se contabiliza. */
  nutritionPer100g?: NutritionFacts
}

/**
 * Linea de ingrediente dentro de una receta.
 * IMPORTANTE: la cantidad esta expresada POR 1 PERSONA.
 * El total para N personas se obtiene multiplicando por N (ver scaling.ts).
 */
export interface RecipeIngredient {
  ingredientId: string
  /** Cantidad por persona. */
  quantity: number
  unit: Unit
  /** Nota libre opcional (ej: "picado", "al gusto"). */
  note?: string
}

/** Una comida / receta. Las cantidades de sus ingredientes son por persona. */
export interface Recipe {
  id: string
  name: string
  emoji?: string
  description?: string
  ingredients: RecipeIngredient[]
  steps: string[]
  /** Minutos de preparacion (informativo). */
  prepMinutes?: number
  tags?: string[]
}
