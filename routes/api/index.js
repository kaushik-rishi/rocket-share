const router = require('express').Router();

router.use('/auth', require('./authRoutes'));
router.use('/upload', require('./uploadRoutes'));
router.use('/send', require('./sendMailRoutes'));

module.exports = router;