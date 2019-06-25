const db = require("../data/dbconfig");

module.exports = {
  add,
  find,
  findById,
  findBy,
  update,
  remove
};

function find() {
  console.log(`:: RECOMMENDATION-MODEL :: FIND ::`);
  return db("recommendation");
}

function findById(id) {
  console.log(`:: RECOMMENDATION-MODEL :: FINDBYID ::`);
  return db("recommendation").where({ user_id: id });
}

async function add(recommendation) {
  console.log(`:: RECOMMENDATION-MODEL :: ADD ::`);
  await db("recommendation").insert(recommendation);
  console.log(`::ADD VALUE OF ID IS ::`);
  return findBy({
    user_id: recommendation.user_id,
    year: recommendation.year,
    month: recommendation.month
  });
}

async function findBy(filter) {
  console.log(`:: RECOMMENDATION-MODEL :: FINDBY ::`);
  const result = await db("recommendation")
    .where(filter)
    .first();
  return result;
}

async function update(recommendation) {
  console.log(`:: RECOMMENDATION-MODEL :: UPDATE ::`);
  const result = await db("recommendation")
    .where({
      user_id: recommendation.user_id,
      month: recommendation.month,
      year: recommendation.year
    })
    .update(recommendation)
    .then(count => {
      const filter = {
        user_id: recommendation.user_id,
        month: recommendation.month,
        year: recommendation.year
      };
      if (count > 0) {
        return this.findBy(filter);
      } else {
        return null;
      }
    });
  return result;
}

async function remove(id, month, year) {
  return db("recommendation")
    .where({ user_id: id, month: month, year: year })
    .del();
}
