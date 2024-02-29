const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => res.send("<p>Get all events</p>"));
router.get("/:eventId", (req, res, next) =>
  res.send("<p>Get an event by id</p>")
);
router.get("/owner/:ownerId", (req, res, next) =>
  res.send("<p>Get all events by owner id</p>")
);

router.post("/", (req, res, next) => res.send("<p>Create a new even</p>"));
router.post("/:eventId/title", (req, res, next) =>
  res.send("<p>Find an event by id and update title</p>")
);
router.post("/:eventId/participants", (req, res, next) =>
  res.send("<p>Find an event by id and update the participants list</p>")
);

router.delete("/:eventId", (req, res, next) =>
  res.send("<p>Delete an event</p>")
);

module.exports = router;