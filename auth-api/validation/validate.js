const userSchema = require("./user_schema");
const Joi = require("@hapi/joi");
module.exports = (req, res, next) => {
  //delete the token, no need (to be valide in userSchema)
  delete req.body.token;
  //to save in timestamp unix utc
  req.body.lastUpdate = new Date();
  const result = Joi.validate(req.body, userSchema);
  if (result.error) {
    console.log(result);
    console.log("invalid");
    res.status(422).json("invalid");
  } else {
    next();
  }
};
