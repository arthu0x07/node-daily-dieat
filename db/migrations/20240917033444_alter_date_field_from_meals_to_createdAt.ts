import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const columnExists = await knex.schema.hasColumn('meals', 'date')

  if (columnExists) {
    await knex.schema.table('meals', (table) => {
      table.renameColumn('date', 'createdAt')
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  const columnExists = await knex.schema.hasColumn('meals', 'createdAt')

  if (columnExists) {
    await knex.schema.table('meals', (table) => {
      table.renameColumn('createdAt', 'date')
    })
  }
}
