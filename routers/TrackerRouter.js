const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const { authenticate } = require("../auth/authenticate");
const Tracker = require("../models/TrackerModel");

router.get("/:id", authenticate, validateUserId, async (req, res) => {
  try {
    const userTracker = await Tracker.findByUserId(req.user.id);
    res.status(200).json(userTracker);
  } catch (error) {
    res.status(500).json({
      message:
        "Sorry, but something went wrong while trying to retrieve the tracker details for the user."
    });
  }
});

router.get(
  "/:id/month/:month",
  authenticate,
  validateUserId,
  async (req, res) => {
    try {
      if (req.user.id && req.params.month) {
        const monthlyTracker = await Tracker.findByUserIdAndMonth(
          req.user.id,
          req.params.month
        );
        res.status(200).json(monthlyTracker);
      } else {
        res
          .status(400)
          .json({ message: `userId or month missing as request paramater.` });
      }
    } catch (error) {
      res.status(500).json({
        message:
          "Sorry, but something went wrong while trying to retrieve the tracker details for the user."
      });
    }
  }
);

router.get(
  "/:id/year/:year",
  authenticate,
  validateUserId,
  async (req, res) => {
    try {
      if (req.user.id && req.params.year) {
        const yearlyTracker = await Tracker.findByUserIdAndYear(
          req.user.id,
          req.params.year
        );
        res.status(200).json(yearlyTracker);
      } else {
        res
          .status(400)
          .json({ message: `userId or year missing as request paramater.` });
      }
    } catch (error) {
      res.status(500).json({
        message:
          "Sorry, but something went wrong while trying to retrieve the tracker details for the user."
      });
    }
  }
);

router.get(
  "/:id/limit/:limit/order/:order",
  authenticate,
  validateUserId,
  async (req, res) => {
    try {
      if (req.user.id && req.params.limit && req.params.order) {
        if (
          req.params.limit !== 0 &&
          req.params.limit !== null &&
          req.params.limit !== "" &&
          (req.params.order === "asc" || req.params.order === "desc")
        ) {
          const limitOrderTracker = await Tracker.findByLimitOrder(
            req.user.id,
            req.params.limit,
            req.params.order
          );
          res.status(200).json(limitOrderTracker);
        } else {
          res.status(400).json({
            message: `The limit value or the order value in the request parameter is not valid.`
          });
        }
      } else {
        res
          .status(400)
          .json({ message: `userId or month missing as request paramater.` });
      }
    } catch (error) {
      res.status(500).json({
        message:
          "Sorry, but something went wrong while trying to retrieve the tracker details for the user."
      });
    }
  }
);

router.post("/", authenticate, async (req, res) => {
  try {
    if (req.body) {
      const userTracker = await Tracker.add(req.body);
      res.status(200).json(userTracker);
    } else {
      res.status(400).json({ message: "Missing tracker information." });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Sorry, but something went wrong while trying to retrieve the tracker details for the user."
    });
  }
});

router.put("/", authenticate, async (req, res) => {
  try {
    const trackerToUpdate = req.body;
    console.log("-----WITHIN PUT ------");
    if (trackerToUpdate.user_id && trackerToUpdate.date) {
      console.log("-----TRACKER TO UPDATE GOOD------");
      const tracker = await Tracker.findByUserIdAndDate(
        trackerToUpdate.user_id,
        trackerToUpdate.date
      );
      if (tracker) {
        console.log("-----TRACKER GOOD ------");
        const trackerUpdated = await Tracker.update(trackerToUpdate);
        res.status(200).json(trackerUpdated);
      } else {
        res.status(404).json({
          message:
            "The tracker information requested to update cannot be found."
        });
      }
    } else {
      res
        .status(400)
        .json({ message: `Tracker is missing userId or date for update.` });
    }
  } catch (error) {
    res.status(500).json({
      message: `Sorry, but something went wrong while trying to update the tracker details for the user.`
    });
  }
});

router.delete(
  "/:id/month/:month/year/:year/day/:day",
  authenticate,
  async (req, res) => {
    try {
      const userId = req.params.id;
      const month = req.params.month;
      const year = req.params.year;
      const day = req.params.day;
      const deleteTracker = await Tracker.remove(userId, month, year, day);
      res.status(200).json({ message: `Tracker info successfully deleted.` });
    } catch (error) {
      res.status(500).json({
        message: `Sorry, but something went wrong while trying to delete the tracker details for the user.`
      });
    }
  }
);

async function validateUserId(req, res, next) {
  if (req.params.id) {
    const userId = req.params.id;
    if (userId !== 0 && userId !== null && userId !== "") {
      const user = await User.findById(userId);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({
          message: "Sorry, unable to retrieve information for this user id."
        });
      }
    } else {
      res.status(400).json({
        message: "The user id provided is either null or empty."
      });
    }
  } else {
    res.status(400).json({
      message:
        "The required user id is not available in the request parameters."
    });
  }
}
module.exports = router;