const router = require('express').Router()
const { uploadMiddleware } = require('../middleware/uploadMulterMiddleware')

const singleUpload = uploadMiddleware.single('fileupload')

router.post('/upload', (req, res, err) => {
    // store the file
    singleUpload(req, res, (err) => {

        // error while uploading the file
        if (err) {
            return res.status(500).send({
                ok: false,
                err: err.message
            })
        }

        const file = req.file

        if (!file) {
            // bad request
            res.status(400).json({
                "ok": false,
                "err": "Something went wrong while uplaoding the file... [The fields should not be empty]"
            })
            
        } else {
            // save the upload metadata to the server
            

            // send success reponse
            res.status(500).json({
                ok: true,
                msg: 'file uploaded successfully',
                file
            })
        }
    })
})

module.exports = router