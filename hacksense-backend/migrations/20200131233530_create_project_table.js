exports.up = function(knex) {
  return knex.schema.createTable("project", function(t) {
    t.increments("id_project")
      .unsigned()
      .primary();
    t.string("name").notNullable();
    t.text("summary").notNullable();
    t.text("detail").notNullable();
    t.string("status").notNullable();

    t.bigInteger("created_at");
    t.bigInteger("updated_at");
    t.bigInteger("deleted_at");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("project");
};
