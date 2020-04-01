exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_picture", function(t) {
    t.increments("id_uPicture")
      .unsigned()
      .primary();
    t.integer("id_user").unsigned();
    t.string("picturepath");

    t.foreign("id_user").references("user.id_user");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_picture");
};
