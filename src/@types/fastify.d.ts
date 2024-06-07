import { JWT } from '@fastify/jwt'

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }

  export interface FastifyInstance {
    authenticate: (req: FastifyRequest, reply: FastifyReply) => void
  }
}

type UserPayload = {
  id: string
  email: string
  name: string
}
declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload
  }
}
