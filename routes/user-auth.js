const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const jwtKey = require("../auth/secrets");

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

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res
        .status(200)
        .json({ message: `${user.username} is successfully logged in`, token });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

function generateToken(user) {
  const payLoad = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payLoad, jwtKey.jwtSecret, options);
}

module.exports = router;
