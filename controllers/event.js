const { HttpError, ctrlWrapper } = require("../utils");

const eventService = require("../services/event");

const getAll = async (req, res, next) => {
  const {
    field = "event_date",
    direction = "desc",
    page = 1,
    limit = 12,
  } = req.query;
  const result = await eventService.getAll(field, direction, page, limit);
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
