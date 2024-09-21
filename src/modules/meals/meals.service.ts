import { UserPayload } from '@/@types/fastify'
import {
  CreateMealsRequest,
  CreateMealsReply,
  GetMealByIdRequest,
  GetMealByIdReply,
  DeleteMealByIdRequest,
  DeleteMealByIdReply,
} from '@/@types/route-types'
import { randomUUID } from 'crypto'
import { FastifyRequest, FastifyReply } from 'fastify'
import { knex } from '@/database'
import { MealsErrors } from './meals.errors'

export async function createMeals(
  req: CreateMealsRequest,
  res: CreateMealsReply,
) {
  const { description, isOnDiet, name, userId } = req.body

  const token = req.cookies.access_token

  if (!token) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const decoded = req.jwt.verify<UserPayload>(token)
  const tokenUserId = decoded.id

  if (userId !== tokenUserId) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const createdMeals = await knex('meals')
    .insert({
      id: randomUUID(),
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description,
      isOnDiet,
      name,
    })
    .returning('*')

  if (!createdMeals) {
    return MealsErrors.internalError(res)
  }

  return res.status(201).send(...createdMeals)
}

export async function getAllMealsByUser(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const token = req.cookies.access_token

  if (!token) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const decoded = req.jwt.verify<UserPayload>(token)
  const tokenUserId = decoded.id

  const meals = await knex('meals').select('*').where('userId', tokenUserId)

  if (!meals || meals.length === 0) {
    return MealsErrors.anyMealsFound(res)
  }

  if (!meals) {
    return MealsErrors.internalError(res)
  }

  return res.status(200).send(meals)
}

export async function getMealById(
  req: GetMealByIdRequest,
  res: GetMealByIdReply,
) {
  const { id } = req.params
  const token = req.cookies.access_token

  if (!token) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const decoded = req.jwt.verify<UserPayload>(token)
  const tokenUserId = decoded.id

  const meal = await knex('meals')
    .select('*')
    .where('id', id)
    .andWhere('userId', tokenUserId)
    .first()

  if (!meal) {
    return MealsErrors.anyMealsFound(res)
  }

  if (!meal) {
    return MealsErrors.internalError(res)
  }

  return res.status(200).send(meal)
}

export async function deleteMealById(
  req: DeleteMealByIdRequest,
  res: DeleteMealByIdReply,
) {
  const { id } = req.params
  const token = req.cookies.access_token

  if (!token) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const decoded = req.jwt.verify<UserPayload>(token)
  const tokenUserId = decoded.id

  const result = await knex('meals')
    .delete()
    .where('id', id)
    .andWhere('userId', tokenUserId)

  if (result === 0) {
    return MealsErrors.anyMealsFound(res)
  }

  if (!result) {
    return MealsErrors.internalError(res)
  }

  return res.status(204).send()
}

export async function updateMeals(
  req: CreateMealsRequest,
  res: CreateMealsReply,
) {
  const { id } = req.params
  const { description, isOnDiet, name, userId } = req.body
  const token = req.cookies.access_token

  if (!token) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const decoded = req.jwt.verify<UserPayload>(token)
  const tokenUserId = decoded.id

  if (userId !== tokenUserId) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const isMealExists = await knex('meals').select('*').where('id', id).first()

  if (!isMealExists) {
    return MealsErrors.anyMealsFound(res)
  }

  const updatedMeal = await knex('meals')
    .update({
      description,
      isOnDiet,
      name,
      updatedAt: new Date().toISOString(),
    })
    .where('id', id)
    .andWhere('userId', tokenUserId)
    .returning('*')

  if (!updatedMeal) {
    return MealsErrors.internalError(res)
  }

  return res.status(200).send(...updatedMeal)
}
