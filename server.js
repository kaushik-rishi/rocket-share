if (process.env.NODE_ENV === 'production')
    require('dotenv').config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });
else if (process.env.NODE_ENV === 'college')
    require('dotenv').config({ path: `${__dirname}/.env.college` });
else 
    require('dotenv').config({ path: `${__dirname}/.env.development` });

const express = require('express'),
        flash = require('connect-flash'),
        mongoose = require('mongoose'),
        path = require('path'),
        session = require('express-session'),
        passport = require('passport');

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
console.log(process.env.DB_CONN_STRING);
mongoose.connect(process.env.DB_CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server up on ${process.env.APP_ROOT_URL}`);
        });
    })
    .catch((err) => {
        console.error(err);
        app.listen(PORT, () => {
            console.log(`Server up without DB connection on ${process.env.APP_ROOT_URL}`);
        });
    });