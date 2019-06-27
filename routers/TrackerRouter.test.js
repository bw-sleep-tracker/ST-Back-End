const req = require("supertest");
const GamesRouter = require("./UserRouter");
const server = require("../api/server");
const db = require("../data/dbconfig");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const TrackerModel = require("../models/TrackerModel");

describe("TS6: TESTING TRACKER ROUTER", () => {
  beforeEach(async () => {
    await db("users").truncate();
    await db("tracker").truncate();
  });
  describe("TS6.1: TESTING GET TRACKER FOR USER ID", () => {
    it("TC6.1.1: TESTING GET TRACKER FOR USER ID SUCCESS", async () => {
      let user = {
        username: "tester1",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      const users = await UserModel.add(user);

      const userTracker = {
        user_id: users.id,
        date: "06/27/2019",
        start_sleep_time: "22:00",
        end_sleep_time: "06:00",
        day_emotion: 4,
        sleep_emotion: 3,
        month: 6,
        day: 20,
        year: 2019
      };

      const trackingInfo = await TrackerModel.add(userTracker);

      const loginCred = { username: "tester1", password: "password" };
      let authToken = "";
      await req(server)
        .post("/login")
        .send(loginCred)
        .then(res => {
          authToken = JSON.parse(res.text);
        });

      await req(server)
        .get("/tracker/1")
        .set("Authorization", authToken.token)
        .expect(200);
    });
  });

  describe("TS6.2: TESTING ADD TRACKER FOR USER ID", () => {
    it("TC6.2.1: TESTING ADD TRACKER FOR USER ID SUCCESS", async () => {
      let user = {
        username: "tester2",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await UserModel.findBy({ username: "tester2" });
      const userTracker = {
        user_id: users.id,
        date: "06/28/2019",
        start_sleep_time: "22:00",
        end_sleep_time: "06:00",
        day_emotion: 4,
        sleep_emotion: 3,
        month: 6,
        day: 20,
        year: 2019
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
        .post("/tracker/")
        .send(userTracker)
        .set("Authorization", authToken.token)
        .expect(200);
    });
  });

  describe("TS6.3: TESTING UPDATE TRACKER FOR USER ID", () => {
    it("TC6.3.1: TESTING UPDATE TRACKER FOR USER ID SUCCESS", async () => {
      let user = {
        username: "tester3",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await UserModel.findBy({ username: "tester3" });
      let userTracker = {
        user_id: users.id,
        date: "06/29/2019",
        start_sleep_time: "22:00",
        end_sleep_time: "06:00",
        day_emotion: 4,
        sleep_emotion: 3,
        month: 6,
        day: 20,
        year: 2019
      };

      const trackingInfo = await TrackerModel.add(userTracker);

      const loginCred = { username: "tester3", password: "password" };
      let authToken = "";
      await req(server)
        .post("/login")
        .send(loginCred)
        .then(res => {
          authToken = JSON.parse(res.text);
        });

      userTracker = {
        user_id: users.id,
        date: "06/29/2019",
        start_sleep_time: "22:00",
        end_sleep_time: "06:00",
        month: 6,
        day: 29,
        year: 2019
      };
      await req(server)
        .put(`/tracker/`)
        .send(userTracker)
        .set("Authorization", authToken.token)
        .expect(200);
    });
  });

  describe("TS6.4: TESTING DELETE TRACKER FOR USER ID", () => {
    it("TC6.4.1: TESTING DELETE TRACKER FOR USER ID SUCCESS", async () => {
      let user = {
        username: "tester4",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await UserModel.findBy({ username: "tester4" });
      let userTracker = {
        user_id: users.id,
        date: "06/30/2019",
        start_sleep_time: "22:00",
        end_sleep_time: "06:00",
        day_emotion: 4,
        sleep_emotion: 3,
        month: 6,
        day: 30,
        year: 2019
      };

      const trackingInfo = await TrackerModel.add(userTracker);

      const loginCred = { username: "tester4", password: "password" };
      let authToken = "";
      await req(server)
        .post("/login")
        .send(loginCred)
        .then(res => {
          authToken = JSON.parse(res.text);
        });

      await req(server)
        .delete(`/tracker/${users.id}/date/06%2F30%2F2019/year/2019`)
        .send(userTracker)
        .set("Authorization", authToken.token)
        .expect(200);
    });
  });
});
