const router = require('express').Router();
const { uploadMiddleware } = require('../../middleware/multerupload');
const singleUpload = uploadMiddleware.single('fileupload');
const File = require('../../models/File');
const User = require('../../models/User');

router.post('/', (req, res) => {
    // store the file
    singleUpload(req, res, async (err) => {

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
            let fileObject = await File.create ({
                id: req.fileId, // the fileId property was added by the multer singleUpload middleware
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size
            });
            
            let user = await User.findById(req?.user?._id);
            if (user) {
                user.files_created.push({
                    id: fileObject.id,
                    originalname: fileObject.originalname,
                    date: fileObject.date.toDateString(),
                    size: fileObject.size
                });
                await user.save();
            }

            // send success reponse
            return res.status(201).json({
                ok: true,
                msg: 'file uploaded successfully',
                originalname: fileObject.originalname,
                url: `${process.env.APP_ROOT_URL}/file/${fileObject.id}`,
                username: user?.name
            });
        }
    });
});

module.exports = router;