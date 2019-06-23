exports.up = function(knex) {
  return knex.schema.createTable("recommendation", tbl => {
    //COLUMN_NAME:USER_ID
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    //COLUMN_NAME:MONTH
    tbl
      .integer("month")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("months")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    //COLUMN_NAME:YEAR
    tbl
      .integer("year")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("years")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    //COLUMN_NAME:RECOMMENDATION
    tbl.string("recommendation", 255).notNullable();

    tbl.primary(["user_id", "month", "year"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("recommendation");
};
