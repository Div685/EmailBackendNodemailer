const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();


const { sendEmail } = require("../controllers/emailControllers");

// router.post("/sendEmail", sendEmail);

const nodemailer = require('nodemailer');

var transport = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT, // e.g. smtp.gmail.com
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
}
var transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});

router.post('/sendEmail', (req, res, next) => {
  const email = req.body.email
  const name = req.body.name
  const phoneNumber = req.body.phoneNumber
  const services = req.body.services
  const companyName = req.body.companyName
  const message = req.body.msg
  
  var mailOptionSupport = {
    from: process.env.SMTP_MAIL,
    //from: {
    //	name: req.body.name,
    //	address: email,
    //},
    to: process.env.SMTP_SUPPORT, //'RECEIVING_EMAIL_ADDRESS_GOES_HERE',
    subject: 'Contact form request',
    text: `
		  Name: ${name} 
		  Email: ${email}
		  Phone Number: ${phoneNumber}
		  company Name: ${companyName}
		  Message: ${message}`,
    /*html: `
    <p> <span style="fontWeight:bold"> Name:		</span> ${name} </p>
    <p> <span style="fontWeight:bold"> Email:		</span> ${email} </p>
    <p> <span style="fontWeight:bold"> Phone Number: </span> ${phoneNumber} </p>
    <p> <span style="fontWeight:bold"> Company Name: </span> ${companyName} </p>
    <p> <span style="fontWeight:bold"> Message: 		</span> ${message} </p>
  `*/
  }
  var mailOptionSales = {
    from: process.env.SMTP_MAIL,
    //from: {
    //	name: req.body.name,
    //	address: email,
    //},
    to: process.env.SMTP_SALES, //'RECEIVING_EMAIL_ADDRESS_GOES_HERE',
    subject: 'Contact form request',
    text: `
		  Name: ${name} 
		  Email: ${email}
		  Phone Number: ${phoneNumber}
		  company Name: ${companyName}
		  Message: ${message}`,
    /*html: `
    <p> <span style="fontWeight:bold"> Name:		</span> ${name} </p>
    <p> <span style="fontWeight:bold"> Email:		</span> ${email} </p>
    <p> <span style="fontWeight:bold"> Phone Number: </span> ${phoneNumber} </p>
    <p> <span style="fontWeight:bold"> Company Name: </span> ${companyName} </p>
    <p> <span style="fontWeight:bold"> Message: 		</span> ${message} </p>
  `*/
  }
  console.log(services);
  if(services === 'Support') {
	transporter.sendMail(mailOptionSupport, (err, data) => {
		if (err) {
		  console.log("Error " + err);
		  res.json({
			msg: 'fail'
		  })
		} else {
		  console.log("Email sent successfully");
		  res.json({
			msg: 'success'
		  })
		}
	})
  } else {
	transporter.sendMail(mailOptionSales, (err, data) => {
		if (err) {
		  console.log("Error " + err);
		  res.json({
			msg: 'fail'
		  })
		} else {
		  console.log("Email sent successfully");
		  res.json({
			msg: 'success'
		  })
		}
	})  
  }

})


module.exports = router;
