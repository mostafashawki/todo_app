const request = require("request");
module.exports = (req, res, next) => {
  var formData = {
    file: req.files.file.data,
    apikey: "yourkey"
  };

  var options = {
    url: "https://www.virustotal.com/vtapi/v2/file/scan",
    formData: formData
  };
  // first post your file to scan
  request.post(options, function(err, res, data) {
    console.log(data);
    let obj = JSON.parse(data);
    console.log(obj.resource);
    //then send the result to get the report
    request(
      `https://www.virustotal.com/vtapi/v2/file/report?apikey=yourkey&resource=${
        obj.resource
      }`,
      function(error, response, body) {
        console.log("error:", error); // Print the error if one occurred
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        console.log("body:", body); // Print the HTML for the Google homepage.
        try {
          const report = JSON.parse(body);
          console.log("final result :)", report.positives);
          if (report.positives > 0) return res.status(401).json("infected");
          else if (report.positives == 0) next();
          else return res.status(401).json("infected");
        } catch (error) {
          return res.json(error);
        }
      }
    );
  });
};
