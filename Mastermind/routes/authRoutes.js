const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const bcrypt = require('bcrypt');

// Input validation middleware
const validateLoginInput = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect('/auth/login?error=Username and password are required');
  }
  next();
};

// Route to display the login form
router.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('login', { error });
});

// Route to handle login form submission
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findOne({ username });
    // If user not found or password doesn't match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.redirect('/auth/login?error=Invalid credentials');
    }
    // Set session data for authenticated user
    req.session.userId = user._id;
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.redirect('/auth/login?error=An unexpected error occurred');
      }
      // Redirect to the main page after successful login
      res.redirect('/');
    });
  } catch (error) {
    console.error('Login error:', error);
    res.redirect('/auth/login?error=An unexpected error occurred');
  }
});

module.exports = router; // Export the router instance
