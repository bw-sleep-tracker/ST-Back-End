exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    //COLUMN_NAE: ID
    users.increments();

    //COLUMN_NAME:USERNAME
    users
      .string("username", 128)
      .notNullable()
      .unique();

    //COLUMN_NAME:PASSWORD
    users.string("password", 128).notNullable();

    //COLUMN_NAME:EMAIL
    users.string("email", 128).notNullable();

    //COLUMN_NAME:FIRST NAME
    users.string("first_name", 128).notNullable();

    //COLUMN_NAME:LAST NAME
    users.string("last_name", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
