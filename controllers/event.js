const { Event } = require("../models");
const { HttpError, ctrlWrapper } = require("../utils");

const getAll = async (req, res, next) => {
  const {
    field = "event_date",
    direction = "desc",
    page = 1,
    limit = 12,
  } = req.query;
  const skip = (page - 1) * limit;
  const data = await Event.find()
    .limit(limit)
    .skip(skip)
    .sort({ [field]: direction });
  const itemCount = await Event.countDocuments();
  const totalPage = Math.ceil(itemCount / limit);
  res.json({
    page,
    limit,
    itemCount,
    totalPage,
    data,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
