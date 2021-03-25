const router = require('express').Router()
const { uploadMiddleware } = require('../middleware/uploadMulterMiddleware')

const singleUpload = uploadMiddleware.single('fileupload')

router.post('/upload', (req, res, err) => {
    const file = req.file

    if (!file) 
        return res.status(400).send({
            ok: false,
            err: 'Something went wrong while uplaoding the file...'
        })
    

    singleUpload(req, res, (err) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                err: err.message
            })
        }

        
    })
})

module.exports = router