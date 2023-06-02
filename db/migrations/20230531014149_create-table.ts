import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('clientes', (table) => {
    table.uuid('_id').primary()
    table.text('nome').notNullable()
    table.text('sobreNome').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('clientes')
}