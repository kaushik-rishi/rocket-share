const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function loginUser(user) {
    let {
        username,
        password: plainTextPwd
    } = user
    
    const dbUser = await User.findOne({
        where: {
            username
        }
    })

    if (!dbUser) return null

    if (await bcrypt.compare(plainTextPwd, dbUser.password) === true)  {
        const token = await jwt.sign({
            username
        }, process.env.JWT_SECRET_KEY)
        return token
    }

    return null
}

module.exports = {loginUser}