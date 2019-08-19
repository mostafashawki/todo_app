const express = require("express");
const router = express.Router();
const fs = require("fs");
const checkAuth = require("../middleware/authChecker");
const scanFile = require("../middleware/scan");
const shortid = require("shortid");

//with checkAuth and scanFile virustotal
// @route   POST
// @desc    upload new doc
// @access  private
// router.post("/upload", checkAuth, scanFile, (req, res) => {
//   const fileId = shortid.generate;
//   fs.writeFile(`../db/docs_db/file/${fileId}`, req.files.file.data, function(
//     err
//   ) {
//     if (err) return res.json(err);
//     console.log("Saved!");
//     req.json(fileId);
//   });
// });

router.post("/upload", (req, res) => {
  console.log("upload works");
  const fileId = "id2";
  console.log("#######FILES ", req.files);
  console.log("*******DATA ", req.body.data);
  const data = JSON.parse(req.body.data);
  fs.writeFile(
    `../db/docs_db/file/${data.fileId}`,
    req.files.file.data,
    function(err) {
      if (err) return res.json(err);
      console.log("Saved!");
      res.json(fileId);
    }
  );
});

//////////////////////////////////////////////////////////
/////////////////end docs////////////////////
/////////////////////////////////////////////////////////

module.exports = router;
