import { FastifyInstance } from 'fastify'
import { $ref } from './meals.schema'
import { createMeals, getAllMealsByUser } from './meals.service'

export async function mealsController(app: FastifyInstance) {
  app.post(
    '/register',
    {
      schema: {
        body: $ref('mealSchemaInput'),
        response: {
          201: $ref('mealSchemaResponse'),
        },
      },
    },
    createMeals,
  )

  app.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('mealsListSchemaResponse'),
        },
      },
    },
    getAllMealsByUser,
  )
}
