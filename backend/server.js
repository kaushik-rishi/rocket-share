const express = require('express')
const morgan = require('morgan')
const ora = require('ora')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'))

app.use('/', express.static(path.join(__dirname, '..', 'client')))

const PORT = 8080
app.listen(PORT, () => {
    ora(`Server running on port ${PORT}`).start()
});