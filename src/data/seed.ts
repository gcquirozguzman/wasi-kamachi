import type { Ingredient, Recipe } from '@/domain/types'

// ---------------------------------------------------------------------------
// Datos dummy para evaluar la interfaz. Valores nutricionales aproximados.
// ---------------------------------------------------------------------------

export const SEED_INGREDIENTS: Ingredient[] = [
  {
    id: 'ing-lomo',
    name: 'Lomo de res',
    emoji: '🥩',
    defaultUnit: 'g',
    nutritionPer100g: { kcal: 217, protein: 26, fat: 12, carbs: 0 },
  },
  {
    id: 'ing-cebolla',
    name: 'Cebolla roja',
    emoji: '🧅',
    defaultUnit: 'u',
    gramsPerUnit: 110,
    nutritionPer100g: { kcal: 40, protein: 1.1, fat: 0.1, carbs: 9.3 },
  },
  {
    id: 'ing-tomate',
    name: 'Tomate',
    emoji: '🍅',
    defaultUnit: 'u',
    gramsPerUnit: 123,
    nutritionPer100g: { kcal: 18, protein: 0.9, fat: 0.2, carbs: 3.9 },
  },
  {
    id: 'ing-papa',
    name: 'Papa',
    emoji: '🥔',
    defaultUnit: 'g',
    nutritionPer100g: { kcal: 77, protein: 2, fat: 0.1, carbs: 17 },
  },
  {
    id: 'ing-arroz',
    name: 'Arroz blanco',
    emoji: '🍚',
    defaultUnit: 'g',
    nutritionPer100g: { kcal: 360, protein: 7, fat: 0.6, carbs: 79 },
  },
  {
    id: 'ing-quinua',
    name: 'Quinua',
    emoji: '🌾',
    defaultUnit: 'g',
    nutritionPer100g: { kcal: 368, protein: 14, fat: 6, carbs: 64 },
  },
  {
    id: 'ing-pescado',
    name: 'Pescado blanco',
    emoji: '🐟',
    defaultUnit: 'g',
    nutritionPer100g: { kcal: 96, protein: 20, fat: 1.5, carbs: 0 },
  },
  {
    id: 'ing-limon',
    name: 'Limon',
    emoji: '🍋',
    defaultUnit: 'u',
    gramsPerUnit: 50,
    nutritionPer100g: { kcal: 29, protein: 1.1, fat: 0.3, carbs: 9 },
  },
  {
    id: 'ing-camote',
    name: 'Camote',
    emoji: '🍠',
    defaultUnit: 'g',
    nutritionPer100g: { kcal: 86, protein: 1.6, fat: 0.1, carbs: 20 },
  },
  {
    id: 'ing-aceite',
    name: 'Aceite vegetal',
    emoji: '🫒',
    defaultUnit: 'ml',
    densityGPerMl: 0.92,
    nutritionPer100g: { kcal: 884, protein: 0, fat: 100, carbs: 0 },
  },
  {
    id: 'ing-sal',
    name: 'Sal',
    emoji: '🧂',
    defaultUnit: 'g',
    nutritionPer100g: { kcal: 0, protein: 0, fat: 0, carbs: 0 },
  },
  {
    id: 'ing-aji',
    name: 'Aji amarillo',
    emoji: '🌶️',
    defaultUnit: 'u',
    gramsPerUnit: 30,
    nutritionPer100g: { kcal: 40, protein: 1.9, fat: 0.4, carbs: 8.8 },
  },
  {
    id: 'ing-zanahoria',
    name: 'Zanahoria',
    emoji: '🥕',
    defaultUnit: 'u',
    gramsPerUnit: 70,
    nutritionPer100g: { kcal: 41, protein: 0.9, fat: 0.2, carbs: 10 },
  },
  {
    id: 'ing-arveja',
    name: 'Arvejas',
    emoji: '🟢',
    defaultUnit: 'g',
    nutritionPer100g: { kcal: 81, protein: 5, fat: 0.4, carbs: 14 },
  },
]

