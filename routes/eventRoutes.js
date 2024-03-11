const express = require("express");

const {
  getAllEvents,
  getEventById,
  getAllEventsByOwnerId,
  createEvent,
  updateEventTitle,
  updateEventParticipants,
  deleteEvent,
} = require("../controllers/eventControllers");

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:eventId", getEventById);
router.get("/owner/:ownerId", getAllEventsByOwnerId);

router.post("/", createEvent);

router.put("/:eventId/title", updateEventTitle);
router.put("/:eventId/participants", updateEventParticipants);

router.delete("/:eventId", deleteEvent);

module.exports = router;
