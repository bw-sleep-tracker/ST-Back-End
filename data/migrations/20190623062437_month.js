exports.up = function(knex, Promise) {
  return knex.schema.createTable("months", tbl => {
    tbl.increments();

    tbl.string("description", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists("months");
};
