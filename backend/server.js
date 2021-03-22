// importing node modules
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
require('colors')
require('dotenv').config()

// importing files as modules
const db = require('./config/db')

// creating an express app
const app = express()

// parsing the request body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// parsing the cookies
app.use(cookieParser())

// serving the client folder on the root path
app.use('/', express.static(path.join(__dirname, '..', 'client')))

// mounting the routes
app.use('/', require('./routes/authRoutes')) // authorization routes

const PORT = 8080

// synchronize the database and then start the express server
db.sync({alter: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🌝 Server running on port ${PORT}`.yellow.bold)
        });
    })