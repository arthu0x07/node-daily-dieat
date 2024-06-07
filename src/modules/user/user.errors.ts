import { FastifyReply } from 'fastify'

export class UserErrors extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserError'
  }

  static alreadyExists(res: FastifyReply) {
    return res.code(409).send({
      message: 'User already exists with this email',
    })
  }

  static internalError(res: FastifyReply) {
    return res.code(500).send({
      message: 'User cannot be created',
    })
  }

  static notFoundOrInvalidPass(res: FastifyReply) {
    return res.code(404).send({
      message: 'User cannot be found or Password is invalid',
    })
  }

  static anyUserFound(res: FastifyReply) {
    return res.code(404).send({
      message: 'Any users can be be found',
    })
  }
}
