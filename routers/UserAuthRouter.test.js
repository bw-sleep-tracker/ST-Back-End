const req = require("supertest");
const GamesRouter = require("./UserRouter");
const server = require("../api/server");
const db = require("../data/dbconfig");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");

describe("TS5: TESTING USER AUTH ROUTER", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("TS5.1: TESTING USER REGISTER", () => {
    it("TC5.1.1: TESTING USER REGISTER SUCCESS", async () => {
      let user = {
        username: "tester1",
        password: "password",
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };

      await req(server)
        .post("/register")
        .send(user)
        .expect(201);
    });
  });

  describe("TS5.2: TESTING USER LOGIN", () => {
    it("TC5.1.1: TESTING USER LOGIN SUCCESS", async () => {
      let user = {
        username: "tester1",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const loginCred = { username: "tester1", password: "password" };
      await req(server)
        .post("/login")
        .send(loginCred)
        .expect(200);
    });
  });
});
