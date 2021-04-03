const router = require('express').Router();

router.use('/', require('./routes/viewRoutes')); // also renders the /file/:uuid page
router.use('/download', require('./routes/download'));
router.use('/api', require('./api'));


module.exports = router;