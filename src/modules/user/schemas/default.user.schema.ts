// user.schema.ts
import { z } from 'zod'

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

const createUserResponseSchema = userSchema

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const loginResponseSchema = z.object({
  accessToken: z.string(),
})

const usersListSchemaResponse = z.array(userSchema)

export {
  userSchema,
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
  usersListSchemaResponse,
}
