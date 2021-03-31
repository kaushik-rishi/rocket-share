const db = require('../config/db');
const { DataTypes } = require('sequelize');
// const nanoid = require('nanoid');

const Joi = require('joi');

const UploadSchema = {
	// original name and filename are same in this case
    id: {
    	type: DataTypes.STRING,
    	primaryKey: true
    },
    folderid: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
	originalname: {
		type: DataTypes.STRING(100),
		allowNull: false
	},
	encoding: {
		type: DataTypes.STRING,
		allowNull: false
	},
	mimetype: {
		type: DataTypes.STRING,
		allowNull: false
	},
	filename: {
		type: DataTypes.STRING,
		allowNull: false
	},
	size: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
};

const Upload = db.define('Upload', UploadSchema);

function validateUpload(upload) {
	const joiSchema = Joi.object({
		id: Joi
				.string()
				.required(),
		folderid: Joi
				.string()
				.required(),
		originalname: Joi
				.string()
				.max(100)
				.required(),
		encoding: Joi
				.string()
				.required(),
		mimetype: Joi
				.string()
				.required(),
		filename: Joi
				.string()
				.required(),
		size: Joi
				.number()
				.integer()
				.required()
	});

	return joiSchema.validate(upload);
}

module.exports = {
	Upload,
	validateUpload
};