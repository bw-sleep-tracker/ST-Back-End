const db = require("../data/dbconfig");

module.exports = {
  add,
  find,
  findById,
  findBy
};

function find() {
  return db("users").select("id", "username", "password");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

async function findBy(filter) {
  const result = await db("users")
    .where(filter)
    .first();
  return result;
}
