const { Strategy: LocalStrategy } = require('passport-local');
const passUtils = require('../utils/passutils');
const User = require('../models/User');

// passport will be passed into the function from the server.js file
const strategy = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'},
        async (email, password, done) => {
            // Check the user
            let user = await User.findOne({email});
            if (!user) {
                return done(null, false, {
                    message: 'The email is not registered'
                });
            }
            
            // Match the password
            try {
                if (!await passUtils.compare2hash(password, user.password)) {
                    return done(null, false, {
                        message: 'The password is incorrect'
                    });
                } else {
                    return done(null, user);
                }
            } catch (err) {
                console.log(`error: ${err.message}\nLocation: passport.js config while validating the login using the local strategy`);
            }
        })
    );
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

module.exports = strategy;