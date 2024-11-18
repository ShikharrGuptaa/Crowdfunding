const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  goalAmount: {
    type: Number,
    required: true,
  },
  amountRaised: {
    type: Number,
    default: 0,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contributors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contribution",
    },
  ],

  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed", "expired"],
    default: "active",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
