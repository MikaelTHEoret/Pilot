// loginRoutes.js
const express = require('express');
const router = express.Router();

// Require passport
const passport = require('passport');

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {

    // Session setup
    req.user.session = {
      token: generateToken(),
      expires: Date.now() + 3600000
    };

    req.user.save();

    res.redirect('/');
  }
);

router.get('/login', (req, res) => {
  res.render('login');
});


router.get('/logout', (req, res) => {
  req.logout();

  req.user.session = {};
  req.user.save();

  res.redirect('/');
});

module.exports = router;