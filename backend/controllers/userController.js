const mongoose = require("mongoose");

// userController.js
const User = require("../models/User"); // Adjust the path according to your structure

// Function to get user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  // console.log("User ID: ", userId);
  // console.log("Is valid ObjectId? ", mongoose.Types.ObjectId.isValid(userId)); // Check if it's a valid ObjectId

  try {
    const user = await User.findById(userId);
    // console.log("user: ", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Exclude sensitive information like password
    const { password, ...userData } = user.toObject();
    // console.log(userData);
    res.status(200).json(userData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", details: error.message });
  }
};
