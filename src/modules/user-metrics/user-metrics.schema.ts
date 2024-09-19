import { buildJsonSchemas } from 'fastify-zod'
import {
  userMetricSchemaInput,
  userMetricSchemaResponse,
  getUserMetricByIdQuerySchema,
  userMetricsListSchemaResponse,
} from './schemas/default.user.metrics.schema'

const { schemas: userMetricsSchemas, $ref } = buildJsonSchemas(
  {
    userMetricSchemaInput,
    userMetricSchemaResponse,
    userMetricsListSchemaResponse,
    getUserMetricByIdQuerySchema,
  },
  {
    $id: 'userMetrics',
  },
)

export { userMetricsSchemas, $ref }
