exports.up = function(knex) {
  return knex.schema.createTable('resource', function(t) {
    t.increments('id_resource')
      .unsigned()
      .primary();
    t.boolean('is_user_allowed').notNull();
    t.boolean('is_admin_allowed').notNull();
    t.string('description');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('resource');
};
