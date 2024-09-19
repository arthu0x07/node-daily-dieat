import { FastifyReply } from 'fastify'

export class MealsErrors extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MealsError'
  }

  static internalError(res: FastifyReply) {
    return res.code(500).send({
      message: 'Metrics cannot be generated',
    })
  }

  static notFoundOrInvalidPass(res: FastifyReply) {
    return res.code(404).send({
      message: 'Meals cannot be found or data is invalid',
    })
  } // colocar em um arquivo separado de erros genéricos
}
