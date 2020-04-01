exports.up = function(knex, Promise) {
  return knex.schema.createTable('project_image', function(t) {
    t.increments('id_pImage')
      .unsigned()
      .primary();
    t.integer('id_project').unsigned();
    t.string('imagepath');

    t.foreign('id_project').references('project.id_project');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('project_image');
};
