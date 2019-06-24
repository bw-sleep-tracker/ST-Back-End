const db = require("../data/dbconfig");

module.exports = {
  findByUserId,
  add,
  findByUserIdAndDate,
  findByUserIdAndMonth,
  findByUserIdAndYear
};

function findByUserId(id) {
  return db("tracker").where({ user_id: id });
}

async function add(tracker) {
  const [id] = await db("tracker").insert(tracker);
  return findByUserIdAndDate(tracker.user_id, tracker.date);
}

async function findByUserIdAndDate(id, date) {
  const result = await db("tracker")
    .where({ user_id: id, date: date })
    .first();
  return result;
}

function findByUserIdAndMonth(id, month) {
  return db("tracker").where({ user_id: id, month: month });
}

function findByUserIdAndYear(id, year) {
  return db("tracker").where({ user_id: id, year: year });
}

// async function findBy(filter) {
//   const result = await db("users")
//     .where(filter)
//     .first();
//   return result;
// }

// async function update(id, user) {
//   const result = await db("users")
//     .where({ id })
//     .update(user)
//     .then(count => (count > 0 ? this.findById(id) : null));
//   return result;
// }
