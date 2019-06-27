const req = require("supertest");
const server = require("../api/server");
const db = require("../data/dbconfig");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");

describe("TS4: TESTING USER ROUTER", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("TS4.1: TESTING UPDATE USER", () => {
    it("TC4.1.1: TESTING UPDATE USER SUCCESS", async () => {
      let user = {
        username: "tester1",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const loginCred = { username: "tester1", password: "password" };
      let authToken = "";
      await req(server)
        .post("/login")
        .send(loginCred)
        .then(res => {
          authToken = JSON.parse(res.text);
        });
      let userToUpdate = {
        username: "tester1",
        email: "g3ram@verizon.net",
        first_name: "Gayathri",
        last_name: "Tester_lastName"
      };
      await req(server)
        .put("/user/1")
        .send(userToUpdate)
        .set("Authorization", authToken.token)
        .expect(201);
    });
  });
});
