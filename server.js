require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
require('colors');

const db = require('./config/db');
require('./models/Relations.js');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO : move the css and js files of the templates from the views folder to somewhere else and then remount the path to /public or something like that
app.use('/', express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/api/auth', require('./routes/api/authRoutes'));
app.use('/api/upload', require('./routes/api/uploadRoutes'));

app.use('/download', require('./routes/download'));
app.use('/', require('./routes/viewRoutes')); // also renders the /file/:uuid page


// TODO : Remove their respective files
// app.use('/', require('./routes/filehandlingRoutes'));

const PORT = process.env.PORT || 8080;

db.sync({ alter: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🌝 Server running on port ${PORT} => http://localhost:8080`.yellow.bold);
        });
    });