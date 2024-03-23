const express = require('express');
const router = express.Router();
const passport = require('passport');

// Assuming generateToken() is defined elsewhere
// const generateToken = require('path/to/your/token/generator');

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    // Assuming req.user is the user object from your authentication strategy

    // Correctly set the session properties
    req.session.userId = req.user._id; // or whatever your user identifier field is
    req.session.token = generateToken(); // if you need a token, set it like this
    req.session.expires = Date.now() + 3600000; // Set expiration if needed

    // Ensure changes are saved before redirecting
    req.session.save(err => {
      if (err) {
        console.error("Session save error:", err);
        return res.redirect('/login'); // Redirect to login page on error
      }
      res.redirect('/'); // Redirect to home on successful login
    });
  }
);

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  // Logout user and destroy session
  req.logout(); // Passport's logout function
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.redirect('/'); // Redirect home or handle differently
    }
    // Clear cookie if needed, then redirect
    res.clearCookie('connect.sid'); // Adjust cookie name based on your session configuration
    res.redirect('/login');
  });
});

module.exports = router;
