const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
require('colors')
require('dotenv').config()
const db = require('./config/db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '..', 'client')))
app.use('/', require('./routes/authRoutes'))

const PORT = 8080
db.sync({alter: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🌝 Server running on port ${PORT}`.yellow.bold)
        });
    })