exports.up = function(knex) {
  return knex.schema.createTable("tracker", tbl => {
    //COLUMN_NAME:USER_ID
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    //COLUMN_NAME:DATE
    tbl.string("date", 128).notNullable().unique;

    //COLUMN_NAME:START_SLEEP_TIME
    tbl.string("start_sleep_time", 128).notNullable();

    //COLUMN_NAME:END_SLEEP_TIME
    tbl.string("end_sleep_time", 128).notNullable();

    //COLUMN_NAME:DAY_EMOTION
    tbl
      .integer("day_emotion")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("emotions")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    //COLUMN_NAME:SLEEP_EMOTION
    tbl
      .integer("sleep_emotion")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("emotions")
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
      .references("year")
      .inTable("years")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    //COLUMN_NAME:DAY
    tbl
      .integer("day")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("days")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.primary(["user_id", "date"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tracker");
};
