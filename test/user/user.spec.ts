import request from 'supertest'
import { expect, it, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import { app } from '@/app'
import { knex } from '@/database'

describe('User Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new user', async () => {
    const response = await request(app.server)
      .post('/users/register')
      .send({
        email: 'test@gmail.com',
        name: 'Test',
        password: '123456',
      })
      .expect(201)

    expect(response.status).toEqual(201)

    const user = await knex('users').where('email', 'test@gmail.com').first()

    expect(user).toMatchObject({
      email: 'test@gmail.com',
      name: 'Test',
      password: expect.any(String),
    })
  })

  it('should be able to login with a existent user', async () => {
    const registerResponse = await request(app.server)
      .post('/users/register')
      .send({
        email: 'test@gmail.com',
        name: 'Test',
        password: '123456',
      })

    expect(registerResponse.status).toEqual(201)

    await knex('users').where('email', 'test@gmail.com').first()

    const loginResponse = await request(app.server).post('/users/login').send({
      email: 'test@gmail.com',
      password: '123456',
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
})
