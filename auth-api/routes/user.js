const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user");
const checkurlToken = require("../middleware/urlTokenChecker");
const validate = require("../validation/validate");

// @route   POST /register
// @desc    register new user
// @access  Public
router.post("/register", validate, user_controller.user_register);

// @route   POST /verify
// @desc    Verify Email
// @access  Public
router.get("/verify/:token", checkurlToken, user_controller.user_verify);

// router.get("/all", (req, res) => {
//   db.users.find({}, (err, users) => {
//     res.json(users);
//   });
// });

// @route   POST /login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", user_controller.user_login);

module.exports = router;
