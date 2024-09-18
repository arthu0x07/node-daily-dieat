// user.schema.builder.ts
import { buildJsonSchemas } from 'fastify-zod'
import {
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
  usersListSchemaResponse,
} from './schemas/default.user.schema'

const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
    usersListSchemaResponse,
  },
  {
    $id: 'user',
  },
)

export { userSchemas, $ref }
