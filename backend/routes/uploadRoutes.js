const router = require('express').Router()
const { uploadMiddlware } = require('../middleware/uploadMulterMiddleware')

router.post('/upload', uploadMiddlware.single('fileupload'), (req, res, err) => {
    const file = req.file
    
    if (err || !file) {
        let errorMessage = err?.message || 'Exception occured while uploading the file'
        res.status(500).json({
            ok: false,
            err: errorMessage
        })
    } else {
        res.status(200).json({
            ok: true,
            msg: `You're file ${file.originalname} was succesfully uploaded to the server`
        })
    }
})

module.exports = router