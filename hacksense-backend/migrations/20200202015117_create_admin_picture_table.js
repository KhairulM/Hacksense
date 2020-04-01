exports.up = function(knex, Promise) {
  return knex.schema.createTable("admin_picture", function(t) {
    t.increments("id_aPicture")
      .unsigned()
      .primary();
    t.integer("id_admin").unsigned();
    t.string("picturepath");

    t.foreign("id_admin").references("admin.id_admin");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("admin_picture");
};
