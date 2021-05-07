module.exports = {
    protected: (req, res, next) => {
        // console.log('deb: Inside the protected middleware');
        // console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            next();
        } else {
            req.flash('error_msg', 'Please login to view this resource');
            return res.redirect('/users/login');
        }
    }
}