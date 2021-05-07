const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('share');
});

module.exports = router;