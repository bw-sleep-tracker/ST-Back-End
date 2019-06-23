exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("months").insert([
    {
      description: "Jan"
    },
    {
      description: "Feb"
    },
    {
      description: "Mar"
    },
    {
      description: "Apr"
    },
    {
      description: "May"
    },
    {
      description: "Jun"
    },
    {
      description: "Jul"
    },
    {
      description: "Aug"
    },
    {
      description: "Sep"
    },
    {
      description: "Oct"
    },
    {
      description: "Nov"
    },
    {
      description: "Dec"
    }
  ]);
};
