const db = require("../data/dbconfig");

module.exports = {
  findByUserId,
  add,
  findByUserIdAndDate,
  findByUserIdAndMonth,
  findByUserIdAndYear,
  findByLimitOrder,
  update,
  remove,
  findByUserIdDMY,
  findAllByUserIdAndYear
};

function findByUserId(id) {
  return db("tracker")
    .where({ user_id: id })
    .whereIn("day_emotion", [1, 2, 3, 4])
    .whereIn("sleep_emotion", [1, 2, 3, 4])
    .orderBy([
      { column: "year", order: "desc" },
      { column: "month", order: "desc" },
      { column: "day", order: "desc" }
    ]);
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

async function findByUserIdDMY(id, day, month, year) {
  const result = await db("tracker")
    .where({ user_id: id, day: day, month: month, year: year })
    .whereIn("day_emotion", [1, 2, 3, 4])
    .whereIn("sleep_emotion", [1, 2, 3, 4])
    .first();
  return result;
}

function findByUserIdAndMonth(id, month) {
  return db("tracker")
    .where({ user_id: id, month: month })
    .whereIn("day_emotion", [1, 2, 3, 4])
    .whereIn("sleep_emotion", [1, 2, 3, 4])
    .orderBy([
      { column: "year", order: "desc" },
      { column: "month", order: "desc" },
      { column: "day", order: "desc" }
    ]);
}

function findByUserIdAndYear(id, year) {
  return db("tracker")
    .where({ user_id: id, year: year })
    .whereIn("day_emotion", [1, 2, 3, 4])
    .whereIn("sleep_emotion", [1, 2, 3, 4])
    .orderBy([
      { column: "year", order: "desc" },
      { column: "month", order: "desc" },
      { column: "day", order: "desc" }
    ]);
}

// Newly added method - as request by FE
function findAllByUserIdAndYear(id, year) {
  return db("tracker")
    .where({ user_id: id, year: year })
    .orderBy([
      { column: "year", order: "desc" },
      { column: "month", order: "desc" },
      { column: "day", order: "desc" }
    ]);
}

function findByLimitOrder(id, limit, order) {
  return db("tracker")
    .where({ user_id: id })
    .whereIn("day_emotion", [1, 2, 3, 4])
    .whereIn("sleep_emotion", [1, 2, 3, 4])
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

async function remove(id, date) {
  return db("tracker")
    .where({ user_id: id, date: date })
    .del();
}
