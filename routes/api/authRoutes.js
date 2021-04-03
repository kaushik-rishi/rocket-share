const router = require('express').Router();
const authControllers = require('../../controllers/authControllers');

router
    .post('/login', authControllers.loginUser)
    .post('/signup', authControllers.signupUser)
    .get('/logout', authControllers.logoutUser);

module.exports = router;