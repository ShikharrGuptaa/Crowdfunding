// userRoutes.js
const express = require("express");
const { getUserById } = require("../controllers/userController"); // Import the controller function
const router = express.Router();

// Route to get user by ID
router.get("/:id", getUserById);

module.exports = router;
