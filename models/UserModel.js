const db = require("../data/dbconfig");

module.exports = {
  add,
  find,
  findById,
  findBy,
  update
};

function find() {
  console.log(`:: USER-MODEL :: FIND ::`);
  return db("users").select("id", "username", "password");
}

function findById(id) {
  console.log(`:: USER-MODEL :: FINDBYID ::`);
  return db("users")
    .where({ id })
    .first();
}

async function add(user) {
  console.log(`:: USER-MODEL :: ADD ::`);
  await db("users").insert(user);
  console.log(`::ADD VALUE OF ID IS ::`);
  return findBy({ username: user.username });
}

async function findBy(filter) {
  console.log(`:: USER-MODEL :: FINDBY ::`);
  const result = await db("users")
    .where(filter)
    .first();
  return result;
}

async function update(id, user) {
  console.log(`:: USER-MODEL :: UPDATE ::`);
  const result = await db("users")
    .where({ id })
    .update(user)
    .then(count => (count > 0 ? this.findById(id) : null));
  return result;
}
