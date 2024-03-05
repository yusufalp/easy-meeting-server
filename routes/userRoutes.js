const express = require("express");

const {
  getAllUsers,
  getUserById,
  findUserAndUpdateProfile,
  findUserAndUpdatePassword,
} = require("../controllers/userControllers");

const { isAuthenticated } = require("../middleware");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);

router.put("/:userId/profile", findUserAndUpdateProfile);
router.put("/:userId/password", isAuthenticated, findUserAndUpdatePassword);

module.exports = router;
