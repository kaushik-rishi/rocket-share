const { uploadMiddleware } = require('../middleware/uploadMulterMiddleware');

const {
    Upload,
    validateUpload
} = require('../models/Upload');

const singleUpload = uploadMiddleware.single('fileupload');

const uploadPost = (req, res, next) => {
    // store the file
    singleUpload(req, res, async(err) => {

        // error while uploading the file
        if (err) {
            console.log(err.message);
            return res.status(500).send({
                ok: false,
                msg: err.message
            });
        }

        const file = req.file;

        if (!file) {
            // bad request
            res.status(400).json({
                ok: false,
                msg: "Something went wrong while uplaoding the file... [The fields should not be empty]"
            });
        } else {
            // save the upload metadata to the server
            let uploadObject = {
                id: req.fileId, // the fileId property was added by the multer singleUpload middleware
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                filename: file.filename,
                size: file.size
                    // TODO : make it dynamic user upload
                    // UserId: 1 
            };

            const { error } = validateUpload(uploadObject);
            console.log(error);
            if (error) return res.status(400).send({
                ok: false,
                msg: error.details[0].message
            });

            // TODO : handle the case when the file upload is a success but the DB fails to store the data
            // - Or have a periodic garbage collector using node-scheduler
            try {
                uploadObject = await Upload.create(uploadObject);
                console.log(uploadObject);
            } catch (err) {
                console.log(err);
                return res.send({
                    ok: false,
                    msg: err.message
                });
            }

            // send success reponse
            return res.status(500).json({
                ok: true,
                msg: 'file uploaded successfully',
                originalname: uploadObject.originalname,
                // TODO : WHEN A GET REQUEST IS MADE TO THIS PATH THE DOWNLOAD PAGE WILL BE RENDERED
                url: `${process.env.APP_ROOT_URL}/download/${uploadObject.id}`
            });
        }
    });
}

module.exports = { uploadPost }