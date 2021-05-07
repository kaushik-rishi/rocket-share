const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    id: { type: String, required: true },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    sender: { type: String, required: false },
    reciever: { type: String, required: false }
});

const File = mongoose.model('file', fileSchema);
module.exports = File;
