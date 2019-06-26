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

  describe("TS3.5:: TEST FIND BY USER ID AND MONTH", () => {
    it("TC3.5.1: Test to find by user id and month", async () => {
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
      const trackingInfo = await TrackerModel.findByUserIdAndMonth(
        addedTracking.user_id,
        addedTracking.month
      );
      expect(trackingInfo[0].user_id).toBe(1);
      expect(trackingInfo[0].date).toBe("06/27/2019");
    });
  });

  describe("TS3.6:: TEST FIND BY USER ID AND YEAR", () => {
    it("TC3.6.1: Test to find by user id and year", async () => {
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
      const trackingInfo = await TrackerModel.findByUserIdAndYear(
        addedTracking.user_id,
        addedTracking.year
      );
      expect(trackingInfo[0].user_id).toBe(1);
      expect(trackingInfo[0].date).toBe("06/27/2019");
    });
  });

  describe("TS3.7:: TEST UPDATE TRACKER", () => {
    it("TC3.7.1: Test Update Tracker", async () => {
      const user = {
        username: "tester1",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users").first();
      let userTracker = {
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

      userTracker = {
        user_id: users.id,
        date: "06/27/2019",
        start_sleep_time: "22:00",
        end_sleep_time: "06:00",
        day_emotion: 2,
        sleep_emotion: 1,
        month: 6,
        day: 20,
        year: 2019
      };

      const updateTracker = await TrackerModel.update(userTracker);

      expect(updateTracker.day_emotion).toBe(2);
      expect(updateTracker.sleep_emotion).toBe(1);
    });
  });

  describe("TS3.8:: TEST DELETE TRACKER", () => {
    it("TC3.8.1: Test Delete Tracker", async () => {
      const user = {
        username: "tester1",
        password: bcrypt.hashSync("password", 10),
        email: "g3ram@verizon.net",
        first_name: "Tester_firstName",
        last_name: "Tester_lastName"
      };
      await UserModel.add(user);
      const users = await db("users").first();
      let userTracker = {
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

      await TrackerModel.add(userTracker);

      userTracker = {
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

      await TrackerModel.add(userTracker);
      await TrackerModel.remove(userTracker.user_id, "06/28/2019");
      const tracker = await db("tracker");
      expect(tracker).toHaveLength(1);
    });
  });
});
