const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for event"],
    },
    description: {
      type: String,
      required: [true, "Set description for event"],
    },
    organizer: {
      type: String,
      required: [true, "Set organizer for event"],
    },
    event_date: {
      type: Date,
      required: [true, "Set date time for event"],
    },
  },
  { versionKey: false, timestamps: false }
);

eventSchema.post("save", handleMongooseError);

const Event = model("event", eventSchema);

module.exports = module.exports = { Event };
