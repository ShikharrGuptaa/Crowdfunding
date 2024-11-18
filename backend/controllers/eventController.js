const Event = require("../models/Event");

// Creating an event
exports.createEvent = async (req, res) => {
  // console.log("In the controller");
  const { title, description, goalAmount, deadline } = req.body;
  const userId = req.user.id;

  try {
    const newEvent = new Event({
      title,
      description,
      goalAmount,
      deadline,
      creator: userId,
    });

    // Saving the event
    const savedEvent = await newEvent.save();
    // console.log(savedEvent);
    res
      .status(201)
      .json({ message: `Event added successfully`, event: savedEvent.title, eventId: savedEvent._id  });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to create an event`, details: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "active" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: `Event Not found` });
    }

    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving event`, details: error.message });
  }
};
