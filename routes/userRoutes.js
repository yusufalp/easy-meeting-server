const express = require("express");

const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserPassword,
} = require("../controllers/userControllers");

const { isAuthenticated, authenticateJWT } = require("../middleware");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);

router.put("/:userId/profile", updateUserProfile);
router.put(
  "/:userId/password",
  isAuthenticated,
  authenticateJWT,
  updateUserPassword
);

module.exports = router;
