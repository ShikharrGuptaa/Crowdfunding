const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contributionSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  contributor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dateContributed: {
    type: Date,
    default: Date.now,
  },
  paymentId: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  paymentMethod: {
    type: String, // To track method of payment (UPI, Card..)
  },
});

module.exports = mongoose.model("Contribution", contributionSchema);
