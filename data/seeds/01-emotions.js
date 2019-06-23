exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("emotions").insert([
    {
      description: "1 - Super frown"
    },
    {
      description: "2 - frown"
    },
    {
      description: "3 - happy"
    },
    {
      description: "4 - super happy"
    }
  ]);
};
