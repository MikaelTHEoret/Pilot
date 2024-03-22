# File: flashMessages.js
# Location: utils/
# Purpose: Handling and displaying flash messages for user feedback.

module.exports = function(req, res, next) {
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error'),
  };
  next();
};
