const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  isArchived: { type: Boolean, default: false },
  dateRange: {
    start: Date,
    end: Date,
  },
  owner: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    firstName: String,
    lastName: String,
    email: String,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  timeSlots: [
    {
      date: Date,
      participantAvailabilities: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          availableTimes: [
            {
              start: Date,
              end: Date,
            },
          ],
        },
      ],
      commonSlots: [
        {
          start: Date,
          end: Date,
        },
      ],
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
