require('dotenv').config();

const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const config = require('./config.json');
const passport = require('passport');
const app = express();

// built in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sessions and flash (for flash messages preserved over sessions)
// Express session
app.use(session({
    secret: 'session-secret',
    resave: true,
    saveUninitialized: true
}));
// Connect flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// view engine settings
// app.use(expressLayouts);
app.set('view engine', 'ejs');

// static files
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/home', express.static(path.join(__dirname, 'homepageworkaround')));

// Global Variables
app.use(require('./utils/globalVarsMiddleware'));

// routes
app.use('/', require('./routes'));

app.get('/', (req, res) => {
    res.redirect('/home');
});

const PORT = process.env.PORT || 5000;
mongoose.connect(config.DB_CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on https://rocketfileshare.herokuapp.com/ ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
        app.listen(PORT, () => {
            console.log(`Server started without DB connection on http://localhost:${PORT}`);
        });
    });