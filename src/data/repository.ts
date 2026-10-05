import type { MealRepository } from './MealRepository'
import { MockMealRepository } from './mockRepository'

// ---------------------------------------------------------------------------
// Punto UNICO donde se elige la implementacion del repositorio.
// El resto de la app (hooks, paginas, componentes) importa `repository` desde
// aqui y solo conoce la interfaz MealRepository, nunca la implementacion.
// Para conectar Supabase: cambiar esta linea por `new SupabaseRepository(...)`.
// ---------------------------------------------------------------------------

export const repository: MealRepository = new MockMealRepository()
