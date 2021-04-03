const router = require('express').Router();
const viewFileController = require('../controllers/dlViewControllers');

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

router.get('/file/:uuid', viewFileController);

module.exports = router;