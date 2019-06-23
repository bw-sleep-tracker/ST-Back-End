exports.up = function(knex, Promise) {
  return knex.schema.createTable("years", tbl => {
    tbl
      .integer("year")
      .notNullable()
      .unique()
      .unsigned();

    tbl.string("description", 255).notNullable();
    tbl.primary(["year"]);
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists("years");
};
