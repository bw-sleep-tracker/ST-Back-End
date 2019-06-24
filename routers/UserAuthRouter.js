const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const jwtKey = require("../auth/secrets");

router.post("/register", async (req, res) => {
  try {
    let user = req.body;
    console.log(`:: REGISTER :: REQUEST BODY IS :: ${user}`);
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
      console.log(`:: REGISTER :: REQUEST HAS ALL ELEMENTS::`);
      const userRegistered = await User.add(user);
      console.log(
        `:: REGISTER :: REGISGTERED USER IS :: ${JSON.stringify(
          userRegistered
        )}`
      );
      res.status(201).json({ user: userRegistered });
    } else {
      res.status(400).json({
        message: "Please enter all the necessary credentials to register."
      });
    }
  } catch (error) {
    console.log(`:: REGISTER :: ERROR IS :: ${error}`);
    res.status(500).json({
      message: "Sorry, but something went wrong while registering."
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    if (username && password) {
      console.log(`:: LOGIN :: USER NAME AND PASSWORD CAPTURED SUCCESSFULLY::`);
      let user = await User.findBy({ username });
      console.log(`:: LOGIN :: USER IS FOUND :: ${user}`);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        console.log(`:: LOGIN :: TOKEN GENERATED ::}`);
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
    console.log(`:: LOGIN :: ERROR :: IS ${error}`);
    res
      .status(500)
      .json({ message: "Sorry, but something went wrong while logging in." });
  }
});

router.get("/logout", (req, res) => {
  console.log(`:: LOGGING OUT ::`);
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res
          .status(400)
          .json({ message: `There was an error logging out the user.` });
        console.log(`:: LOGOUT :: ERROR IS :: ${err}`);
      } else {
        console.log(`:: LOGOUT :: LOGOUT SUCCESSFUL ::`);
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
