import { FastifyInstance } from 'fastify'
import { $ref } from './user.schema'
import { createUser, getUsers, login } from './user.service'

export async function userController(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [app.authenticate],
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
          201: $ref('loginResponseSchema'),
        },
      },
    },
    login,
  )
}
