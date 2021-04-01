const { User } = require('../models/User');
const { Upload }  = require('../models/Upload');

async function getFile(req, res, next) {
	const fileid = req.params.fileid;

	// check for the file in the database
	const upload = await Upload.findOne({
		where: {
			id: fileid
		},
		// include: User
	});

	if (!upload) {
		return res.status(404).json({
			ok: false,
			msg: 'The requested resource is not found on the server'
		});
	}

	res.status(200).json({
		ok: true,
		id: '',
	})
}

module.exports = {
	getFile
};