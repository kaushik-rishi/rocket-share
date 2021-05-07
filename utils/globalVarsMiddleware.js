// Custom middleware 
// Adds the global variables of success message and error message
// this is for displaying the colors

module.exports = (req, res, next) => {
    // flash would be added by the middleware before this in the middleware chain
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
}