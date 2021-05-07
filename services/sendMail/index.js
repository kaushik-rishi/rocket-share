const nodemailer = require('nodemailer');

async function sendMail(mailOptions) {
	let transporter = nodemailer.createTransport({
		host: process.env.SMTP_SERVER_HOST,
		port: process.env.SMTP_SERVER_PORT,
		secure: false,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASSWORD
		}
	});

	let info = await transporter.sendMail(mailOptions);
	console.log(`Email Sent ${info.messageId}`);
}

/*
sendMail({
	from: 'rishi.cp01@gmail.com',
	to: 'kaushikrishi.m19@iiits.in',
	subject: 'regarding dp.png file',
	text: 'send dp.png text',
	html: '<h1>Send DP.png</h1>'
})
*/
