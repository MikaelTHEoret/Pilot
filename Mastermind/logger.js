// logger.js

const logger = require('winston'); // or any logger package

// Configure logger
logger.configure({
  // config options
});

// Middleware function
const loggerMiddleware = (req, res, next) => {
  // Log request details, etc.
  next();
};

module.exports = loggerMiddleware;
