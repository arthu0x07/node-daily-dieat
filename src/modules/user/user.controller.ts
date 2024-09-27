import { FastifyInstance } from 'fastify'
import { createUser, getUsers, login } from './user.service'
import { $ref } from './user.schema'

export async function userController(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [app.authenticate],
      schema: {
        response: {
          200: $ref('usersListSchemaResponse'),
        },
      },
    },
    getUsers,
  )

  app.post(
    '/register',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    createUser,
  )

  app.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          200: $ref('loginResponseSchema'),
        },
      },
    },
    login,
  )
}
