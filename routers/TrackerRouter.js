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
      const monthlyTracker = await Tracker.findByUserIdAndMonth(
        req.user.id,
        req.params.month
      );
      res.status(200).json(monthlyTracker);
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
      const yearlyTracker = await Tracker.findByUserIdAndYear(
        req.user.id,
        req.params.year
      );
      res.status(200).json(yearlyTracker);
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
