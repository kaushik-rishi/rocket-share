const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.get('/share', (req, res) => {
    res.render('share');
});

router.get('/forum', (req, res) => {
    res.render('forum');
});

module.exports = router;