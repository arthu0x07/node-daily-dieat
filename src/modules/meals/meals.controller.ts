import { FastifyInstance } from 'fastify'
import { $ref } from './meals.schema'
import { createMeals } from './meals.service'

export async function mealsController(app: FastifyInstance) {
  app.post(
    '/register',
    {
      schema: {
        body: $ref('createMealsSchema'),
        response: {
          201: $ref('createMealsResponseSchema'),
        },
      },
    },
    createMeals,
  )
}
