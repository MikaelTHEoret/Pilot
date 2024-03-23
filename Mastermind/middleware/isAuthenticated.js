module.exports = function(req, res, next) {
  if (req.session && req.session.user) {
    next(); // User is authenticated, proceed
  } else {
    // Redirect to login page
    res.redirect('/auth/login');
  }
};
