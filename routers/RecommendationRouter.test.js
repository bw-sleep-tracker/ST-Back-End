const req = require("supertest");
const GamesRouter = require("./UserRouter");
const server = require("../api/server");
const db = require("../data/dbconfig");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const RecommendationModel = require("../models/RecommendationModel");

describe("TS7: TESTING RECOMMENDATION ROUTER", () => {
  beforeEach(async () => {
    await db("users").truncate();
    await db("recommendation").truncate();
  });
  describe("TS7.1: TESTING GET RECOMMENDATION FOR USER ID", () => {
    it("TC7.1.1: TESTING GET RECOMMENDATION FOR USER ID SUCCESS", async () => {
      let user = {
        username: "tester1",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      const users = await UserModel.add(user);

      const userReco = {
        user_id: users.id,
        month: 6,
        year: 2019,
        recommendation: "No recommendation available"
      };

      const recoInfo = await RecommendationModel.add(userReco);

      const loginCred = { username: "tester1", password: "password" };
      let authToken = "";
      await req(server)
        .post("/login")
        .send(loginCred)
        .then(res => {
          authToken = JSON.parse(res.text);
        });

      await req(server)
        .get("/recommendation/1")
        .set("Authorization", authToken.token)
        .expect(201);
    });
  });

  describe("TS6.2: TESTING ADD RECOMMENDATION FOR USER ID", () => {
    it("TC6.2.1: TESTING ADD RECOMMENDATION FOR USER ID SUCCESS", async () => {
      let user = {
        username: "tester2",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await UserModel.findBy({ username: "tester2" });
      const userReco = {
        user_id: users.id,
        month: 7,
        year: 2019,
        recommendation: "No recommendation available"
      };

      const loginCred = { username: "tester2", password: "password" };
      let authToken = "";
      await req(server)
        .post("/login")
        .send(loginCred)
        .then(res => {
          authToken = JSON.parse(res.text);
        });

      await req(server)
        .post("/recommendation/")
        .send(userReco)
        .set("Authorization", authToken.token)
        .expect(201);
    });
  });

  describe("TS7.3: TESTING UPDATE RECOMMENDATION FOR USER ID", () => {
    it("TC7.3.1: TESTING UPDATE RECOMMENDATION FOR USER ID SUCCESS", async () => {
      let user = {
        username: "tester3",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await UserModel.findBy({ username: "tester3" });
      let userReco = {
        user_id: users.id,
        month: 8,
        year: 2019,
        recommendation: "No recommendation available"
      };

      const recoInfo = await RecommendationModel.add(userReco);

      const loginCred = { username: "tester3", password: "password" };
      let authToken = "";
      await req(server)
        .post("/login")
        .send(loginCred)
        .then(res => {
          authToken = JSON.parse(res.text);
        });

      userReco = {
        user_id: users.id,
        month: 8,
        year: 2019,
        recommendation: "Some reco available"
      };
      await req(server)
        .put(`/recommendation/`)
        .send(userReco)
        .set("Authorization", authToken.token)
        .expect(201);
    });
  });

  describe("TS7.4: TESTING DELETE RECOMMENDATION FOR USER ID", () => {
    it("TC7.4.1: TESTING DELETE RECOMMENDATION FOR USER ID SUCCESS", async () => {
      let user = {
        username: "tester4",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await UserModel.findBy({ username: "tester4" });
      const userReco = {
        user_id: users.id,
        month: 9,
        year: 2019,
        recommendation: "No recommendation available"
      };

      const recoInfo = await RecommendationModel.add(userReco);

      const loginCred = { username: "tester4", password: "password" };
      let authToken = "";
      await req(server)
        .post("/login")
        .send(loginCred)
        .then(res => {
          authToken = JSON.parse(res.text);
        });

      await req(server)
        .delete(`/recommendation/${users.id}/month/9/year/2019`)
        .send(userReco)
        .set("Authorization", authToken.token)
        .expect(201);
    });
  });
});
