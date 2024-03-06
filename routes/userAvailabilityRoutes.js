const express = require("express");

const {
  getAllUserAvailabilities,
  getUserAvailabilityByUserId,
  updateUserAvailability,
  updateUserAvailabilityEvents,
  updateUserAvailabilityTimezone,
  createUserAvailability,
  deleteUserAvailability,
} = require("../controllers/userAvailabilityControllers");

const router = express.Router();

router.get("/", getAllUserAvailabilities);
router.get("/:userId", getUserAvailabilityByUserId);

router.put("/:userId", updateUserAvailability);
router.put("/:userId/events", updateUserAvailabilityEvents);
router.put("/:userId/timezone", updateUserAvailabilityTimezone);

router.post("/:userId", createUserAvailability);

router.delete("/:userId", deleteUserAvailability);

module.exports = router;
