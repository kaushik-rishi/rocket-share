module.exports = (req, res, next) => {
    // if logged in redirect to dashboard
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    next();
}