const nodemailer = require('nodemailer');

// Use Nodemailer and handle the post request and send the mail
async function sendMail(req, res, next) {
	
}

sendMail().catch(console.error);

module.exports = {
	sendMail
}