// Las cantidades estan expresadas POR 1 PERSONA. Se multiplican por el
// numero de personas en la pantalla de detalle.
export const SEED_RECIPES: Recipe[] = [
  {
    id: 'rec-lomo-saltado',
    name: 'Lomo saltado',
    emoji: '🥘',
    description: 'Salteado de lomo, cebolla y tomate, servido con papas fritas y arroz.',
    prepMinutes: 30,
    tags: ['plato de fondo', 'criollo'],
    ingredients: [
      { ingredientId: 'ing-lomo', quantity: 150, unit: 'g' },
      { ingredientId: 'ing-cebolla', quantity: 0.5, unit: 'u', note: 'en gajos' },
      { ingredientId: 'ing-tomate', quantity: 0.5, unit: 'u', note: 'en gajos' },
      { ingredientId: 'ing-papa', quantity: 125, unit: 'g', note: 'en bastones' },
      { ingredientId: 'ing-arroz', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-aceite', quantity: 0.75, unit: 'cda' },
      { ingredientId: 'ing-sal', quantity: 2, unit: 'g' },
    ],
    steps: [
      'Cortar el lomo en tiras y sazonar con sal y pimienta.',
      'Freir las papas en bastones y reservar.',
      'Saltear la carne a fuego alto, agregar cebolla y tomate.',
      'Incorporar las papas, mezclar y servir con arroz.',
    ],
  },
  {
    id: 'rec-quinua-verduras',
    name: 'Quinua con verduras',
    emoji: '🥗',
    description: 'Guiso ligero de quinua con zanahoria y arvejas. Saludable y rapido.',
    prepMinutes: 25,
    tags: ['saludable', 'vegetariano'],
    ingredients: [
      { ingredientId: 'ing-quinua', quantity: 80, unit: 'g' },
      { ingredientId: 'ing-zanahoria', quantity: 0.67, unit: 'u', note: 'en cubos' },
      { ingredientId: 'ing-arveja', quantity: 50, unit: 'g' },
      { ingredientId: 'ing-cebolla', quantity: 0.33, unit: 'u', note: 'picada' },
      { ingredientId: 'ing-aceite', quantity: 0.67, unit: 'cda' },
      { ingredientId: 'ing-sal', quantity: 1.5, unit: 'g' },
    ],
    steps: [
      'Lavar bien la quinua y cocinarla en agua con sal.',
      'Hacer un aderezo con cebolla y aji.',
      'Agregar zanahoria y arvejas, cocinar unos minutos.',
      'Mezclar con la quinua cocida y servir.',
    ],
  },
  {
    id: 'rec-ceviche',
    name: 'Ceviche de pescado',
    emoji: '🐟',
    description: 'Pescado fresco marinado en limon con cebolla y aji. Servido con camote.',
    prepMinutes: 20,
    tags: ['entrada', 'marino'],
    ingredients: [
      { ingredientId: 'ing-pescado', quantity: 200, unit: 'g', note: 'en cubos' },
      { ingredientId: 'ing-limon', quantity: 4, unit: 'u', note: 'exprimidos' },
      { ingredientId: 'ing-cebolla', quantity: 0.5, unit: 'u', note: 'en pluma' },
      { ingredientId: 'ing-aji', quantity: 0.5, unit: 'u', note: 'en tiras' },
      { ingredientId: 'ing-camote', quantity: 150, unit: 'g', note: 'sancochado' },
      { ingredientId: 'ing-sal', quantity: 2, unit: 'g' },
    ],
    steps: [
      'Cortar el pescado en cubos y colocarlo en un bol frio.',
      'Agregar sal, aji y el jugo de limon. Mezclar.',
      'Incorporar la cebolla en pluma y dejar marinar unos minutos.',
      'Servir con camote sancochado.',
    ],
  },
]
