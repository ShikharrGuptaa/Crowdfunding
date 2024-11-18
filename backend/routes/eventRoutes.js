const express = require("express");
const {protect} = require('../middlewares/authMiddleware');
const {createEvent, getAllEvents, getEventById} = require('../controllers/eventController');
const router = express.Router();


// Protected Route (only logged-in users can create events)

router.get('/', protect, getAllEvents);
router.get('/:id', protect, getEventById);
router.post('/create', protect, createEvent);

module.exports = router;