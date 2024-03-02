const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) =>
  res.send("<p>Get all user availabilities</p>")
);
router.get("/:userId", (req, res, next) =>
  res.send("<p>Get a user availability by user id</p>")
);

router.put("/:userId", (req, res, next) =>
  res.send("<p>Find a user availability by user id and update</p>")
);

router.post("/:userId", (req, res, next) =>
  res.send("<p>Create a new user availability for a user by user id</p>")
);

router.delete("/:userId", (req, res, next) =>
  res.send("<p>Delete a user availability by user id</p>")
);

module.exports = router;
