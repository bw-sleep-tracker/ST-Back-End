const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const { authenticate } = require("../auth/authenticate");

router.put("/:id", authenticate, async (req, res) => {
  try {
    const userId = req.params.id;
    const userToUpdate = req.body;
    if (
      userId &&
      (userToUpdate.email || userToUpdate.first_name || userToUpdate.last_name)
    ) {
      const userValid = await User.findById(userId);
      if (userValid) {
        const user = await User.update(userId, userToUpdate);
        res.status(201).json(user);
      } else {
        res
          .status(404)
          .json({ message: `Sorry, but that profile doesn't exist` });
      }
    } else {
      res.status(400).json({ message: `UserId or User object missing.` });
    }
  } catch (error) {
    res.status(500).json({
      message: `Sorry, but something went wrong while updating the user information.`
    });
  }
});

module.exports = router;
