const UserModel = require("./UserModel");
const db = require("../data/dbconfig");
const bcrypt = require("bcryptjs");
const TrackerModel = require("./TrackerModel");

describe("TS3: TESTING TRACKERMODEL.JS", () => {
  beforeEach(async () => {
    await db("recommendation").truncate();
    await db("tracker").truncate();
    await db("users").truncate();
  });

  describe("TS3.1:: TEST ADD TRACKER", () => {
    it("TC3.1.1: Test to add a tracker info for a user", async () => {
      //await db("users").truncate();
      const user = {
        username: "tester1",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users").first();

      const userTracker = {
        user_id: users.id,
        date: "06/27/2019",
        start_sleep_time: "22:00",
        end_sleep_time: "06:00",
        day_emotion: 5,
        sleep_emotion: 3,
        month: 6,
        day: 20,
        year: 2019
      };

      const trackingInfo = await TrackerModel.add(userTracker);
      expect(trackingInfo.user_id).toBe(1);
      expect(trackingInfo.date).toBe("06/27/2019");
    });
  });

  describe("TS3.3:: TEST FIND BY USER ID AND DATE", () => {
    it("TC3.3.1: Test to find the tracker info by user id and date", async () => {
      //   await db("tracker").truncate();
      //   await db("users").truncate();
      const user = {
        username: "tester1",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users").first();
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

      const addedTracking = await TrackerModel.add(userTracker);
      const trackingInfo = await TrackerModel.findByUserId(
        addedTracking.user_id
      );
      expect(trackingInfo[0].user_id).toBe(1);
      expect(trackingInfo[0].date).toBe("06/27/2019");
    });
  });

  describe("TS3.3:: TEST FIND BY USER ID AND DATE", () => {
    it("TC3.3.1: Test to find the tracker info by user id and date", async () => {
      //   await db("tracker").truncate();
      //   await db("users").truncate();
      const user = {
        username: "tester1",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users").first();
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

      const addedTracking = await TrackerModel.add(userTracker);
      const trackingInfo = await TrackerModel.findByUserIdAndDate(
        addedTracking.user_id,
        addedTracking.date
      );
      expect(trackingInfo.user_id).toBe(1);
      expect(trackingInfo.date).toBe("06/27/2019");
    });
  });

  describe("TS3.4:: TEST FIND BY USER ID USING DAY, MONTH, YEAR", () => {
    it("TC3.4.1: Test to find the tracker info by user id, day, month, year", async () => {
      //   await db("tracker").truncate();
      //   await db("users").truncate();
      const user = {
        username: "tester1",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users").first();
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

      const addedTracking = await TrackerModel.add(userTracker);
      const trackingInfo = await TrackerModel.findByUserIdDMY(
        addedTracking.user_id,
        addedTracking.day,
        addedTracking.month,
        addedTracking.year
      );
      expect(trackingInfo.user_id).toBe(1);
      expect(trackingInfo.date).toBe("06/27/2019");
      expect(trackingInfo.date).toBe("06/27/2019");
    });
  });
});
