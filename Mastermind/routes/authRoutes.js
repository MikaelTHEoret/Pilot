// authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const csrf = require('csurf'); // Assuming CSRF middleware is added
const csrfProtection = csrf({ cookie: true });

// Input validation middleware (example, more comprehensive validation recommended)
const validateRegistrationInput = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    // Ideally, flash messages should be used here
    return res.redirect('/auth/register?error=Username and password are required');
  }
  next();
};

router.get('/auth/register', csrfProtection, (req, res) => {
  res.render('register', { csrfToken: req.csrfToken() });
});

router.post('/auth/register', csrfProtection, validateRegistrationInput, async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // Use flash messages to notify the user
      return res.redirect('/auth/register?error=User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ username, password: hashedPassword });
    res.redirect('/auth/login?success=Registration successful, please log in');
  } catch (error) {
    console.error('Registration error:', error);
    res.redirect('/auth/register?error=An unexpected error occurred');
  }
});

router.get('/auth/login', csrfProtection, (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
});

router.post('/auth/login', csrfProtection, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.redirect('/auth/login?error=Invalid credentials');
    }
    req.session.userId = user._id;
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.redirect('/auth/login?error=An unexpected error occurred');
      }
      res.redirect('/');
    });
  } catch (error) {
    console.error('Login error:', error);
    res.redirect('/auth/login?error=An unexpected error occurred');
  }
});

router.get('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error during session destruction:', err);
      return res.redirect('/?error=Error logging out');
    }
    res.redirect('/auth/login?success=You have been logged out successfully');
  });
});

module.exports = router;
