# authGuard.js
const authGuard = (req, res, next) => {
  if (req.session && req.session.userId) {
    next(); # User is authenticated, proceed
  } else {
    # Redirect to login with a message (flash messages could be implemented here)
    res.redirect('/auth/login?error=You need to be logged in to access this page');
  }
};

module.exports = authGuard;
