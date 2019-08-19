const jwt = require("jsonwebtoken");
const config = require("../config");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token sent is: ", token);
    const decoded = jwt.verify(token, config.secret);
    req.userData = decoded;
    next();
  } catch (err) {
    console.log("unauth------ ", err);
    return res.status(401).json("unauth");
  }
};
