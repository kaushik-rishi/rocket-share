const router = require('express').Router();
const { uploadMiddleware } = require('../../middleware/uploadMulterMiddleware');

const {
    Upload,
    validateUpload
} = require('../../models/Upload');

const singleUpload = uploadMiddleware.single('fileupload');

router.post('/upload', (req, res) => {
    // store the file
    singleUpload(req, res, async(err) => {

        // error while uploading the file
        if (err) {
            return res.status(500).send({
                ok: false,
                err: err.message
            });
        }

        const file = req.file;
        const folderId = req.folderId;

        if (!file) {
            // bad request
            res.status(400).json({
                "ok": false,
                "err": "Something went wrong while uplaoding the file... [The fields should not be empty]"
            });

        } else {
            // save the upload metadata to the server
            let uploadObject = {
                id: folderId,
                folderid: folderId,
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                filename: file.filename,
                size: file.size,
                UserId: 1
            };

            const { error, value } = validateUpload(uploadObject);
            if (error) {
                return res.status(400).send({
                    ok: false,
                    err: error.details[0].message
                })
            }

            // TODO : handle the case when the file upload is a success but the DB fails to store the data
            // - Or have a periodic garbage collector using node-scheduler
            try {
                uploadObject = await Upload.create(uploadObject);
                console.log(uploadObject);
            } catch (err) {
                return res.send({
                    ok: false,
                    err: err.message
                });
            }

            // send success reponse
            return res.status(500).json({
                ok: true,
                msg: 'file uploaded successfully',
                filename: uploadObject.originalname
            });
        }
    });
});

module.exports = router;