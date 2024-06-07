// jwt-register.ts
import JWT from '@fastify/jwt'
import fCookie, { FastifyCookieOptions } from '@fastify/cookie'
import { FastifyInstance } from 'fastify'
import { env } from '@/env'

export function configureJWT(app: FastifyInstance) {
  app.register(JWT, {
    secret: {
      private: Buffer.from(env.JWT_PRIVATE_KEY, 'base64'),
      public: Buffer.from(env.JWT_PUBLIC_KEY, 'base64'),
    },
    sign: { algorithm: 'RS256' },
    cookie: {
      cookieName: 'access_token',
      signed: true,
    },
  })

  app.addHook('preHandler', (req, res, next) => {
    req.jwt = app.jwt
    return next()
  })

  app.register(fCookie, {
    hook: 'preHandler',
  } as FastifyCookieOptions)
}
