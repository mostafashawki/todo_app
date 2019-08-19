const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
//set security headers
app.use(helmet());
const cors = require("cors");
//use cors
app.use(cors());

const todos = require("./routes/todos");
const calfeed = require("./helpers/cal_feed");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// *** config file *** //
const db = require("./config").mongoURI[app.settings.env];

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected: ", app.settings.env))
  .catch(err => console.log(err));

// create our router
const router = express.Router();

const port = process.env.PORT || 7722;

// REGISTER OUR ROUTES -------------------------------
app.use("/", router);
// Use Routes
app.use("/", todos);

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
