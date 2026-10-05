import type { Unit, UnitInfo } from './types'

// ---------------------------------------------------------------------------
// Catalogo de unidades EXACTAS y utilidades de formato/conversion.
// Solo unidades sumables, para que la lista de compras sea precisa.
// ---------------------------------------------------------------------------

export const UNITS: Record<Unit, UnitInfo> = {
  // Masa: la base es el gramo.
  g: { unit: 'g', label: 'g', name: 'gramo', kind: 'mass', toBase: 1 },
  kg: { unit: 'kg', label: 'kg', name: 'kilo', kind: 'mass', toBase: 1000 },

  // Volumen: la base es el mililitro.
  ml: { unit: 'ml', label: 'ml', name: 'mililitro', kind: 'volume', toBase: 1 },
  l: { unit: 'l', label: 'l', name: 'litro', kind: 'volume', toBase: 1000 },
  cdta: { unit: 'cdta', label: 'cdta', name: 'cucharadita', kind: 'volume', toBase: 5 },
  cda: { unit: 'cda', label: 'cda', name: 'cucharada', kind: 'volume', toBase: 15 },
  taza: { unit: 'taza', label: 'taza', name: 'taza', kind: 'volume', toBase: 240 },

  // Conteo: no convertible sin saber cuanto pesa una unidad.
  u: { unit: 'u', label: 'u', name: 'unidad', kind: 'count', toBase: null },
}

/**
 * Formatea una cantidad de forma legible: redondeo amable y separador local.
 * Ej: 1.0 -> "1", 1.25 -> "1.25", 333.333 -> "333".
 */
export function formatQuantity(value: number): string {
  if (!Number.isFinite(value)) return '-'
  const rounded = value >= 100 ? Math.round(value) : Math.round(value * 100) / 100
  return rounded.toLocaleString('es-PE', { maximumFractionDigits: 2 })
}

export function unitLabel(unit: Unit): string {
  return UNITS[unit]?.label ?? unit
}
