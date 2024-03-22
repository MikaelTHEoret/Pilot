const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// Input validation middleware
const validateRegistrationInput = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect('/auth/register?error=Username and password are required');
  }
  next();
};

// Define routes after initializing `router`
router.get('/register', csrfProtection, (req, res) => {
  res.render('register', { csrfToken: req.csrfToken() });
});

// More routes...

module.exports = router;
