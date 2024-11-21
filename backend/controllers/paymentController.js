const Contribution = require("../models/Contribution");
const Event = require("../models/Event");
const axios = require("axios");
require("dotenv").config();

exports.initiateContribution = async (req, res) => {
  const { eventId, amount, contributorId } = req.body;

  try {
    // Saving a pending contri
    const newContri = new Contribution({
      event: eventId,
      contributor: contributorId,
      amount,
      status: "pending",
    });
    // console.log(amount);

    const savedContri = await newContri.save();

    // LemonSqueezy Checkout session
    const lemonSqueezyResponse = await axios
      .post(
        "https://api.lemonsqueezy.com/v1/checkouts",
        {
          data: {
            type: "checkouts", // Required by LemonSqueezy API
            attributes: {
              checkout_data : {
                custom : {
                  user_id : contributorId,
                }
              }
            },
            relationships: {
              store: {
                data: {
                  type: "stores",
                  id: process.env.LEMON_SQUEEZY_STORE_ID.toString(), // Replace with your actual store ID
                },
              },
              variant: {
                data: {
                  type: "variants",
                  id: "554177", // Replace with your actual product variant ID
                },
              },
            },

          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
        }
      )
      .catch((error) => {
        console.error(
          "API Error: ",
          error.response ? error.response.data : error.message
        );
        throw error;
      });

    const paymentId = lemonSqueezyResponse.data.data.id;

    // Updating Contribution with paymentId
    savedContri.paymentId = paymentId;
    await savedContri.save();

    // Requesting LemonSqueezy checkout URL
    res.json({ url: lemonSqueezyResponse.data.data.attributes.url });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error initiating contribution", error: err.message });
  }
};

exports.paymentWebhook = async (req, res) => {
  const { contributionId, paymentStatus } = req.body.data.attributes.checkout_data.custom;

  try {
    const contribution = await Contribution.findById(contributionId);

    // Update Contribution Status
    contribution.status = paymentStatus === "success" ? "paid" : "failed";
    await contribution.save();

    // Update Event's amountRaised if payment is successful
    if (paymentStatus === "success") {
      const event = await Event.findById(contribution.event);
      event.amountRaised += contribution.amount;
      await event.save();
    }

    res.status(200).json({ message: "Payment status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating payment status", error: err.message });
  }
};

