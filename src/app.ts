import fastify from 'fastify'
import { userController } from './modules/user/user.controller'
import { userSchemas } from './modules/user/user.schema'

export const app = fastify()

for (const schema of [...userSchemas]) {
  app.addSchema(schema)
}

app.register(userController, { prefix: '/users' })
