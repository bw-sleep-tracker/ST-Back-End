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
        username: "tester1",
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
        username: "tester2",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users").first();
      expect(users.username).toBe("tester2");
    });
  });

  describe("TS2.2:: GET ALL USERS (find)", () => {
    it("TC2.2.1: Test to get all users", async () => {
      let user = {
        username: "tester3",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);

      const users = await db("users");
      expect(users).toHaveLength(1);
    });
  });

  describe("TS2.3:: GET USER BY ID (findById)", () => {
    it("TC2.3.1: Test to get a user by id", async () => {
      let user = {
        username: "tester4",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);

      const users = await UserModel.findById(1);
      expect(users.id).toBe(1);
      expect(users.username).toBe("tester4");
    });
  });

  describe("TS2.4:: GET USER BY ANY FILTER (findBy)", () => {
    it("TC2.4.1: Test to get a user by any filter value", async () => {
      let user = {
        username: "tester5",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);

      const users = await UserModel.findBy({ username: "tester5" });
      expect(users.id).toBe(1);
      expect(users.username).toBe("tester5");
    });
  });

  describe("TS2.5:: TEST UPDATE USER", () => {
    it("TC2.5.1: Test to update an user", async () => {
      let user = {
        username: "tester6",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);

      user = {
        username: "tester6",
        first_name: "Gayathri",
        last_name: "Ram"
      };
      await UserModel.update(1, user);
      const users = await UserModel.findBy({ username: "tester6" });
      expect(users.id).toBe(1);
      expect(users.first_name).toBe("Gayathri");
      expect(users.last_name).toBe("Ram");
    });
  });
});
