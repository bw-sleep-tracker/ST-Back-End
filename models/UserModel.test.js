const UserModel = require("./UserModel");
const db = require("../data/dbconfig");
const bcrypt = require("bcryptjs");

describe("TS2: TESTING USERMODEL.JS", () => {
  beforeEach(async () => {
    await db("recommendation").truncate();
    await db("tracker").truncate();
    await db("users").truncate();
  });
  describe("TS2.1:: TEST ADD USER", () => {
    it("TC2.1.1: Test to add a user - check length", async () => {
      const user = {
        username: "g3ram",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users");
      expect(users).toHaveLength(1);
    });

    it("TC2.1.2: Test to add a user - check username", async () => {
      const user = {
        username: "g3ram",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users").first();
      expect(users.username).toBe("g3ram");
    });
  });

  describe("TS2.2:: GET ALL USERS (find)", () => {
    it("TC2.2.1: Test to get all users", async () => {
      let user = {
        username: "g3ram",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);

      user = {
        username: "joshc",
        password: bcrypt.hashSync("password", 10),
        email: "josh@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users");
      expect(users).toHaveLength(2);
    });
  });

  describe("TS2.3:: GET USER BY ID (findById)", () => {
    it("TC2.3.1: Test to get a user by id", async () => {
      let user = {
        username: "g3ram",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);

      user = {
        username: "joshc",
        password: bcrypt.hashSync("password", 10),
        email: "josh@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await UserModel.findById(1);
      expect(users.id).toBe(1);
      expect(users.username).toBe("g3ram");
    });
  });
});
