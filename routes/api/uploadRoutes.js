const router = require('express').Router();
const {
    uploadPost
} = require('../../controllers/uploadControllers');

// POST /api/upload - to upload a new file
router
	.post('/', uploadPost);

module.exports = router;