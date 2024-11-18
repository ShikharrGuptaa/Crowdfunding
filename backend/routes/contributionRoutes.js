const express = require("express");
const { contributeToEvent } = require("../controllers/contributionController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:eventId/contribute", protect, contributeToEvent);

module.exports = router;
