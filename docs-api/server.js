const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();
app.use(helmet());
app.use(cors());
const port = 9090;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));
app.use(bodyParser.json());

//don't forget also to increase nginx limit
// sudo nano /etc/nginx/nginx.conf
// client_max_body_size 20M;
// Restart nginx to apply the changes.
// sudo service nginx restart
//to read the file uploaded
// app.use(fileUpload());
app.use(
  fileUpload({
    limits: {
      fileSize: 5 * 1024 * 1024 //2MB max file(s) size
    }
  })
);

app.get("/", (req, res) => {
  console.log("I am the doc api");
  res.send("Hello World!, I am DOCS api");
});

const docs = require("./routes/docs");
// create our router
const router = express.Router();

// REGISTER OUR ROUTES -------------------------------
app.use("/", router);
// Use Routes
app.use("/", docs);

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////start error handling middleware/////////////
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

app.listen(port, () =>
  console.log(`Server is running - docs api - on port ${port}!`)
);

module.exports = app;
