require('colors')
const db = require('../config/db')
const { DataTypes } = require('sequelize')

const UserSchema = {
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const User = db.define('User', UserSchema)

async function test() {
    await db.sync({})

    try {
        await User.create({
            username: 'darkangel',
            name: 'Kaushik Rishi Manchukonda',
            password: 'Kamal_12'
        }) 
    } catch (err) {
        console.log(err.message.red)
    }
}

// test()

module.exports = User