const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { nanoid } = require('nanoid');

// setting up the storage engine
const storageEngine = multer.diskStorage({
    // bucket folder along with the client and the backend
    destination: (req, file, callback) => {
        const bucketPath = path.join(__dirname, '..', 'bucket');
        const folderId = nanoid(8);
        const masterFolder = path.join(bucketPath, folderId);

        // to access the folder ID in the next route handler (final middleware)
        req.folderId = folderId;

        console.log(masterFolder);

        fs.exists(masterFolder, exists => {
            if (!exists) {
                return fs.mkdir(masterFolder, (err) => callback(err, masterFolder));
            }

            callback(null, masterFolder);
        })
    },

    filename: function(req, file, callback) {
        console.log(file);
        const uniqueName = file.originalname;
        // Date.now() + Math.round(Math.random() * 1E9) + path.extname(file.originalname);

        // err, file_name
        callback(null, uniqueName);
    }
});

// initialise the upload variable
const uploadMiddleware = multer({
    storage: storageEngine,
    // Question: How to generate limits dynamically 
    // Answer ?? May be we can have multiple middlewares i.e multiple middleware objects
    limits: {
        fileSize: 1000000 * 100
    }
});

/*
Way 1 - directly use the uploadMiddleware as the middleware in any route using uploadMiddleware.single('fieldname')
Way 2 [Refer BT] - get the single upload function `upload = uploadMiddleware.single()` and then use the function inside of the main route handler
(req, res) => {
    upload(req, file, err) {

    }
}
*/

module.exports = {
    uploadMiddleware,
};