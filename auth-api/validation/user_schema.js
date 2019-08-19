const Joi = require("@hapi/joi");

//////////validation schema////////////////////
const userSchema = Joi.object().keys({
  _id: Joi.string().max(24),
  email: Joi.string()
    .max(255)
    .email()
    .lowercase()
    .required(),
  password: Joi.string()
    .regex(/^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    .required(),
  name: Joi.string()
    .allow("")
    .max(100),
  avatar: Joi.string()
    .allow("")
    .max(200),
  language: Joi.string().max(10),
  verified: Joi.boolean(),
  host: Joi.string(), //will not saved into db
  lastUpdate: Joi.date()
});
/////////////end validation schema///////////////////
module.exports = userSchema;
