const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');

const storageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        const bucketPath = path.join(__dirname, '..', 'bucket');
        callback(null, bucketPath);
    },

    filename: function(req, file, callback) {
        const uniqueName = nanoid(8);
        req.fileId = uniqueName;
        callback(null, uniqueName);
    }
});

const uploadMiddleware = multer({
    storage: storageEngine,
    // Question: How to generate limits dynamically 
    // Answer ?? May be we can have multiple middlewares i.e multiple middleware objects
    limits: {
        fileSize: 1000000 * 100
    }
});

module.exports = {
    uploadMiddleware,
};