/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('contatos', function (table) {
        table.increments('id').primary();
        table.string('nome', 100).notNullable();
        table.integer('idade').notNullable();
        table.string('relacionamento', 60).notNullable();
        table.string('email', 100).notNullable();
        table.string('telefone', 15).notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('contatos');
};
