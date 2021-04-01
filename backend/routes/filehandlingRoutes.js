const router = require('express').Router();
const fileHandlers = require('../controllers/fileHandlers');

// TODO : Delete file present at that route
// TODO : Update file present at that route
router
	.get('/:fileid', fileHandlers.getFile);

module.exports = router;