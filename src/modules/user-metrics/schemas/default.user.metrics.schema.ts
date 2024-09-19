import { z } from 'zod'

const userMetricSchema = z.object({
  userId: z.string(),
  totalMeals: z.number(),
  totalMealsOnDiet: z.number(),
  totalMealsOffDiet: z.number(),
  bestSequenceOnDiet: z.number(),
})

const userMetricSchemaInput = z.object({
  userId: z.string(),
})

const getUserMetricByIdQuerySchema = z.object({
  userId: z.string(),
})

const userMetricSchemaResponse = userMetricSchema

const userMetricsListSchemaResponse = z.array(userMetricSchemaResponse)

export {
  userMetricSchema,
  userMetricSchemaInput,
  userMetricSchemaResponse,
  userMetricsListSchemaResponse,
  getUserMetricByIdQuerySchema,
}
