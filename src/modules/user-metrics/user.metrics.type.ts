import { z } from 'zod'
import {
  userMetricSchema,
  userMetricSchemaInput,
} from './schemas/default.user.metrics.schema'

export type GetUserMetricRequest = z.infer<typeof userMetricSchemaInput>
export type GetUserMetricResponse = z.infer<typeof userMetricSchema>
