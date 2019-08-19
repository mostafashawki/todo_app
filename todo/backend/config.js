const config = {};

config.mongoURI = {
  //development db
  development: "mongodb://localhost:27017/tododb",
  //testing db
  test: "mongodb://localhost:27017/tododb_test"
};

config.secret = "0aJsVUtE2mXX58KsXYoC";

module.exports = config;
