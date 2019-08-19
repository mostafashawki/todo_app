const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
// const bcrypt = require("bcryptjs");
// const Datastore = require("nedb");
// const jwt = require("jsonwebtoken");
const app = express();
// const db = {};
app.use(helmet());
app.use(cors());
const port = 7711;
const user = require("./routes/user");
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

// create our router
const router = express.Router();
// REGISTER OUR ROUTES -------------------------------
app.use("/", router);
// Use Routes
app.use("/", user);

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
////////////////// error handling middleware//////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  const errors = {};

  errors.message = error.message;
  res.json({ errors });
});
//////////////end error handling middleware////////////////////////

app.listen(port, () => console.log(`Server is running on port ${port}!`));

module.exports = app;
