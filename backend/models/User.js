const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ], //  Events Created By user
  contributions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contribution",
    },
  ], // Contributions made by the user to other Events
});

module.exports = mongoose.model("User", userSchema);
