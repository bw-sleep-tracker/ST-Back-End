const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

router.post("/register", (req, res) => {
  let user = req.body;

  //hash the password
  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  User.add(user)
    .then(user => {
      res.status(201).json({ user: user });
    })
    .catch(error => {
      res
        .status(500)
        .json({ ErrorMessage: "There was a problem with registration." });
    });
});

module.exports = router;
