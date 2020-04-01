exports.up = function(knex) {
  return knex.schema.createTable('admin', function(t) {
    t.increments('id_admin')
      .unsigned()
      .primary();
    t.string('username')
      .notNull()
      .unique();
    t.string('password').notNull();
    t.integer('point');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin');
};
