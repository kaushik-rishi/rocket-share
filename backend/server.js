require('dotenv').config();

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
require('colors');

const db = require('./config/db');
// Make the relations when the server starts. [Ensure that the relations are already made]
require('./models/Relations.js');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'views')))

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/api', require('./routes/api/authRoutes'));
app.use('/api', require('./routes/api/uploadRoutes'));
app.use('/', require('./routes/viewRoutes'));
app.use('/', require('./routes/filehandlingRoutes'));

const PORT = process.env.PORT || 8080;

db.sync({ alter: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🌝 Server running on port ${PORT} => http://localhost:8080`.yellow.bold);
        });
    });