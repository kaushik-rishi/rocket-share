const mongoose = require('mongoose');
const passUtils = require('../utils/passutils');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, },
    date: { type: Date, default: Date.now },
    files_created: {
        type: Array,
        default: []
    }
});

userSchema.pre('save', async function(next) {
    try {
        this.password = await passUtils.pass2hash(this.password);
        next();
    } catch (err) {
        throw new Error('Problem while hashing the password');
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;