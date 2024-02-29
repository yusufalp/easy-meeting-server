const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  dateRange: {
    start: Date,
    end: Date,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
      participantAvailability: [
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
