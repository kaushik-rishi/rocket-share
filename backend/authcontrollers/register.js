const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// takes the username, name, password and stores it in the database and returns the created object
async function createUser(user) {
    const {
        name,
        username,
        password:plainTextPwd
    } = user

    let hashedPassword = await bcrypt.hash(plainTextPwd, 10)
    let newUser = {
        name : name,
        username : username,
        password: hashedPassword
    }

    try {
        let createdUser = await User.create(newUser)
        let token = await jwt.sign({
            username: createdUser.username
        }, process.env.JWT_SECRET_KEY)
        return token
    } catch (err) {
        console.log(err.message.red)
        return null
    }
}

async function test() {
    await createUser({
        name: 'Kaushik Rishi',
        username: 'dark_angel',
        password: 'Kamal_123'
    })
}

// test()

module.exports = {
    createUser
}