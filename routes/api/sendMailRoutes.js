const router = require('express').Router();
const nodemailer = require('nodemailer');
const { sendMail } = require('../../controllers/sendMailControllers.js');

let transporter = nodemailer.createTransport()

router.post('/', sendMail);

module.exports = router;