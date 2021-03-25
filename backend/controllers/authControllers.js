const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {
    User,
    validateUser,
    validationErrorHandler
} = require('../models/User')

async function loginUser(req, res, next) {
    let user = req.body
    let { error } = validateUser(user, true)

    if (error) return res.status(400).json({
        ok: false,
        err: error?.details[0]?.message || 'Server error'
    })

    try {
        // fetch the user from the database
        let userDb = await User.findOne({
            where: {
                email: user.email
            }
        })

        console.log(userDb)
        
        // if the user does not exist => return an error response
        if (!userDb) {
            return res.status(400).json({
                ok: false,
                err: 'Email ID is not registered, Sign Up first'
            })
        }
        
        console.log(await bcrypt.compare(user.password, userDb.password))

        // if the password entered is invalid => return an error response
        if (await bcrypt.compare(user.password, userDb.password) === false) {
            return res.status(400).json({
                ok: false,
                err: 'Invalid password'
            })
        }

        // payload for the JWT
        let payload = {
            name: userDb.name
        }

        // create the token using the payload and the private key
        let token = await jwt.sign(payload, process.env.JWT_PRIVATE_KEY)

        // set the authtoken on the cookie
        // TODO : change this to localStorage (or) Auth bearer token
        res.cookie('authtoken', token)

        return res.status(200).json({
            ok: true
        })
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err: err.message
        })
    }
}

async function registerUser(req, res, next) {
    let user = req.body
    let {error} = validateUser(user)

    // if the user objects follows the validation
    if (error) {
        res.status(400).json({
            ok: false,
            err: error?.details[0]?.message || 'Server error'
        })
    }

    // create new user
    try {
        user = await User.create(user)

        // payload to insert in the token
        let payload = {
            name: user.name
        }

        // sign the token
        let token = await jwt.sign(payload, process.env.JWT_PRIVATE_KEY)

        // set the cookie
        res.cookie('authtoken', token)

        // redirect the user to the share page
        return res.status(201).json({
            ok: true,
            msg: 'Successfully registered user'
        })
    } catch (err) {
        // if user creation fails then there must be a validation error
        return res.status(400).json({
            ok: false,
            err: validationErrorHandler(err)
        })
    }
}

async function logoutUser(req, res, next) {
    // clear the auth token cookie
    res.clearCookie('authtoken')

    // redirect to the home page
    return res.redirect('/')
}

module.exports = {
    loginUser,
    registerUser,
    logoutUser
}