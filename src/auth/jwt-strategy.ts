// jwt-strategy.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import { FastifyJWT as IFastifyJWT } from '@fastify/jwt'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(401).send({ message: 'Authentication required' })
  }

  try {
    const decoded = req.jwt.verify<IFastifyJWT['user']>(token)
    req.user = decoded
  } catch (e) {
    res.status(401).send({
      error: 'Invalid token',
    })
  }
}
