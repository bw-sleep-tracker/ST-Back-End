const db = require("../data/dbconfig");

module.exports = {
  findByUserId,
  add,
  findByUserIdAndDate,
  findByUserIdAndMonth,
  findByUserIdAndYear,
  findByLimitOrder,
  update,
  remove
};

function findByUserId(id) {
  return db("tracker").where({ user_id: id });
}

async function add(tracker) {
  await db("tracker").insert(tracker);
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

function findByLimitOrder(id, limit, order) {
  return db("tracker")
    .where({ user_id: id })
    .limit(limit)
    .orderBy("date", order);
}

async function update(tracker) {
  const result = await db("tracker")
    .where({ user_id: tracker.user_id, date: tracker.date })
    .update(tracker)
    .then(count =>
      count > 0 ? this.findByUserIdAndDate(tracker.user_id, tracker.date) : null
    );
  return result;
}

async function remove(id, month, year, day) {
  return db("tracker")
    .where({ user_id: id, month: month, year: year, day: day })
    .del();
}
