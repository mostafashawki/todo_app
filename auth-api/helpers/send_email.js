const nodemailer = require("nodemailer");

//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////////////////////////////////////////////
/////////////////send email function//////////////
//////////////////////////////////////////////////
const sendEmail = function(to, subject, host, token, callback) {
  const html = `<p><strong>Hi there,</strong></p>
                        <p>Thank you for your registration.</p>
                        <p><a href="https://${host}/auth/verify/index.html?token=${token}" target="_blank">Click here to verify your email account</a></p>

                        <p>&nbsp;</p>
                        <small>Made for better web</small>
                        <p>TODO24X7</p>`;
  const transporter = nodemailer.createTransport({
    host: "your host",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "your-account",
      pass: "password"
    }
  });

  const mailOptions = {
    from: "your-account",
    to: to,
    replyTo: "noreply-account",
    subject: subject,
    text: "",
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      callback();
    } else {
      console.log("Email sent: " + info.response);
      callback();
    }
  });
};

///////////////end send email function///////////////////////

module.exports = sendEmail;
