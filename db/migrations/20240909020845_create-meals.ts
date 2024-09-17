import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.uuid('userId').references('users.id').notNullable()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.boolean('isOnDiet').notNullable()
    table.date('createdAt').notNullable()
    table.date('updatedAt').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meals')
}
