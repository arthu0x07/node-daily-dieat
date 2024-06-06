import { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from 'crypto'
import { hash } from 'bcrypt'

import { knex } from '@/database'
import { CreateUserInput } from './user.schema'
import { UserErrors } from './user.errors'

export async function createUser(
  req: FastifyRequest<{ Body: CreateUserInput }>,
  res: FastifyReply,
) {
  const { password, email, name } = req.body

  const isUserExists = await knex('users').where('email', email).select('*')

  if (isUserExists.length) {
    return UserErrors.alreadyExists(res)
  }

  const hashPassword = await hash(password, 8)

  const createdUser = await knex('users').insert({
    id: randomUUID(),
    name,
    email,
    password: hashPassword,
  })

  if (!createdUser) {
    return UserErrors.internalError(res)
  }

  res.status(204).send()
}
