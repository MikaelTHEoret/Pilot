# File: rateLimiting.js
# Location: middleware/
# Purpose: Setting up rate limiting on sensitive routes to prevent abuse.

const rateLimit = require('express-rate-limit');

// Define rate limiting for login attempts
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
});

module.exports = {
  loginRateLimiter,
};
