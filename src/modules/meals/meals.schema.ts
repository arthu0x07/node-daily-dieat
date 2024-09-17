import { buildJsonSchemas } from 'fastify-zod'
import {
  mealSchemaInput,
  mealSchemaResponse,
  mealsListSchemaResponse,
  getMealByIdQuerySchema,
  deleteMealByIdQuerySchema,
} from './schemas/default.meals.schema'

const { schemas: mealsSchemas, $ref } = buildJsonSchemas(
  {
    mealSchemaInput,
    mealSchemaResponse,
    mealsListSchemaResponse,
    getMealByIdQuerySchema,
    deleteMealByIdQuerySchema,
  },
  {
    $id: 'meals',
  },
)

export { mealsSchemas, $ref }
