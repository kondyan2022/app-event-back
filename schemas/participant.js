const Joi = require("joi");
const { isValidObjectId } = require("../utils");

const addParticipantSchema = Joi.object({
  fullname: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  birthday: Joi.date()
    .required()
    .custom((value, helper) => {
      const checkDate = new Date(value);

      checkDate.setFullYear(value.getFullYear() + 18);
      const nowDate = new Date();
      console.log(nowDate);
      if (nowDate < checkDate) {
        return helper.message(
          `Age must be at least 18 years old, got birth date ${new Date(
            value
          ).toLocaleDateString()}`
        );
      }
      return value;
    }),
  subscription: Joi.string().valid("media", "friends", "myself").required(),
});

const objectIdSchema = Joi.object({
  event: Joi.string()
    .required()
    .custom((value, helper) => {
      if (isValidObjectId(value)) {
        return value;
      }
      return helper.message("Invalid ObjectId parameter");
    }),
});

module.exports = { addParticipantSchema, objectIdSchema };
