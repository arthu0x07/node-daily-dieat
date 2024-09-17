import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const columnExists = await knex.schema.hasColumn('meals', 'data')

  if (columnExists) {
    await knex.schema.table('meals', (table) => {
      table.dropColumn('data')
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  const columnExists = await knex.schema.hasColumn('meals', 'data')

  if (!columnExists) {
    await knex.schema.table('meals', (table) => {
      table.json('data')
    })
  }
}
