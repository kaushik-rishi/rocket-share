const router = require('express').Router();

router
	.use('/auth', require('./authRoutes'))
	.use('/upload', require('./uploadRoutes'))
	.use('/mail', require('./sendMailRoutes'));

module.exports = router;