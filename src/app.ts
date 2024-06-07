// index.ts
import fastify from 'fastify'
import { userController } from '@/modules/user/user.controller'
import { userSchemas } from '@/modules/user/user.schema'
import { authenticate } from '@/auth/jwt-strategy'
import { configureJWT } from '@/auth/jwt-register'

export const app = fastify()

for (const schema of [...userSchemas]) {
  app.addSchema(schema)
}

configureJWT(app)

app.decorate('authenticate', authenticate)

app.register(userController, { prefix: '/users' })
