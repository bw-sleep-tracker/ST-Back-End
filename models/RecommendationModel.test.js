const UserModel = require("./UserModel");
const db = require("../data/dbconfig");
const bcrypt = require("bcryptjs");
const RecoModel = require("./RecommendationModel");

describe("TS4: TESTING RECOMMENDATIONMODEL.JS", () => {
  beforeEach(async () => {
    await db("recommendation").truncate();
    await db("tracker").truncate();
    await db("users").truncate();
  });

  describe("TS4.1:: TEST ADD RECOMMENDATION", () => {
    it("TC4.1.1: Test to add a recommendation info for a user", async () => {
      const user = {
        username: "tester1",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users").first();

      const userReco = {
        user_id: users.id,
        month: 6,
        year: 2019,
        recommendation: "Test Reco"
      };

      const recoInfo = await RecoModel.add(userReco);
      expect(recoInfo.recommendation).toBe(userReco.recommendation);
    });
  });

  describe("TS4.2:: TEST UPDATE RECOMMENDATION", () => {
    it("TC4.2.1: Test to update a recommendation info for a user", async () => {
      const user = {
        username: "tester2",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users").first();

      let userReco = {
        user_id: users.id,
        month: 6,
        year: 2019,
        recommendation: "Test Reco"
      };

      const recoInfo = await RecoModel.add(userReco);
      userReco = {
        user_id: users.id,
        month: 6,
        year: 2019,
        recommendation: "Good Sleeping Habbit."
      };

      const updateInfo = await RecoModel.update(userReco);
      expect(updateInfo.recommendation).toBe(userReco.recommendation);
    });
  });

  describe("TS4.3:: TEST DELETE RECOMMENDATION", () => {
    it("TC4.3.1: Test to delete a recommendation info for a user", async () => {
      const user = {
        username: "tester3",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users").first();

      let userReco = {
        user_id: users.id,
        month: 6,
        year: 2019,
        recommendation: "Test Reco"
      };

      await RecoModel.add(userReco);

      userReco = {
        user_id: users.id,
        month: 7,
        year: 2019,
        recommendation: "Test Reco"
      };

      await RecoModel.add(userReco);
      await RecoModel.remove(userReco.user_id, userReco.month, userReco.year);
      const recoInfo = await db("recommendation");
      expect(recoInfo).toHaveLength(1);
    });
  });
});
