const Event = require("../models/eventModel");
const UserAvailability = require("../models/userAvailabilityModel");
const User = require("../models/userModel");

const { generateEventTimeSlots } = require("../utils");

const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});

    res.status(200).json({
      success: { message: "All events found!" },
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      error: { message: "Event id is required!" },
    });
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(400).json({
        error: { message: "There is no event found!" },
      });
    }

    res.status(200).json({
      success: { message: "Event found!" },
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

const getAllEventsByOwnerId = async (req, res, next) => {
  const { ownerId } = req.params;

  if (!ownerId) {
    return res.status(200).json({
      error: { message: "Owner id is required!" },
    });
  }

  try {
    const events = await Event.find({ "owner._id": ownerId });

    if (!events) {
      return res.status(400).json({
        error: { message: "Error while finding events by owner!" },
      });
    }

    res.status(200).json({
      success: { message: "Events found!" },
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  const { title, start, end, ownerId } = req.body;

  if (!ownerId) {
    return res.status(400).json({
      error: { message: "Owner id is required" },
    });
  }

  if (!title || !start || !end) {
    return res.status(400).json({
      error: { message: "All fields are required!" },
    });
  }

  const timeSlots = generateEventTimeSlots(start, end);

  try {
    const owner = await User.findById(ownerId);

    if (!owner) {
      return res.status(400).json({
        error: { message: "There is no user with this owner id!" },
      });
    }

    const newEvent = new Event({
      title,
      dateRange: {
        start,
        end,
      },
      owner: {
        _id: ownerId,
        firstName: owner.firstName,
        lastName: owner.lastName,
        email: owner.email,
      },
      participants: [ownerId],
      timeSlots,
    });

    await newEvent.save();

    const userAvailability = await UserAvailability.findOneAndUpdate(
      { userId: ownerId },
      { $addToSet: { events: newEvent._id } },
      { new: true }
    );

    if (!userAvailability) {
      return res.status(400).json({
        error: { message: "User availability not found!" },
      });
    }

    res.status(201).json({
      success: { message: "Event is created!" },
      data: newEvent,
    });
  } catch (error) {
    next(error);
  }
};

const updateEventTitle = async (req, res, next) => {
  const { eventId } = req.params;
  const { title } = req.body;

  if (!eventId) {
    return res.status(400).json({
      error: { message: "Event id is required!" },
    });
  }

  if (!title) {
    return res.status(400).json({
      error: { message: "Title is required!" },
    });
  }

  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      { title },
      { new: true }
    );
    if (!event) {
      return res.status(400).json({
        error: { message: "There is no event with this id!" },
      });
    }

    res.status(200).json({
      success: { message: "Event title is updated!" },
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

const updateEventParticipants = async (req, res, next) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  if (!eventId) {
    return res.status(400).json({
      error: { message: "Event id is required!" },
    });
  }

  if (!userId) {
    return res.status(400).json({
      error: { message: "User id is required!" },
    });
  }

  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { participants: userId } },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        error: { message: "There is no event with this id!" },
      });
    }

    res.status(200).json({
      success: { message: "Participant is added to the event!" },
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

const archiveEvent = async (req, res, next) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      error: { message: "Event id is required!" },
    });
  }

  try {
    const event = Event.findByIdAndUpdate(
      eventId,
      { $set: { isArchived: true } },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        error: { message: "There is no event found!" },
      });
    }

    res.status(200).json({
      success: { message: "Event is archived!" },
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      error: { message: "Event id is required!" },
    });
  }

  try {
    await Event.findByIdAndDelete(eventId);

    res.status(204).json({
      success: { message: "Event is deleted!" },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  getAllEventsByOwnerId,
  createEvent,
  updateEventTitle,
  updateEventParticipants,
  archiveEvent,
  deleteEvent,
};
