const express = require("express");
const router = express.Router();
const Recommendation = require("../models/RecommendationModel");
const { authenticate } = require("../auth/authenticate");

router.get("/:id", authenticate, async (req, res) => {
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

router.get("/:id/month/:month/year/:year", authenticate, async (req, res) => {
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
});

router.post("/", authenticate, async (req, res) => {
  try {
    const postedReco = await Recommendation.add(req.body);
    res.status(201).json(postedReco);
  } catch (error) {
    console.log(`:: RECOMMENDATION ROUTER :: POST :: ERROR :: ${error}`);
    res.status(500).json({
      message: `Sorry, but something went wrong while adding the recommendation information.`
    });
  }
});

router.put("/", authenticate, async (req, res) => {
  try {
    const updatedReco = await Recommendation.update(req.body);
    res.status(201).json(updatedReco);
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
  async (req, res) => {
    try {
      const deletedReco = await Recommendation.remove(
        req.params.id,
        req.params.month,
        req.params.year
      );
      res
        .status(201)
        .json({ message: "The Recommendation was deleted successfully." });
    } catch (error) {
      console.log(`:: RECOMMENDATION ROUTER :: PUT :: ERROR :: ${error}`);
      res.status(500).json({
        message: `Sorry, but something went wrong while updating the recommendation information.`
      });
    }
  }
);

module.exports = router;
