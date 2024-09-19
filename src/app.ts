import fastify from 'fastify'
import { authenticate } from '@/auth/jwt-strategy'
import { configureJWT } from '@/auth/jwt-register'
import { userController } from '@/modules/user/user.controller'
import { mealsController } from './modules/meals/meals.controller'
import { userSchemas } from '@/modules/user/user.schema'
import { mealsSchemas } from './modules/meals/meals.schema'
import { userMetricsSchemas } from './modules/user-metrics/user-metrics.schema'
import { userMetricsController } from './modules/user-metrics/user.metrics.controller'

export const app = fastify()

for (const schema of [...userSchemas]) {
  app.addSchema(schema)
}

for (const schema of [...mealsSchemas]) {
  app.addSchema(schema)
}

for (const schema of [...userMetricsSchemas]) {
  app.addSchema(schema)
}

configureJWT(app)

app.decorate('authenticate', authenticate)

app.register(userController, { prefix: '/users' })
app.register(mealsController, { prefix: '/meals' })
app.register(userMetricsController, { prefix: '/metrics' })
