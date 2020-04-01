exports.up = function(knex) {
  return knex.schema.createTable('deactivated_user', function(t) {
    t.integer('id_user')
      .unsigned()
      .notNull();
    t.string('full_name').notNull();
    t.bigInteger('birth_date').notNull();
    t.string('email').notNull();
    t.string('phone_number').notNull();
    t.string('ktp_number').notNull();
    t.string('address').notNull();
    t.string('password').notNull();
    t.string('linkedin_url').notNull();
    t.string('username').notNull();
    t.integer('point');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('deactivated_user');
};
