const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body;
    
    let errors = [];
    
    if (!name || !email || !password || !password2) {
        errors.push({msg: 'Every field is required'});
    }
    if (password !== password2) {
        errors.push({msg: 'Both the password fields should match'});
    }
    if (password.length < 6) {
        errors.push({msg: 'Password must contain a minimum of 6 characters'});
    }
    
    let duplicate = await User.findOne({email});
    console.log(duplicate);
    if (duplicate) {
        errors.push({
            msg: 'Email already registered'
        });
        return res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    
    if (errors.length > 0) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        try {
            let user = await User.create({
                name,
                email, 
                password
            });
            
            if (!user) {
                // empty user created
                return res.render('servererrpage', {
                    err: 'Server Error',
                    reason: 'Empty user object: POST /users/register'
                });
            }
            
            console.log(user);
            
            // flash a redirect success message
            req.flash('success_msg', 'You are now registered and can log in');
            return res.redirect('/users/login');
        } catch (err) {
            // failed to create the user
            return res.render('servererrpage', {
                err: 'Server Error',
                reason: 'Failed to create the user at the register route'
            });
        }
    }
});

router.get('/logout', (req, res) => {
    console.log('logout');
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;