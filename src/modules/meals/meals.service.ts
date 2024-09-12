import { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from 'crypto'

import { knex } from '@/database'
import { MealsErrors } from './meals.errors'
import { CreateMealsInput } from './meals.schema'

export async function createMeals(
  req: FastifyRequest<{ Body: CreateMealsInput }>,
  res: FastifyReply,
) {
  const { date, description, isOnDiet, name, userId } = req.body

  const createdMeals = await knex('meals').insert({
    id: randomUUID(),
    userId,
    date,
    description,
    isOnDiet,
    name,
  })

  if (!createdMeals) {
    return MealsErrors.internalError(res)
  }

  return res.status(204).send()
}
