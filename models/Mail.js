const Joi = require('joi');
const db = require('../config/db');
const { DataTypes } = require('sequelize');
const { isEmail } = require('validator');

const MailSchema = {
	// TODO : composite primary key (or) normalise the tables
	sender: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	reciever: {
		type: DataTypes.STRING,
		allowNull: false,
		validator: {
			isEmail: true
		}
	}
};

const Mail = db.define('Mail', MailSchema, {
	timestamps: false
});

function validateMail(mail) {
	const valSchema = Joi.object({
		sender: Joi
					.string()
					.required()
					.email({ tlds: { allow: false } }),
		reciever: Joi
					.string()
					.required()
					.email({ tlds: { allow: false } })
	});

	return valSchema.validate(mail)
}
/*
(async function() {
	await db.sync({ alter: true });
	let mail = await Mail.create({
		sender: 'rishi.cp01@gmail.com',
		reciever: 'kaushikrishi.m19@iiits.in'
	});

	console.log(mail);
})();
*/

module.exports = {
	Mail,
	validateMail
}