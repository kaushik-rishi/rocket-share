const {
    Upload
} = require('../models/Upload');

module.exports = async function(req, res, next) {
    const id = req.params.uuid;
    const file = await Upload.findByPk(id);

    if (!file) return res.render('download', {
        ok: false,
        msg: 'Either there was no file with this link or the link has probably been expired'
    });

    res.render('download', {
        id: file.id,
        originalname: file.originalname,
        size: `${parseInt(file.size)/1000} KB`,
        downloadLink: `${process.env.APP_ROOT_URL}/download/${id}`
    });
}