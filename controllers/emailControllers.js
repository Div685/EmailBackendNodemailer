const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler( (req, res) => {
  const { name, email, phoneNumber, services, companyName, msg } = req.body;
  console.log(name, email, services);

  var mailOptions = {
    from: email,
    to: process.env.SMTP_MAIL,
    subject: `Received web inquiry from ${name}`,
    text: "Hello,",
    html: `<b>Name: ${name}</b> <b>Phone Number: ${phoneNumber}</b> <b>Company Name: ${companyName}</b> <b>Services requested: ${services} And Message: ${msg}</b>`,

  };

   transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
});

module.exports = {sendEmail };
