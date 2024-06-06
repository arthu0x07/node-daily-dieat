import { FastifyInstance } from 'fastify'
import { $ref } from './user.schema'
import { createUser } from './user.service'

export async function userController(app: FastifyInstance) {
  app.get('/', (req, res) => {
    res.send({ message: 'ping' })
  })

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

  app.post('/login', () => {})

  app.delete('/logout', () => {})
}
