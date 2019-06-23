exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("years").insert([
    {
      year: 2019,
      description: "2019"
    },
    {
      year: 2020,
      description: "2020"
    },
    {
      year: 2021,
      description: "2021"
    }
  ]);
};
