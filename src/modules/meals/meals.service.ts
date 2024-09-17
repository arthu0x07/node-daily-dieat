import { FastifyReply, FastifyRequest } from 'fastify'
import { FastifyJWT } from '@fastify/jwt'
import { randomUUID } from 'crypto'

import { knex } from '@/database'
import { MealsErrors } from './meals.errors'
import { CreateMealRequest } from './meals.type'

import { formatDate } from '@/utils/formatDate'

export async function createMeals(
  req: FastifyRequest<{ Body: CreateMealRequest }>,
  res: FastifyReply,
) {
  const { date, description, isOnDiet, name, userId } = req.body

  const token = req.cookies.access_token

  if (!token) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const decoded = req.jwt.verify<FastifyJWT['user']>(token)
  const tokenUserId = decoded.id

  if (userId !== tokenUserId) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const createdMeals = await knex('meals')
    .insert({
      id: randomUUID(),
      userId,
      date,
      description,
      isOnDiet,
      name,
    })
    .returning('*')

  if (!createdMeals) {
    return MealsErrors.internalError(res)
  }

  return res.status(200).send(createdMeals)
}

export async function getAllMealsByUser(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const token = req.cookies.access_token

  if (!token) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const decoded = req.jwt.verify<FastifyJWT['user']>(token)
  const tokenUserId = decoded.id

  const meals = await knex('meals').select('*').where('userId', tokenUserId)

  if (!meals || meals.length === 0) {
    return MealsErrors.anyMealsFound(res)
  }

  return res.status(200).send(meals)
}

export async function getMealById(
  req: FastifyRequest<{
    Params: { id: string }
  }>,
  res: FastifyReply,
) {
  const { id } = req.params
  const token = req.cookies.access_token

  console.log(id)

  if (!token) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const decoded = req.jwt.verify<FastifyJWT['user']>(token)
  const tokenUserId = decoded.id

  const meals = await knex('meals')
    .select('*')
    .where('id', id)
    .andWhere('userId', tokenUserId)
    .first()

  if (!meals || meals.length === 0) {
    return MealsErrors.anyMealsFound(res)
  }

  return res.status(200).send(meals)
}

export async function deleteMealById(
  req: FastifyRequest<{
    Params: { id: string }
  }>,
  res: FastifyReply,
) {
  const { id } = req.params
  const token = req.cookies.access_token

  if (!token) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const decoded = req.jwt.verify<FastifyJWT['user']>(token)
  const tokenUserId = decoded.id

  const meals = await knex('meals')
    .delete('*')
    .where('id', id)
    .andWhere('userId', tokenUserId)

  if (!meals || meals.length === 0) {
    return MealsErrors.anyMealsFound(res)
  }

  return res.status(204).send()
}

export async function updateMeals(
  req: FastifyRequest<{
    Params: { id: string }
    Body: CreateMealRequest
  }>,
  res: FastifyReply,
) {
  const { id } = req.params
  const { description, isOnDiet, name, userId } = req.body
  const token = req.cookies.access_token

  if (!token) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const decoded = req.jwt.verify<FastifyJWT['user']>(token)
  const tokenUserId = decoded.id

  const isMealExists = await knex('meals').select('*').where('id', id).first()

  if (!isMealExists) {
    return MealsErrors.anyMealsFound(res)
  }

  const updatedDate = formatDate(new Date())

  const updatedMeal = await knex('meals')
    .update({
      userId,
      description,
      isOnDiet,
      name,
      date: updatedDate,
    })
    .where('id', id)
    .andWhere('userId', tokenUserId)
    .returning('*')

  if (!updatedMeal) {
    return MealsErrors.internalError(res)
  }

  return res.status(200).send(...updatedMeal)
}
