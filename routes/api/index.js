const router = require('express').Router();

router.use('/file', require('./file'));

module.exports = router;