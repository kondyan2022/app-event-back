const { Participant, Event } = require("../models");
const { ctrlWrapper, HttpError } = require("../utils");

const getByEvent = async (req, res, next) => {
  const { event } = req.params;
  const participant = await Participant.find({ event });
  const currentEvent = await Event.findById(event);
  res.json({ participant, event: currentEvent });
};

const add = async (req, res, next) => {
  const { event } = req.params;
  const { birthday, fullname, email, subscription } = req.body;
  const participantAlreadyExist = await Participant.find({ event, email });

  if (participantAlreadyExist.length > 0) {
    throw HttpError(409, "Already exist");
  }
  const participant = await Participant.create({
    birthday,
    fullname,
    email,
    subscription,
    event,
  });
  res.status(201).json(participant);
};

module.exports = {
  add: ctrlWrapper(add),
  getByEvent: ctrlWrapper(getByEvent),
};
