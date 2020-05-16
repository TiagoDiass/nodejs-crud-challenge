
exports.up = knex => {
    return knex.schema.createTable('equipments', (table) => {
        table.increments('id');
        table.string('model').notNullable();
        table.string('category').notNullable();
        table.integer('ppm').nullable();
        table.boolean('wifi').nullable();
        table.decimal('consumption').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('equipments');
};

