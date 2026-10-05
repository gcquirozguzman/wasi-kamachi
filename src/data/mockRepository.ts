import type { Ingredient, Recipe } from '@/domain/types'
import type { MealRepository } from './MealRepository'
import { SEED_INGREDIENTS, SEED_RECIPES } from './seed'

// ---------------------------------------------------------------------------
// Implementacion en memoria del repositorio. Usa los datos dummy del seed.
// Simula latencia de red para que la UI se sienta realista (loaders, etc.).
// El dia que conectemos Supabase, esta clase se reemplaza por SupabaseRepository.
// ---------------------------------------------------------------------------

const LATENCY_MS = 150

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS))
}

function clone<T>(value: T): T {
  return structuredClone(value)
}

export class MockMealRepository implements MealRepository {
  private ingredients: Ingredient[] = clone(SEED_INGREDIENTS)
  private recipes: Recipe[] = clone(SEED_RECIPES)

  listIngredients(): Promise<Ingredient[]> {
    return delay(clone(this.ingredients))
  }

  getIngredient(id: string): Promise<Ingredient | undefined> {
    return delay(clone(this.ingredients.find((i) => i.id === id)))
  }

  listRecipes(): Promise<Recipe[]> {
    return delay(clone(this.recipes))
  }

  getRecipe(id: string): Promise<Recipe | undefined> {
    return delay(clone(this.recipes.find((r) => r.id === id)))
  }

  createRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const created: Recipe = { ...clone(recipe), id: `rec-${crypto.randomUUID()}` }
    this.recipes.push(created)
    return delay(clone(created))
  }

  updateRecipe(recipe: Recipe): Promise<Recipe> {
    const index = this.recipes.findIndex((r) => r.id === recipe.id)
    if (index === -1) throw new Error(`Receta no encontrada: ${recipe.id}`)
    this.recipes[index] = clone(recipe)
    return delay(clone(recipe))
  }

  deleteRecipe(id: string): Promise<void> {
    this.recipes = this.recipes.filter((r) => r.id !== id)
    return delay(undefined)
  }
}
