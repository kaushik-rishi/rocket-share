const router = require('express').Router();

router.use('/', require('./viewRoutes')); // also renders the /file/:uuid page
router.use('/download', require('./download'));
router.use('/api', require('./api'));


module.exports = router;