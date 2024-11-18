const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { generateToken } = require("../utils/tokenManager");
require("dotenv").config();

// Signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Checking if user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log(hashedPassword);

    // Creating a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generating JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d", // Token expiration time
    });

    res.cookie("token", token, {
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1Days
      sameSite: "Lax",
    });

    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login Logic
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }

    // Checking password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: `Invalid Password` });
    }

    // Generating a jwt token
    const token = jwt.sign(
      {
        id : user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  res.status(200).json({ message: `Logged out successfully` });
};
