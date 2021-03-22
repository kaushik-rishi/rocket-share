const router = require('express').Router()
const authControllers = require('../controllers/authControllers')

router
    .post('/login', authControllers.loginUser)
    .post('/register', authControllers.registerUser)
    .get('/logout', authControllers.logoutUser)

module.exports = router