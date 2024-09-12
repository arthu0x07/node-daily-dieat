// index.ts
import fastify from 'fastify'
import { userController } from '@/modules/user/user.controller'
import { userSchemas } from '@/modules/user/user.schema'
import { mealsController } from './modules/meals/meals.controller'
import { mealsSchemas } from './modules/meals/meals.schema'
import { authenticate } from '@/auth/jwt-strategy'
import { configureJWT } from '@/auth/jwt-register'

export const app = fastify()

for (const schema of [...userSchemas]) {
  app.addSchema(schema)
}

for (const schema of [...mealsSchemas]) {
  app.addSchema(schema)
}

configureJWT(app)

app.decorate('authenticate', authenticate)

app.register(userController, { prefix: '/users' })
app.register(mealsController, { prefix: '/meals' })
