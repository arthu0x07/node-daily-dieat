import { z } from 'zod'
import { mealSchema } from './schemas/default.meals.schema'

export type CreateMealRequest = z.infer<typeof mealSchema>
export type CreateMealResponse = z.infer<typeof mealSchema>
