import { UserPayload } from '@/@types/fastify'

import { MealsErrors } from './user.metrics.errors'
import { knex } from '@/database'
import {
  GetUserMetricRequest,
  GetUserMetricResponse,
} from '@/@types/route-types'

export async function getUserMetrics(
  req: GetUserMetricRequest,
  res: GetUserMetricResponse,
) {
  const token = req.cookies.access_token

  if (!token) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const decoded = req.jwt.verify<UserPayload>(token)
  const tokenUserId = decoded.id

  const userId = req.params.userId

  if (userId !== tokenUserId) {
    return MealsErrors.notFoundOrInvalidPass(res)
  }

  const allMeals = await knex('meals').where('userId', tokenUserId)

  const totalMeals = allMeals.length
  const totalMealsOnDiet = allMeals.filter((meal) => meal.isOnDiet).length
  const totalMealsOffDiet = allMeals.filter((meal) => !meal.isOnDiet).length
  const bestSequenceOnDiet = allMeals.reduce((acc, meal) => {
    if (meal.isOnDiet) {
      acc += 1
    } else {
      acc = 0
    }

    return acc
  }, 0)

  const userMetrics = {
    userId: tokenUserId,
    totalMeals,
    totalMealsOnDiet,
    totalMealsOffDiet,
    bestSequenceOnDiet,
  }

  console.log(userMetrics)

  return res.status(200).send(userMetrics)
}
