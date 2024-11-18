const Contribution = require("../models/Contribution");
const Event = require("../models/Event");

// Contributing to an Event
exports.contributeToEvent = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;
  const eventId = req.params.eventId; // Passing via URL parameter

  try {
    // Finding the event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: `Event not found` });
    }
    // Checking if the event is still active and can accept contribution
    if(event.status !== 'active'){
      return res.status(400).json({message :`This event is not accepting contributions`});
    }

    // Creating a new contribution
    const newContribution = new Contribution({
      event: eventId,
      contributor: userId,
      amount,
    });

    // Saving contribution
    const savedContribution = await newContribution.save();

    event.amountRaised += amount;
    event.contributors.push(savedContribution.contributor);
    await event.save();

    res.status(201).json({
      message: `Contribution made successfully!`,
      contribution: savedContribution,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Failed to contribute to event`, details: err.message });
  }
};
