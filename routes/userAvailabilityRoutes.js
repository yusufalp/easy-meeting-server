const express = require("express");

const {
  getAllUserAvailabilities,
  getUserAvailabilityByUserId,
  createUserAvailability,
  updateUserAvailability,
  updateUserAvailabilityEvents,
  updateUserAvailabilityTimezone,
  deleteUserAvailability,
} = require("../controllers/userAvailabilityControllers");
const { authenticateJWT } = require("../middleware");

const router = express.Router();

router.get("/", getAllUserAvailabilities);
router.get("/:userId", getUserAvailabilityByUserId);

router.post("/:userId", authenticateJWT, createUserAvailability);

router.put("/:userId", updateUserAvailability);
router.put("/:userId/events", updateUserAvailabilityEvents);
router.put("/:userId/timezone", updateUserAvailabilityTimezone);

router.delete("/:userId", authenticateJWT, deleteUserAvailability);

module.exports = router;
