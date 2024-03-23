// File: csrfProtection.js
// Location: middleware/
// Purpose: Setup CSRF protection middleware using csrf library.

const csrf = require('csurf');

// Setup CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

module.exports = csrfProtection;
