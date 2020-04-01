exports.up = function(knex, Promise) {
  return knex.schema.createTable("cv", function(t) {
    t.increments("id_cv")
      .unsigned()
      .notNull();
    t.integer("id_user").unsigned();
    t.string("cvpath");

    t.foreign("id_user").references("user.id_user");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cv");
};
