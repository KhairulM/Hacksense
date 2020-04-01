exports.up = function(knex) {
  return knex.schema.createTable('applied', function(t) {
    t.increments('id_applied')
      .unsigned()
      .primary();
    t.integer('id_user').unsigned();
    t.integer('id_project').unsigned();
    t.string('status');

    t.foreign('id_user').references('user.id_user');
    t.foreign('id_project').references('project.id_project');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('applied');
};
