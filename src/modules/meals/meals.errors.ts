import { FastifyReply } from 'fastify'

export class MealsErrors extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MealsError'
  }

  static alreadyExists(res: FastifyReply) {
    return res.code(409).send({
      message: 'Meals already exists with this email',
    })
  }

  static internalError(res: FastifyReply) {
    return res.code(500).send({
      message: 'Meals cannot be created',
    })
  }

  static notFoundOrInvalidPass(res: FastifyReply) {
    return res.code(404).send({
      message: 'Meals cannot be found or data is invalid',
    })
  }

  static anyMealsFound(res: FastifyReply) {
    return res.code(404).send({
      message: 'Any Mealss can be be found',
    })
  }
}
