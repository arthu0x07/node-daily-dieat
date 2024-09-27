import request from 'supertest'
import { expect, it, beforeAll, afterAll, describe } from 'vitest'
import { app } from '@/app'
import { knex } from '@/database'
import { randomUUID } from 'node:crypto'

describe('User Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new user', async () => {
    const { email, name, password } = {
      email: `test${randomUUID()}@gmail.com`,
      name: 'test',
      password: '123456',
    }

    const response = await request(app.server)
      .post('/users/register')
      .send({
        email,
        name,
        password,
      })
      .expect(201)

    expect(response.status).toEqual(201)

    const user = await knex('users').where('email', email).first()

    expect(user).toMatchObject({
      email,
      name,
      password: expect.any(String),
    })
  })

  it('should be able to login with a existent user', async () => {
    const { email, name, password } = {
      email: `test${randomUUID()}@gmail.com`,
      name: 'test',
      password: '123456',
    }

    const registerResponse = await request(app.server)
      .post('/users/register')
      .send({
        email,
        name,
        password,
      })

    expect(registerResponse.status).toEqual(201)

    await knex('users').where('email', 'test@gmail.com').first()

    const loginResponse = await request(app.server).post('/users/login').send({
      email,
      password,
    })

    expect(loginResponse.status).toEqual(200)

    expect(loginResponse.body.accessToken).toBeDefined()
  })

  it('should not be able to login with a non-existent user', async () => {
    const response = await request(app.server).post('/users/login').send({
      email: 'arthuwashere@gmail.com',
      password: '123456',
    })

    expect(response.status).toEqual(404)
  })

  it('should not be able to login with a wrong password', async () => {
    const { email, name, password } = {
      email: `test${randomUUID()}@gmail.com`,
      name: 'test',
      password: '123456',
    }

    const registerResponse = await request(app.server)
      .post('/users/register')
      .send({
        email,
        name,
        password,
      })

    expect(registerResponse.status).toEqual(201)

    const loginResponse = await request(app.server).post('/users/login').send({
      email,
      password: '1234567',
    })

    expect(loginResponse.status).toEqual(404)
  })
})
