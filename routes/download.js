const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const { Upload } = require('../models/Upload');
const bucketPath = path.join(__dirname, '..', 'bucket');

router.get('/:uuid', async(req, res) => {
    const file = await Upload.findOne({
        where: {
            id: req.params.uuid
        }
    });

    if (!file) {
        return res.status(404).send({
            ok: false,
            err: 'Either there was no file with this link or the link has probably been expired'
        });
    }

    const filePath = path.join(bucketPath, file.id);
    fs.stat(filePath, (err, stat) => {
        if (err !== null) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({
                    ok: false,
                    err: 'The requested file was not found in the bucket'
                });
            }

            return res.status(500).json({
                ok: false,
                err: err.message
            });
        }
        res.download(filePath, file.originalname);
    });
});

module.exports = router;