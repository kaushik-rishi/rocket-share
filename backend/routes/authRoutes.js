const router = require('express').Router()
const {
    loginUser
} = require('../authcontrollers/login')
const { createUser } = require('../authcontrollers/register')

router.post('/login', async (req, res) => {
    let user = req.body

    const token = await loginUser(user)
    
    if (token !== null)
        res.cookie('authtoken', token)

    res.redirect('/')
})

router.post('/register', async (req, res) => {
    let token = await createUser(req.body)

    if (token !== null) {
        res.cookie('authtoken', token)
    }

    res.redirect('/')
})

module.exports = router