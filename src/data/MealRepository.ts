import type { Ingredient, Recipe } from '@/domain/types'

// ---------------------------------------------------------------------------
// Contrato de acceso a datos. La UI depende SOLO de esta interfaz.
// Hoy la implementa un mock en memoria (mockRepository).
// Manana la implementara Supabase sin tocar la UI.
// ---------------------------------------------------------------------------

export interface MealRepository {
  listIngredients(): Promise<Ingredient[]>
  getIngredient(id: string): Promise<Ingredient | undefined>

  listRecipes(): Promise<Recipe[]>
  getRecipe(id: string): Promise<Recipe | undefined>

  createRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe>
  updateRecipe(recipe: Recipe): Promise<Recipe>
  deleteRecipe(id: string): Promise<void>
}
