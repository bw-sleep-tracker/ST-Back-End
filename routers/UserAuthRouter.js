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
  if (
    user.username &&
    user.password &&
    user.email &&
    user.first_name &&
    user.last_name
  ) {
    User.add(user)
      .then(user => {
        res.status(201).json({ user: user });
      })
      .catch(error => {
        res.status(500).json({
          message: "Sorry, but something went wrong while registering."
        });
      });
  } else {
    res.status(400).json({
      message: "Please enter all the necessary credentials to register."
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    if (username && password) {
      let user = await User.findBy({ username });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `${user.username} is successfully logged in`,
          token
        });
      } else {
        res
          .status(401)
          .json({ message: "Sorry, incorrect email or password." });
      }
    } else {
      res.status(400).json({
        message: `Submit both an username and password when registering`
      });
    }
  } catch (error) {
    console.log(`::LOGIN ERROR :: IS ${error}`);
    res
      .status(500)
      .json({ message: "Sorry, but something went wrong while logging in." });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res
          .status(400)
          .json({ message: `There was an error logging out the user.` });
      } else {
        res.status(200).json({ message: "Logout successful!" });
      }
    });
  } else {
    res.status(400).json({ message: "you were never here to begin with" });
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
