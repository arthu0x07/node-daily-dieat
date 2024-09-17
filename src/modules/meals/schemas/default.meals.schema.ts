import { z } from 'zod'

const mealSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string(),
  isOnDiet: z.boolean(),
  createdAt: z.string().date().optional(),
  updatedAt: z.string().date().optional(),
})

const mealSchemaInput = z.object({
  userId: z.string(),
  name: z.string(),
  description: z.string(),
  isOnDiet: z.boolean(),
})

const mealSchemaResponse = mealSchema

const mealsListSchemaResponse = z.array(mealSchemaResponse)

const getMealByIdQuerySchema = z.object({
  id: z.string(),
})

const deleteMealByIdQuerySchema = z.object({
  id: z.string(),
})

export {
  mealSchema,
  mealSchemaInput,
  mealSchemaResponse,
  mealsListSchemaResponse,
  getMealByIdQuerySchema,
  deleteMealByIdQuerySchema,
}
