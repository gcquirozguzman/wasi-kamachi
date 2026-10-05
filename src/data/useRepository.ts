import { useEffect, useMemo, useState } from 'react'
import type { Ingredient, Recipe } from '@/domain/types'
import { repository } from './repository'

// ---------------------------------------------------------------------------
// Hooks minimos para consumir el repositorio desde React.
// (Cuando crezca el proyecto, esto se puede migrar a TanStack Query.)
// ---------------------------------------------------------------------------

interface AsyncState<T> {
  data: T | undefined
  loading: boolean
  error: string | undefined
}

export function useRecipes(): AsyncState<Recipe[]> {
  const [state, setState] = useState<AsyncState<Recipe[]>>({
    data: undefined,
    loading: true,
    error: undefined,
  })

  useEffect(() => {
    let active = true
    repository
      .listRecipes()
      .then((data) => active && setState({ data, loading: false, error: undefined }))
      .catch(
        (err) =>
          active &&
          setState({ data: undefined, loading: false, error: String(err) }),
      )
    return () => {
      active = false
    }
  }, [])

  return state
}

export function useRecipe(id: string | undefined): AsyncState<Recipe> {
  const [state, setState] = useState<AsyncState<Recipe>>({
    data: undefined,
    loading: true,
    error: undefined,
  })

  useEffect(() => {
    if (!id) return
    let active = true
    setState({ data: undefined, loading: true, error: undefined })
    repository
      .getRecipe(id)
      .then((data) => active && setState({ data, loading: false, error: undefined }))
      .catch(
        (err) =>
          active &&
          setState({ data: undefined, loading: false, error: String(err) }),
      )
    return () => {
      active = false
    }
  }, [id])

  return state
}

export function useIngredientLookup() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  useEffect(() => {
    let active = true
    repository.listIngredients().then((data) => active && setIngredients(data))
    return () => {
      active = false
    }
  }, [])

  const byId = useMemo(() => {
    const map = new Map<string, Ingredient>()
    for (const ing of ingredients) map.set(ing.id, ing)
    return map
  }, [ingredients])

  const lookup = useMemo(() => (id: string) => byId.get(id), [byId])

  return { ingredients, lookup, ready: ingredients.length > 0 }
}
