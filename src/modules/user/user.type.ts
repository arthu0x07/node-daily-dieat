// user.types.ts
import { z } from 'zod'
import {
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
  usersListSchemaResponse,
} from './schemas/default.user.schema'

export type CreateUserRequest = z.infer<typeof createUserSchema>
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>
export type LoginRequest = z.infer<typeof loginSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
export type UsersListResponse = z.infer<typeof usersListSchemaResponse>
