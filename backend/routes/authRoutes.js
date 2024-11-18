const express = require("express");
const {signup, login, logout} = require('../controllers/authController');
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// Public Routes (Login and Signup)

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user', protect, (req, res) => {
    res.send({userId: req.user.id, email: req.user.email});
})


module.exports = router;
