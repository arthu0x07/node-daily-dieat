import 'dotenv/config'
import { config } from 'dotenv'

import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll } from 'vitest'
import { knex } from '@/database'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL_TESTS) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL_TESTS)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)
  process.env.DATABASE_URL = databaseURL
})

afterAll(async () => {
  await knex.raw(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await knex.destroy()
})
