const express = require("express");
const router = express.Router();
const Recommendation = require("../models/RecommendationModel");
const { authenticate } = require("../auth/authenticate");
const User = require("../models/UserModel");

router.get("/:id", authenticate, validateUserId, async (req, res) => {
  try {
    const recommendations = await Recommendation.findById(req.params.id);
    res.status(201).json(recommendations);
  } catch (error) {
    console.log(`:: RECOMMENDATION ROUTER :: GET :: ERROR :: ${error}`);
    res.status(500).json({
      message: `Sorry, but something went wrong while retrieving the recommendation information.`
    });
  }
});

router.get(
  "/:id/month/:month/year/:year",
  authenticate,
  validateUserId,
  async (req, res) => {
    try {
      const filter = {
        user_id: req.params.id,
        month: req.params.month,
        year: req.params.year
      };
      const recommendations = await Recommendation.findBy(filter);
      res.status(201).json(recommendations);
    } catch (error) {
      console.log(
        `:: RECOMMENDATION ROUTER :: GET BY ID MONTH YEAR :: ERROR :: ${error}`
      );
      res.status(500).json({
        message: `Sorry, but something went wrong while retrieving the recommendation information.`
      });
    }
  }
);

router.post("/", authenticate, async (req, res) => {
  try {
    if (req.body) {
      const postedReco = await Recommendation.add(req.body);
      res.status(201).json(postedReco);
    } else {
      res.status(400).json({
        message: "Missing recommendation information in request body."
      });
    }
  } catch (error) {
    console.log(`:: RECOMMENDATION ROUTER :: POST :: ERROR :: ${error}`);
    res.status(500).json({
      message: `Sorry, but something went wrong while adding the recommendation information.`
    });
  }
});

router.put("/", authenticate, async (req, res) => {
  try {
    if (req.body) {
      const updatedReco = await Recommendation.update(req.body);
      res.status(201).json(updatedReco);
    } else {
      res.status(400).json({
        message: "Recommendation to be updated is missing in request parameter."
      });
    }
  } catch (error) {
    console.log(`:: RECOMMENDATION ROUTER :: PUT :: ERROR :: ${error}`);
    res.status(500).json({
      message: `Sorry, but something went wrong while updating the recommendation information.`
    });
  }
});

router.delete(
  "/:id/month/:month/year/:year",
  authenticate,
  validateUserId,
  async (req, res) => {
    try {
      if (req.params.id && req.params.month && req.params.year) {
        const deletedReco = await Recommendation.remove(
          req.params.id,
          req.params.month,
          req.params.year
        );
        res
          .status(201)
          .json({ message: "The Recommendation was deleted successfully." });
      } else {
        res
          .status(400)
          .json({
            message:
              "The request parameters - userId, year and month are missing."
          });
      }
    } catch (error) {
      console.log(`:: RECOMMENDATION ROUTER :: PUT :: ERROR :: ${error}`);
      res.status(500).json({
        message: `Sorry, but something went wrong while updating the recommendation information.`
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
