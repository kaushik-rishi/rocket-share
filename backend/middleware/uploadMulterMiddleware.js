const multer = require('multer')
const path = require('path')

// setting up the storage engine
const storageEngine = multer.diskStorage({
    // bucket folder along with the client and the backend
    destination: path.join(__dirname, '..', 'bucket'),
    filename: function (req, file, callback) {
        // err, file_name
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

// initialise the upload variable
const uploadMiddlware = multer({
    storage: storageEngine
})

/*
Way 1 - directly use the uploadMiddleware as the middleware in any route using uploadMiddleware.single('fieldname')
Way 2 [Refer BT] - get the single upload function `upload = uploadMiddleware.single()` and then use the function inside of the main route handler
(req, res) => {
    upload(req, file, err) {

    }
}
*/

module.exports = {
    uploadMiddlware,
}
