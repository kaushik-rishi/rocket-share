const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Joi = require('joi');

const UploadSchema = {
    // TODO : Obsolete Resolve 
    // original name and filename are the same
    id: {
        type: DataTypes.STRING,
        primaryKey: true
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

const Upload = db.define('Upload', UploadSchema, {
    timestamps: false
});

function validateUpload(upload) {
    const joiSchema = Joi.object({
        id: Joi
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
            .required(),
        // foriegn keys
        UserId: Joi
            .number()
    });

    return joiSchema.validate(upload);
}

module.exports = {
    Upload,
    validateUpload
};