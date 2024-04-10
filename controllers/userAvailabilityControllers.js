const UserAvailability = require("../models/userAvailabilityModel");

const getAllUserAvailabilities = async (req, res, next) => {
  try {
    const userAvailabilities = await UserAvailability.find({});

    res.status(200).json({
      success: { message: "Found all user availabilities!" },
      data: userAvailabilities,
    });
  } catch (error) {
    next(error);
  }
};

const getUserAvailabilityByUserId = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      error: { message: "User id is required!" },
    });
  }

  try {
    const userAvailability = await UserAvailability.findOne({ userId });

    if (!userAvailability) {
      return res.status(400).json({
        error: { message: "There is no user availability for this user" },
      });
    }

    res.status(200).json({
      success: { message: "User availability found!" },
      data: userAvailability,
    });
  } catch (error) {
    next(error);
  }
};

const createUserAvailability = async (req, res, next) => {
  const { userId } = req.params;
  const { timezone } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: { message: "User id is required" },
    });
  }

  if (!timezone) {
    return res.status(400).json({
      error: { message: "Timezone is required" },
    });
  }

  try {
    const userAvailability = await UserAvailability.findOne({ userId });

    if (userAvailability) {
      return res.status(400).json({
        error: { message: "User availability already exist!" },
        data: userAvailability,
      });
    }

    const newUserAvailability = new UserAvailability({
      userId,
      timezone,
    });

    await newUserAvailability.save();

    res.status(201).json({
      success: { message: "A new user availability is created" },
      data: newUserAvailability,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserAvailability = async (req, res, next) => {
  const { userId } = req.params;
  const { date, availableTimes } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: { message: "User id is required!" },
    });
  }

  if (!date || !availableTimes) {
    return res.status(400).json({
      error: { message: "Date or times are not selected!" },
    });
  }

  try {
    const userAvailability = await UserAvailability.findOne({ userId });

    if (!userAvailability) {
      return res.status(400).json({
        error: { message: "There is no user availability for that user id!" },
      });
    }

    const availability = userAvailability.availabilities.find(
      (availability) => new Date(availability.date).getTime() === date
    );

    if (availability) {
      availability.availableTimes.push(availableTimes);
    } else {
      userAvailability.availabilities.push({
        date,
        availableTimes: availableTimes,
      });
    }

    await userAvailability.save();

    res.status(200).json({
      success: { message: "User availability added!" },
      data: userAvailability,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserAvailabilityEvents = async (req, res, next) => {
  const { userId } = req.params;
  const { eventId } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: { message: "User id is required!" },
    });
  }

  if (!eventId) {
    return res.status(400).json({
      error: { message: "Event id is required!" },
    });
  }

  try {
    const userAvailability = await UserAvailability.findOneAndUpdate(
      { userId },
      { $addToSet: { events: eventId } },
      { new: true }
    );

    if (!userAvailability) {
      return res.status(400).json({
        error: { message: "There is no user availability!" },
      });
    }

    res.status(200).json({
      success: { message: "User availability event is updated!" },
      data: userAvailability,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserAvailabilityTimezone = async (req, res, next) => {
  const { userId } = req.params;
  const { timezone } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: { message: "User id is required!" },
    });
  }

  if (!timezone) {
    return res.status(400).json({
      error: { message: "Timezone is required" },
    });
  }

  try {
    const userAvailability = await UserAvailability.findOneAndUpdate(
      { userId },
      { $set: { timezone } },
      { new: true }
    );

    if (!userAvailability) {
      return res.status(400).json({
        error: { message: "There is no user availability" },
      });
    }

    res.status(200).json({
      success: { message: "User availability timezone is updated!" },
      data: userAvailability,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserAvailability = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      error: { message: "User id is required!" },
    });
  }

  try {
    await UserAvailability.findOneAndDelete({ userId });

    res.status(204).json({
      success: { message: "User availability is deleted!" },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUserAvailabilities,
  getUserAvailabilityByUserId,
  createUserAvailability,
  updateUserAvailability,
  updateUserAvailabilityEvents,
  updateUserAvailabilityTimezone,
  deleteUserAvailability,
};
