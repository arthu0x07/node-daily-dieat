import { CreateMealRequest } from '@/modules/meals/meals.type'
import { FastifyRequest, FastifyReply } from 'fastify'

export interface GetMealByIdParams {
  id: string
}

export interface DeleteMealByIdParams {
  id: string
}

export interface CreateMealBody extends CreateMealRequest {}

export interface MealResponse {
  id: string
  name: string
  description: string
  isOnDiet: boolean
  createdAt: string
  updatedAt: string
}

export interface UserResponse {
  id: string
  name: string
  email: string
}

export type CreateMealsRequest = FastifyRequest<{
  Body: CreateMealBody
  Params: { id: string }
}>
export type GetMealByIdRequest = FastifyRequest<{ Params: GetMealByIdParams }>
export type DeleteMealByIdRequest = FastifyRequest<{
  Params: DeleteMealByIdParams
}>

export type CreateMealsReply = FastifyReply
export type GetMealByIdReply = FastifyReply
export type DeleteMealByIdReply = FastifyReply

// --

export interface GetUserMetricsByIdParams {
  userId: string
}

export interface UserMetricsResponse {
  userId: string
  totalMeals: number
  totalMealsOnDiet: number
  totalMealsOffDiet: number
  bestSequenceOnDiet: number
}

export type GetUserMetricRequest = FastifyRequest<{
  Params: GetUserMetricsByIdParams
}>
export type GetUserMetricResponse = FastifyReply

export type UserMetricsRequest = FastifyRequest<{
  Params: GetUserMetricsByIdParams
}>
export type UserMetricsReply = FastifyReply
