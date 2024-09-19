import { FastifyInstance } from 'fastify'
import { getUserMetrics } from './user.metrics.service'
import { $ref } from './user-metrics.schema'

export async function userMetricsController(app: FastifyInstance) {
  app.get(
    '/:userId',
    {
      schema: {
        params: $ref('getUserMetricByIdQuerySchema'),
        response: {
          200: $ref('userMetricSchemaResponse'),
        },
      },
    },
    getUserMetrics,
  )
}
