const Joi = require("joi");

const queryEventSchema = Joi.object({
  field: Joi.string().valid("title", "event_date", "organizer"),
  direction: Joi.string().valid("asc", "desc"),
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
});

module.exports = { queryEventSchema };
