const express = require("express");
const passport = require("passport");

const {
  signupNewUser,
  loginUser,
  logoutUser,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", signupNewUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

module.exports = router;
