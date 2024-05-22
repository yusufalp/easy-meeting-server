const express = require("express");

const {
  getAllEvents,
  getEventById,
  getAllEventsByOwnerId,
  createEvent,
  updateEventTitle,
  updateEventParticipants,
  updateEventTimeSlots,
  archiveEvent,
  deleteEvent,
} = require("../controllers/eventControllers");
const { authenticateJWT } = require("../middleware");

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:eventId", getEventById);
router.get("/owner/:ownerId", getAllEventsByOwnerId);

router.post("/", authenticateJWT, createEvent);

router.put("/:eventId/title", updateEventTitle);
router.put("/:eventId/participants", updateEventParticipants);
router.put("/:eventId/timeSlots", updateEventTimeSlots);
router.put("/:eventId/archive", archiveEvent);

router.delete("/:eventId", authenticateJWT, deleteEvent);

module.exports = router;
