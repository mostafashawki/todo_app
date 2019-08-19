const bcrypt = require("bcryptjs");
const Datastore = require("nedb");
const jwt = require("jsonwebtoken");
const db = {};
//user collection
db.users = new Datastore({
  filename: "../db/users_db/users.db",
  autoload: true
});

db.users.loadDatabase();
// Using a unique constraint with the index
db.users.ensureIndex({ fieldName: "email", unique: true }, function(err) {});
const sendEmail = require("../helpers/send_email");
const config = require("../config");

exports.user_register = (req, res, next) => {
  db.users.findOne({ email: req.body.email }, (err, user) => {
    const host = req.body.host;
    // If no document is found, user is null
    if (user) {
      const errors = "Email already exists";
      console.log(errors);
      return res.status(400).json(errors);
    } else {
      console.log("----", req.body);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          delete req.body.host;
          req.body.password = hash;
          db.users.insert(req.body, (err, user) => {
            console.log("finished inserting", user);
            db.users.persistence.compactDatafile;
            //res.json(newDoc);
            const token = jwt.sign(
              {
                email: user.email
              },
              config.secret,
              {
                expiresIn: "1d"
              }
            );

            const to = user.email;
            const subject = `${host} | New Account Registration`;
            sendEmail(to, subject, host, token, () => {
              res.json("done");
            });
          }); //end insert user
        });
      });
    }
  });
};

exports.user_verify = (req, res, next) => {
  console.log("verify works----");
  //authorized
  db.users.update(
    { email: req.userData.email },
    { $set: { verified: true } },
    {},
    (err, numReplaced) => {
      db.users.persistence.compactDatafile;
      console.log(numReplaced);
      res.json("verified");
    }
  );
};

exports.user_login = (req, res, next) => {
  console.log("login works, ->", req.body.email);
  db.users.findOne({ email: req.body.email }, (err, user) => {
    // If no document is found, user is null
    if (user) {
      if (user.verified != true) {
        return res.status(401).json("Email not verified!");
      } else {
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            const token = jwt.sign(
              {
                email: user.email,
                _id: user._id
              },
              config.secret,
              {
                expiresIn: "1h"
              }
            );
            user.token = "Bearer " + token;
            delete user.password;
            console.log("------", user);
            res.json(user);
          } else {
            res.status(401).json("Password incorrect!");
          }
        });
      }
    } else {
      res.status(401).json("Email not found!");
    }
  });
};
