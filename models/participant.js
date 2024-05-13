const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../utils");

const participantSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Set full name for participant"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    birthday: {
      type: Date,
      required: [true, "Birthday is required"],
    },
    subscription: {
      type: String,
      enum: ["media", "friends", "myself"],
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
  },
  { versionKey: false, timestamps: false }
);

participantSchema.post("save", handleMongooseError);
const Participant = model("participant", participantSchema);

module.exports = { Participant };
