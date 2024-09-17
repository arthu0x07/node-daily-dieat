import { buildJsonSchemas } from 'fastify-zod'
import {
  mealSchemaInput,
  mealSchemaResponse,
  mealsListSchemaResponse,
  getMealByIdQuerySchema,
} from './schemas/default.meals.schema'

const { schemas: mealsSchemas, $ref } = buildJsonSchemas(
  {
    mealSchemaInput,
    mealSchemaResponse,
    mealsListSchemaResponse,
    getMealByIdQuerySchema,
  },
  {
    $id: 'meals',
  },
)

export { mealsSchemas, $ref }
