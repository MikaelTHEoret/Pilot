// middleware/isAuthenticated.js

/*
Middleware to check if the user is authenticated.
Redirects to the login page if not authenticated.
*/
module.exports = function(req, res, next) {
  // Check if the user is authenticated.
  // This example assumes that when a user is authenticated,
  // a property `user` is added to `req.session` to indicate the user is logged in.
  if (req.session && req.session.user) {
    return next(); // Proceed to the next middleware/route handler
  }

  // If not authenticated, send an appropriate response:
  // Redirect to a login page or send a 401 Unauthorized status code,
  // depending on your application's needs.

  // For web applications, you might redirect to a login page:
  // res.redirect('/login');

  // For APIs, you might send a 401 Unauthorized status:
  res.status(401).json({ success: false, message: 'Unauthorized access. Please log in.' });
};
