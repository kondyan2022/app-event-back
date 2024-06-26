const { HttpError } = require("../utils");

const validateParams = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateParams;
