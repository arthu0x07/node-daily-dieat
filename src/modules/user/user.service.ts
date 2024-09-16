import { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from 'crypto'
import { hash, compare } from 'bcrypt'

import { knex } from '@/database'
import { CreateUserInput, LoginUserInput } from './user.schema'
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

  return res.status(204).send()
}

export async function login(
  req: FastifyRequest<{
    Body: LoginUserInput
  }>,
  res: FastifyReply,
) {
  const { email, password } = req.body

  const userData = (await knex('users').where('email', email).select('*'))[0]

  if (!userData) {
    return UserErrors.notFoundOrInvalidPass(res)
  }

  const isPasswordValid = await compare(password, userData.password)

  if (!isPasswordValid) {
    return UserErrors.notFoundOrInvalidPass(res)
  }

  const payload = {
    id: userData.id,
    email: userData.email,
    name: userData.name,
  }

  console.log('(Login Request Payload)', payload)

  const token = req.jwt.sign(payload)

  res.setCookie('access_token', token, {
    path: '/',
    httpOnly: true,
    secure: true,
  })

  return res.send({ accessToken: token })
}

export async function getUsers(req: FastifyRequest, res: FastifyReply) {
  const usersData = await knex('users').select('*')

  if (!usersData) {
    return UserErrors.anyUserFound(res)
  }

  return res.status(200).send(usersData)
}
