const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAvailabilitySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  availabilities: [
    {
      date: Date,
      availableTimes: [
        {
          start: Date,
          end: Date,
        },
      ],
    },
  ],
});

const UserAvailability = mongoose.model(
  "UserAvailability",
  userAvailabilitySchema
);

module.exports = UserAvailability;
