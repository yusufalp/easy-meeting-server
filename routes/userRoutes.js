const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => res.send("<p>Get all users</p>"));
router.get("/:userId", (req, res, next) => res.send("<p>Get a user by id</p>"));

router.put("/:userId/profile", (req, res, next) =>
  res.send("<p>Find a user by id and update their profile</p>")
);


module.exports = router;