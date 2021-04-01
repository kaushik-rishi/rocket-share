require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('colors');

const db = require('./config/db');
// Make the relations when the server starts. [Ensure that the relations are already made]
require('./models/Relations.js'); 

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// serving the client folder on the root path
app.use('/', express.static(path.join(__dirname, '..', 'client')));

app.use('/', require('./routes/authRoutes')); // authorization routes
app.use('/', require('./routes/uploadRoutes')); // file upload routes
app.use('/', require('./routes/filehandlingRoutes')); // file viewing routes

const PORT = process.env.PORT || 8080;

db.sync({alter: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🌝 Server running on port ${PORT} => http://localhost:8080`.yellow.bold);
        });
    });