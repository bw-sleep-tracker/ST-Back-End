const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

router.put("/:id", async (req, res) => {
  try {
    const user = await User.update(req.params.id, req.params.body);
  } catch (error) {}
});
